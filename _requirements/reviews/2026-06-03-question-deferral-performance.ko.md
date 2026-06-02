# 요구사항 리뷰: 질문 보류 성능

## 검토

- 기존 `PDA-UX-021`의 자동 질문 보류 동작을 약화하지 않는다.
- bounded tail scan은 최신 질문 후보 중심으로 동작하며, output flood가 심한 경우 adapter별 fixture가 후속 보완 대상이다.
- poll overlap 방지는 느린 command에서 요청이 쌓이는 리스크를 줄인다.

## 승인 조건

- readiness/test/check/build/perf가 통과해야 한다.
- resource check는 timer와 stream lifecycle을 포함해야 한다.
- Rust toolchain 미설치는 제한으로 명시한다.
