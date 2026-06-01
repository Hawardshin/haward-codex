# Web Search Record: View Mode Selection

## Search Time

- Date: 2026-06-02
- Work mode: `governance`
- Related request: `UR-2026-06-02-016`

## Queries

- `admin dashboard user mode developer mode super admin RBAC best practices official documentation`
- `Next.js admin dashboard role based access control official docs middleware`
- `NIST RBAC roles admin super admin least privilege guidance`
- `OWASP access control admin interface least privilege guidance`
- `OWASP Authorization Cheat Sheet least privilege deny by default every request`
- `NIST role based access control RBAC project official`
- `Next.js Proxy file convention official docs authorization`

## Strong Sources Checked

| Source | Type | What Was Checked | Impact |
| --- | --- | --- | --- |
| OWASP Authorization Cheat Sheet, https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html | security guidance | Checked least privilege, deny-by-default, validating permissions on every request, and authorization testing. | Documented that `view_mode` is a UI lens, not a security boundary, and that public or multi-user deployment needs collector/server/authz enforcement. |
| NIST Role Based Access Control, https://csrc.nist.gov/Projects/Role-Based-Access-Control | standard/reference | Checked RBAC as a model for reducing security administration complexity in large systems. The NIST page is archived, so it was used as a model reference rather than current operations guidance. | Used role and permission vocabulary as the starting point for `user`, `developer`, and `superadmin_developer` view modes. |
| Next.js Proxy file convention, https://nextjs.org/docs/app/api-reference/file-conventions/proxy | official docs | Checked current Next.js request-boundary naming and the proxy convention. | Kept this change scoped to a static monitor UI lens and documented that future authenticated deployments need separate server/request-boundary design. |

## Weak Or Supporting Sources

- Reddit and community posts were used only as signals about Next.js proxy confusion and operator experience, not as implementation evidence.
- Third-party RBAC summaries duplicated official sources and were not adopted.
- Wikipedia was not used as decision evidence.

## Plan Impact

- User and developer views are screen/operations differences, not installation differences, so they should not be added to `install_mode`.
- They also do not change task evaluation strictness, so they should not be added to `work_mode`.
- Add a dedicated `view_mode` registry and validator.
- Set `superadmin_developer` as the current default based on the user request.
- Explicitly state that client-side hiding is not a security boundary and public deployment needs snapshot filtering or server authz.

## Remaining Uncertainty

- Multi-user authentication, authorization, account model, and permission matrix are not implemented.
- Public snapshot redaction policy still needs a separate follow-up design.
