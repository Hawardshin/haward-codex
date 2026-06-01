# 계획: Workspace Monitor View Mode Selector

1. snapshot collector가 `agent-platform/configs/access/view-mode-registry.json`을 읽는다.
2. snapshot 타입에 `viewModeCatalog`를 추가한다.
3. `MonitorShell` 상단에 segmented selector를 추가한다.
4. 선택된 모드의 `allowedSections`로 탭을 필터링한다.
5. 사용자 모드에서는 내부 config/spec/evaluation 문서를 기본적으로 숨긴다.
6. CSS를 반응형으로 맞춘다.
7. `npm run collect`, `npm test`, `npm run check`, `npm run build`로 검증한다.
