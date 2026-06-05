# 추적: 구조/메모리/성능 마이그레이션

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| 구조 냉정 평가 | 요구사항/스펙에 대형 파일과 state boundary 리스크 기록 | history/evaluation |
| source snapshot 메모리 절감 | `content` 제거, `preview`/`previewBytes` 추가 | collector test, payload check |
| payload 회귀 방지 | `check-performance-budget.mjs`에 content 금지와 preview budget 추가 | package build perf gate |
| 코드 편집 렉 감소 | Monaco onChange throttled sync, latest editor buffer save/copy | tool-studio test, tsc |
| 빌드 자동화 | internal package build 실행 | validation record |

## 연결

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-structure-performance-migration.ko.md`
- 웹 검색: `_history/web-searches/2026/2026-06-06-structure-performance-migration.ko.md`
- 평가: `_history/evaluations/2026/2026-06-06-structure-performance-migration.ko.md`
