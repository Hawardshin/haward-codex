# 작업 요약: 섹션 딥링크 UX

섹션 주소가 사용자 작업 위치를 안정적으로 복구하도록 워크스페이스 모니터를 수정했다. `?section=history` 또는 `#section-history`로 열린 화면은 클릭 없이 해당 섹션을 활성화하고, 필요하면 섹션을 볼 수 있는 view mode로 전환한다.

섹션 이동 후에는 URL query와 hash를 같은 섹션으로 동기화한다. Playwright smoke로 히스토리 직접 진입과 소스 섹션 이동을 확인했다.
