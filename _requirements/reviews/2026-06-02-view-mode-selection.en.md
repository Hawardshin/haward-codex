# Requirements Review: View Mode Selection

## Reviewed Requirements

- `REQ-WS-061`
- `REQ-WM-011`

## Result

- Status: approved
- Reason: The difference between user and developer views is about screen and operations audience, not setup scope. Separating it into `view_mode` is more maintainable than mixing it into `install_mode` or `work_mode`.

## Evidence

- OWASP Authorization Cheat Sheet recommends least privilege and deny-by-default, so public or multi-user deployments need real enforcement beyond UI hiding.
- NIST RBAC provides vocabulary for modeling roles and permissions.
- Next.js can support future route/request boundary design, but this change only adds a static monitor view lens, not authentication.

## Acceptance Conditions

- `view-mode-registry.json` satisfies the self-documenting config contract.
- `check-view-modes` validates `user`, `developer`, `superadmin_developer`, and the current default.
- Workspace Monitor reads `viewModeCatalog` from the snapshot and exposes a top-level selector.
- Docs explicitly state that client-side hiding is not a security boundary.
