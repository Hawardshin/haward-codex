# 스펙: Button Library Baseline

## 목표

- 데스크톱 제품 UI의 기본 버튼을 임의 CSS 조합이 아니라 공통 Button primitive로 통일한다.
- 기존 디자인 토큰과 instant press feedback을 유지하면서 variant/size/icon-only/disabled/loading/asChild API를 제공한다.
- 모든 버튼을 한 번에 치환하지 않고, 대표 기본 액션부터 안전하게 migration한다.

## 요구사항

- Button primitive는 `@radix-ui/react-slot`을 사용해 `asChild` composition을 지원해야 한다.
- Button variant와 size는 `class-variance-authority`로 타입 안전하게 관리해야 한다.
- 기본 class는 `ui-button`이어야 하며 `primary`, `secondary`, `outline`, `ghost`, `danger` variant를 제공해야 한다.
- `sm`, `md`, `lg`, `icon` size를 제공해야 하며 기본 타깃은 기존 `--control-target-size` 기준을 따라야 한다.
- loading 상태는 `aria-busy`와 disabled 처리를 제공해야 한다.
- titlebar, task handoff, Tool Studio 주 액션은 Button primitive를 사용해야 한다.
- 기존 instant button feedback, keyboard focus, responsive button target 규칙을 깨면 안 된다.

## 제외

- 모든 `<button>` 전면 치환
- activity rail, source editor toolbar, terminal toolbar 전체 migration
- Tailwind 도입 또는 전체 Radix Themes 테마 전환
