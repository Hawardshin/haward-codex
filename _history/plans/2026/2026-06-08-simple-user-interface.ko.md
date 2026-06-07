# 계획 기록: 기본 사용자 인터페이스 단순화

## 소유 경계

- owning project: `platform-desktop-app/renderer/workspace-monitor`
- shared policy/config: `agent-platform/configs/access/view-mode-registry.json`, `_docs/policies/view-mode-policy.*`

## 언어/런타임 선택

- 옵션 A: 기존 Next.js/React renderer와 Python config validator를 유지한다.
- 옵션 B: Tauri/Rust 레벨에서 새 first-run shell을 만든다.
- 선택: 옵션 A. 사용자의 복잡도 문제는 기본 UI lens와 renderer entry surface 문제이므로 기존 renderer에서 해결하는 것이 유지보수와 검증에 가장 맞다.

## 아키텍처 선택

- 옵션 A: view mode registry가 기본 노출 범위를 제어하고, React shell이 단순 작업 시작 표면을 제공한다.
- 옵션 B: 고급 기능 컴포넌트를 삭제하거나 별도 앱으로 분리한다.
- 선택: 옵션 A. 고급 기능은 필요하지만 기본 사용자에게 전면 노출하지 않는 문제가 핵심이다.

## 폴더 구조 선택

- 옵션 A: 기존 Workspace Monitor 파일 안에서 진입 표면과 레일 정책을 좁게 수정하고 spec/history 기록을 추가한다.
- 옵션 B: 새 app route 또는 별도 project를 만든다.
- 선택: 옵션 A. 현재 monitor shell이 view mode, runtime launch, eval surface를 이미 소유한다.

## 스펙 조정

- 기존 view-mode selector spec의 기본값 항목은 `update_spec`.
- `view-mode-registry.json`, validator, tests는 `update_source`.
- 사용자에게 추가 확인이 필요한 보안/인가 변경은 이번 범위 밖으로 `defer`.
