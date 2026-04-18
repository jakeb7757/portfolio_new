---
title: "CMMC Level 1 Compliance Audit"
description: "A systematic security audit against CMMC Level 1 controls, producing structured assessment reports with findings, risk ratings, and remediation recommendations."
pubDatetime: 2025-09-20T12:00:00Z
tags:
  - security
  - compliance
  - audit
  - risk-assessment
featured: false
draft: false
---

## The assignment

The Cybersecurity Maturity Model Certification (CMMC) is the Department of Defense's compliance framework for contractors handling Federal Contract Information (FCI) and Controlled Unclassified Information (CUI). Level 1 is the entry-level tier, covering the 17 basic safeguarding practices any contractor handling FCI must implement. Small defense-adjacent businesses that have never been formally audited often don't know where they stand against these controls, and the assessment itself is a non-trivial exercise.

## Scope

The audit covered a small business environment against all 17 Level 1 practices, organized into six domains:

- **Access Control** — limiting system access to authorized users
- **Identification & Authentication** — verifying users and devices
- **Media Protection** — handling and sanitizing FCI-containing media
- **Physical Protection** — controlling physical access to systems
- **System & Communications Protection** — monitoring and controlling communications at boundaries
- **System & Information Integrity** — identifying, reporting, and correcting flaws

## Method

For each of the 17 practices, the audit worked through four steps:

1. **Practice definition** — the exact wording of the CMMC requirement
2. **Evidence collection** — what policy, configuration, or artifact demonstrates compliance
3. **Assessment finding** — met, partially met, or not met, with specific rationale
4. **Remediation recommendation** — what would need to change to close any gap, prioritized by severity

This produced a structured report: each practice got its own section, each gap got a severity rating, and the overall report ended with a prioritized remediation roadmap.

## What the audit found (structurally)

Without naming the specific organization, the findings pattern is worth describing because it's typical for small businesses new to CMMC:

- **Access control gaps** — accounts that persisted past separation, shared credentials for convenience, no formal account review cadence
- **Physical protection gaps** — server rooms without badge readers, printed FCI material stored in unlocked cabinets
- **Media sanitization gaps** — no formal process for wiping storage before disposal
- **System integrity gaps** — patch management done ad hoc rather than on schedule, no formal vulnerability scanning cadence

None of these are exotic. They're the kind of controls small businesses defer as they grow, and they become urgent the moment DoD contracts are on the line.

## The deliverable

The audit package included:

- **Executive summary** — a one-page view of overall compliance posture, suitable for leadership
- **Findings matrix** — all 17 practices, status, and severity rating, in a sortable table
- **Detailed findings** — one section per gap with evidence, impact description, and remediation steps
- **Prioritized roadmap** — a sequenced plan grouping gaps by urgency and by remediation effort

The roadmap distinguished between "immediate" items (anything creating active exposure), "short-term" (30–90 day fixes), and "planning horizon" (policy and process work that takes longer but isn't urgent).

## What I took from this

Two things. First, compliance work is fundamentally a translation exercise. The CMMC control language is written at a level of abstraction that makes it useful to auditors and useless to the small-business operators who have to implement it. A good audit report translates "limit information system access to authorized users" into "your shared admin password is a finding, here's the specific fix."

Second, the audit is only as useful as the remediation roadmap attached to it. A list of 17 findings with no prioritization is an overwhelming document that tends to get filed and ignored. A roadmap that says "these three things this week, these five things this quarter, these nine things by year-end" is something an SMB can actually execute.

## Context for this portfolio

This project lives in the portfolio primarily as context for cross-functional work I've done during the Master's program. My primary professional focus is data analytics, but the audit experience demonstrates structured thinking about risk, systematic documentation, and translating technical findings into decision-ready recommendations — skills that transfer directly into analytics roles and especially into roles bridging analytics and information security.
