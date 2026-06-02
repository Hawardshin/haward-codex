from __future__ import annotations

import json
import unittest
from pathlib import Path
from xml.etree import ElementTree


ROOT = Path(__file__).resolve().parents[1]
REGISTRY_PATH = ROOT / "data" / "external-asset-registry.json"


class ExternalAssetRegistryTests(unittest.TestCase):
    def load_registry(self) -> dict:
        return json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))

    def test_registry_has_many_collected_assets(self) -> None:
        registry = self.load_registry()

        self.assertGreaterEqual(len(registry["collected_assets"]), 3000)
        self.assertEqual(registry["collection_summary"]["rights_status"], "external_open_source_collected_with_license_files")

    def test_source_counts_are_recorded(self) -> None:
        source_counts = self.load_registry()["collection_summary"]["source_counts"]

        self.assertEqual(source_counts["lucide"], 800)
        self.assertEqual(source_counts["heroicons"], 648)
        self.assertEqual(source_counts["bootstrap-icons"], 800)
        self.assertEqual(source_counts["tabler-icons"], 800)

    def test_collected_asset_ids_are_unique(self) -> None:
        assets = self.load_registry()["collected_assets"]
        ids = [asset["id"] for asset in assets]

        self.assertEqual(len(ids), len(set(ids)))

    def test_source_license_and_notice_files_exist(self) -> None:
        for manifest in self.load_registry()["source_manifests"]:
            license_path = ROOT / manifest["local_license_path"]
            notice_path = ROOT / manifest["local_source_notice_path"]

            self.assertTrue(license_path.exists(), license_path)
            self.assertTrue(notice_path.exists(), notice_path)

    def test_collected_svg_paths_exist_and_parse(self) -> None:
        for asset in self.load_registry()["collected_assets"]:
            path = ROOT / asset["path"]
            self.assertTrue(path.exists(), asset["path"])
            parsed = ElementTree.parse(path)
            self.assertTrue(parsed.getroot().tag.endswith("svg"))


if __name__ == "__main__":
    unittest.main()
