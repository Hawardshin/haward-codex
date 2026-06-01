# 계획 기록: Infrastructure Expert Agent

- 날짜: 2026-06-02
- 작업 모드: `governance`
- 요청: `인프라 전문가`
- 해석: 플랫폼에 인프라 전문가 역할을 재사용 agent spec으로 추가한다.

## 작업 모드 선택

- 선택: `governance`
- 이유: 새 reusable agent와 운영 안전 계약을 추가하므로 플랫폼 동작과 향후 작업 방식에 영향을 준다.
- 적용 게이트: web-first, requirements, spec, source provenance, plan evidence, omission, grounding, evaluation, commit/push.

## 계획

1. 공식 인프라/SRE 관련 출처를 확인한다.
2. 기존 agent orchestration registry와 agent spec 형식을 확인한다.
3. 요구사항 `REQ-WS-063`을 추가한다.
4. `infrastructure-expert-agent` spec과 한/영 문서를 추가한다.
5. 스펙, source provenance, plan evidence, request trace, work summary, timing, evaluation을 남긴다.
6. agent inspection/list/orchestration, docs/workspace/monitor 검증을 실행한다.
7. 평가 후 commit/push한다.

## 선택한 경계

- `agent-platform/` 소유: reusable platform agent이므로 central platform project에 둔다.
- 새 root project는 만들지 않는다. 실제 특정 cloud/provider 프로젝트가 생기면 별도 project folder에서 다룬다.
- 실제 인프라 실행/설치/provisioning은 하지 않는다.
