import json
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / "_tools" / "docs-audit" / "src"))

from docs_audit import audit_docs


class DocsAuditTests(unittest.TestCase):
    def make_repo(self) -> Path:
        root = Path(tempfile.mkdtemp(prefix="docs-audit-test-"))
        docs = root / "_docs"
        (docs / "instructions").mkdir(parents=True)
        (docs / "policies").mkdir()
        for folder in ["instructions", "policies"]:
            (docs / folder / "README.ko.md").write_text("# Index\n", encoding="utf-8")
            (docs / folder / "README.en.md").write_text("# Index\n", encoding="utf-8")
        (docs / "README.ko.md").write_text("# Docs\n", encoding="utf-8")
        (docs / "README.en.md").write_text("# Docs\n", encoding="utf-8")
        (docs / "instructions" / "persistent-instructions.ko.md").write_text("# Korean\n", encoding="utf-8")
        (docs / "instructions" / "persistent-instructions.en.md").write_text("# English\n", encoding="utf-8")
        (docs / "policies" / "source-collection-policy.ko.md").write_text("# Korean\n", encoding="utf-8")
        (docs / "policies" / "source-collection-policy.en.md").write_text("# English\n", encoding="utf-8")
        (docs / "registry.json").write_text(
            json.dumps(
                {
                    "docs_root": "_docs",
                    "allowed_root_files": ["README.ko.md", "README.en.md"],
                    "categories": [
                        {
                            "id": "instructions",
                            "path": "_docs/instructions",
                            "include_patterns": ["persistent-instructions*.md"],
                            "required_index_files": ["README.ko.md", "README.en.md"],
                        },
                        {
                            "id": "policies",
                            "path": "_docs/policies",
                            "include_patterns": ["*-policy.ko.md", "*-policy.en.md"],
                            "required_index_files": ["README.ko.md", "README.en.md"],
                        },
                    ],
                    "required_documents": [
                        "_docs/instructions/persistent-instructions.ko.md",
                        "_docs/instructions/persistent-instructions.en.md",
                    ],
                    "language_pair_policy": {"exceptions": []},
                }
            ),
            encoding="utf-8",
        )
        return root

    def test_clean_docs_pass(self):
        report = audit_docs(self.make_repo())

        self.assertEqual(report["status"], "docs_ready")
        self.assertFalse(report["gaps"])

    def test_root_markdown_file_is_gap(self):
        root = self.make_repo()
        (root / "_docs" / "loose.md").write_text("# Loose\n", encoding="utf-8")

        report = audit_docs(root)

        self.assertTrue(any("not allowed at _docs root" in gap for gap in report["gaps"]))

    def test_missing_language_companion_is_gap(self):
        root = self.make_repo()
        (root / "_docs" / "policies" / "source-collection-policy.en.md").unlink()

        report = audit_docs(root)

        self.assertTrue(any("Language companion" in gap for gap in report["gaps"]))

    def test_category_pattern_mismatch_is_gap(self):
        root = self.make_repo()
        (root / "_docs" / "policies" / "notes.md").write_text("# Notes\n", encoding="utf-8")

        report = audit_docs(root)

        self.assertTrue(any("include_patterns" in gap for gap in report["gaps"]))


if __name__ == "__main__":
    unittest.main()
