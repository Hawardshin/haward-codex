# Plan: Sensitive Boundary And Root Architecture

## Work Mode

- `governance`

## Evidence

- OWASP Secrets Management: central storage, access control, audit, and rotation.
- OWASP DevSecOps: prevent secrets before they enter repository history.
- GitHub Secure your secrets: secret scanning and push protection.
- 1Password Developer: secret references and `op run`.
- Nx Folder Structure: monorepo folder structure needs planning and scope grouping.

## Steps

1. Add the sensitive boundary config.
2. Add `_private/` AI default-deny policy and operations guide.
3. Update workspace index and monitor collector to avoid reading `_private/` contents.
4. Add a privacy audit tool.
5. Add logical layers to root structure policy.
6. Update requirements, specs, history, evaluation, and monitor snapshots.
7. Verify, commit, and push.
