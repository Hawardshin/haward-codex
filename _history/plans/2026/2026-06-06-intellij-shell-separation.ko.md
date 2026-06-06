# Plan Record: IntelliJ Shell Separation

## Work Mode

- selected_work_mode: `standard`
- view_mode: `superadmin_developer`
- 이유: 데스크톱 UI 구조 변경이지만 새로운 governance/policy 변경은 아니며, 구현과 검증이 필요한 중간 범위 작업이다.

## Plan

1. JetBrains 공식 UI 문서를 확인한다.
2. 요구사항과 스펙을 기록한다.
3. shell에 IntelliJ-style layout/zone attribute를 추가한다.
4. CSS에서 tool-window stripe와 editor plane의 경계를 강화한다.
5. 회귀 방지 테스트를 추가한다.
6. 브라우저 computed-style 검증과 build/package 검증을 실행한다.

## Omission Check

- user_request_covered: yes
- web_first_intake_recorded: yes
- requirement_spec_trace_recorded: yes
- implementation_completed: yes
- tests_completed: yes
- package_build_completed: yes
- commit_push_required: pending at record creation
