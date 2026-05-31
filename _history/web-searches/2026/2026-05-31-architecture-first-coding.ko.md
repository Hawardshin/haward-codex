# 2026-05-31 웹 검색 기록: 아키텍처 우선 코딩

## 검색 목적

사용자가 소스코드 작성 시 당연히 best architecture를 찾아야 한다고 지시했다. 코딩 리서치와 구현 전 readiness check에 아키텍처 후보 비교를 필수화하기 위한 근거를 확인했다.

## 검색어

- `software architecture best practices official architecture framework source code design modularity`
- `Microsoft Azure Architecture Center software architecture best practices modular design`
- `Google Cloud architecture framework system design best practices`
- `AWS Well-Architected Framework software architecture best practices`
- `Thoughtworks architecture decision records source code architecture decisions best practices`
- `arc42 software architecture documentation template official`
- `C4 model software architecture source code documentation official`
- `SEI software architecture documentation views and beyond source code architecture`

## 사용한 출처

| 출처 | 유형 | 확인일 | 반영 |
| --- | --- | --- | --- |
| [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html) | 공식 문서 | 2026-05-31 | 품질 속성과 trade-off 질문을 아키텍처 검토 기준으로 반영 |
| [Azure Architecture Center](https://learn.microsoft.com/azure/architecture/) | 공식 문서 | 2026-05-31 | architecture styles, reference architectures, design patterns를 source registry에 추가 |
| [Google Cloud Architecture Framework](https://cloud.google.com/architecture/framework) | 공식 문서 | 2026-05-31 | system design 원칙과 품질 속성 검토 출처로 추가 |
| [arc42](https://arc42.org/) | 오픈소스/표준형 템플릿 | 2026-05-31 | architecture documentation과 decision structure 기준으로 반영 |
| [C4 model](https://c4model.info/) | 표준형 모델 | 2026-05-31 | system/container/component/code view를 아키텍처 설명 후보로 반영 |
| [SEI Views and Beyond](https://www.sei.cmu.edu/library/views-and-beyond-the-sei-approach-for-architecture-documentation/) | 공식/연구기관 자료 | 2026-05-31 | stakeholder concern과 view 기반 문서화 기준으로 반영 |

## 제외한 약한 출처

- 일반 블로그와 Reddit 논의는 실무 신호로만 봤고, 규칙 근거는 공식 문서와 잘 알려진 아키텍처 문서화 프레임워크를 우선했다.
- 벤더별 cloud framework는 그대로 복제하지 않고 품질 속성과 질문 프레임만 일반화했다.

## 계획 반영 인사이트

- 코딩 리서치는 코드 예시뿐 아니라 아키텍처 후보와 선택 근거를 남겨야 한다.
- `complete-coding-research`가 `architecture_reference_sources`, `architecture_options`, `architecture_decision_notes`를 검증해야 한다.
- source registry와 coding research profile에는 재사용 가능한 아키텍처 reference source를 넣어야 한다.

## 공개 판단 요약

이번 작업은 아키텍처 우선 코딩 정책, coding-research-agent 필드, readiness checker, 템플릿, 요구사항/스펙/히스토리를 갱신한다.

