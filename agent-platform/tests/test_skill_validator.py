from __future__ import annotations

import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.evaluation.skill_validator import SkillValidationInput, validate_skill_definition


VALID_SKILL = """---
name: example-skill
description: Create and validate a reusable example skill. Use when Codex must package a repeated workflow into a concise SKILL.md with validation and forward-test scenarios.
---

# Example Skill

## Workflow

Define the repeated workflow, keep instructions concise, validate the skill, and record forward-test scenarios before close-out.
"""


class SkillValidatorTests(unittest.TestCase):
    def test_valid_skill_passes(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            root = Path(tmp_dir)
            skill_dir = root / "_skills" / "example-skill"
            (skill_dir / "agents").mkdir(parents=True)
            (skill_dir / "SKILL.md").write_text(VALID_SKILL, encoding="utf-8")
            (skill_dir / "agents" / "openai.yaml").write_text("interface: {}\n", encoding="utf-8")

            report = validate_skill_definition(
                SkillValidationInput(
                    skill_path="_skills/example-skill",
                    intended_use="Package a repeated workflow.",
                    trigger_examples=("Create a skill for X.", "Update this skill after a failed run."),
                    validation_steps=("quick_validate.py passed",),
                    forward_test_scenarios=("Use $example-skill to solve a realistic task.",),
                    improvement_ideas=("Add fixture-based evals later.",),
                ),
                root,
            )

        self.assertEqual(report["status"], "skill_ready")
        self.assertFalse(report["requires_rework"])

    def test_todo_text_requires_rework(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            root = Path(tmp_dir)
            skill_dir = root / "_skills" / "todo-skill"
            skill_dir.mkdir(parents=True)
            skill_dir.joinpath("SKILL.md").write_text(
                """---
name: todo-skill
description: TODO
---

# TODO
""",
                encoding="utf-8",
            )

            report = validate_skill_definition(
                SkillValidationInput(
                    skill_path="_skills/todo-skill",
                    intended_use="Validate TODO detection.",
                    trigger_examples=("Make a skill.", "Update a skill."),
                    validation_steps=("manual check",),
                    forward_test_scenarios=("Use $todo-skill on a realistic task.",),
                ),
                root,
            )

        self.assertTrue(report["requires_rework"])
        self.assertIn("Frontmatter description still contains TODO text.", report["gaps"])
        self.assertIn("SKILL.md body still contains TODO text.", report["gaps"])

    def test_forward_test_scenarios_are_required(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            root = Path(tmp_dir)
            skill_dir = root / "_skills" / "example-skill"
            skill_dir.mkdir(parents=True)
            skill_dir.joinpath("SKILL.md").write_text(VALID_SKILL, encoding="utf-8")

            report = validate_skill_definition(
                SkillValidationInput(
                    skill_path="_skills/example-skill",
                    intended_use="Package a repeated workflow.",
                    trigger_examples=("Create a skill for X.", "Update this skill after a failed run."),
                    validation_steps=("quick_validate.py passed",),
                ),
                root,
            )

        self.assertTrue(report["requires_rework"])
        self.assertIn("Forward-test scenarios are missing.", report["gaps"])


if __name__ == "__main__":
    unittest.main()
