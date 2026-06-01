from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path

TOOL_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(TOOL_ROOT / "src"))

from coding_project_bootstrap import (
    apply_plan,
    build_plan,
    default_config_path,
    list_blueprints,
    load_json,
    validate_config,
)


class CodingProjectBootstrapTests(unittest.TestCase):
    def setUp(self) -> None:
        self.config = load_json(default_config_path())

    def test_blueprint_config_is_valid(self) -> None:
        self.assertEqual([], validate_config(self.config))
        blueprint_ids = {item["id"] for item in list_blueprints(self.config)["blueprints"]}
        self.assertIn("python-agent", blueprint_ids)
        self.assertIn("next-app", blueprint_ids)
        self.assertIn("spring-boot", blueprint_ids)

    def test_plan_python_cli_project(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir).resolve()
            plan = build_plan(
                workspace_root=root,
                config=self.config,
                project_name="sample-cli",
                blueprint_id="python-cli",
                register=False,
            )

            planned_files = {path.path.relative_to(root).as_posix() for path in plan.files}
            self.assertIn("sample-cli/README.md", planned_files)
            self.assertIn("sample-cli/pyproject.toml", planned_files)
            self.assertIn("sample-cli/src/sample_cli/cli.py", planned_files)
            self.assertFalse(plan.register)

    def test_apply_plan_creates_files(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir).resolve()
            plan = build_plan(
                workspace_root=root,
                config=self.config,
                project_name="sample-agent",
                blueprint_id="python-agent",
                register=False,
            )

            apply_plan(plan)

            self.assertTrue((root / "sample-agent" / "README.md").exists())
            context = json.loads((root / "sample-agent" / "configs" / "project-context.json").read_text(encoding="utf-8"))
            self.assertEqual("sample-agent", context["project_name"])
            self.assertEqual("python-agent", context["blueprint_id"])

    def test_register_root_project(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir).resolve()
            registry_path = root / "_ops" / "projects"
            registry_path.mkdir(parents=True)
            (registry_path / "registry.json").write_text(
                json.dumps({"version": 1, "updated": "2026-06-01", "projects": []}, indent=2) + "\n",
                encoding="utf-8",
            )
            plan = build_plan(
                workspace_root=root,
                config=self.config,
                project_name="sample-web",
                blueprint_id="next-app",
                register=True,
            )

            apply_plan(plan)

            registry = json.loads((registry_path / "registry.json").read_text(encoding="utf-8"))
            self.assertEqual("sample-web", registry["projects"][0]["name"])
            self.assertIn("sample-web/app/", registry["projects"][0]["project_specific_home"])

    def test_register_requires_root_project_target(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir).resolve()
            with self.assertRaises(ValueError):
                build_plan(
                    workspace_root=root,
                    config=self.config,
                    project_name="nested-tool",
                    blueprint_id="generic",
                    target_dir="some-project/tools/nested-tool",
                    register=True,
                )


if __name__ == "__main__":
    unittest.main()
