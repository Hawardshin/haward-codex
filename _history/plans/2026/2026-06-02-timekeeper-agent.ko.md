# 계획 기록: Timekeeper Agent

- 날짜: 2026-06-02
- 작업 모드: `governance`
- 요청: `타임키퍼 - 기업에서 매번 시간을 말하는 사람 빨리 해야한다 기간을 말하는 에이전트`
- 해석: 플랫폼에 시간/마감/기간/속도 압박을 관리하는 Timekeeper agent를 추가한다.

## 작업 모드 선택

- 선택: `governance`
- 이유: 새 reusable agent가 향후 작업의 시간 압박 처리 방식과 close-out 판단에 영향을 준다.
- 적용 게이트: web-first, requirements, spec, source provenance, plan evidence, timing, omission, grounding, evaluation, commit/push.

## 계획

1. 시간 관리와 project schedule 관련 외부 근거를 확인한다.
2. 기존 work-timer와 agent orchestration 구조를 확인한다.
3. `REQ-WS-064`를 추가한다.
4. `timekeeper-agent` spec과 한/영 문서를 만든다.
5. 스펙, source provenance, plan evidence, request trace, work summary, timing, evaluation을 남긴다.
6. agent inspection/list/orchestration, work-timer, docs/workspace/monitor 검증을 실행한다.
7. 평가 후 commit/push한다.

## 선택한 경계

- `agent-platform/` 소유: reusable platform agent이므로 central platform project에 둔다.
- `_tools/work-timer` 재사용: 새 timing runtime은 만들지 않는다.
- 실제 알림 발송은 하지 않는다.
