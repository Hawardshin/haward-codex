# Timekeeper Agent Research Note

- Date: 2026-06-02
- Purpose: Capture evidence and design principles for an agent that calls out task time, deadlines, duration, timeboxes, and critical path.

## Main Conclusions

- Timekeeper is a schedule observability role, not merely a pressure role.
- A timebox does not mean "finish carelessly"; it creates focus, inspect/adapt, and decision cadence.
- Critical path and slack help identify work that can affect the finish date.
- "Hurry" should be translated into scope trimming, parallelization, ship-first sequencing, or deferred improvements instead of skipped verification.
- Timing records are operational observability for bottleneck candidates, not productivity scores.

## Reusable Rules

- At task start, identify or assume deadline, time budget, quality floor, and checkpoint cadence.
- Separate estimates from measured timing.
- Express schedule risk as `green`, `yellow`, or `red`.
- In `red`, propose minimum output, deferred items, notification, or human decision inbox routing.
- Urgency must not skip verification, security, data-loss prevention, resource, CLI, or installation gates.

## References

- Scrum Guide 2020: https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf
- Scrum.org Scrum Events: https://www.scrum.org/resources/introduction-scrum-events
- Microsoft Project Critical Path: https://support.microsoft.com/en-us/project/manage-your-project-s-critical-path
- Atlassian Project Schedule Guide: https://www.atlassian.com/agile/project-management/project-schedule/
- PMI Practice Standard for Scheduling: https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/practice-standard-scheduling.pdf
