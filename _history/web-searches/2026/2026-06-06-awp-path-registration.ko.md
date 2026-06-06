# Web Search: awp PATH Registration

날짜: 2026-06-06

## 질의

- zsh official documentation startup files zshrc PATH
- Apple Terminal zsh default shell startup file PATH

## 확인한 출처

- Zsh startup files 소개: zsh가 `.zprofile`, `.zshrc` 등 시작 파일을 읽는 흐름과 PATH 같은 환경 변수를 시작 파일에 둘 수 있음을 확인했다. https://zsh.sourceforge.io/Intro/intro_3.html
- Zsh user guide: login/interactive shell 시작 파일 차이를 확인했다. https://zsh.sourceforge.io/Guide/zshguide02.html
- Apple Terminal support: macOS Terminal의 shell startup/default shell 관련 공식 문서를 확인했다. https://support.apple.com/guide/terminal/use-zsh-startup-scripts-trml001/mac

## 계획 영향

macOS zsh 사용 흐름을 위해 `~/.zprofile`과 `~/.zshrc`에 같은 idempotent PATH 관리 블록을 넣기로 했다. 현재 부모 프로세스의 PATH는 바꿀 수 없으므로 새 zsh 세션 검증을 acceptance로 삼았다.
