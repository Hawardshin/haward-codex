# 검증: 버튼 클릭 타깃 크기 정리

## 수행 검증

- `pnpm run check`: 통과
- `pnpm test`: 17개 통과
- `pnpm exec next build`: 통과
- `pnpm run perf:budget`: 통과, largest initial chunk 361226 bytes
- `curl http://localhost:3212/`: `200`, 0.057559s
- in-app Browser 첫 화면 button/control size audit: visible control 52개, 40px 미만 control 0개

## 확인 기준

- 일반 반복 액션 버튼은 `--control-target-size`를 따른다.
- Source/Explorer 툴바는 compact target을 따른다.
- 파일 트리 row는 dense target을 따르고, 모바일/coarse pointer에서는 더 큰 target으로 올라간다.
- 기존 generated snapshot 변경분은 이번 커밋에 포함하지 않는다.

## 한계

- in-app Browser에서 첫 화면 클릭 타깃 측정은 통과했으나, Browser 클릭/DOM click이 React section state를 바꾸지 않아 Source 화면 전환 후 실측은 수행하지 못했다. Source/Explorer 쪽은 CSS selector audit와 build/check로 검증했다.
