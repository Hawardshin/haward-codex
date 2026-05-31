# Plan Record: HTML Deck And Script Collaboration

## Work Mode

- Selected mode: `standard`
- Reason: this is meaningful implementation work that adds actual HTML output generation, a sample artifact, tests, requirements, specs, and history to the presentation-agent project.

## Evidence

- Web search confirmed speaker notes and HTML presentation generation patterns in reveal.js, Slidev, and Marp.
- The existing reference catalog provides source and design signals, but there was no renderer for actual presentation artifacts.
- A `deck-spec` contract keeps presentation scripting separate from screen rendering and makes the workflow maintainable.

## Execution Plan

1. Create a `deck-spec` JSON structure.
2. Implement `html_deck.py` to render 16:9 HTML presentation decks.
3. Create a sample deck spec and HTML artifact introducing the presentation agent.
4. Add unit tests and static checks.
5. Update requirements, specs, research notes, history, and evaluation.
6. Commit and push.

