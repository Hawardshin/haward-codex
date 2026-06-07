# 2026-06-07 사용자 요청 요약

- 사용자가 `pnpm run desktop:package:run:internal` 실행 중 `MonitorShell.tsx`의 `refreshProviderCredentials` 미선언 오류로 패키징이 실패한다고 보고함.
- 요청 범위:
  - 깨진 구현을 고칠 것.
  - 너무 큰 소스 파일을 적절히 분리할 것.
  - Rust와 TypeScript 양쪽을 모두 확인할 것.
- 원문 전체는 저장하지 않고, 작업 추적에 필요한 요약만 남김.

