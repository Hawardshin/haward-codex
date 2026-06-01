# 계획: 설치 모드 분리

## 근거 요약

- pip 공식 문서는 regular local install과 editable install을 분리하며, editable install을 development installation으로 설명한다.
- Python Packaging User Guide는 project dependencies와 optional dependencies를 `pyproject.toml`에서 표현하는 구조를 제공한다.
- npm 공식 문서는 `npm ci`와 `--omit=dev`를 통해 설치 tree에서 dev dependency를 제외할 수 있음을 설명한다.
- Vercel Next.js 문서는 workspace-monitor 같은 Next.js 프로젝트의 배포 경로 근거가 된다.

## 실행 순서

1. `REQ-WS-049`를 기준선에 추가하고 변경/검토 기록을 만든다.
2. install mode registry를 만든다.
3. agent-platform CLI에 registry 검증/조회 명령을 추가한다.
4. 설치 모드 정책, workflow, prompt를 추가한다.
5. persistent instructions, `AGENTS.md`, memory bootstrap, router, index, installation README, agent-platform README를 연결한다.
6. 히스토리, 조사, 평가, 타이밍 기록을 작성한다.
7. 검증 후 커밋하고 push한다.

## 위험과 대응

- 위험: `install_mode`와 `work_mode`가 섞일 수 있다.
- 대응: registry, policy, workflow, prompt에서 둘의 경계를 명시한다.
- 위험: 사용자용 설치가 Next.js 빌드에 필요한 dev dependency를 과도하게 생략할 수 있다.
- 대응: source build와 runtime-only pruning을 분리해 적고, 실제 배포는 Vercel/프로젝트 빌드 검증을 따르게 한다.
- 위험: 문서화된 설치 명령을 실제 설치 완료로 오해할 수 있다.
- 대응: 실제 실행 시 설치 감사 기록이 필요하다고 명시한다.
