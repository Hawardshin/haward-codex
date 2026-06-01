import json
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / "_tools" / "naming-audit" / "src"))

from naming_audit import audit_naming


class NamingAuditTests(unittest.TestCase):
    def make_repo(self) -> Path:
        root = Path(tempfile.mkdtemp(prefix="naming-audit-test-"))
        (root / "_ops" / "naming").mkdir(parents=True)
        (root / "_ops" / "projects").mkdir(parents=True)
        (root / "_docs" / "governance").mkdir(parents=True)
        (root / "_tools" / "demo-tool" / "src").mkdir(parents=True)
        (root / "_skills" / "demo-skill").mkdir(parents=True)
        (root / "_specs" / "workspace-platform" / "2026-06-01-demo-work").mkdir(parents=True)
        (root / "demo-project" / "src" / "demo_project").mkdir(parents=True)
        (root / "demo-project" / "specs" / "2026-06-01-demo-project").mkdir(parents=True)
        (root / "agent-platform" / "configs").mkdir(parents=True)

        self.write_json(
            root / "_ops" / "naming" / "naming-policy.json",
            {
                "exceptions": [
                    {"name": "README.md"},
                    {"name": "README.ko.md"},
                    {"name": "README.en.md"},
                    {"name": "__init__.py"},
                ]
            },
        )
        self.write_json(
            root / "_ops" / "projects" / "registry.json",
            {"projects": [{"name": "demo-project", "path": "demo-project/"}]},
        )
        self.write_json(
            root / "_ops" / "projects" / "root-structure-policy.json",
            {
                "reserved_operational_dirs": [{"name": "_docs"}, {"name": "_ops"}],
                "runtime_adapter_dirs": [{"name": ".cursor"}],
            },
        )
        self.write_json(root / "agent-platform" / "configs" / "demo-config.json", {"name": "demo-config"})
        (root / "_docs" / "governance" / "demo-governance.ko.md").write_text("# Demo\n", encoding="utf-8")
        (root / "_tools" / "demo-tool" / "src" / "demo_tool.py").write_text("", encoding="utf-8")
        (root / "demo-project" / "src" / "demo_project" / "__init__.py").write_text("", encoding="utf-8")
        return root

    def write_json(self, path: Path, data: dict) -> None:
        path.write_text(json.dumps(data), encoding="utf-8")

    def test_clean_repo_passes(self):
        report = audit_naming(self.make_repo())

        self.assertFalse(report["requires_rework"])
        self.assertEqual(report["status"], "clean")

    def test_invalid_names_are_reported(self):
        root = self.make_repo()
        (root / "_tools" / "BadTool").mkdir()
        (root / "_docs" / "governance" / "Bad Name.md").write_text("# Bad\n", encoding="utf-8")

        report = audit_naming(root)

        self.assertTrue(report["requires_rework"])
        self.assertTrue(any("BadTool" in gap for gap in report["gaps"]))
        self.assertTrue(any("Bad Name.md" in gap for gap in report["gaps"]))


if __name__ == "__main__":
    unittest.main()
