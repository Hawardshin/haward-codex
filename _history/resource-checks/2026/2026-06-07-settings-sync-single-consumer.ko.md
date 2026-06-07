# 2026-06-07 리소스 점검: 설정 동기화 단일 소비자

- 리소스 리스크:
  - hidden resident desktop panel이 top-level settings/provider sync request를 소비한다.
  - source panel과 desktop panel이 같은 request를 중복 실행할 수 있는 위험.
- 제어:
  - `settingsSyncRequestConsumer={true}`는 desktop panel에만 부여.
  - source panel에는 `settingsSyncRequestConsumer={false}`를 명시.
  - polling/launch/update 활성 조건인 `surfaceActive`는 그대로 유지.
  - actual sync queue/timer cleanup은 `useSettingsRuntimeSync`가 계속 소유한다.
- 결과:
  - 새 long-running process, watcher, subscription을 만들지 않았다.

