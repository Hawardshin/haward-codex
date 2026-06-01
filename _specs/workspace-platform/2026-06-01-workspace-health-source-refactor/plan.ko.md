# 계획: Workspace Health 소스 구조 리팩터링

## 작업 모드

- `standard`

## 근거

- 웹 검색 기록: `_history/web-searches/2026/2026-06-01-workspace-health-source-refactor.ko.md`
- 요구사항: `REQ-WS-034`
- 기존 관련 작업: `REQ-WS-032`, `REQ-WS-033`

## 언어/런타임 선택

| 옵션 | 장점 | 단점 | 판단 |
| --- | --- | --- | --- |
| Python 유지 | 기존 도구/테스트와 일치, 표준 라이브러리만으로 충분, 운영 CLI에 적합 | 대규모 CLI framework 기능은 제한적 | 선택 |
| Node/TypeScript 전환 | `workspace-monitor`와 런타임 일부 공유 가능 | 기존 Python 도구와 분리되고 migration 비용이 큼 | 제외 |

## 아키텍처 선택

| 옵션 | 설명 | 판단 |
| --- | --- | --- |
| 단일 스크립트 유지 | 변경량이 작지만 CLI, model, 실행, 출력 책임이 계속 섞임 | 제외 |
| package 내부 책임 분리 + legacy wrapper | 내부 구조는 명확해지고 기존 command는 유지 | 선택 |

## 폴더 구조 선택

| 옵션 | 설명 | 판단 |
| --- | --- | --- |
| `src/workspace_health.py`만 유지 | 단순하지만 커질수록 변경 충돌과 테스트 import가 불편함 | 제외 |
| `src/workspace_health/` package와 `src/workspace_health.py` wrapper 병행 | 유지보수성과 호환성 균형 | 선택 |

## 단계

1. 요구사항/스펙/웹 검색 기록을 저장한다.
2. 기존 단일 스크립트를 package module로 분리한다.
3. 테스트 import를 새 module 기준으로 바꾼다.
4. README에 소스 구조를 문서화한다.
5. 단위 테스트, legacy entrypoint, JSON/category, full health check를 검증한다.
6. 평가 기록을 저장하고 커밋/push한다.
