# Documentation Language Policy

## Purpose

This repository should be easy for the user to read and track over time, so durable documentation is Korean-first. Execution prompts are written in English to reduce token cost and keep agent behavior concise.

## Default Rules

- Use Korean for user-facing documentation, history, and operating explanations.
- Use English for prompt bodies that agents actually execute.
- Create paired Korean and English documents for important operating policies, workflows, and project explanations.
- Store paired documents in the same folder using `name.ko.md` and `name.en.md`.
- When a document includes a prompt, write explanatory text in Korean and keep the `Prompt` code block in English.

## When Paired Documents Are Required

- Repository operating rules
- Persistent instructions
- Work history summaries
- Project vision and structure
- Evaluation rules and workflows
- Reusable template explanations

## When Paired Documents Are Not Required

- Code comments
- Short config files
- One-off temporary notes
- Minimal files that contain only an execution prompt

## Update Rule

When Korean and English paired documents exist, update both in the same change set.
