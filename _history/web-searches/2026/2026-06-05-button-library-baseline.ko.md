# 웹 검색 기록: Button Library Baseline

## 검색

- 날짜: 2026-06-05
- 목적: 기본 버튼 개선에 사용할 라이브러리 후보와 구현 패턴 확인

## 질의

- `Radix Themes Button component official docs`
- `React Aria Button component official docs`
- `shadcn ui button component official docs`
- `MUI Button React official docs`
- `Radix UI Slot utility official docs npm @radix-ui/react-slot`
- `class-variance-authority cva official docs npm variants`

## 확인한 강한 출처

- Radix Themes Button: size, variant, radius, icon, loading 같은 표준 버튼 API를 제공한다.
- Radix Slot: 자체 컴포넌트의 `asChild` API를 만들 때 props를 immediate child에 병합하는 utility다.
- shadcn Button: CVA와 Radix Slot 조합으로 Button variant, size, `asChild`를 제공하는 패턴을 제시한다.
- React Aria Button: pressed/focus 상태 같은 접근성 상태를 데이터 속성으로 제공하는 Button primitive 접근을 보여준다.

## 결정

- 전체 Radix Themes 전환은 기존 CSS token과 충돌 위험이 커서 이번 slice에서 제외했다.
- React Aria Button은 좋은 후보지만 현재 앱은 이미 Radix Dropdown/Context primitive를 사용하므로 primitive 계열을 Radix로 맞춘다.
- `@radix-ui/react-slot` + `class-variance-authority` 조합으로 앱 내부 Button primitive를 만들고 기존 토큰을 유지한다.

## 계획 반영

- project-local exact dependency 설치.
- `components/ui/Button.tsx` 추가.
- titlebar/task handoff/Tool Studio 대표 액션부터 migration.
