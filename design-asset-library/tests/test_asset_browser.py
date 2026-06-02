from __future__ import annotations

import importlib.util
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT_PATH = ROOT / "scripts" / "asset_browser.py"

spec = importlib.util.spec_from_file_location("asset_browser", SCRIPT_PATH)
asset_browser = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(asset_browser)


class AssetBrowserTests(unittest.TestCase):
    def setUp(self) -> None:
        self.registry = asset_browser.load_registry()
        self.assets = asset_browser.get_assets(self.registry)

    def test_family_counts_include_all_core_families(self) -> None:
        counts = asset_browser.family_counts(self.registry)

        self.assertEqual(counts["presentation"], 100)
        self.assertEqual(counts["interface"], 100)
        self.assertEqual(counts["workflow"], 100)
        self.assertEqual(counts["abstract"], 100)
        self.assertEqual(counts["status"], 100)
        self.assertEqual(counts["pattern"], 100)

    def test_search_filters_by_family_and_query(self) -> None:
        results = asset_browser.filter_assets(self.assets, family="presentation", query="title", limit=5)

        self.assertTrue(results)
        self.assertTrue(all(asset["family"] == "presentation" for asset in results))
        self.assertTrue(all("title" in asset["id"] for asset in results))

    def test_snippet_contains_svg_path(self) -> None:
        asset = asset_browser.find_asset(self.registry, "presentation-title-slide-ink-cyan")
        snippet = asset_browser.build_img_snippet(asset)

        self.assertIn("design-asset-library/assets/svg/generated/presentation/title-slide-ink-cyan.svg", snippet)
        self.assertIn("<img", snippet)

    def test_gallery_writes_html_with_relative_svg_paths(self) -> None:
        with tempfile.TemporaryDirectory(dir=ROOT) as tmpdir:
            output_path = Path(tmpdir) / "gallery.html"
            asset_browser.write_gallery(self.registry, output_path, limit=3)
            html = output_path.read_text(encoding="utf-8")

        self.assertIn("Design Asset Gallery", html)
        self.assertIn("../assets/svg/generated/", html)


if __name__ == "__main__":
    unittest.main()
