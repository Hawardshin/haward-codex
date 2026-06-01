# Usage and AI Adoption Configs

This folder stores diagnostic and coaching configs that help users use AI more effectively.

## Files

- `ai-usage-gap-profile.json`: profile for diagnosing the gap between weak and strong AI use across task framing, question/instruction quality, verification, iteration, reusable assets, and appropriate reliance

## Usage Rules

- Check this profile when a request is vague or when the user asks how to improve AI use itself.
- Treat weak AI use as a workflow, context, verification, iteration, tooling, or learning-loop gap rather than a personal flaw.
- Rewrite biased, leading, or conclusion-seeking instructions into neutral task briefs before execution.
- Treat LLM output as probabilistic output conditioned on the prompt and context; add goal, context, constraints, output format, and verification path.
- For weak, non-reasoning, or uncertain models on high-variance tasks, consider two-pass comparison or draft-critique-revise loops; for stronger reasoning models, prioritize task framing and verification over duplicate calls.
- Matching repeated outputs are not factual proof; keep a separate grounding path.
- Promote repeated successful AI-use patterns into prompts, workflows, templates, tools, skills, or configs.
- Keep factual claims, numbers, technical judgments, and decisions tied to evidence and verification paths.
- Run `check-config-contract` after changing important shared configs.
