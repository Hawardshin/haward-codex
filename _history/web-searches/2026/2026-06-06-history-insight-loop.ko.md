# 웹 검색 기록: 히스토리 인사이트 루프

## 검색 시각

- 2026-06-06 KST

## 질의

- `lessons learned process after action review official guide continuous improvement`
- `decision records architecture knowledge management software engineering official docs`
- `retrospective action items continuous improvement product development official guide`
- `knowledge management lessons learned repository patterns software engineering research`

## 확인한 출처

- Google Cloud Architecture Decision Records: `https://docs.cloud.google.com/architecture/architecture-decision-records`
- AWS Prescriptive Guidance: Architectural Decision Records: `https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/welcome.html`
- SINTEF / Information and Software Technology software engineering knowledge management review: `https://www.sintef.no/en/publications/publication/501570/`
- Communications of the ACM, Knowledge Management with Patterns: `https://cacm.acm.org/research/knowledge-management-with-patterns/`
- USAID After-Action Review guidance: `https://usaidlearninglab.org/system/files/resource/files/afteractionreviewguidancemarch2013.pdf`

## 구현 영향

- ADR guidance는 decision history를 future decisions and deployments에 재사용하는 구조가 필요하다는 근거로 사용했다.
- Knowledge management literature는 explicit records뿐 아니라 tacit/repeated practice를 pattern화해야 한다는 방향을 뒷받침했다.
- AAR/retrospective guidance는 lessons learned가 다음 action plan으로 이어져야 한다는 근거로 사용했다.

## 약한 출처 처리

- Reddit/community signals는 discovery signal로만 보았고 구현 근거로 사용하지 않았다.
