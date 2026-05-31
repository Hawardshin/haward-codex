# 할루시네이션 방지 정책

## 목적

이 저장소의 에이전트는 근거 없는 확률적 추정을 최종 사실로 내보내지 않는다. 모든 중요한 답변, 문서, 계획, 평가에는 주장별 근거 확인, 불확실성 표시, 도구 검증, 사후 평가를 적용한다.

철학적 배경은 [_philosophy/agent-operating-philosophy.ko.md](../_philosophy/agent-operating-philosophy.ko.md)에 둔다. 이 문서는 그 철학을 실행 규칙으로 옮긴다.

## 기본 원칙

- 사실 주장과 의견, 추론, 계획, 사용자 선호를 구분한다.
- 사실 주장은 파일, 명령 출력, 테스트 결과, 공식 문서, 논문, 데이터, 웹 출처 같은 근거와 연결한다.
- 최신성에 민감한 내용은 확인 날짜를 남긴다.
- 근거가 약한 내용은 사실처럼 말하지 않고 `불확실`, `추정`, `확인 필요`로 표시한다.
- 출처가 서로 충돌하면 충돌을 해결하기 전까지 단정하지 않는다.
- 코드와 저장소 상태는 실제 파일 확인, 테스트, 명령 실행으로 검증한다.
- 모든 새 지시는 웹 검색을 먼저 수행하고, 외부 사실과 현재 정보는 원문과 확인 날짜를 남긴다.
- 고위험 판단은 독립 근거를 최소 2개 확인한다.
- 최종 산출물은 `hallucination-guard-agent`와 `work-evaluator-agent`를 통해 닫는다.

## 실행 순서

1. 요청에서 사실 주장 위험을 분류한다.
2. 현재 작업이 어느 프로젝트에 속하는지 확인한다.
3. 내부 지식 베이스를 근거로 쓸 때는 `knowledge-skeptic-agent`로 검증한다.
4. 외부 사실, 최신 정보, 여러 레퍼런스가 필요하면 `research-insight-planner-agent`와 `research-agent-profile.json`으로 검색 기반 계획을 만든다.
5. 산출물 초안에서 사실 주장을 추출한다.
6. 각 주장에 근거 ID, 출처 종류, 확인 날짜, 검증 단계를 붙인다.
7. citation은 증명 자체가 아니라 검증 핸들로 보고, 출처가 주장을 직접 지지하는지 확인한다.
8. `hallucination-guard-agent`로 `ready_to_publish`가 나오는지 확인한다.
9. `grounding_required`가 나오면 주장 삭제, 근거 보강, 도구 검증, 불확실성 표시 중 하나로 수정한다.
10. 완료 평가 파일에 grounding check 결과를 남긴다.

## 주장 유형별 요구 근거

| 주장 유형 | 요구 근거 |
| --- | --- |
| 저장소 상태 | 파일 경로, `git status`, `rg`, `find`, 인덱스 도구 결과 |
| 코드 동작 | 테스트 결과, 실행 결과, 관련 코드 경로 |
| 외부 사실 | 공식 문서, 논문, 웹 출처, 데이터셋, 확인 날짜 |
| 최신 정보 | 웹 검색 결과, 공식 최신 문서, 확인 날짜 |
| 계산/집계 | 입력 데이터, 계산식, 실행 결과 |
| 추천/판단 | 판단 기준, 비교 근거, 반대 신호 |
| 사용자 지시 | 사용자 메시지나 영속 규칙 문서 |

## 금지 규칙

- 확인하지 않은 파일, 테스트, 커밋, push 상태를 완료했다고 말하지 않는다.
- 출처가 없는 숫자, 날짜, 버전, 가격, 법/정책/스케줄을 단정하지 않는다.
- 내부 문서만 보고 외부 현재 사실까지 맞다고 가정하지 않는다.
- 검색 결과 제목만 보고 내용을 근거로 삼지 않는다.
- 근거가 약한 내용을 평가 보고서에서 `ready_to_close` 근거로 쓰지 않는다.

## 허용되는 불확실성 표현

- "현재 확인한 근거로는 ..."
- "이 부분은 확인하지 못했다."
- "출처가 오래되었을 수 있어 재확인이 필요하다."
- "상충하는 근거가 있어 단정하지 않는다."

## 관련 운영 파일

- [_ops/workflows/70-hallucination-prevention.md](../_ops/workflows/70-hallucination-prevention.md)
- [_ops/prompts/96-ground-output.md](../_ops/prompts/96-ground-output.md)
- [agent-platform/docs/hallucination-guard-agent.ko.md](../agent-platform/docs/hallucination-guard-agent.ko.md)
- [_research/topics/agent-reliability/2026-05-31-hallucination-prevention.ko.md](../_research/topics/agent-reliability/2026-05-31-hallucination-prevention.ko.md)
