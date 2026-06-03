# Native Git Workbench

## 결정

설치형 데스크톱 앱은 선택된 작업공간에서 시스템 `git`을 직접 실행하는 Native Git Workbench를 제공한다. 사용자는 Git URL이나 명령을 별도 입력 폼에 흩어 넣지 않고, 작업공간을 고른 뒤 같은 데스크톱 화면에서 브랜치, 변경사항, 커밋, pull, push를 처리한다.

## 범위

- `get_desktop_git_status`: 현재 작업공간의 Git 루트, 브랜치, upstream, ahead/behind, 변경 파일, remote를 읽는다.
- `run_desktop_git_action`: `refresh`, `create_branch`, `commit_all`, `pull_ff`, `push`를 허용한다.
- 모든 명령은 선택된 작업공간 아래 Git 루트에서 실행하며, 출력은 redaction과 길이 제한을 거친 bounded command output으로만 반환한다.
- 커밋 메시지와 브랜치 이름은 길이와 위험 문자를 제한한다.

## Credential / SSH 경계

앱은 SSH private key, 토큰, 쿠키, credential helper 저장소를 직접 열람하거나 저장하지 않는다. private remote 인증은 사용자의 OS/Git/SSH credential 설정에 맡기고, 실패 시 Git 명령 출력으로 `capability_missing` 또는 인증 실패 상태를 보여준다.

민감 정보 처리가 필요해지는 다음 단계는 별도 설치/보안 감사가 필요하다.

- credential helper 설정 변경
- SSH key 생성, 복사, 업로드, 자동 등록
- 토큰 저장 또는 자동 주입
- remote URL에 포함된 비밀값 처리

## 사용자 경험

Native Git Workbench는 코드 작업 흐름의 보조 패널이다. 사용자는 여전히 하단 Work Console에서 직접 `git` 명령을 실행할 수 있고, 앱의 Git 버튼은 반복 작업을 안전하게 단축하는 역할을 한다.
