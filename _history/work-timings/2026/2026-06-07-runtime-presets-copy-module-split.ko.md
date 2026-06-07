# 작업 타이밍

- 날짜: 2026-06-07
- 범위: runtime presets and copy module split
- 단계별 기록:
  - 웹 우선 인테이크: 완료
  - 사용 위치 확인: 완료
  - 구현: 완료
  - 1차 TypeScript 및 관련 테스트: 완료
  - 전체 테스트/패키징: 완료
- 병목:
  - `DesktopRuntimePanel` 상태 소유가 크기 때문에 전체 컴포넌트 이동 전 하위 데이터/프리셋 모듈화를 먼저 진행했다.
