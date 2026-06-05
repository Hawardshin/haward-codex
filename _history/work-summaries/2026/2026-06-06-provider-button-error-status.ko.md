# 작업 요약: Provider 버튼 오류 상태

- Provider 설정 액션의 오류/성공/정보 상태를 버튼 내부 badge로 표시하도록 변경했다.
- 저장/삭제/새로고침/공식 링크/모델 확인/작업 기본값 선택에 provider/action 단위 feedback을 연결했다.
- 문단형 오류/공지로 provider row 레이아웃이 밀리는 표시를 제거하고, hidden live region으로 접근성 알림을 유지했다.
- 버튼은 상태 badge 공간을 항상 예약해 오류 발생 시 위치와 크기가 바뀌지 않게 했다.
- Renderer/platform tests/check, Browser layout smoke, internal Tauri `.app`/`.dmg` package build를 통과했다.
