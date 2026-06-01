# Workspace Monitor Source Code Viewer Research Note

## Conclusion

At this stage, a build-time snapshot plus read-only code viewer is the best fit. The monitor already uses static snapshots, so adding source previews through the same path fits the Vercel/static export model and avoids extra dependencies.

## Options

- Plain `<pre><code>`: small, fast, and safer. Selected now.
- Shiki: good static syntax highlighting, but adds dependency and build cost.
- Monaco: powerful, but editor-like and requires bundle, security, permission, and save-behavior design.

## Applied Criteria

- Show Source tab only in developer/superadmin views
- Use a source root allowlist
- Exclude generated/build/dependency/large files
- Review `sourceFiles` before public deployment

## Key Sources

- Node.js File system docs: https://nodejs.org/api/fs.html
- Next.js Static Exports: https://nextjs.org/docs/app/guides/static-exports
- Shiki install docs: https://shiki.style/guide/install
- Monaco Editor: https://microsoft.github.io/monaco-editor/
