# Spec: awp PATH Registration

## 목표

`awp` 설치가 실제 터미널 사용 가능 상태까지 닫히도록 PATH 등록을 자동화한다.

## 런타임 선택

- Node script: 기존 `platform-desktop-app` package script와 바로 연결되고, 파일 존재/백업/쓰기 처리가 표준 라이브러리로 충분하다.
- Shell script: zsh에는 자연스럽지만 cross-platform package 검증과 JSON 결과 보고가 약하다.

선택: Node script. 이유는 기존 installer가 Node이고 테스트/readiness에 연결하기 쉽기 때문이다.

## 구조 선택

- 별도 `scripts/configure-awp-path.mjs`: PATH 등록/rollback 책임이 분명하고 테스트에서 dry-run 검증이 가능하다.
- `install-awp-cli.mjs`에 직접 병합: 파일 수는 줄지만 symlink 설치와 shell profile 변경 책임이 섞인다.

선택: 별도 script를 두고 `cli:install`에서 순차 실행한다.

## Shell 대상

- `~/.zprofile`: macOS Terminal의 login zsh에서 PATH 적용.
- `~/.zshrc`: interactive zsh 재시작/새 tab 흐름에서 PATH 적용.

관리 블록은 중복 등록을 막고 `--remove`로 제거 가능해야 한다.
