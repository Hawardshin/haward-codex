# 웹 검색 기록: 스택별 코딩 조사

## 목적

사용자가 Java/Spring Boot, C, React, Next.js 등 기술별 공식 문서와 high-signal Stack Overflow/Reddit/GitHub 토론을 코딩 조사에 반영하라고 지시했다. 코딩 조사 계약을 확장하기 전 공식 문서/표준과 커뮤니티 신호 해석 근거를 확인했다.

## 검색어

- `Spring Boot official documentation reference guide`
- `React official documentation learn react`
- `Next.js official documentation docs app router`
- `ISO C23 programming language standard official ISO`
- `Stack Overflow help why vote upvotes answers official`
- `Stack Overflow help accepted answer votes official`
- `GitHub Docs issue reactions discussions official`
- `Reddit developer discussions evidence signals software engineering research`

## 확인한 출처

| 출처 | 유형 | 접근일 | 사용 이유 |
| --- | --- | --- | --- |
| [Spring Boot Reference Documentation](https://docs.spring.io/spring-boot/reference/index.html) | official | 2026-05-31 | Spring Boot 구현/런타임 판단은 Spring 공식 reference를 우선 확인해야 함 |
| [React docs](https://react.dev/learn) | official | 2026-05-31 | React API와 권장 사용법은 React 공식 문서를 기준으로 확인 |
| [Next.js docs](https://nextjs.org/docs) | official | 2026-05-31 | Next.js routing/rendering/API 판단은 Next.js 공식 문서를 기준으로 확인 |
| [ISO/IEC 9899:2024](https://www.iso.org/standard/82075.html) | standard | 2026-05-31 | C 언어는 프레임워크 문서가 아니라 언어 표준을 핵심 기준으로 확인 |
| [Stack Overflow vote-up privilege](https://stackoverflow.com/help/privileges/vote-up) | community | 2026-05-31 | 표는 유용성/커뮤니티 신호로 해석하고 사실 증명으로 쓰지 않는 기준 |
| [GitHub Reactions API docs](https://docs.github.com/en/rest/reactions/reactions) | official | 2026-05-31 | 이슈/토론 반응은 engagement signal로 기록 가능하다는 구조 확인 |

## 제외하거나 약하게 본 출처

- 일반 SEO 블로그: 공식 문서나 표준을 대체하지 못해 seed로만 취급한다.
- 오래된 Q&A/Reddit 답변: 버전 맥락이 없으면 stale risk가 크다.
- 좋아요/표 수만 큰 글: adoption/discovery signal일 뿐 사실 증명이 아니다.

## 계획 반영

- `coding-research-agent`에 `technology_stack`, `technology_official_docs`, `stack_version_constraints`를 추가한다.
- known stack에 대해 공식 문서/표준 누락을 gap으로 잡는다.
- `issue_discussion_sources`, `issue_discussion_notes`, `community_signal_notes`를 추가한다.
- 이슈/토론 출처가 있으면 `source_types`에 `community` 또는 `social`을 명시하도록 한다.

## 불확실성

- 모든 기술의 공식 문서 URL을 완전하게 mapping하지는 않는다. 우선 Spring Boot, React, Next.js, ISO C, Java, JavaScript, TypeScript, Python, Node.js 등 반복 가능성이 높은 기술부터 처리한다.
- 커뮤니티 신호의 품질은 토론 날짜, 버전, 답변 상태, 유지보수 여부를 함께 확인해야 한다.
