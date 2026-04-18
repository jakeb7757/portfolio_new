---
title: "Retail Store Performance Dashboard"
description: "Excel dashboard analyzing 4,266 transactions across three regional markets, surfacing a margin-versus-revenue insight that reframed the promotional strategy question."
pubDatetime: 2025-10-20T12:00:00Z
tags:
  - dashboarding
  - retail
  - excel
  - exploratory-analysis
featured: false
draft: false
---

## The question

For a regional retailer operating in Chicago, Los Angeles, and New York, the standard question is "which region is performing best?" — usually answered by ranking revenue. That's a useful answer, but it's often the wrong one. Revenue alone tells you where sales are happening; it doesn't tell you where the business is actually *making money*, or where the biggest growth lever is.

## The data

4,266 transactions across three regions, spanning multiple product categories. Each transaction held region, product category, product name, quantity sold, unit price, unit cost, and calculated profit.

## The approach

Rather than build a report, I built a pivot-table-driven dashboard in Excel:

- **Revenue and profit by region**, with profit margin calculated
- **Category performance**, same metrics
- **Top and bottom SKUs** by units sold and by margin
- **Dynamic visualizations** — bar charts for regional comparison, treemaps for category mix
- **Calculated fields** for profit margin at every level of aggregation

The goal was an interactive artifact a manager could actually use to answer follow-up questions, not a static screenshot.

## What the dashboard surfaced

Chicago had the highest total revenue. Los Angeles was second. **New York was third — but had the highest profit margin at 30.36%**, narrowly ahead of LA's 30.30%.

That ranking inversion is the interesting finding. Reading revenue alone, the instinct is "invest in Chicago, it's winning." Reading margin alone, the conclusion flips: New York's customers are buying higher-quality mix, the store operates leaner, or both. The business opportunity isn't to protect Chicago — it's to grow New York, because every additional dollar of revenue there converts to more profit than the same dollar in Chicago.

Within categories, a similar pattern repeated. A few high-margin products were carrying the profitability of the business while pulling only modest volume:

- **Jenga: 70% profit margin**
- **Basketball hoops: 64%**

Electronics had strong margins but were the lowest category by both units sold and revenue.

## The recommendation

The analysis pointed to a specific, testable strategy for New York: **use the highest-margin SKUs as loss leaders in promotional campaigns** to drive store traffic and volume. A Jenga at 70% margin can sustain a 20% promotional discount and still contribute margin well above the store average. The goal isn't to make money on the Jenga — it's to use the Jenga to bring customers through the door, where they'll add other items to the basket.

Complementing that: a company-wide marketing push on Electronics. The category has the margin profile to support investment, and the low current volume means even a modest lift in units sold would disproportionately move the profit line.

## Reflection

The lesson wasn't about the specific SKUs. It was about how much a single additional metric (profit margin) changes the business conversation. "Which region performs best?" answered three different ways by revenue, by margin, and by margin-weighted revenue gives three different strategic directions. The dashboard's value was making all three views available side-by-side so the decision-maker could choose which question they were actually answering.
