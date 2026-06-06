# Installation Audit: awp zsh PATH Registration

날짜: 2026-06-06

## 설치 요약

- 이름: `awp` zsh PATH registration
- 범위: user shell environment
- 소유 프로젝트: `platform-desktop-app`
- 설정 위치: `/Users/shinjoungeun/.zprofile`, `/Users/shinjoungeun/.zshrc`
- 설정 명령: `pnpm --dir platform-desktop-app cli:path`
- 관리 script: `platform-desktop-app/scripts/configure-awp-path.mjs`

## 의존성/라이선스

- 외부 패키지 설치 없음.
- Node 표준 라이브러리만 사용한다.
- 라이선스: 내부 개인 workspace artifact.

## 보안/rollback

- marker로 둘러싼 관리 블록만 추가한다.
- 기존 shell 파일은 쓰기 전 백업했다.
- rollback: `node platform-desktop-app/scripts/configure-awp-path.mjs --remove`
- 백업 복원 후보:
  - `/Users/shinjoungeun/.zprofile.awp-backup-20260606T124607Z`
  - `/Users/shinjoungeun/.zshrc.awp-backup-20260606T124607Z`

## 검증

- `pnpm --dir platform-desktop-app cli:path -- --dry-run`: 적용 전 업데이트 예정 확인
- `pnpm --dir platform-desktop-app cli:path`: 통과
- `zsh -lic 'command -v awp && awp --version && awp doctor --json'`: 통과, `userBinOnPath: true`
- `pnpm --dir platform-desktop-app cli:path -- --dry-run`: 적용 후 `already_configured`
- `node platform-desktop-app/scripts/configure-awp-path.mjs --remove --dry-run`: 통과, rollback 대상 block 감지
- `pnpm --dir platform-desktop-app test`: 통과
- `python3 _tools/docs-audit/src/docs_audit.py --check`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/installations/registry.json`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json`: 통과
- `pnpm --dir platform-desktop-app check`: 통과
- `pnpm --dir platform-desktop-app package:internal`: 통과
