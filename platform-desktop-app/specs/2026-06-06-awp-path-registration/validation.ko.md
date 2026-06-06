# Validation: awp PATH Registration

## 실행한 검증

- `pnpm --dir platform-desktop-app cli:path -- --dry-run`: 적용 전 `.zprofile`, `.zshrc` 업데이트 예정 확인.
- `pnpm --dir platform-desktop-app cli:path`: 통과. 두 shell 파일에 관리 블록 추가 및 백업 생성.
- `zsh -lic 'command -v awp && awp --version && awp doctor --json'`: 통과. `userBinOnPath: true`.
- `pnpm --dir platform-desktop-app cli:path -- --dry-run`: 통과. 적용 후 `already_configured`.
- `node platform-desktop-app/scripts/configure-awp-path.mjs --remove --dry-run`: 통과. rollback 대상 block 감지.
- `pnpm --dir platform-desktop-app test`: 통과
- `python3 _tools/docs-audit/src/docs_audit.py --check`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/installations/registry.json`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json`: 통과
- `pnpm --dir platform-desktop-app check`: 통과. 기존 public release gate 경고는 유지된다.
- `pnpm --dir platform-desktop-app package:internal`: 통과. 내부 `.app`과 DMG 생성 및 검증 완료.

## 관찰

새 zsh 세션 검증 중 기존 zsh prompt/theme 쪽 `gitstatus` 초기화 경고가 출력됐지만, `awp` PATH 등록과 CLI 실행은 통과했다.
