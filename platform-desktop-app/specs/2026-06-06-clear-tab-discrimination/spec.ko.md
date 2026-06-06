# Spec: Clear Tab Discrimination

## 결정

탭/탭형 선택 컨트롤에 공통 selected indicator token을 추가하고, 주요 탭 UI에 `::before` indicator를 적용한다.

## 구현 기준

- `--tab-selected-indicator`, `--tab-selected-border`, `--tab-selected-shadow`, `--tab-inactive-bg` token을 추가한다.
- settings top tabs, settings subsection tabs, section tabs, app choice buttons, source editor tabs, tool studio rails에 selected indicator를 적용한다.
- settings top tabs와 source editor draft tabs에 ARIA tab semantics를 보강한다.
- 테스트는 token, pseudo indicator, ARIA selected 계약을 확인한다.

## 검증 기준

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run check`
- Browser computed-style check
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --dir platform-desktop-app run package:internal`
