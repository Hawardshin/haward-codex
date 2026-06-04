# 누락/리소스 점검: 핵심 기능 우선순위

## 누락 방지

- 사용자 요구: Agent Core와 CLI Orchestration을 두 핵심 기능으로 강조.
- 반영: Home, product feature registry, product feature panel, readiness checks에서 두 primary feature를 명시.
- 사용자 요구: 루트 툴은 task-specific agent/CLI와 별도 공유 layer로 관리.
- 반영: Root Tool Management supporting feature, root tool setup panel, settings setup grid 추가.
- 사용자 요구: 작업량과 잊기 쉬운 의사결정을 한눈에 표시.
- 반영: Work Visibility supporting feature와 Home workload strip 추가.
- 사용자 요구: 비핵심 기능은 숨기고 setup은 직관적으로 표시.
- 반영: user view navigation 축소, Operator Center 유지, core setup steps 추가.

## 리소스 점검

- 새 long-running background process, interval, subscription, stream은 추가하지 않았다.
- dev server와 Browser smoke는 검증용이며 최종 응답 전에 상태를 확인한다.
- CLI orchestration backend나 external provider 호출 로직은 새로 추가하지 않았다.
- generated snapshots는 developer/customer 모드를 구분해 재생성했다.

## 남은 리스크

- 실제 native Tauri app에서 provider/CLI adapter 설정 완료 여부는 사용자의 로컬 환경에 따른다.
- public release는 signing, notarization, updater, clean-machine smoke가 여전히 외부 gate다.

