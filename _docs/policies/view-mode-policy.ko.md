# View Mode 정책

## 목적

이 저장소는 사용자가 보는 화면, 개발자가 보는 화면, 저장소 소유자가 보는 슈퍼어드민 개발 화면을 분리한다.

- `view_mode`: UI와 운영 화면에서 무엇을 보여줄지 정한다.
- `install_mode`: 플랫폼을 사용하거나 개선하기 위한 설치 범위를 정한다.
- `work_mode`: 작업의 계획, 근거, 검증, 평가 강도를 정한다.

## 모드

### `user`

사용자 보기는 안정적인 프로젝트, 히스토리, 문서, 산출물 중심이다.

- 프로젝트와 작업 요약을 우선 보여준다.
- 요구사항, 내부 설정, governance 문서, 테스트/검증 세부사항은 기본적으로 숨기거나 접는다.
- public 배포 전에는 snapshot 생성 단계에서 민감 정보를 제거해야 한다.

### `developer`

개발자 보기는 프로젝트나 플랫폼 기능을 개선하는 사람을 위한 화면이다.

- 요구사항, 스펙, 테스트, 에이전트 인벤토리, 구현 문서를 보여준다.
- 슈퍼어드민 전용 공개/운영 override는 기본 작업면에서 분리한다.
- `work_mode` 평가 게이트는 그대로 유지한다.

### `superadmin_developer`

슈퍼어드민 개발 보기는 현재 기본값이다.

- 저장소 소유자가 플랫폼 자체를 만들고 있으므로 프로젝트, 히스토리, 요구사항, 스펙, 에이전트, 운영 설정, 공개 전 점검을 모두 볼 수 있어야 한다.
- 이 모드는 편의용 owner/operator lens이며, 실제 인증이나 권한 부여가 구현됐다는 뜻이 아니다.
- public 배포 전에는 반드시 snapshot redaction과 publication review를 먼저 수행한다.

## Source Of Truth

- view mode 레지스트리: `agent-platform/configs/access/view-mode-registry.json`
- CLI 검증:
  - `PYTHONPATH=src python3 -m agent_platform.cli check-view-modes configs/access/view-mode-registry.json`
  - `PYTHONPATH=src python3 -m agent_platform.cli list-view-modes configs/access/view-mode-registry.json`
  - `PYTHONPATH=src python3 -m agent_platform.cli show-view-mode configs/access/view-mode-registry.json superadmin_developer`
- 모니터 UI: `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- snapshot 생성기: `platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs`

## 보안 해석

- UI에서 감추는 것은 보안 경계가 아니다.
- private/public 전환이나 여러 사용자가 보는 배포에서는 클라이언트 필터가 아니라 snapshot 수집, 서버 라우팅, 인증/인가, 테스트에서 권한을 강제해야 한다.
- OWASP Authorization Cheat Sheet의 최소 권한, 기본 거부, 모든 요청 검증 원칙을 future access-control 설계의 기준으로 둔다.
- NIST RBAC는 역할/권한 모델의 출발점으로 쓰되, 필요하면 속성 기반 조건을 같이 검토한다.

## 규칙

- 화면이나 대시보드가 사용자/개발자/슈퍼어드민 관점을 나눠야 하면 `view_mode`를 선택한다.
- 설치, 실행, 배포, 개발 환경 준비는 `install_mode`를 선택한다.
- 작업 산출물과 평가 강도는 `work_mode`가 정한다.
- 현재 기본 보기 모드는 `superadmin_developer`다.
- public 배포용 사용자 보기 요구가 생기면 UI 필터만 추가하지 말고 collector-level publication filter를 먼저 설계한다.
