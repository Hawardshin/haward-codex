# Requirements: awp PATH Registration

날짜: 2026-06-06

## 요구

`awp` lightweight CLI 설치 후 실제 터미널에서 짧은 명령 `awp`로 바로 사용할 수 있어야 한다. 반복적으로 필요한 setup 전제 조건을 후속 제안으로 미루지 않는다.

## 수용 기준

- `~/.local/bin`을 zsh 시작 파일에 idempotent하게 등록한다.
- 기존 shell 파일은 쓰기 전 백업한다.
- 관리 블록은 marker로 구분하고 rollback 명령으로 제거할 수 있다.
- `pnpm --dir platform-desktop-app cli:install`은 symlink 설치와 PATH 등록을 함께 수행한다.
- 새 zsh 세션에서 `command -v awp`, `awp --version`, `awp doctor --json`이 통과한다.
- 지속 지시에 “반복적으로 필요한 전제 조건을 미루지 않는다”를 남긴다.
