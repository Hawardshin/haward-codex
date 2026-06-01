# 계획 기록: Workspace Monitor

## 요청

- 현재 저장소 기반으로 히스토리, Markdown 문서, 프로젝트, 에이전트 상태를 시각화하는 모니터링 사이트를 만든다.
- Next.js로 구현하고 나중에 repository를 public으로 전환하면 Vercel에 배포할 수 있어야 한다.

## 작업 모드

- `standard`
- 이유: 새 root project 구현이며, 요구사항/스펙/설치/검증/히스토리 산출물이 필요하지만 공통 운영 규칙 자체를 바꾸는 작업은 아니다.

## 프로젝트 경계

- 새 프로젝트: `workspace-monitor/`
- 소유 범위: Next.js UI, snapshot generator, generated data, Vercel docs, monitor-specific requirements/specs/tests.
- 공유 원천: `_history/`, `_ops/`, `_requirements/`, `_specs/`, 기존 프로젝트 docs/specs.

## 결정

- App Router + static export를 사용한다.
- `scripts/collect-workspace.mjs`가 repository 문서를 읽어 JSON snapshot을 만든다.
- UI는 `src/generated/workspace-snapshot.json`만 import한다.
- Markdown preview는 escaping 기반 제한 renderer로 만든다.
- public 배포 전 snapshot 검토 절차를 문서화한다.

