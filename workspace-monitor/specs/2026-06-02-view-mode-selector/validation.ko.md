# 검증: Workspace Monitor View Mode Selector

## 예정 검증

- `npm run collect`
- `npm test`
- `npm run check`
- `npm run build`

## 수용 기준

- `src/generated/workspace-snapshot.json`에 `viewModeCatalog`가 포함된다.
- 기본 mode는 `superadmin_developer`다.
- 상단 selector에서 세 모드를 선택할 수 있다.
- `user` 모드에서는 내부 운영/구현 문서 섹션이 기본 화면에서 줄어든다.
- `superadmin_developer` 모드에서는 기존 전체 운영 화면을 유지한다.
