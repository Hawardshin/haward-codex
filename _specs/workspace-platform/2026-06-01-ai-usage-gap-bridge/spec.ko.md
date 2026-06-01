# 스펙: AI 사용 격차와 간극 해소

## 요구사항

- `REQ-WS-042`

## 문제

AI를 잘 못 쓰는 사람은 목표/맥락/검증/반복/자산화가 약해 AI를 단발성 답변 도구로만 사용하기 쉽다. 플랫폼은 이 간극을 사용자의 개인 결함으로 보지 않고, 개선 가능한 작업 시스템 문제로 다뤄야 한다.

## 범위

- AI 사용 격차 진단 profile 추가
- 운영 모델, workflow, prompt, router, index 연결
- memory bootstrap anchor 등록
- 요구사항, 웹 검색 기록, 리서치 노트, 히스토리, 평가 기록

## 비범위

- 별도 UI나 교육 코스 구현
- 외부 AI training 플랫폼 설치
- 새 runtime adapter 추가

## 수용 기준

- `ai-usage-gap-profile.json`은 gap pattern, strong user behavior, bridge intervention, agent response contract를 포함한다.
- workflow/prompt가 현재 작업에서 gap classification과 intervention을 실행할 수 있게 한다.
- memory bootstrap과 운영 index에서 profile을 찾을 수 있다.
- 외부 사실 주장은 grounding record와 web search record에 연결된다.
