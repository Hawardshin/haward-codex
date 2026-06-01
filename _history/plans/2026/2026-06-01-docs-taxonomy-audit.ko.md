# 문서 카테고리와 누락 방지 계획 기록

## 개요

- 날짜: 2026-06-01
- 관련 요청: `UR-2026-06-01-014`
- 관련 요구사항: `REQ-WS-031`
- 작업 모드: `standard`

## 계획 단계

1. 웹 검색으로 문서 taxonomy와 information architecture 근거를 확인한다.
2. `_docs/` 현재 파일을 지시, 정책, 운영 모델, 거버넌스로 분류한다.
3. category README와 `_docs/registry.json`을 만들어 사람이 구조를 바로 이해할 수 있게 한다.
4. `_tools/docs-audit/`로 root sprawl, category mismatch, 필수 문서 누락, 한영 companion 누락을 검사한다.
5. 운영 규칙과 memory bootstrap에 새 구조를 연결한다.
6. 요구사항, 스펙, 히스토리, 평가를 갱신한다.
7. 검증 후 커밋하고 push한다.

## 근거와 출처

- Diataxis: https://diataxis.fr/
- GitLab documentation topic types: https://docs.gitlab.com/development/documentation/topic_types/
- Google Developer Documentation Style Guide: https://developers.google.com/style/

## 변경 중 결정

- Diataxis의 4분류를 그대로 쓰지 않고, 이 저장소의 운영 문서 성격에 맞춰 `instructions`, `policies`, `operating-models`, `governance`로 결정했다.
- `registry.json`을 단순 목록이 아니라 self-documenting config로 만들어 다음 에이전트가 파일 하나만 열어도 구조와 검증 명령을 알 수 있게 했다.
- docs-audit는 warning보다 gap을 우선해 실제 누락을 빠르게 발견하도록 만들었다.
