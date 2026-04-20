---
title: "Building a Self-Hosted NWS Weather Alert Dashboard"
description: "How I built a real-time severe weather dashboard on my homelab using the NWS public API, PostgreSQL with PostGIS, Python, and Grafana — and what I learned about spatial SQL along the way."
pubDatetime: 2026-04-20T12:00:00Z
tags:
  - python
  - postgresql
  - postgis
  - grafana
  - homelab
  - data-engineering
  - sql
featured: false
draft: false
---

## The idea

I've been storm chasing in the Texas Panhandle for years, and I've always wanted a better situational awareness tool than refreshing weather.gov. Around the same time I was looking for a project that would let me practice spatial SQL with real data. It turned out those two goals were the same project.

The NWS provides a free, public REST API at `api.weather.gov` — no key required — that returns all active watches, warnings, and advisories as GeoJSON, including polygon geometries for warned areas. That's a real-time spatial data stream I could ingest, store, and visualize entirely on my own infrastructure.

The end result: a self-hosted dashboard running on Proxmox that ingests live NWS alert data every 60 seconds, stores it in a PostgreSQL + PostGIS database, and visualizes it in Grafana with a live map and alert count panels.

## Stack

Three LXC containers on Proxmox, all on a shared internal subnet:

- **nws-db** — PostgreSQL 16 + PostGIS, stores all ingested alerts
- **nws-poller** — Python service that polls the NWS API every 60 seconds and upserts into the database
- **nws-grafana** — Grafana OSS, connected to the database as a data source

The NWS API endpoint is straightforward:

```
GET https://api.weather.gov/alerts/active
```

No authentication, no rate limiting issues as long as you include a `User-Agent` header with contact info. It returns a GeoJSON FeatureCollection where each feature is an active alert with properties like `event`, `severity`, `urgency`, `onset`, `expires`, and `geometry` — the actual polygon of the warned area.

## Database schema

PostGIS is what makes this interesting from a SQL perspective. The `GEOMETRY` type lets you store the alert polygons natively and query them spatially — not just filter by text fields.

```sql
CREATE TABLE alerts (
  id              TEXT PRIMARY KEY,
  event           TEXT,
  severity        TEXT,
  urgency         TEXT,
  certainty       TEXT,
  status          TEXT,
  message_type    TEXT,
  headline        TEXT,
  description     TEXT,
  area_desc       TEXT,
  sender_name     TEXT,
  onset           TIMESTAMPTZ,
  expires         TIMESTAMPTZ,
  sent            TIMESTAMPTZ,
  ingested_at     TIMESTAMPTZ DEFAULT NOW(),
  geometry        GEOMETRY(MultiPolygon, 4326)
);

CREATE INDEX idx_alerts_geom ON alerts USING GIST (geometry);
```

The GIST index on the geometry column enables fast spatial queries. Without it, a spatial filter over thousands of alert polygons would be a full table scan.

## The poller

The ingestion service is a Python script running as a systemd unit. The core logic is an upsert — if an alert already exists in the database (matched by its NWS ID), update the expiry and description in case NWS revised it. If it's new, insert it.

```python
cur.execute(f'''
    INSERT INTO alerts
      (id, event, severity, urgency, certainty, status,
       message_type, headline, description, area_desc,
       sender_name, onset, expires, sent, geometry)
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,{geom_sql})
    ON CONFLICT (id) DO UPDATE SET
      expires = EXCLUDED.expires,
      description = EXCLUDED.description
''', (...))
```

The geometry handling required converting NWS's GeoJSON geometry to WKT for the PostGIS `ST_GeomFromText` call, and wrapping Polygon types in a MultiPolygon since that's what the column expects. Some alerts — mostly zone-based advisories — have no geometry at all, which is fine. The column just stores NULL and those alerts are filtered out of map visualizations.

One practical note: the NWS requires a `User-Agent` header on all requests. Without it you'll start getting 403s after a few polls.

## Spatial SQL

Once data started accumulating, PostGIS opened up queries that wouldn't be possible with a standard relational schema. Finding all active warnings within 150 miles of Amarillo is a single query:

```sql
SELECT event, headline, onset, expires
FROM alerts
WHERE ST_DWithin(
  geometry::geography,
  ST_SetSRID(ST_MakePoint(-101.8313, 35.2220), 4326)::geography,
  241401  -- 150 miles in meters
)
AND expires > NOW()
ORDER BY onset DESC;
```

`ST_DWithin` on geography types handles the curvature of the earth correctly — the distance is measured in meters along the surface, not as a flat Euclidean distance in degrees. That matters at the scale of a weather warning polygon.

For the Grafana map panel, I needed centroid coordinates since Grafana's markers layer works with lat/lon points rather than raw polygons:

```sql
SELECT
  ST_Y(ST_Centroid(geometry)) AS latitude,
  ST_X(ST_Centroid(geometry)) AS longitude,
  event, severity, headline, area_desc, expires, certainty
FROM alerts
WHERE expires > NOW()
AND geometry IS NOT NULL
AND event = 'Tornado Warning'
```

## Grafana setup

The dashboard has three panels:

**Live map** — Markers layer with separate queries per event type, each bound to its own layer with a fixed color. Tornado Warnings are red, Tornado Watches orange, Flood Warnings dark blue, and so on. PDS watches and Tornado Emergencies get their own layers at the top of the stack since those are rare enough to warrant immediate visual attention. The `certainty` field on Tornado Warnings distinguishes observed tornadoes from radar-indicated ones in the tooltip.

**Active alerts by type** — Bar gauge showing current active counts filtered to high-impact event types only. The query filters on an `IN` list of events I care about — tornado, severe thunderstorm, and flood products — so coastal advisories and marine statements don't crowd out the signal.

**Issued today** — Same structure as the active panel but using `ingested_at >= date_trunc('day', NOW())` rather than `expires > NOW()`, so it captures the full day's activity including alerts that have already expired.

The dashboard auto-refreshes every 60 seconds to stay in sync with the poller interval.

## What I'd do next

The natural next step is adding a FastAPI endpoint that serves active alert polygons as a proper GeoJSON FeatureCollection, which Grafana can consume directly as a URL-based GeoJSON layer. That would replace the centroid markers with actual polygon overlays — the outlined warned area the way NWS displays it — which is significantly more useful during an active severe weather event.

Beyond that, the historical database accumulating in Postgres is the real long-term asset. A few months of data opens up genuinely interesting analysis: warning lead times by event type, seasonal frequency distributions by region, how often watches verify into warnings. That's the kind of time series and aggregation work that's easy to talk through in a data role interview because it's grounded in a domain most people find intuitive.

## Tooling

- Python 3, psycopg2, Shapely, requests
- PostgreSQL 16 + PostGIS 3
- Grafana OSS
- Proxmox VE (LXC containers)
- NWS public API (api.weather.gov)
