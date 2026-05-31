from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from presentation_agent.html_deck import build_html_deck, catalog_ids, load_json, render_deck, validate_deck_spec


PROJECT_ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATH = PROJECT_ROOT / "data" / "reference-index" / "starter-reference-catalog.json"
SPEC_PATH = PROJECT_ROOT / "data" / "deck-specs" / "presentation-agent-kickoff.ko.json"


class HtmlDeckTests(unittest.TestCase):
    def test_sample_deck_spec_is_valid_against_catalog(self) -> None:
        catalog = load_json(CATALOG_PATH)
        spec = load_json(SPEC_PATH)

        gaps = validate_deck_spec(spec, known_reference_ids=catalog_ids(catalog))

        self.assertEqual([], gaps)

    def test_render_deck_contains_slides_and_presenter_notes(self) -> None:
        spec = load_json(SPEC_PATH)

        rendered = render_deck(spec)

        self.assertEqual(6, rendered.count("<section class=\"pa-slide"))
        self.assertIn("data-script-beat=\"hook\"", rendered)
        self.assertIn("pa-presenter", rendered)
        self.assertIn("발표는 자료가 아니라 흐름이다", rendered)
        self.assertIn("speakerNotes", rendered)

    def test_build_html_deck_writes_output(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            output_path = Path(temp_dir) / "deck.html"

            build_html_deck(SPEC_PATH, output_path, catalog_path=CATALOG_PATH)

            html_text = output_path.read_text(encoding="utf-8")
            self.assertIn("<!doctype html>", html_text)
            self.assertIn("pa-progress", html_text)


if __name__ == "__main__":
    unittest.main()
