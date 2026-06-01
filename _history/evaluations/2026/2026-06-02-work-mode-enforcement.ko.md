# 작업 평가: 작업 모드 강제화

## 결과

- 상태: `ready_to_close`
- 작업 모드: `governance`
- 설치 발생: 없음
- 스킬 작업 발생: 없음

## 초기 지시 대비 확인

- 사용자 지시: 모드를 단순 프롬프트로 시키면 자유도는 올라가지만 강제되지 않으므로, 설계를 탄탄하게 하려면 강제화해야 한다.
- 반영 결과: 작업 모드를 prompt-only preference가 아니라 registry, CLI check, mode selection record, evaluator gate, evaluation report로 강제되는 실행 계약으로 바꾸었다.
- 핵심 강제점: `standard`, `ship_first`, `research`, `governance`는 `mode_selection_record_targets`가 없으면 evaluator가 blocking gap을 반환한다.

## 확인한 근거

- Open Policy Agent 공식 문서
- JSON Schema specification
- Akka Guardrails 공식 문서
- Azure Prompt Shields 공식 문서
- 기존 `work-mode-registry.json`, `work_evaluator.py`, work mode workflows

## 검증

- JSON 문법 검증 통과
- `check-work-modes`: `ready`
- `python3 -m unittest discover -s tests`: 118개 테스트 통과
- `check-config-contract`: `self_documenting`
- `check-memory-bootstrap`: `ready_to_bootstrap`
- `docs-audit`: `docs_ready`
- `naming-audit`: `clean`
- `structure-audit`: `clean`; 기존 `presentation-agent` 생성물 분류 경고는 이번 변경의 차단 이슈가 아님
- `check-grounding`: `ready_to_publish`
- `evaluate-work`: `ready_to_close`
- `work_timer.py check`: `ready`이며 phase duration은 사후 기록이라 미측정 경고가 남음
- `git diff --check` 통과
- `npm run collect`는 루트에서 한 번 잘못 실행되어 실패했으나, `workspace-monitor/`에서 재실행해 통과

## 개선 후보

- workspace-monitor에서 mode selection record 존재 여부를 보여준다.
- governance rule 변경이 반복되면 요구사항/스펙/평가 scaffold generator를 만든다.
