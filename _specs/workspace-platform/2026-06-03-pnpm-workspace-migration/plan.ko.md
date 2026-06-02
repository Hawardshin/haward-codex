# 계획: pnpm workspace migration

1. 설치 감사 초안을 작성한다.
2. `pnpm@10.34.1`을 Corepack 기준으로 고정한다.
3. workspace config와 package manifests를 수정한다.
4. npm lockfile을 제거하고 루트 pnpm lockfile을 생성한다.
5. durable docs/configs의 현재 실행 명령을 pnpm으로 바꾼다.
6. pnpm 기반 검증을 실행한다.
7. 설치 감사, omission/evaluation, history summary를 갱신하고 commit/push한다.

