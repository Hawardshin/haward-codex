import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / "_tools" / "workspace-health" / "src"))

from workspace_health import build_checks, discover_tool_test_dirs


class WorkspaceHealthTests(unittest.TestCase):
    def make_repo(self) -> Path:
        root = Path(tempfile.mkdtemp(prefix="workspace-health-test-"))
        (root / "_tools" / "alpha" / "tests").mkdir(parents=True)
        (root / "_tools" / "beta" / "src").mkdir(parents=True)
        (root / "agent-platform").mkdir()
        (root / "presentation-agent").mkdir()
        (root / "workspace-monitor").mkdir()
        (root / "workspace-monitor" / "package.json").write_text("{}", encoding="utf-8")
        return root

    def test_discover_tool_test_dirs(self):
        root = self.make_repo()

        discovered = discover_tool_test_dirs(root)

        self.assertEqual([path.parent.name for path in discovered], ["alpha"])

    def test_build_checks_includes_core_projects_and_tool_tests(self):
        checks = build_checks(self.make_repo())
        names = [check.name for check in checks]

        self.assertIn("docs audit", names)
        self.assertIn("agent-platform tests", names)
        self.assertIn("presentation-agent tests", names)
        self.assertIn("tool tests: alpha", names)
        self.assertIn("workspace-monitor tests", names)
        self.assertNotIn("workspace-monitor build", names)

    def test_include_build_adds_workspace_monitor_build(self):
        checks = build_checks(self.make_repo(), include_build=True)

        self.assertIn("workspace-monitor build", [check.name for check in checks])


if __name__ == "__main__":
    unittest.main()
