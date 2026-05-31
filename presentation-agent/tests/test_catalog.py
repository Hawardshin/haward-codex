from __future__ import annotations

import unittest
from pathlib import Path

from presentation_agent.catalog import load_catalog, summarize_catalog, validate_catalog


CATALOG_PATH = Path(__file__).resolve().parents[1] / "data" / "reference-index" / "starter-reference-catalog.json"


class CatalogTests(unittest.TestCase):
    def test_starter_catalog_is_ready_for_collection(self) -> None:
        catalog = load_catalog(CATALOG_PATH)
        gaps = validate_catalog(catalog, min_records=50)
        self.assertEqual([], gaps)

    def test_catalog_has_broad_reference_coverage(self) -> None:
        summary = summarize_catalog(load_catalog(CATALOG_PATH))
        self.assertGreaterEqual(summary["record_count"], 50)
        self.assertGreaterEqual(len(summary["source_types"]), 5)
        self.assertIn("native_html", summary["html_conversions"])
        self.assertIn("pptx_requires_conversion", summary["html_conversions"])
        self.assertIn("asset_reference", summary["html_conversions"])


if __name__ == "__main__":
    unittest.main()

