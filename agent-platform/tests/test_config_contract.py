from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.governance.config_contract import check_config_contract


def self_documenting_config() -> dict[str, object]:
    return {
        "schema_version": "2026-05-31",
        "name": "example",
        "purpose": "Explain an example config.",
        "reader_guide": {
            "summary": "This config explains itself.",
            "how_to_read": ["Read purpose, then structure rules, then settings."],
            "owner": "agent-platform",
            "last_reviewed": "2026-05-31",
            "update_triggers": ["When a rule changes."],
        },
        "reference_links": [
            {
                "id": "policy",
                "title": "Internal policy",
                "path": "_docs/policy.md",
                "source_type": "internal",
                "used_for": ["local rule"],
                "last_checked": "2026-05-31",
            }
        ],
        "structure_rules": [
            {
                "id": "keep_reader_guide",
                "rule": "Keep reader_guide current.",
                "reason": "Humans need to understand the config.",
                "applies_to": ["reader_guide"],
            }
        ],
        "field_guide": [
            {
                "field": "name",
                "meaning": "Stable config identifier.",
                "required": True,
            }
        ],
    }


class ConfigContractTests(unittest.TestCase):
    def test_self_documenting_config_is_ready(self) -> None:
        report = check_config_contract(self_documenting_config(), "example.json")

        self.assertEqual(report["status"], "self_documenting")
        self.assertEqual(report["gaps"], [])

    def test_missing_reference_links_is_gap(self) -> None:
        config = self_documenting_config()
        config.pop("reference_links")

        report = check_config_contract(config, "example.json")

        self.assertEqual(report["status"], "documentation_contract_required")
        self.assertIn("example.json: missing top-level self-documenting fields: reference_links.", report["gaps"])

    def test_reference_link_needs_url_or_path(self) -> None:
        config = self_documenting_config()
        config["reference_links"] = [
            {
                "id": "broken",
                "title": "Broken reference",
                "source_type": "official",
                "used_for": ["testing"],
                "last_checked": "2026-05-31",
            }
        ]

        report = check_config_contract(config, "example.json")

        self.assertIn("example.json: reference_links[1] must include url or path.", report["gaps"])

    def test_field_guide_requires_bool_required_flag(self) -> None:
        config = self_documenting_config()
        config["field_guide"] = [{"field": "name", "meaning": "Name", "required": "yes"}]

        report = check_config_contract(config, "example.json")

        self.assertIn("example.json: field_guide[1].required must be a bool.", report["gaps"])


if __name__ == "__main__":
    unittest.main()
