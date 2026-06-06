# Work Summary: Clear Tab Discrimination

## 완료 내용

- 탭 선택 상태 전용 token을 추가했다.
- settings tabs, subsection tabs, section tabs, app choice buttons, source editor tabs, tool studio rails에 selected indicator를 추가했다.
- selected tab은 indicator, border, shadow, selected background를 함께 사용하도록 했다.
- settings top tabs와 source editor draft tabs에 `role=tablist`, `role=tab`, `aria-selected`를 보강했다.
- 회귀 방지 테스트를 추가했다.

## 검증

- `workspace-monitor test/check`: 통과.
- Browser computed-style check: 통과.
- `platform-desktop-app test/check`: 통과.
- `package:internal`: 통과.

## 남은 리스크

- public 배포 경고인 signing/notarization/updater/clean-machine smoke test는 기존 별도 범위로 남아 있다.
