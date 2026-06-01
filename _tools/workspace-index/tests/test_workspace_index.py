import json
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / "_tools" / "workspace-index" / "src"))

from workspace_index import load_root_folder_metadata, render_repository_map


class WorkspaceIndexTests(unittest.TestCase):
    def make_repo(self) -> Path:
        root = Path(tempfile.mkdtemp(prefix="workspace-index-test-"))
        (root / "_ops" / "projects").mkdir(parents=True)
        (root / "_docs").mkdir()
        (root / "_private").mkdir()
        (root / ".cursor").mkdir()
        (root / "demo").mkdir()
        (root / "demo" / "README.md").write_text("# Demo\n", encoding="utf-8")
        (root / "_ops" / "projects" / "root-structure-policy.json").write_text(
            json.dumps(
                {
                    "project_registry_path": "_ops/projects/registry.json",
                    "reserved_operational_dirs": [
                        {"name": "_docs", "purpose": "Workspace docs."},
                        {"name": "_ops", "purpose": "Operations."},
                    ],
                    "local_only_dirs": [
                        {"name": "_private", "purpose": "Local private state."}
                    ],
                    "runtime_adapter_dirs": [
                        {"name": ".cursor", "purpose": "Cursor adapter."}
                    ],
                    "generated_output_dirs": [
                        {"pattern": "**/out/"},
                        {"pattern": "**/.next/"},
                    ],
                }
            ),
            encoding="utf-8",
        )
        (root / "_ops" / "projects" / "registry.json").write_text(
            json.dumps(
                {
                    "projects": [
                        {
                            "name": "demo",
                            "path": "demo/",
                            "purpose": "Demo project.",
                        }
                    ]
                }
            ),
            encoding="utf-8",
        )
        return root

    def test_load_root_folder_metadata_uses_policy_and_registry(self):
        metadata = load_root_folder_metadata(self.make_repo())

        self.assertEqual(metadata["_docs"]["class"], "reserved_operational")
        self.assertEqual(metadata["_private"]["class"], "local_only")
        self.assertEqual(metadata[".cursor"]["class"], "runtime_adapter")
        self.assertEqual(metadata["demo"]["class"], "registered_project")
        self.assertEqual(metadata["demo"]["purpose"], "Demo project.")

    def test_repository_map_includes_class_and_runtime_adapter_roots(self):
        rendered = render_repository_map(self.make_repo())

        self.assertIn("| Path | Class | Purpose | Source |", rendered)
        self.assertIn("| `.cursor/` | runtime_adapter | Cursor adapter.", rendered)
        self.assertIn("| `demo/` | registered_project | Demo project.", rendered)

    def test_repository_map_ignores_generated_output_patterns(self):
        root = self.make_repo()
        (root / "demo" / "out").mkdir()
        (root / "demo" / "out" / "index.html").write_text("<!doctype html>\n", encoding="utf-8")
        (root / "demo" / ".next").mkdir()
        (root / "demo" / ".next" / "cache.txt").write_text("cache\n", encoding="utf-8")

        rendered = render_repository_map(root)

        self.assertNotIn("demo/out/index.html", rendered)
        self.assertNotIn("demo/.next/cache.txt", rendered)


if __name__ == "__main__":
    unittest.main()
