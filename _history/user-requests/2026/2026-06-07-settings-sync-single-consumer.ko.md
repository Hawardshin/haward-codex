# 2026-06-07 사용자 요청 요약: 일관된 동작

- 요청: “일관된 동작 하도록 도와줘.”
- 해석:
  - 설정/provider/source/workspace 동기화가 화면 위치나 호출 지점에 따라 다르게 동작하지 않아야 한다.
  - 앞서 분리한 공통 훅이 실제 요청 소비에서도 일관되게 쓰여야 한다.
- 처리 범위:
  - `runtimeSettingsSyncRequest` 소비를 `surfaceActive`에서 분리.
  - top-level settings/provider request는 desktop runtime panel이 단일 소비자로 처리.
  - source panel은 top-level request를 소비하지 않고, source 내부 save/workspace 동기화는 기존 local queue를 유지.

