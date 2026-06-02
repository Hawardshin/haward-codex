from __future__ import annotations

import json
import unittest
from pathlib import Path
from xml.etree import ElementTree


ROOT = Path(__file__).resolve().parents[1]
REGISTRY_PATH = ROOT / "data" / "asset-registry.json"


class AssetRegistryTests(unittest.TestCase):
    def load_registry(self) -> dict:
        return json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))

    def test_registry_has_many_generated_assets(self) -> None:
        registry = self.load_registry()

        self.assertGreaterEqual(len(registry["generated_assets"]), 500)
        self.assertEqual(registry["generation_policy"]["rights_status"], "generated_in_repository")

    def test_generated_asset_ids_are_unique(self) -> None:
        assets = self.load_registry()["generated_assets"]
        ids = [asset["id"] for asset in assets]

        self.assertEqual(len(ids), len(set(ids)))

    def test_generated_svg_paths_exist_and_parse(self) -> None:
        for asset in self.load_registry()["generated_assets"]:
            path = ROOT / asset["path"]
            self.assertTrue(path.exists(), asset["path"])
            parsed = ElementTree.parse(path)
            self.assertTrue(parsed.getroot().tag.endswith("svg"))

    def test_external_candidates_are_not_downloaded(self) -> None:
        for candidate in self.load_registry()["external_source_candidates"]:
            self.assertFalse(candidate["downloaded"], candidate["id"])
            self.assertIn("verify current license", candidate["license_status"])


if __name__ == "__main__":
    unittest.main()
