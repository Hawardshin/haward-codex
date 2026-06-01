# Source Provenance: Timekeeper Agent

| Value/decision | Source | Source type | Application |
| --- | --- | --- | --- |
| Timeboxes help focus and plan adaptation | https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf | official Scrum Guide | Added timebox and checkpoint fields to Timekeeper output |
| Timeboxes are focus/cadence devices and can end early when their purpose is met | https://www.scrum.org/resources/introduction-scrum-events | Scrum.org material | Defined Timekeeper as a focus/cadence role, not just pressure |
| Critical path and slack matter for finish-date risk | https://support.microsoft.com/en-us/project/manage-your-project-s-critical-path | Microsoft official docs | Added critical path, slack, and schedule risk to the agent output contract |
| Schedules include task definition, sequencing, timelines, and dependencies | https://www.atlassian.com/agile/project-management/project-schedule/ | Atlassian material | Added dependency and timeline view to the Timekeeper brief |
| Scheduling practice includes schedule models and resource planning | https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/practice-standard-scheduling.pdf | PMI material | Used for deadline, duration, and resource/scope trade-off rationale |
| The workspace already manages phase timing through `_tools/work-timer` | `_tools/work-timer/configs/work-timing-policy.json` | internal config | Reused work-timer instead of creating a duplicate timing tool |
