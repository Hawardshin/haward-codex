import json
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / "_tools" / "structure-audit" / "src"))

from structure_audit import audit_structure


class StructureAuditTests(unittest.TestCase):
    def make_repo(self) -> Path:
        root = Path(tempfile.mkdtemp(prefix="structure-audit-test-"))
        (root / "_ops" / "projects").mkdir(parents=True)
        (root / "_docs").mkdir()
        (root / "demo").mkdir()
        (root / "demo" / "README.md").write_text("# Demo\n", encoding="utf-8")
        (root / ".gitignore").write_text("/_private/\n/outputs/\n", encoding="utf-8")
        (root / "_ops" / "projects" / "registry.json").write_text(
            json.dumps({"projects": [{"name": "demo", "path": "demo/"}]}),
            encoding="utf-8",
        )
        (root / "_ops" / "projects" / "root-structure-policy.json").write_text(
            json.dumps(
                {
                    "project_registry_path": "_ops/projects/registry.json",
                    "reserved_operational_dirs": [{"name": "_docs"}, {"name": "_ops"}],
                    "local_only_dirs": [{"name": "_private"}, {"name": "outputs"}],
                }
            ),
            encoding="utf-8",
        )
        return root

    def test_clean_structure_passes(self):
        root = self.make_repo()
        (root / "_private").mkdir()
        (root / "outputs").mkdir()

        report = audit_structure(root)

        self.assertEqual(report["status"], "clean")
        self.assertFalse(report["gaps"])

    def test_unknown_root_directory_is_gap(self):
        root = self.make_repo()
        (root / "loose-folder").mkdir()

        report = audit_structure(root)

        self.assertEqual(report["status"], "structure_rework_required")
        self.assertTrue(any("loose-folder" in gap for gap in report["gaps"]))

    def test_registered_project_requires_readme(self):
        root = self.make_repo()
        (root / "demo" / "README.md").unlink()

        report = audit_structure(root)

        self.assertTrue(any("README.md" in gap for gap in report["gaps"]))


if __name__ == "__main__":
    unittest.main()
