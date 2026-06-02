# View Mode Selection Workflow

## Purpose

사용자 보기, 개발자 보기, 슈퍼어드민 개발 보기를 분리해 UI와 운영 화면의 정보량을 조절한다. 현재 기본값은 저장소 소유자 중심의 `superadmin_developer`다.

## Inputs

- 사용자 요청의 audience 또는 operator
- `agent-platform/configs/access/view-mode-registry.json`
- 대상 UI, dashboard, desktop surface, 또는 generated snapshot
- 공개 여부와 민감 정보 노출 위험

## Modes

| Mode | Use When | Display Bias |
| --- | --- | --- |
| `user` | 플랫폼 산출물을 쓰거나 읽는 사람이 내부 구현을 볼 필요가 없을 때 | stable projects, history, docs, artifacts |
| `developer` | 프로젝트나 플랫폼 기능을 개선하지만 owner-level governance까지는 필요 없을 때 | requirements, specs, implementation, tests, agents |
| `superadmin_developer` | 저장소 소유자 또는 governance agent가 플랫폼 자체를 만들고 전체 구조를 봐야 할 때 | full operations, governance, agents, configs, public-readiness |

## Sequence

1. Run web-first intake when this workflow is triggered by a new user instruction.
2. Run memory bootstrap before changing durable view rules.
3. Open `agent-platform/configs/access/view-mode-registry.json`.
4. Decide `view_mode`:
   - `user`: stable output browsing and future public visitor lens.
   - `developer`: implementation and verification lens.
   - `superadmin_developer`: full owner/operator lens and current default.
5. Keep `view_mode` separate from `install_mode` and `work_mode`.
6. If the target may be public, confirm whether filtering must happen at snapshot collection or server authorization, not only in the client UI.
7. Verify the registry with:
   - `PYTHONPATH=src python3 -m agent_platform.cli check-view-modes configs/access/view-mode-registry.json`
8. If workspace-monitor changed, run `pnpm run collect`, `pnpm test`, `pnpm run check`, and `pnpm run build` from `workspace-monitor/`.

## Output Contract

- selected `view_mode`
- reason
- target surface
- visible sections or hidden-by-default surfaces
- privacy/security interpretation
- verification commands
- follow-up needed for real authentication, authorization, or publication filtering

## Rule

`view_mode`는 화면 렌즈다. 클라이언트에서 숨기는 것은 보안 경계가 아니며, public 배포나 multi-user 배포에서는 collector/server/authz 계층에서 강제해야 한다.
