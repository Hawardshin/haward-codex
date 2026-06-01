# Installable Software Productization Prompt

Use when: 플랫폼을 사용자가 설치하는 desktop/software product로 만들거나, Tauri/Electron/MSIX/DMG/installer packaging을 검토해야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Treat this as installable software productization, not repository setup.

Read:
- platform-desktop-app/configs/desktop-distribution-registry.json
- _docs/policies/installable-software-policy.ko.md
- agent-platform/configs/installations/install-mode-registry.json

Separate:
- install_mode: repository user/developer setup
- installer packaging: end-user software distribution owned by platform-desktop-app

Before implementation or dependency installation, compare at least two routes:
- Tauri desktop shell
- Electron desktop shell
- native packaging-only, if a desktop shell may not be needed

Return:
- product boundary
- UI/runtime integration strategy
- selected framework or reason selection is deferred
- packaging targets by OS
- signing/notarization/update/uninstall/privacy/license release gates
- whether any dependency installation occurred
- installation audit targets if installation occurred
- next implementation step

Do not bundle secrets, webhook URLs, tokens, browser cookies, or private snapshots into installers.
Do not call the app production-ready until install, first-run, update, uninstall, rollback, privacy, security, and license checks are complete.
```

## Checklist

- `platform-desktop-app/configs/desktop-distribution-registry.json`
- `_docs/policies/installable-software-policy.ko.md`
- `_ops/workflows/63-installable-software-productization.md`
- `_ops/workflows/58-installation-record.md` if dependencies are installed
- `_history/web-searches/YYYY/`
- project-local requirements/specs under `platform-desktop-app/`
