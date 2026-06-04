# 2026-06-05 Desktop Pipeline Structure Request

## Summary

사용자는 설치/빌드 개선에 이어 구조 변경도 허용했다.

## Interpreted Requirement

- build pipeline code가 한 파일에 모두 섞여 있지 않게 한다.
- 경로, 단계 정의, 실행 로직을 분리해 다음 변경 비용을 낮춘다.
- 기존 command behavior와 customer bundle audit/public release gate는 유지한다.
