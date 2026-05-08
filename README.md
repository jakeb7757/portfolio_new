# jakeburleson.me

Personal portfolio site for Jake Burleson — data analyst, WTAMU graduate student, storm chaser.

Live at **[jakeburleson.me](https://jakeburleson.me)**

## What's here

Eight case studies covering data work across Python, SQL, Excel, and Power BI:

- Red River Ski Area Climate Forecast — 37-year time series, R² = 0.93
- Walmart Retail Sales Regression — 421k records, simple vs multiple regression
- Employee Attrition Analysis — IBM HR dataset, overtime and role-level attrition drivers
- F1 Telemetry Pipeline — FastF1 Python pipeline, 2025 vs 2026 regulation comparison
- Tornado Alley Shift Analysis — 75 years of NOAA tornado data, 71,813 records
- NWS Real-Time Alert Dashboard — self-hosted Grafana + PostGIS on Proxmox
- Telecom Customer Churn Analysis — geographic vs usage-based segmentation
- Retail Store Performance Dashboard — margin-vs-revenue insight across three markets

## Stack

Built on [AstroPaper v5](https://github.com/satnaing/astro-paper). Deployed to GitHub Pages via GitHub Actions. DNS managed through Cloudflare.

- **Framework:** Astro 5
- **Styling:** Tailwind CSS
- **Search:** Pagefind
- **Deployment:** GitHub Actions → GitHub Pages
- **Domain:** Cloudflare DNS (proxy off)

## Local dev

```powershell
pnpm install
pnpm run dev        # http://localhost:4321
pnpm run build      # production build to ./dist/
```

## Content

- Case studies: `src/data/blog/`
- Images: `src/assets/images/`
- Site config: `src/config.ts`
- Social links: `src/constants.ts`
- About page: `src/pages/about.md`

Pushing to `main` triggers a GitHub Actions deploy. Build takes ~30 seconds; the site is live within 3 minutes.
