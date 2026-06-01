# 계획 기록: 설치 모드 분리

## 목표

플랫폼을 사용하는 사람과 플랫폼을 개선하는 개발자가 서로 다른 설치 경로를 쓰도록 `install_mode`를 구현한다.

## 실행 계획

1. 웹 검색으로 Python regular/editable install, pyproject dependency 구조, npm dev dependency omit, Vercel Next.js 배포 근거를 확인한다.
2. `REQ-WS-049`를 요구사항 기준선에 추가한다.
3. `install-mode-registry.json`을 만든다.
4. `agent-platform` CLI에 install mode 검증/조회 명령을 추가한다.
5. 정책, workflow, prompt, README, 지속 지시, memory bootstrap을 갱신한다.
6. 히스토리, 조사, 평가, 타이밍 기록을 작성한다.
7. 검증 후 커밋하고 push한다.

## 결정

- `work_mode`에 user/developer를 추가하지 않는다.
- 설치 대상자별 구분은 `install_mode`로 둔다.
- 실제 dependency 설치는 이번 범위에 포함하지 않는다.
- 실제 설치가 발생하면 기존 설치 감사 workflow를 계속 사용한다.
