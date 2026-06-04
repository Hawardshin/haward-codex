# 2026-06-05 Bug Hunt Request

## Summary

사용자는 버그 찾기를 요청했다.

## Interpreted Requirement

- 넓은 전수 탐색 대신 최근 변경된 desktop install/build, doctor, customer bundle, Workspace Monitor build 경계를 우선 검사한다.
- 테스트가 통과해도 실제 build/order에 따라 깨지는 버그를 찾는다.
- 발견한 버그는 재현 가능한 상태로 고정하고 수정한다.
- 기존 generated snapshot 산출물은 커밋에 섞지 않는다.
