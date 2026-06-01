# 사용자 요청 요약 정책

## 목적

사용자가 요청한 다양한 프롬프트와 지시를 원문 전체가 아니라 의미 요약으로 저장해, 미래 작업자가 사용자 의도와 누적 운영 규칙을 문서만 보고 확인하게 한다.

## 원칙

- 요청 원문 전체를 기본 저장하지 않는다.
- 의미 요약, 의도 유형, 지속 규칙 여부, 반영 위치를 저장한다.
- 지속 지시는 `_docs/instructions/persistent-instructions.*`, `AGENTS.md`, 관련 운영 문서에도 반영한다.
- 요청 요약은 `_history/user-requests/YYYY/`에 날짜별로 저장한다.
- 의미 있는 작업을 닫을 때 평가 입력에 `user_request_summary_targets`를 포함한다.
- 오래된 요청 요약을 근거로 중요한 판단을 할 때는 `knowledge-skeptic-agent`로 현재성, 충돌, 누락을 확인한다.

## 요청 유형

- 플랫폼/저장소 운영 규칙
- 프로젝트 경계와 폴더 관리
- 조사/웹 검색/레퍼런스 수집
- 코딩/에이전트 구현 선호
- 문서화/히스토리/평가/아카이브
- 설치/오픈소스/검증/보안
- 현재 작업의 단일 요구사항

## 관련 파일

- [_history/user-requests/README.ko.md](../../_history/user-requests/README.ko.md)
- [_templates/user-request-summary/user-request-summary.ko.md](../../_templates/user-request-summary/user-request-summary.ko.md)
- [_docs/instructions/persistent-instructions.ko.md](persistent-instructions.ko.md)
- [_ops/workflows/40-evaluate-and-rework.md](../../_ops/workflows/40-evaluate-and-rework.md)
