# View Mode And Access Control Notes

## Summary

The current `view_mode` implementation is a display lens. It lets the platform select user, developer, and superadmin development views, but it does not implement authentication or authorization.

## Sources

| Source | Access Date | Reliability | Key Point | Limitation |
| --- | --- | --- | --- | --- |
| OWASP Authorization Cheat Sheet, https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html | 2026-06-02 | high | Least privilege, deny by default, permission validation on every request, and authorization tests matter. | General web application guidance; not directly implemented in the current static monitor. |
| NIST Role Based Access Control, https://csrc.nist.gov/Projects/Role-Based-Access-Control | 2026-06-02 | medium | RBAC provides standard vocabulary for roles and permissions. | The NIST page is archived, so it should not be used as current product implementation guidance. |
| Next.js Proxy file convention, https://nextjs.org/docs/app/api-reference/file-conventions/proxy | 2026-06-02 | high | Next.js 16-era request-boundary docs use the `proxy` convention. | Workspace Monitor currently uses static export, so authentication remains separate future work. |

## Applied Principles

- `view_mode=user`: stable outputs and readable history.
- `view_mode=developer`: implementation, requirements, specs, tests, and agent inventory.
- `view_mode=superadmin_developer`: full owner/operator platform-building view. Current default.
- Client-side hiding is not a security boundary.
- Public or multi-user deployments need collector filtering, server route/authz, snapshot redaction, and authorization tests.

## Follow-Up Candidates

- Separate public and internal snapshot profiles.
- Connect a role-to-section matrix with Next.js or desktop-shell routing.
- Add admin authorization test templates.
