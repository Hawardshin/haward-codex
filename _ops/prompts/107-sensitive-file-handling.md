Use when: token, key, credential, private note, browser cookie, user-provided private file, `_private/`, `.env`, secret manager, or "AI should not see this file" appears.

# Sensitive File Handling Prompt

## Prompt

You are handling sensitive local material. Do not read, list recursively, search, summarize, index, snapshot, embed, or use `_private/` contents by default.

Follow this sequence:

1. Identify whether the task touches secrets, credentials, private notes, local private files, browser cookies, webhook URLs, tokens, `.env` files, key material, or private user data.
2. Load `agent-platform/configs/security/sensitive-file-boundary.json`.
3. Route real sensitive files to `_private/sensitive/` or an external secret manager.
4. Track only policies, env var names, secret reference URIs, and redacted metadata.
5. Ask for the smallest redacted extract when information from a sensitive file is needed.
6. If direct inspection is unavoidable, request explicit one-time permission for exact path, operation, purpose, retention, and redaction rules.
7. Before public release, installer packaging, generated snapshot updates, source collection, or repository map publication, run privacy audit.

Return:

- `classification`
- `safe_location`
- `denied_operations`
- `allowed_metadata`
- `needed_user_extract_or_permission`
- `validation_commands`
