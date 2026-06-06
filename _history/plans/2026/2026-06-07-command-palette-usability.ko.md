# Work Plan: Command Palette Usability

날짜: 2026-06-07

## 목표

명령 팔레트가 검색 실패 시 막히지 않고 핵심 기능으로 복구되도록 만든다.

## 실행 계획

1. web-first intake로 접근성/검색 UX 근거 확인.
2. local source에서 command palette 구조 확인.
3. 기존 command item id를 재사용해 추천 명령을 구현.
4. 빈 결과 상태와 live result status를 추가.
5. 구조 테스트, renderer check/test, build, Browser smoke로 검증.
6. omission/resource/evaluation 기록 후 commit/push.

## 범위 제한

새 CLI 설치, native command 추가, 검색 랭킹 엔진 교체는 하지 않는다.
