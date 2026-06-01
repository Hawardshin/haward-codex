# Validation Plan

## Validation For This Task

- Check that the JSON settings file satisfies the self-documenting config contract.
- Confirm existing presentation-agent unit tests still pass.
- Confirm catalog validation still passes.
- Regenerate workspace navigation/health artifacts as needed.
- Use the work evaluator to compare the initial request and the result.

## Validation For Next Implementation

- `quality_harness.py` should have passing and failing sample deck-spec unit tests.
- Playwright adoption should include HTML render smoke, keyboard navigation, and viewport checks.
- axe-core adoption should write accessibility scan reports.
- Visual regression should not be blocking before environment lock rules exist.
