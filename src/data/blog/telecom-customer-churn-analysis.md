---
title: "Telecom Customer Churn Analysis"
description: "Diagnostic analysis of 3,335 telecom customer records surfacing that churn is driven by customer-level factors, not geographic clustering."
pubDatetime: 2025-10-05T12:00:00Z
tags:
  - telecom
  - customer-analytics
  - segmentation
  - excel
  - exploratory-analysis
featured: false
draft: false
---

## The question

When a telecom carrier sees 14.5% of its customers churn in a given period, the first strategic question is whether the churn has structure — is it concentrated in specific regions, plan types, or customer segments — or whether it's diffuse and customer-level. The answer determines the retention strategy. Geographic concentration points toward regional marketing and retention campaigns. Customer-level diffusion points toward individual intervention models and service-line targeting.

## The data

3,335 customer records across all 51 U.S. states and DC. Each record held:

- Account length and area code
- Service plan indicators (international plan, voicemail plan, voicemail message count)
- Usage metrics — day, evening, night, and international minutes, calls, and charges
- Customer service call count
- Churn flag (the dependent variable)

## Method

I worked the diagnosis in four passes:

1. **Baseline churn rate.** 14.5% overall. Anything significantly above or below this line is worth investigating.
2. **Geographic segmentation.** Pivot table of churn rate by state, mapped onto a U.S. choropleth to look for regional clustering.
3. **Service plan segmentation.** Churn rate broken out by international plan flag, voicemail plan flag, and service call count.
4. **Usage segmentation.** Churn rate across deciles of day minutes, night minutes, customer service calls.

## Findings

**Geographic pattern: there isn't one.** State-level churn rates ranged from roughly 6% (Alaska, Hawaii, Iowa) to 26.5% (California, New Jersey) — a spread that sounds large until you look at the map. There's no regional clustering. Neighboring states don't share similar rates. California is high, but Oregon and Arizona are average. Texas is high (25%), but Oklahoma and Louisiana aren't. The geographic heat map is noise, not signal.

**The signal is customer-level.** Two variables jumped out of the service-plan segmentation:

- Customers with an international plan churned at a dramatically higher rate than those without
- Customers who called customer service more than three times showed a sharp increase in churn probability

Those two patterns together are diagnostic. The first suggests a product problem — international plan pricing or experience doesn't meet expectations. The second is the classic customer-service-calls-predict-churn relationship: frustrated customers call support, fail to get resolution, then leave.

## The recommendation

The findings reframed the strategic question. A retention campaign built on geography — "win California back" — would have been expensive and poorly targeted. A retention program built on customer-level indicators is both cheaper and more precise:

1. **Identify customers approaching the service-call threshold in near-real-time** and route them to proactive retention before they reach the tipping point.
2. **Audit the international plan** — pricing, features, or customer experience — to understand why its subscribers churn at elevated rates. Fix at the product level rather than the customer level.
3. **Deprioritize state-level retention campaigns** in favor of customer-segment campaigns.

## What this analysis can't do

The cleanest limitation: correlation, not causation. High customer service call volume is associated with churn, but the direction of causation matters. Are the calls causing the churn (frustration), or is the underlying problem causing both the calls and the churn (service quality)? A regression model with controls, or ideally an experiment — like randomly assigning a subset of high-call customers to proactive outreach — would disentangle these. The current analysis points toward where to experiment, not which mechanism is primary.

## Reflection

What I took from this: the first useful thing segmentation analysis does is kill bad hypotheses. Before this analysis, "is churn geographic?" was an open question, and plenty of people on the business side assumed yes. Spending a day putting a choropleth together — and seeing that it was essentially random noise — saved what could have been months of misdirected retention spending. A negative finding, firmly established, is worth more than a noisy positive one.
