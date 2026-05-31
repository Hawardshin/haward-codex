# 스택별 코딩 조사

## 요약

코딩 조사는 "공식 문서 확인"을 하나의 일반 항목으로 끝내면 안 된다. Java/Spring Boot, C, React, Next.js처럼 기술마다 권위 있는 1차 기준이 다르므로 기술 스택과 공식 문서/표준을 분리해 기록해야 한다. 또한 Stack Overflow, Reddit, GitHub Issues/Discussions 같은 토론은 반복 문제와 실무 edge case를 찾는 데 유용하지만, 사실 증명이 아니라 adoption/discovery/risk signal로만 써야 한다.

## 재사용 규칙

- `technology_stack`: 언어, 런타임, 프레임워크, 주요 라이브러리, 표준을 기록한다.
- `technology_official_docs`: 각 주요 기술에 맞는 공식 문서/표준 URL을 기록한다.
- `stack_version_constraints`: 현재/목표 버전, 표준, 호환성 범위, 모르는 값을 명시한다.
- `issue_discussion_sources`: Stack Overflow, Reddit, GitHub Issues/Discussions, project forum, 또는 관련 없음 검색 기록을 남긴다.
- `issue_discussion_notes`: high-vote/accepted answer, unresolved issue, 오래된 답변, 버전 차이, 반대 의견을 요약한다.
- `community_signal_notes`: 표/좋아요/반응/stars/댓글을 채택·발견·위험 신호로 해석한 방식을 기록한다.

## 참고 출처

- Spring Boot Reference Documentation: https://docs.spring.io/spring-boot/reference/index.html
- React docs: https://react.dev/learn
- Next.js docs: https://nextjs.org/docs
- ISO/IEC 9899:2024: https://www.iso.org/standard/82075.html
- Stack Overflow vote-up privilege: https://stackoverflow.com/help/privileges/vote-up
- GitHub Reactions API docs: https://docs.github.com/en/rest/reactions/reactions

## 적용 위치

- `agent-platform/src/agent_platform/planning/coding_research.py`
- `agent-platform/configs/research/coding-research-profile.json`
- `agent-platform/configs/planning/coding-research-template.json`
- `_ops/prompts/86-coding-research.md`
- `_ops/workflows/56-coding-research.md`
