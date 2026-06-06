# Evaluation: awp PATH Registration

날짜: 2026-06-06

## 사용자 요구 대비

요구: 반복적으로 필요한 내용을 뒤로 미루지 말고 처리한다.

결과: `awp` 설치 후 실제 터미널에서 바로 `awp` 명령이 잡히도록 `~/.local/bin` PATH 등록을 자동화하고 실제 적용했다. 새 zsh 세션에서 `command -v awp`, `awp --version`, `awp doctor --json`을 검증했다.

## 품질 평가

- `cli:install`이 symlink 설치와 PATH 등록을 함께 수행하도록 바뀌었다.
- PATH 등록은 marker block, 백업, rollback 명령을 갖는다.
- 지속 지시에 “반복적으로 필요한 전제 조건을 미루지 않는다”를 반영했다.

## 검증

- `pnpm --dir platform-desktop-app test`: 통과
- `python3 _tools/docs-audit/src/docs_audit.py --check`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/installations/registry.json`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json`: 통과
- `pnpm --dir platform-desktop-app check`: 통과. 기존 public release gate 경고는 유지된다.
- `pnpm --dir platform-desktop-app package:internal`: 통과.
