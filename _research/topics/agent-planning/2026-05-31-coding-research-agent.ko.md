# 코딩 조사 에이전트 레퍼런스

## 목적

코딩 작업 전 조사를 단순 검색 결과가 아니라 구현 가능한 선택지, 위험, 검증 계획, 다음 행동으로 닫기 위한 참고 자료를 정리한다.

## 접근일

- 2026-05-31

## 확인한 출처

| 출처 | 유형 | 핵심 참고점 | 적용 |
| --- | --- | --- | --- |
| Thoughtworks Technology Radar FAQ: https://www.thoughtworks.com/en-us/radar/faq | 기술 평가 프레임워크 | 기술을 Techniques, Platforms, Tools, Languages/Frameworks로 나누고 Adopt, Trial, Assess, Caution ring으로 평가한다. | 코딩 조사에서 선택지를 바로 정답으로 확정하지 않고 채택 단계와 신뢰 수준을 구분한다. |
| ADR GitHub Organization: https://adr.github.io/ | 아키텍처 결정 기록 | ADR은 결정, 근거, trade-off, consequences를 남기는 decision log다. | 조사 완료 질문에 `why_this_option`, `alternatives_rejected`, `implementation_impact`를 포함했다. |
| GitHub Docs, Configuring issue templates: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository | 구조화된 입력 템플릿 | Issue forms는 필요한 정보를 구조화된 필드로 받도록 돕는다. | 코딩 조사 입력을 자유 메모가 아니라 `post_research_answers` 같은 schema로 강제했다. |
| GitHub Docs, Syntax for issue forms: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms | 구조화된 form schema | 입력 타입, validation, labels 등을 YAML로 정의한다. | `complete-coding-research` CLI도 필수 질문 누락을 gap으로 판정한다. |
| 내부 정책: `_docs/source-collection-policy.ko.md` | 저장소 정책 | 공식/논문/오픈소스/기술 블로그/커뮤니티/소셜/반대 사례를 폭넓게 수집한다. | 코딩 조사도 source bundle과 adoption signal을 분리한다. |
| 내부 정책: `_docs/search-insight-planning-policy.ko.md` | 저장소 정책 | 검색 결과를 계획에 영향을 주는 인사이트로 변환하고 계획 히스토리를 남긴다. | 코딩 조사도 `_history/plans/YYYY/`에 계획 과정을 저장한다. |

## 인사이트

- 기술 조사는 “찾았다”에서 끝나지 않고 선택지의 성숙도, 근거, 반대 신호, 적용 맥락을 분리해야 한다.
- ADR의 결정 기록 패턴은 코딩 조사 종료 질문에 잘 맞는다. 특히 선택 이유와 제외한 대안을 남기면 나중에 같은 조사를 반복하지 않는다.
- GitHub issue forms처럼 구조화된 필드와 validation을 두면 조사 완료 기준을 사람이 기억하지 않아도 된다.
- 내부 지식 베이스는 편리하지만 최신성과 정확성을 보장하지 않으므로 `knowledge-skeptic-agent` 결과를 함께 저장해야 한다.

## 적용 결과

- `coding-research-agent`는 `complete-coding-research` CLI로 구현했다.
- 표준 종료 질문 9개를 필수로 만들었다.
- 코딩 조사 보고서 템플릿을 한국어/영어로 추가했다.
- 운영 프롬프트와 워크플로를 `_ops/`에 연결했다.
