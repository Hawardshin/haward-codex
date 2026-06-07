# 작업 요약: project repository submodule visibility

- 날짜: 2026-06-08
- 범위: `platform-desktop-app/`

## 완료

- Project snapshot에 repository model, URL, submodule path, branch, status를 추가했다.
- Project portfolio card와 detail panel에 repository/submodule strip을 추가했다.
- `awp doctor --json`에 project repositories와 submodule readiness summary를 추가했다.
- generated workspace snapshot을 갱신했다.
- renderer/CLI 테스트를 갱신했다.
- Browser smoke로 기본 customer 화면의 Git 작업공간 import/create 액션과 developer snapshot의 6개 `git_submodule` repository strip 표시를 확인했다.
- renderer build, 전체 test, 전체 check를 통과했다.

## 남은 일

- credential setup assistant와 automatic submodule init/update는 후속 slice다.
- public release signing/notarization/updater/clean-machine smoke 경고는 기존 release gate로 유지된다.
