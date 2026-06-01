from __future__ import annotations

import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.memory.bootstrap import MemoryAnchor, MemoryBootstrapManifest, check_memory_bootstrap


class MemoryBootstrapTests(unittest.TestCase):
    def test_ready_when_required_hot_anchors_exist(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            (root / "AGENTS.md").write_text("rules", encoding="utf-8")
            (root / "_docs" / "instructions").mkdir(parents=True)
            (root / "_docs" / "instructions" / "persistent-instructions.md").write_text("memory", encoding="utf-8")

            report = check_memory_bootstrap(
                MemoryBootstrapManifest(
                    name="test",
                    schema_version="2026-05-31",
                    purpose="Load memory.",
                    anchors=(
                        MemoryAnchor("repo_rules", "AGENTS.md", "hot", "Rules", True, 1),
                        MemoryAnchor("persistent", "_docs/instructions/persistent-instructions.md", "hot", "Persistent rules", True, 2),
                    ),
                    startup_sequence=("repo_rules", "persistent"),
                    required_anchor_ids=("repo_rules", "persistent"),
                ),
                root,
            )

        self.assertEqual(report["status"], "ready_to_bootstrap")
        self.assertEqual(report["hot_context_paths"], ["AGENTS.md", "_docs/instructions/persistent-instructions.md"])
        self.assertEqual(report["gaps"], [])

    def test_missing_required_anchor_path_blocks_bootstrap(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            report = check_memory_bootstrap(
                MemoryBootstrapManifest(
                    name="test",
                    schema_version="2026-05-31",
                    purpose="Load memory.",
                    anchors=(MemoryAnchor("repo_rules", "AGENTS.md", "hot", "Rules"),),
                    startup_sequence=("repo_rules",),
                    required_anchor_ids=("repo_rules",),
                ),
                Path(temp_dir),
            )

        self.assertEqual(report["status"], "memory_bootstrap_required")
        self.assertIn("Required memory anchor path does not exist: AGENTS.md.", report["gaps"])

    def test_unknown_startup_sequence_anchor_is_gap(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            (root / "AGENTS.md").write_text("rules", encoding="utf-8")

            report = check_memory_bootstrap(
                MemoryBootstrapManifest(
                    name="test",
                    schema_version="2026-05-31",
                    purpose="Load memory.",
                    anchors=(MemoryAnchor("repo_rules", "AGENTS.md", "hot", "Rules"),),
                    startup_sequence=("missing",),
                    required_anchor_ids=("repo_rules",),
                ),
                root,
            )

        self.assertEqual(report["status"], "memory_bootstrap_required")
        self.assertIn("Startup sequence references unknown anchor: missing.", report["gaps"])

    def test_hot_context_limit_warns(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            for index in range(2):
                (root / f"file-{index}.md").write_text("memory", encoding="utf-8")

            report = check_memory_bootstrap(
                MemoryBootstrapManifest(
                    name="test",
                    schema_version="2026-05-31",
                    purpose="Load memory.",
                    anchors=(
                        MemoryAnchor("one", "file-0.md", "hot", "One"),
                        MemoryAnchor("two", "file-1.md", "hot", "Two"),
                    ),
                    required_anchor_ids=("one", "two"),
                    hot_context_limit=1,
                ),
                root,
            )

        self.assertEqual(report["status"], "ready_to_bootstrap")
        self.assertIn("Hot memory anchor count exceeds limit 1; move lower-priority anchors to warm or cold.", report["warnings"])


if __name__ == "__main__":
    unittest.main()
