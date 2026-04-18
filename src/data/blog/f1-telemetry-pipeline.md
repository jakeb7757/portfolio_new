---
title: "F1 Performance Data Visualization Pipeline"
description: "Automated Python pipeline using FastF1 to extract, transform, and visualize Formula 1 telemetry across multiple seasons, with a focus on the 2026 regulation changes."
pubDatetime: 2026-03-10T12:00:00Z
tags:
  - python
  - pandas
  - matplotlib
  - sports
  - data-pipeline
featured: true
draft: false
---

## Why this project

Formula 1's 2026 regulations are the largest technical rule change in over a decade — new chassis dimensions, active aerodynamics, a 50/50 power split between combustion and electric, and a shift to fully sustainable fuel. The practical question for a fan or analyst is simple: what do these changes actually do to lap times, corner speeds, and team competitive orders? The underlying data exists publicly via F1's live timing system. It just needs to be pulled, cleaned, and visualized.

## The stack

- **FastF1** — an open-source Python library that wraps F1's live timing API and provides lap-level telemetry (speed, throttle, brake, gear, DRS) at 10+ samples per second
- **Pandas** for data shaping
- **NumPy** for numerical work
- **Matplotlib** (with occasional Seaborn) for visualization
- **Jupyter** notebooks for exploratory work, with the reusable pieces extracted into a pipeline module

## What the pipeline does

Three stages:

**1. Extract.** Given a season and event (e.g., "2025 Monaco GP"), the pipeline pulls the session data via FastF1's cached API, gets telemetry for specified drivers or teams, and pulls reference data like tire compounds, weather, and track status flags.

**2. Transform.** FastF1 returns telemetry at variable sample rates depending on the data source. The pipeline resamples to a common grid, aligns traces by distance-into-lap rather than timestamp (so two different laps of the same circuit compare meaningfully), and computes derived metrics like minimum corner speed, percentage of lap at full throttle, and sector-level time deltas.

**3. Visualize.** Standard outputs include:

- Speed trace overlays for two or more drivers on the same lap
- Corner-by-corner minimum speed comparisons
- Delta time plots showing where one driver gains or loses relative to another
- Season-over-season aggregate stats for the same event

## What I'm analyzing for 2026

The 2026 regulations change several things at once, which makes clean causal attribution impossible from public telemetry alone. What's feasible is descriptive comparison:

- **Top speed on straights** — the new power unit's 50/50 split and the introduction of manual override mode change where and when peak speeds occur
- **Corner minimum speeds** — the new chassis and ground-effect reduction shift aerodynamic load, which shows up most clearly in high-speed corners
- **DRS replacement effects** — active aerodynamics replace DRS entirely, which changes overtaking dynamics on long straights
- **Pack compression across teams** — larger regulation changes historically shuffle competitive order, and the telemetry shows this team-by-team

## Why this is a portfolio piece

The project hits three things I want to show:

1. **End-to-end data pipeline in Python** — extract, transform, load, visualize, not just a notebook
2. **Working with time-series data** at 10+ Hz sample rates, with the usual alignment and resampling problems that come with it
3. **Domain translation** — taking raw telemetry and producing visualizations that answer specific questions a racing analyst or fan would actually ask

## What's on GitHub

The public repo at [github.com/jakeb7757](https://github.com/jakeb7757) holds the pipeline module, Jupyter notebooks for the individual analyses, and example output charts. The code is deliberately written to be readable rather than maximally clever — function signatures that explain what they do, separation of data fetching from analysis from visualization, and cached API responses so re-running a notebook doesn't hammer the F1 servers.

## Reflection

What the project taught me: the hardest part of any data pipeline isn't the data, it's the small decisions about how to handle edge cases — laps with pit stops partway through, sessions interrupted by red flags, drivers who didn't complete a representative lap. These aren't exciting, but they're where hobbyist-level work and portfolio-quality work diverge. The pipeline documents every decision it makes about what to include, exclude, or impute, so when an output looks weird, there's a clear trail back to why.
