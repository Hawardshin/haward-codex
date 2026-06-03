# Source Code Viewer Spec

## Goal

Allow developers and superadmin developers to view source code from key projects and `_tools` inside Workspace Monitor as read-only content.

## Scope

- Add a `sourceFiles` catalog to the snapshot generator
- Add the `source` section to Developer and Superadmin view modes
- Add Source tab UI
- Add project, language, and search filters
- Render the selected file safely with `<pre><code>`
- Document pre-publication review for source snapshots

## Non-Scope

- Editing or saving source code in the browser
- Advanced Monaco/Shiki highlighting
- GitHub API integration
- Collecting every file in the repository
- Treating client-side view mode as a security boundary

## Decisions

- Use a plain read-only code viewer without adding dependencies for now.
- Collect only maintainable code roots such as `src`, `tests`, `app`, `components`, `lib`, and `scripts`.
- Exclude generated snapshots, build output, dependency folders, and large files.
- Hide the Source tab from User View.

## Success Criteria

- `sourceFiles` is generated in the snapshot.
- Developer and Superadmin views can see the Source tab.
- User View cannot see the Source tab.
- `npm test`, `npm run check`, and `npm run build` pass.
