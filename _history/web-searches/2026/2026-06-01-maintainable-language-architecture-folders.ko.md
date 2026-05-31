# 웹 검색 기록: 유지보수 가능한 언어/아키텍처/폴더 결정

## 검색 일시

- 날짜: 2026-06-01
- 목적: 코딩 조사에서 언어 선택, 아키텍처 이론/실무 의견 비교, 폴더 구조 의미 기록을 강화하기 위한 근거 확인

## 검색 쿼리

- `Spring Boot reference documentation structuring your code package organization docs.spring.io`
- `Next.js project structure official docs app getting started`
- `PyPA src layout vs flat layout official packaging guide`
- `Go documentation organizing a Go module packages official`
- `arc42 architecture documentation official template building blocks`
- `C4 model official software architecture diagrams containers components code`
- `SEI views and beyond software architecture documentation official`
- `multivocal literature review software engineering practitioner grey literature guidelines`

## 확인한 주요 출처

| 출처 | 유형 | 사용 이유 |
| --- | --- | --- |
| https://docs.spring.io/spring-boot/reference/using/structuring-your-code.html | official | Spring Boot 패키지/컴포넌트 스캔 경계 참고 |
| https://nextjs.org/docs/app/getting-started/project-structure | official | Next.js 파일 시스템 구조와 colocated/private folders 참고 |
| https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/ | official | Python `src` layout과 flat layout trade-off 참고 |
| https://go.dev/doc/modules/layout | official | Go module/package 구조 참고 |
| https://arc42.org/ | standard/reference | 아키텍처 문서화 구조 참고 |
| https://c4model.info/ | standard/reference | 시스템/컨테이너/컴포넌트/code view 참고 |
| https://www.sei.cmu.edu/library/views-and-beyond-the-sei-approach-for-architecture-documentation/ | official | view 기반 architecture documentation 참고 |
| https://doi.org/10.1016/j.infsof.2018.09.006 | paper | formal literature와 practitioner grey literature를 함께 다루는 근거 |
| https://martinfowler.com/architecture/ | tech_blog | 실무자 관점의 architecture trade-off 탐색 seed |
| https://stackoverflow.com/questions/tagged/software-architecture | community | recurring practitioner questions와 vote/accepted answer 신호 seed |

## 약한 출처 처리

- 커뮤니티/소셜 신호는 채택/발견/위험 신호로만 사용하고 사실 증명으로 사용하지 않는다.
- 공식 문서도 특정 생태계 관례이므로 다른 언어나 프로젝트 구조에 그대로 일반화하지 않는다.

## 계획 영향

- `coding-research-agent`에 언어 선택, 이론/실무 아키텍처 근거, 폴더 구조와 폴더 의미 필드를 추가한다.
- `coding-research-profile.json`에 언어별 구조 문서와 practitioner source seed를 reference link로 추가한다.
- 문서와 프롬프트가 이 필드를 다음 구현 작업에서 요구하도록 갱신한다.

## 불확실성

- 각 기술 문서 URL은 2026-06-01 기준으로 확인했다. 미래에는 구조 문서 위치나 버전별 권고가 바뀔 수 있다.
