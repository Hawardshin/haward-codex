# Service Readiness 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-PDA-048 | 데스크톱 플랫폼은 internal/local build, customer test build, public service release를 구분하는 서비스 준비도 registry를 가져야 한다. | must | `service-readiness-registry.json`, config contract |
| REQ-PDA-049 | 서비스 준비도는 runtime data, customer payload, support diagnostics, workspace onboarding, privacy/logging, signed distribution, update/recovery를 그룹별로 평가해야 한다. | must | `check-service-readiness.mjs`, `get_service_readiness_report` |
| REQ-PDA-050 | public release blocker는 내부 개발 check를 막지 않되, 공개 서비스 readiness report와 UI에서 명확히 보여야 한다. | must | `service:readiness`, `service:readiness:public:report`, Desktop Service Readiness UI |
| REQ-PDA-051 | 설치형 앱은 운영자가 source repository를 읽지 않아도 서비스 score, blocker, warning, next action을 확인할 수 있어야 한다. | must | Workspace Monitor Desktop `Service Readiness` panel |
| REQ-PDA-052 | signed updater, Developer ID signing/notarization, clean-machine smoke가 없으면 public service release는 blocked로 남아야 한다. | must | service readiness public report |
| REQ-PDA-053 | workspace onboarding은 앱 내부 workspace host command와 UI로 import/clone/active workspace persistence를 제공해야 한다. | must | `get_desktop_workspace_state`, Workspace Host panel |
