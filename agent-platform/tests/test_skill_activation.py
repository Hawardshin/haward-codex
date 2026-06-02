from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.evaluation.skill_activation import check_skill_activation


VALID_SKILL = """---
name: example-skill
description: Create and activate a reusable example skill. Use when a repeated workflow should become an installed Codex skill with clear trigger examples.
---

# Example Skill

Validate, install, and forward-test the skill before close-out.
"""


class SkillActivationTests(unittest.TestCase):
    def test_installed_synced_skill_is_ready(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            root = Path(tmp_dir)
            source = root / "_skills" / "example-skill"
            installed = root / "codex-home" / "skills" / "example-skill"
            (source / "agents").mkdir(parents=True)
            (installed / "agents").mkdir(parents=True)
            (source / "SKILL.md").write_text(VALID_SKILL, encoding="utf-8")
            (installed / "SKILL.md").write_text(VALID_SKILL, encoding="utf-8")
            (source / "agents" / "openai.yaml").write_text("interface: {}\n", encoding="utf-8")
            (installed / "agents" / "openai.yaml").write_text("interface: {}\n", encoding="utf-8")

            report = check_skill_activation(
                {
                    "skills": [
                        {
                            "name": "example-skill",
                            "source_path": "_skills/example-skill",
                            "installed_path": "codex-home/skills/example-skill",
                            "auto_activation_expected": True,
                            "trigger_examples": ["Create a skill for this repeated workflow.", "Improve this skill trigger."],
                            "negative_examples": ["Do a one-off task."],
                            "sync_files": ["SKILL.md", "agents/openai.yaml"],
                        }
                    ]
                },
                root,
            )

        self.assertEqual(report["status"], "activation_ready")
        self.assertFalse(report["requires_rework"])

    def test_missing_installed_copy_blocks_auto_activation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            root = Path(tmp_dir)
            source = root / "_skills" / "example-skill"
            source.mkdir(parents=True)
            (source / "SKILL.md").write_text(VALID_SKILL, encoding="utf-8")

            report = check_skill_activation(
                {
                    "skills": [
                        {
                            "name": "example-skill",
                            "source_path": "_skills/example-skill",
                            "installed_path": "codex-home/skills/example-skill",
                            "auto_activation_expected": True,
                            "trigger_examples": ["Create a skill.", "Improve a skill."],
                            "sync_files": ["SKILL.md"],
                        }
                    ]
                },
                root,
            )

        self.assertTrue(report["requires_rework"])
        self.assertTrue(any("installed_path missing" in gap for gap in report["gaps"]))

    def test_installed_drift_blocks_auto_activation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            root = Path(tmp_dir)
            source = root / "_skills" / "example-skill"
            installed = root / "codex-home" / "skills" / "example-skill"
            source.mkdir(parents=True)
            installed.mkdir(parents=True)
            (source / "SKILL.md").write_text(VALID_SKILL, encoding="utf-8")
            (installed / "SKILL.md").write_text(VALID_SKILL.replace("trigger examples", "different copy"), encoding="utf-8")

            report = check_skill_activation(
                {
                    "skills": [
                        {
                            "name": "example-skill",
                            "source_path": "_skills/example-skill",
                            "installed_path": "codex-home/skills/example-skill",
                            "auto_activation_expected": True,
                            "trigger_examples": ["Create a skill.", "Improve a skill."],
                            "sync_files": ["SKILL.md"],
                        }
                    ]
                },
                root,
            )

        self.assertTrue(report["requires_rework"])
        self.assertTrue(any("not in sync" in gap for gap in report["gaps"]))


if __name__ == "__main__":
    unittest.main()
