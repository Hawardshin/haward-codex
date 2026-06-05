# 요청-결과 추적: 큰 범위 작업 미루지 않기

## 요청

범위가 크다는 이유로 작업을 미루지 말라는 지속 지시.

## 결과

- `AGENTS.md`에 large-scope work가 첫 실행 slice, validation gate, continuation path를 만들어야 한다는 규칙을 추가했다.
- `_docs/instructions/persistent-instructions.*.md`에 동일한 지속 지시를 반영했다.
- `_ops/workflows/76-large-scope-decomposition.md`가 지연 수단이 아니라 실행 준비 workflow임을 명시했다.

## 검증

- docs audit 통과
- diff check 통과

## 상태

규칙 반영 완료. Commit/push 대기.
