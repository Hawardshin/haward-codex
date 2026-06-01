from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from presentation_agent.artifact_pptx import create_artifact_workspace


PROJECT_ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATH = PROJECT_ROOT / "data" / "reference-index" / "starter-reference-catalog.json"
SPEC_PATH = PROJECT_ROOT / "data" / "deck-specs" / "presentation-agent-kickoff.ko.json"


class ArtifactPptxWorkspaceTests(unittest.TestCase):
    def test_creates_artifact_tool_workspace_from_deck_spec(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            workspace = Path(temp_dir) / "ppt-workspace"

            manifest = create_artifact_workspace(SPEC_PATH, workspace, catalog_path=CATALOG_PATH)

            self.assertEqual(6, manifest["slide_count"])
            self.assertTrue((workspace / "slides" / "slide-01.mjs").exists())
            self.assertTrue((workspace / "source-notes.md").exists())
            self.assertIn("build_artifact_deck.mjs", manifest["builder_command"])

    def test_slide_modules_include_editable_artifact_tool_shapes(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            workspace = Path(temp_dir) / "ppt-workspace"

            create_artifact_workspace(SPEC_PATH, workspace, catalog_path=CATALOG_PATH)

            first_slide = (workspace / "slides" / "slide-01.mjs").read_text(encoding="utf-8")
            self.assertIn("presentation.slides.add()", first_slide)
            self.assertIn("ctx.addText", first_slide)
            self.assertIn("ctx.addShape", first_slide)


if __name__ == "__main__":
    unittest.main()

