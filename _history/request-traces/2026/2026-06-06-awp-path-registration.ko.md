# Request Trace: awp PATH Registration

날짜: 2026-06-06

## 요청

반복적으로 필요한 내용을 뒤로 미루지 말고 처리한다.

## 산출물

- PATH 설정 script: `platform-desktop-app/scripts/configure-awp-path.mjs`
- package scripts: `platform-desktop-app/package.json`
- persistent instructions: `_docs/instructions/persistent-instructions*.md`
- installation audit: `_history/installations/2026/2026-06-06-awp-zsh-path-registration.ko.md`
- spec: `platform-desktop-app/specs/2026-06-06-awp-path-registration/`

## 실제 환경 변경

- `/Users/shinjoungeun/.zprofile`에 관리 block 추가
- `/Users/shinjoungeun/.zshrc`에 관리 block 추가
- 새 zsh 세션에서 `awp` 명령 확인

## 검증 결과

- `pnpm --dir platform-desktop-app test`: 통과
- `python3 _tools/docs-audit/src/docs_audit.py --check`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/installations/registry.json`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json`: 통과
- `pnpm --dir platform-desktop-app check`: 통과
- `pnpm --dir platform-desktop-app package:internal`: 통과
