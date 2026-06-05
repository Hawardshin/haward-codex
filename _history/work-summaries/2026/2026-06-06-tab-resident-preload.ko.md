# 작업 요약: 탭 상주 선마운트 최적화

Workspace Monitor의 주요 탭을 클릭할 때마다 새로 마운트하지 않도록 resident section 상태와 idle 선마운트 계획을 추가했다. 탭 pointerdown과 activation 시 대상 섹션을 즉시 resident로 표시하고, 이후 idle 시간에 나머지 visible section을 순차적으로 메모리에 올린다.

## 변경

- `MonitorShell.tsx`: `residentSectionIds`, `residentSectionMountPlan`, `shouldRenderSection` 추가
- `MonitorShell.tsx`: 주요 탭을 `MountedSectionPanel`로 래핑
- `MonitorShell.tsx`: desktop/source launch request와 active surface 동작을 활성 탭으로 제한
- `globals.css`: mounted section containment 추가
- `tool-studio.test.mjs`: resident preload contract 테스트 갱신

## 현재 검증

- workspace-monitor tests: 통과
- workspace-monitor check: 통과
- platform-desktop-app tests: 통과
- platform-desktop-app check: 통과
- 내부 패키징 `package:internal`: 통과, `.app`와 `.dmg` 생성 및 검증 완료
- in-app Browser 스모크: 로컬 서버 snapshot은 200 OK였지만 브라우저 화면은 `Loading workspace snapshot`에서 resident DOM까지 진행되지 않아 UI DOM 검증은 미완료
