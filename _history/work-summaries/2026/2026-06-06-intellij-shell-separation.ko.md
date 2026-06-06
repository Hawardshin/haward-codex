# Work Summary: IntelliJ Shell Separation

## 완료 내용

- `desktop-app-shell`에 `data-layout-model="intellij-tool-window-editor"`를 추가했다.
- 좌측 `activity-rail`을 `tool-window-stripe` zone으로 태깅했다.
- 메인 `desktop-viewport`를 `editor-plane` zone으로 태깅했다.
- IntelliJ-style separation token을 추가하고 rail/editor/titlebar 경계를 강화했다.
- titlebar를 viewport padding 바깥까지 full-bleed 처리해 메인 상단 chrome이 사이드와 분리되도록 했다.
- 정적 테스트에 side/main separation 계약을 추가했다.

## 검증

- `workspace-monitor test/check`: 통과.
- Browser computed-style check: 통과.
- `platform-desktop-app test/check`: 통과.
- `package:internal`: 통과.

## 남은 리스크

- public 배포 경고인 signing/notarization/updater/clean-machine smoke test는 기존 별도 범위로 남아 있다.
