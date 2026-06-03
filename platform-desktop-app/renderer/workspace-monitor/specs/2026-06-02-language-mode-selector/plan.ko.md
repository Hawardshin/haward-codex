# 계획: Workspace Monitor Language Mode Selector

1. 공식 문서와 표준을 확인해 static export 환경에서는 route i18n보다 snapshot/data filter가 적합한지 판단한다.
2. `agent-platform/configs/access/language-mode-registry.json`을 self-documenting config로 추가한다.
3. snapshot collector가 `languageModeCatalog`를 읽어 생성 snapshot에 포함한다.
4. `WorkspaceSnapshot` 타입에 language mode 모델을 추가한다.
5. `MonitorShell`에 언어 selector를 넣고 문서/히스토리/metric 계산에 적용한다.
6. 요구사항과 README를 갱신한다.
7. collector 테스트, 타입 체크, build, 설정 계약 검증을 실행한다.
