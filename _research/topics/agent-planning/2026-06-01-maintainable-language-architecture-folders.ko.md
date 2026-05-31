# 유지보수 가능한 언어/아키텍처/폴더 결정

## 요약

코딩 조사에서 "좋은 구조"를 판단할 때 언어/런타임, 공식 구조 관례, 아키텍처 이론, 실무자 의견, 폴더 의미를 분리해 기록해야 한다. 이론상 좋은 아키텍처와 실무에서 유지보수하기 좋은 구조는 다를 수 있으므로, 차이를 명시하고 로컬 검증 계획으로 연결한다.

## 재사용 규칙

- 언어/런타임 후보는 최소 두 개를 비교한다.
- 공식 문서는 생태계별로 확인한다. Spring Boot, Next.js, Python packaging, Go module은 서로 다른 구조 관례를 가진다.
- `architecture_theory_sources`에는 C4, arc42, SEI, cloud architecture framework, 논문/표준을 둔다.
- `architecture_practitioner_sources`에는 실무자 블로그, Stack Overflow, Reddit, GitHub Discussions, 이슈 토론을 둔다.
- 폴더 구조는 최소 두 후보를 비교하고 폴더 이름의 의미, 책임, 넣을 파일, 테스트 위치를 기록한다.

## 참고 출처

- Spring Boot structuring code: https://docs.spring.io/spring-boot/reference/using/structuring-your-code.html
- Next.js project structure: https://nextjs.org/docs/app/getting-started/project-structure
- PyPA src layout: https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/
- Go module layout: https://go.dev/doc/modules/layout
- arc42: https://arc42.org/
- C4 model: https://c4model.info/
- SEI Views and Beyond: https://www.sei.cmu.edu/library/views-and-beyond-the-sei-approach-for-architecture-documentation/
- Multivocal literature review guideline: https://doi.org/10.1016/j.infsof.2018.09.006

## 주의

커뮤니티 반응과 실무자 의견은 반복 문제와 friction을 찾는 데 좋지만 사실 증명은 아니다. 공식 문서, 표준, 논문, 유지보수되는 오픈소스와 교차 확인한다.
