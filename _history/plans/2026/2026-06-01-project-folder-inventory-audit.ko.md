# 프로젝트 폴더 인벤토리 감사 계획 기록

## 사용자 요청

전체 구조 개선 요청을 재점검하고, 폴더 구조나 관리 방식에 남은 모순이 있으면 개선한다.

## 작업 모드

- `governance`

## 참고 근거

- 웹 검색 기록: `_history/web-searches/2026/2026-06-01-structure-governance-audit.ko.md`
- 내부 정책: `_ops/projects/root-structure-policy.json`, `_docs/project-boundary-policy.ko.md`
- 기존 감사 결과: root structure는 clean이지만 project-internal top-level folder 설명 검증은 없었다.

## 계획

1. 기존 structure audit와 project registry를 확인한다.
2. 프로젝트별 top-level folder inventory를 감사 결과에 포함한다.
3. `project_specific_home`에 없는 durable folder를 warning으로 보고한다.
4. generated output pattern이 `.gitignore`에 없으면 gap으로 보고한다.
5. registry와 policy의 누락 항목을 보강한다.
6. 문서, 요구사항, 스펙, 히스토리, 평가를 갱신한다.
7. 검증 후 commit/push한다.

## 계획 변경

- 대규모 폴더 이동은 하지 않는다. 현재 문제는 물리적 배치보다 “설명과 검증 범위”의 누락이다.

