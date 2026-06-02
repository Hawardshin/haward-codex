# Web Search Record: Sensitive Boundary And Root Architecture

## Search Date

- 2026-06-02

## Queries

- `GitHub docs secret scanning push protection secrets in repositories best practices`
- `OWASP Secrets Management Cheat Sheet source code repositories secrets best practices`
- `1Password developer secrets references environment files best practices`
- `monorepo root folder structure apps packages tools docs best practices turborepo nx`

## Sources Checked

- OWASP Secrets Management Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
- OWASP DevSecOps Secrets Management: https://owasp.org/www-project-devsecops-guideline/latest/01a-Secrets-Management
- GitHub Docs - Secure your secrets: https://docs.github.com/en/enterprise-cloud@latest/code-security/how-tos/secure-your-secrets
- 1Password Developer - Load secrets into the environment: https://www.1password.dev/cli/secrets-environment-variables
- Nx Docs - Folder Structure: https://nx.dev/docs/concepts/decisions/folder-structure

## Decision Summary

- Sensitive files need more than a folder. They need central routing, git ignores, access restrictions, generated-output exclusions, and a validation tool.
- Files AI should not inspect should go to `_private/sensitive/` or an external secret manager; tracked files should contain only policy, env var names, secret references, and redacted metadata.
- Repository maps and Workspace Monitor snapshots can leak private paths even when source files are ignored, so they need a separate audit.
- Root folders are easier to maintain when described as project plane, operations control plane, knowledge/reuse plane, runtime adapter plane, protected local plane, and generated local plane.

## Plan Impact

- Add `sensitive-file-boundary.json`.
- Add `_private/` AI default-deny policy and `_ops/security/` guide.
- Add `privacy-audit`.
- Exclude `_private/` contents from workspace index and monitor collector.
- Add logical layers to root structure policy.

## Uncertainty

- The actual secret manager depends on the user's tooling. The current contract stays vendor-neutral while allowing 1Password, OS keychain, and cloud secret managers.
