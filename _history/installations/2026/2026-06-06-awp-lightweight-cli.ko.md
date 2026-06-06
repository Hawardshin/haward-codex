# Installation Audit: awp Lightweight CLI

날짜: 2026-06-06

## 설치 요약

- 이름: `awp` lightweight CLI
- 범위: user-local CLI symlink
- 소유 프로젝트: `platform-desktop-app`
- 설치 위치: `/Users/shinjoungeun/.local/bin/awp`
- 소스: `platform-desktop-app/tools/awp/awp.py`
- 설치 명령: `pnpm --dir platform-desktop-app cli:install`

## 의존성/라이선스

- 외부 패키지 설치 없음.
- Python 표준 라이브러리만 사용한다.
- 라이선스: 내부 개인 workspace artifact.

## 보안 검토

- shell string을 사용하지 않고 `subprocess.run(..., shell=False)`와 executable/args 배열을 사용한다.
- OS action 대상은 workspace root 내부로 제한한다.
- `_private/`, `outputs/` 경로는 차단한다.
- shell 설정 파일은 자동 수정하지 않았다.

## 검증

- `python3 platform-desktop-app/tools/awp/awp.py --version`: `awp 0.1.0`
- `python3 platform-desktop-app/tools/awp/awp.py doctor --json`: 통과, Codex CLI 1개 감지
- `python3 platform-desktop-app/tools/awp/awp.py cli-check --json`: 통과
- `node platform-desktop-app/scripts/install-awp-cli.mjs --dry-run`: 통과
- `pnpm --dir platform-desktop-app cli:install`: 통과
- `/Users/shinjoungeun/.local/bin/awp --version`: `awp 0.1.0`
- `/Users/shinjoungeun/.local/bin/awp doctor --json`: 통과
- `pnpm --dir platform-desktop-app test`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/installations/registry.json`: 통과
- `pnpm --dir platform-desktop-app check`: 통과. 기존 public release gate 경고는 유지된다.
- `pnpm --dir platform-desktop-app package:internal`: 통과

## Rollback

```bash
rm /Users/shinjoungeun/.local/bin/awp
```

추가로 repo source를 되돌리려면 `platform-desktop-app/tools/awp/`, `platform-desktop-app/scripts/install-awp-cli.mjs`, 관련 package/test/readiness 변경을 제거한다.
