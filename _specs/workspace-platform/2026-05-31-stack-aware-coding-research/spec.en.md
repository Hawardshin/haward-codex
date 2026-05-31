# Spec: Stack-Aware Coding Research

## Background

The user stated that technologies such as Java/Spring Boot, C, React, and Next.js require different official documentation, and that high-signal discussions from Stack Overflow, Reddit, GitHub, and similar channels can be valuable research signals.

## Goals

- Record technology stack, official docs/standards, and version constraints in coding research input.
- Record high-signal issue/discussion sources and community signal interpretation.
- Block implementation readiness when technology-specific official docs or discussion signals are missing.

## Scope

- `coding-research-agent` readiness checker
- Coding research profile and template
- Operations prompt/workflow, persistent instructions, and docs
- Requirements, history, and evaluation artifacts

## Non-Scope

- A complete catalog of official docs for every technology
- Automatic Stack Overflow/Reddit/GitHub API collection tooling
- Actual technology selection for a product project

## Success Criteria

- Missing new fields make `complete-coding-research` return `more_research_required`.
- Missing official docs for known stacks such as Spring Boot, C, React, and Next.js produce gaps.
- Community signals are documented as adoption, discovery, or risk signals, not proof.
