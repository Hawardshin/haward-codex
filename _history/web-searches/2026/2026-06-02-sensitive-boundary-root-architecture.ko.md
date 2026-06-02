# 웹 검색 기록: 민감 파일 경계와 최상위 폴더 아키텍처

## 검색일

- 2026-06-02

## 검색어

- `GitHub docs secret scanning push protection secrets in repositories best practices`
- `OWASP Secrets Management Cheat Sheet source code repositories secrets best practices`
- `1Password developer secrets references environment files best practices`
- `monorepo root folder structure apps packages tools docs best practices turborepo nx`

## 확인한 출처

- OWASP Secrets Management Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
- OWASP DevSecOps Secrets Management: https://owasp.org/www-project-devsecops-guideline/latest/01a-Secrets-Management
- GitHub Docs - Secure your secrets: https://docs.github.com/en/enterprise-cloud@latest/code-security/how-tos/secure-your-secrets
- 1Password Developer - Load secrets into the environment: https://www.1password.dev/cli/secrets-environment-variables
- Nx Docs - Folder Structure: https://nx.dev/docs/concepts/decisions/folder-structure

## 판단 요약

- 민감 파일은 단순히 폴더를 정하는 것으로 충분하지 않다. 중앙 라우팅, git ignore, 접근 제한, 생성 산출물 제외, 검증 도구가 함께 필요하다.
- AI가 직접 보지 않아야 하는 파일은 `_private/sensitive/` 또는 외부 secret manager로 보내고, 추적 가능한 파일에는 policy, env var 이름, secret reference, redacted metadata만 남기는 방식이 적합하다.
- repository map과 Workspace Monitor snapshot은 원본 파일이 git ignored라도 leak 지점이 될 수 있으므로 별도 audit가 필요하다.
- 최상위 폴더는 물리 폴더 나열보다 project plane, operations control plane, knowledge/reuse plane, runtime adapter plane, protected local plane, generated local plane으로 설명하는 편이 유지보수에 낫다.

## 계획 반영

- `sensitive-file-boundary.json`을 추가한다.
- `_private/` AI default-deny 정책과 `_ops/security/` 운영 안내를 추가한다.
- `privacy-audit`를 추가한다.
- workspace index와 monitor collector에서 `_private/` 내용을 제외한다.
- root structure policy에 논리 계층을 추가한다.

## 불확실성

- 실제 secret manager는 사용자가 어떤 제품을 쓰는지에 따라 달라진다. 현재 구조는 1Password, OS keychain, cloud secret manager를 모두 허용하는 vendor-neutral 계약으로 둔다.
