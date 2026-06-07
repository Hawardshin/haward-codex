# 구현 계획: 소스 워크벤치 패널 분리

1. `MonitorShell.tsx`에 남은 소스 워크벤치 표시 JSX와 Monaco dynamic component를 새 패널 컴포넌트로 이동한다.
2. 기존 hook/controller가 소유한 상태 변경, 파일 로드, 저장, command 실행 경계는 유지한다.
3. 구조 테스트와 readiness source registry가 새 패널 파일을 읽도록 업데이트한다.
4. `workspace-monitor` check/test와 desktop package run으로 회귀를 검증한다.

