# Plan Record: Clear Tab Discrimination

## Work Mode

- selected_work_mode: `standard`
- view_mode: `superadmin_developer`
- 이유: 데스크톱 UI 품질 개선이며 테스트와 빌드 검증이 필요한 중간 범위 작업이다.

## Plan

1. 공식 탭/접근성 기준을 확인한다.
2. 현재 tab-like UI와 CSS 계약을 찾는다.
3. selected indicator token과 pseudo indicator를 추가한다.
4. settings/source tab ARIA 상태를 보강한다.
5. 정적 테스트와 브라우저 computed-style 검증을 실행한다.
6. 내부 패키지 빌드, 기록, commit/push를 완료한다.

## Omission Check

- user_request_covered: yes
- web_first_intake_recorded: yes
- requirement_spec_trace_recorded: yes
- implementation_completed: yes
- browser_verification_completed: yes
- package_build_completed: yes
- commit_push_required: pending at record creation
