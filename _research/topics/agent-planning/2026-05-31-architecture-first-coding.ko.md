# 아키텍처 우선 코딩 리서치 노트

## 요약

소스코드 작성은 구현 패턴 조사만으로 충분하지 않다. 구현 전에 적어도 두 개 이상의 아키텍처 후보를 비교하고, 선택한 구조가 현재 프로젝트 범위와 품질 속성에 맞는지 기록해야 한다.

## 핵심 레퍼런스

- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html): 품질 속성과 architecture review 질문
- [Azure Architecture Center](https://learn.microsoft.com/azure/architecture/): architecture styles, reference architectures, design patterns
- [Google Cloud Architecture Framework](https://cloud.google.com/architecture/framework): system design과 운영 품질 속성
- [arc42](https://arc42.org/): architecture documentation template
- [C4 model](https://c4model.info/): context/container/component/code view
- [SEI Views and Beyond](https://www.sei.cmu.edu/library/views-and-beyond-the-sei-approach-for-architecture-documentation/): view 기반 architecture documentation

## 저장소 반영

- `complete-coding-research`가 아키텍처 reference, option, decision note 누락을 gap으로 판정한다.
- `coding-research-profile.json`과 `source-registry.json`에 아키텍처 reference source를 추가했다.
- `_docs/architecture-first-coding-policy.ko.md`를 durable policy로 추가했다.

## 재사용 주의

벤더별 architecture framework는 특정 cloud 전제와 제품 구성이 섞여 있다. 다음 프로젝트에서는 그대로 복제하지 말고 프로젝트 범위, 운영 모델, 데이터 흐름, 보안/성능/테스트 요구에 맞춰 선택한다.

