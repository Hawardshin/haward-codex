# 평가: 큰 범위 작업 미루지 않기

## 결과

사용자의 지속 지시를 durable instruction과 workflow에 반영했다. 기존 “넓은 범위를 회피하지 않는다” 규칙을 더 구체화해, 범위가 크다는 이유만으로 postpone/defer/hand back하지 않도록 했다.

## 변경 사항

- `AGENTS.md`: large-scope work는 첫 실행 slice, validation gate, continuation path를 만들어야 한다는 규칙 추가.
- `_docs/instructions/persistent-instructions.*.md`: 한국어/영어/공통 문서에 동일 원칙 추가.
- `_ops/workflows/76-large-scope-decomposition.md`: decomposition은 지연이 아니라 실행 준비이며, `first_executable_slice`를 산출하도록 갱신.

## 검증

- `python3 _tools/docs-audit/src/docs_audit.py --check` - 통과
- `git diff --check` - 통과

## 리스크

- 이 변경은 운영 규칙 문서 변경이며 앱 빌드 산출물에는 영향이 없다.
