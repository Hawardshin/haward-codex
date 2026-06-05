# 네이티브 창 크롬 활용 작업 요약

## 변경 요약

- Tauri main window에 native transparent titlebar, hidden title, dark launch background를 추가했다.
- Tauri capability에 native window dragging permission을 명시했다.
- Workspace Monitor titlebar에 `data-tauri-drag-region="deep"`을 적용하고 버튼/검색/컨텍스트 strip은 `false` 및 `no-drag`로 분리했다.
- renderer test와 desktop readiness check가 native chrome 계약을 검증하도록 갱신했다.

## 검증

- `workspace-monitor test`: 통과
- `platform-desktop-app test`: 통과
- `workspace-monitor check`: 통과
- `platform-desktop-app check`: 통과
- Browser DOM/CSS smoke: 통과
- `desktop:package:internal`: 통과, `.app`와 `.dmg` 생성 및 검증 완료
