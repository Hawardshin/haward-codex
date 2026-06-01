# 계획: 도구 독립 AI assistant 운영 원칙

## 작업 모드

- `governance`

## 근거

- 사용자 요청은 앞으로 어떤 assistant 도구를 사용해도 유지될 durable operating principle을 요구한다.
- 웹 검색에서 Claude Code, Cursor, Antigravity가 서로 다른 project instruction/rule 파일을 사용한다는 점을 확인했다.
- 기존 repository rules는 Codex 중심이지만 운영 원칙 자체는 도구 독립적으로 유지되어야 한다.

## 단계

1. 도구별 공식 문서와 공개 instruction format을 조사한다.
2. 공통 원칙 문서와 runtime adapter registry를 추가한다.
3. Claude Code, Cursor, Antigravity adapter 파일을 추가하고 기존 `AGENTS.md`와 README를 갱신한다.
4. root structure policy와 `structure-audit`가 runtime adapter root를 분류하게 한다.
5. memory bootstrap, persistent instruction, project boundary, repository governance 문서를 갱신한다.
6. workspace monitor snapshot source에 adapter와 template 문서를 추가한다.
7. 요구사항, 스펙, 히스토리, 웹 검색 기록, 평가를 남기고 검증을 실행한다.
