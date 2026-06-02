# 요구사항 변경: 민감 파일 경계와 최상위 폴더 논리 계층

## 요청 요약

사용자는 민감 파일을 플랫폼 안의 한곳으로 모아 처리하되 AI가 직접 보지 않게 하는 규칙이 보이지 않는다고 지적했다. 또한 최상위 폴더가 많아 운영성 폴더와 프로젝트성 폴더의 추상화가 부족하다고 지적했다.

## 변경 요구사항

- `REQ-WS-074`를 추가한다.
- 실제 민감 파일은 `_private/sensitive/` 또는 외부 secret manager에 둔다.
- AI 에이전트는 `_private/` 내부를 기본적으로 직접 읽거나 색인하지 않는다.
- map, monitor snapshot, source collector, installer, public artifact는 `_private/` 내용과 raw secret을 포함하지 않는다.
- 최상위 폴더는 물리 목록이 아니라 논리 계층으로 설명한다.

## 근거

- OWASP는 secret storage, provisioning, audit, rotation, access control 중앙화를 권고한다.
- OWASP DevSecOps는 secret이 repository history에 들어가기 전에 차단해야 한다고 설명한다.
- GitHub는 secret scanning과 push protection을 leak prevention 수단으로 제공한다.
- 1Password는 secret reference와 `op run`처럼 평문을 저장소에 남기지 않는 흐름을 제공한다.
- Nx 문서는 monorepo 폴더 구조를 계획하고 scope별로 그룹화하는 접근을 설명한다.
