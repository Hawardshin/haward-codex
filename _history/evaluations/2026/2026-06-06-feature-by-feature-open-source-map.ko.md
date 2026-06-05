# 평가: 기능별 오픈소스 맵

## 판정

요청 충족. 현재 플랫폼의 기능 layer별로 오픈소스 후보를 나누고, 각 후보에서 봐야 할 부분과 현재 플랫폼 적용 포인트를 기록했다.

## 산출물

- 검색 기록: `_history/web-searches/2026/2026-06-06-feature-by-feature-open-source-map.ko.md`
- 연구 문서: `_research/topics/platform-desktop-app/2026-06-06-feature-by-feature-open-source-map.ko.md`
- 요청 요약: `_history/user-requests/2026/2026-06-06-feature-by-feature-open-source-map.ko.md`
- 누락 확인: `_history/omission-checks/2026/2026-06-06-feature-by-feature-open-source-map.json`

## 검증

- 웹 검색을 먼저 수행했다.
- `product-feature-registry.json`에서 실제 기능 layer를 확인했다.
- 주요 repo는 공식 GitHub 페이지 또는 `git ls-remote`로 존재를 확인했다.
- JSON 기록 파일은 파싱 가능해야 한다.
- `corepack pnpm --filter workspace-monitor run collect`: 통과.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter platform-desktop-app run renderer:build`: 통과.

## 남은 리스크

- GitHub API 403 때문에 stars/license 대량 메타데이터는 확보하지 못했다.
- 구현 전에는 기능 slice별로 선정 repo를 직접 clone해 source/test/license를 더 깊게 확인해야 한다.
