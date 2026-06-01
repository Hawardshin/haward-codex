# Web Search Record: Timekeeper Agent

- Date: 2026-06-02
- Work mode: `governance`
- Request summary: Add an agent that acts like a corporate timekeeper, calling out time, duration, deadlines, and the need to hurry.

## Queries

- `Scrum Guide timebox sprint daily scrum official timebox`
- `PMI project schedule management official schedule planning`
- `Atlassian project timeline timeboxing project management guide`
- `Microsoft Project project schedule critical path official documentation`
- `The Scrum Guide 2020 official timebox Daily Scrum 15 minutes Sprint Planning timebox`

## Checked Sources

| Source | Type | What was checked | Application |
| --- | --- | --- | --- |
| https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf | official Scrum Guide | Scrum events use timeboxes and plan adaptation | Added timebox and checkpoint behavior |
| https://www.scrum.org/resources/introduction-scrum-events | official Scrum.org/training material | Scrum events use time constraints to create focus | Documented timebox as focus/inspect/adapt, not pure pressure |
| https://support.microsoft.com/en-us/project/manage-your-project-s-critical-path | Microsoft official docs | Critical path and slack affect project finish dates | Added critical path, slack, and schedule risk to the output contract |
| https://www.atlassian.com/agile/project-management/project-schedule/ | Atlassian project-management material | Schedules depend on defined work, sequencing, timelines, and dependencies | Added dependency and timeline view to the schedule brief |
| https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/practice-standard-scheduling.pdf | PMI scheduling standard PDF | Schedule planning, resource planning, and schedule models matter | Added schedule baseline and duration/resource trade-off source lane |

## Weak Source Handling

- Reddit/community posts can show how teams interpret timeboxes in practice, but they are not official evidence for the agent contract.
- Wikipedia was not used as requirement evidence.

## Plan Impact

- Timekeeper is defined as an operations agent that exposes deadlines, timeboxes, critical path, slack, and schedule risk, not as a simple nagging agent.
- "Hurry" is translated into scope, sequence, parallelization, or deferred-improvement trade-offs instead of skipped verification.
- The existing `_tools/work-timer` and coordination board are reused instead of introducing a duplicate timing tool.

## Uncertainty

- The desired reminder cadence, deadline phrasing, and notification channel are not yet specified.
- Real notification delivery should be handled later after notification tokens/webhooks are configured.
