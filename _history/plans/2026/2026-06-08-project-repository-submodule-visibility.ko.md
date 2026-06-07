# 계획 기록: project repository submodule visibility

## 완료한 사전 확인

- Git submodule official docs와 GitHub clone docs를 확인했다.
- `platform-desktop-app`의 기존 Workspace Host clone/import command와 project-management snapshot collector를 확인했다.
- `awp` companion CLI가 doctor JSON을 제공하고 있음을 확인했다.

## 실행 계획

1. Snapshot schema와 collector에 repository metadata를 추가한다.
2. Project portfolio/detail UI에 repository strip을 추가한다.
3. `awp doctor --json`에 submodule status summary를 추가한다.
4. Tests와 generated snapshot을 갱신한다.
5. 검증 후 platform submodule과 root superproject를 각각 commit/push한다.
