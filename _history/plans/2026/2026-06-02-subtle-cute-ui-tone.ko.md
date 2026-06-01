# 계획: 은근히 귀여운 UI 톤 반영

## 작업 모드 선택

- 선택: `governance`
- 이유: 사용자의 UI 선호가 future platform UI 규칙으로 남아야 하며, 공통 요구사항, persistent instructions, 정책 문서, Workspace Monitor 구현을 함께 바꾼다.
- override: 없음
- enforcement check: web-first intake, memory bootstrap, requirements/spec, history, omission check, grounding, work evaluation을 포함한다.

## 작업 계획

1. 웹 검색으로 운영 UI에서 delight/motion/personality를 다루는 기준을 확인한다.
2. `REQ-WS-062`, `REQ-WM-014`와 UI tone policy를 추가한다.
3. Workspace Monitor CSS에 작은 accent, hover feedback, reduced-motion 대응을 추가한다.
4. 히스토리, 요청 추적, 작업 요약, 평가를 작성한다.
5. 테스트, build, docs/config 검증, evaluator를 실행한다.

## 충돌/병렬성

- 같은 UI 파일과 히스토리 파일을 만지므로 병렬 실행하지 않는다.
- 데이터 모델과 snapshot schema는 변경하지 않는다.
