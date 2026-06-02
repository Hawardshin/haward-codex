# Service Readiness Requirements

| ID | Requirement | Priority | Verification |
| --- | --- | --- | --- |
| REQ-PDA-048 | The desktop platform shall maintain a service-readiness registry that distinguishes internal/local builds, customer test builds, and public service releases. | must | `service-readiness-registry.json`, config contract |
| REQ-PDA-049 | Service readiness shall evaluate runtime data, customer payload, support diagnostics, workspace onboarding, privacy/logging, signed distribution, and update/recovery by group. | must | `check-service-readiness.mjs`, `get_service_readiness_report` |
| REQ-PDA-050 | Public release blockers shall not block internal development checks, but shall be visible in the public service readiness report and UI. | must | `service:readiness`, `service:readiness:public:report`, Desktop Service Readiness UI |
| REQ-PDA-051 | The installed app shall let operators inspect service score, blockers, warnings, and next actions without reading the source repository. | must | Workspace Monitor Desktop `Service Readiness` panel |
| REQ-PDA-052 | Missing signed updater, Developer ID signing/notarization, clean-machine smoke, or runtime-enforced workspace chooser shall keep public service release blocked. | must | service readiness public report |
