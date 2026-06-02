# 웹 검색 기록: 앱형 Command Controls

## 질의

- `official design system command palette dashboard navigation quick actions application UX guidelines`
- `application navigation command palette quick actions design system guidelines`
- `dashboard UX best practices filters search saved views command palette official design system`

## 확인한 출처

- Grafana documentation, Search and Command palette: https://grafana.com/docs/grafana/latest/administration/search/
- Basis Design System, Saved Views: https://design.basis.com/patterns/saved-views
- UAE Design System, Actions and input: https://designsystem.gov.ae/guidelines/actions
- Red Hat Design System, Navigation primary: https://ux.redhat.com/elements/navigation-primary/

## 판단 요약

- 복잡한 실제 앱은 단순 탭보다 command palette, quick action, saved/persisted controls, filter controls로 반복 이동을 줄인다.
- command palette는 섹션 이동뿐 아니라 주요 action 실행까지 묶을 때 효과가 크다.
- 저장형 quick controls는 복잡한 화면에서 유용하지만, 이번 slice에서는 서버 저장소 없이 브라우저 localStorage pinned sections로 제한한다.

## 계획 영향

- Workspace Monitor에 `app-control-bar`, `command-palette`, pinned sections, recent sections를 추가했다.
- command palette는 section, view mode, language mode, document filter, quick action을 실행하게 했다.
- 새 dependency 설치는 하지 않고 React state와 localStorage만 사용했다.
