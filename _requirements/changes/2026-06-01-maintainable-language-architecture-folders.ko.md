# 유지보수 가능한 언어/아키텍처/폴더 결정 요구사항 변경

## 요청 요약

사용자는 구현 언어를 쉽게 선택할 수 있어야 하며, "베스트 아키텍처"가 이론과 실무자 의견에서 다를 수 있으므로 둘 다 참고해 아키텍처와 폴더 구조를 정해야 한다고 요청했다. 또한 폴더만 보아도 의미와 소유 경계를 이해할 수 있는 구조가 필요하다고 했다.

## 변경 요구사항

- `REQ-WS-022`를 공유 요구사항 baseline에 추가한다.
- 코딩 조사 완료 조건에 `language_options`, `selected_language`, `language_decision_notes`를 추가한다.
- 아키텍처 근거를 `architecture_theory_sources`와 `architecture_practitioner_sources`로 분리하고 `architecture_tradeoff_notes`를 요구한다.
- 폴더 구조 후보와 선택 근거, 폴더 의미, 유지보수 근거를 `folder_structure_options`, `folder_structure_decision_notes`, `folder_semantics_notes`, `maintainability_notes`로 기록한다.

## 근거

- Spring Boot, Next.js, PyPA, Go 문서는 각 생태계마다 공식 구조 관례가 다름을 보여준다.
- arc42, C4, SEI는 구조 설명과 검토 프레임을 제공한다.
- multivocal literature review 관점은 공식/학술 자료와 실무 grey literature를 함께 다루는 근거를 제공한다.
- Stack Overflow, Reddit, GitHub Discussions, Martin Fowler 같은 실무 신호는 반복 문제와 trade-off 발견에 유용하지만 단독 사실 증명으로 쓰면 안 된다.

## 영향

- `coding-research-agent` 구현 준비 조건이 강화된다.
- 코딩 리서치 템플릿과 프로필, 운영 프롬프트, 문서, persistent instructions를 함께 갱신한다.
