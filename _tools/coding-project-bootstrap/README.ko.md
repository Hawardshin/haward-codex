# Coding Project Bootstrap

새 코딩 프로젝트를 만들 때 루트 프로젝트 경계, 기술별 기본 폴더, 요구사항/스펙/조사/평가 연결점을 한 번에 준비하는 도구다.

## 목적

- 새 프로젝트를 매번 손으로 만들지 않는다.
- Python, Next.js, React/Vite, Spring Boot, C 같은 기술별 시작 구조를 고를 수 있다.
- 기본값은 dry-run이라 실수로 폴더를 늘리지 않는다.
- root 프로젝트로 만들 때는 `_ops/projects/registry.json` 등록까지 함께 할 수 있다.
- 생성된 프로젝트는 workspace-monitor가 읽을 수 있는 `README.md`, `docs/`, `specs/`, `configs/project-context.json`를 가진다.

## 명령

```bash
python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py list
python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py plan my-agent --blueprint python-agent --register
python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py create my-agent --blueprint python-agent --register --apply
```

특정 프로젝트 안에 하위 모듈 형태로 만들 때는 `--target-dir`를 사용한다. 이 경우 root project registry에는 자동 등록하지 않는다.

```bash
python3 _tools/coding-project-bootstrap/src/coding_project_bootstrap.py plan my-helper --blueprint python-cli --target-dir existing-project/tools/my-helper
```

## 지원 blueprint

- `generic`: 기술 미정 프로젝트
- `python-agent`: Python-first 에이전트 프로젝트
- `python-cli`: Python CLI 프로젝트
- `next-app`: Next.js 앱 프로젝트
- `react-vite`: React/Vite 앱 프로젝트
- `spring-boot`: Java Spring Boot 프로젝트
- `c-library`: C 라이브러리/시스템 프로젝트

## 운영 규칙

- 생성 전에는 `plan`으로 파일 목록과 registry entry를 확인한다.
- 생성 후에는 기술별 공식 문서를 다시 확인하고 coding research를 남긴다.
- 의존성 설치가 필요하면 설치 감사 기록을 먼저 만든다.
- 프로젝트별 산출물은 생성된 프로젝트 폴더 안에 둔다.
- 여러 프로젝트에서 반복되는 도구만 `_tools/`나 `_templates/`로 승격한다.

## 검증

```bash
python3 -m unittest discover -s _tools/coding-project-bootstrap/tests
python3 _tools/workspace-health/src/workspace_health.py --category tools
```
