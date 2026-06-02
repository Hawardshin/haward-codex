import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / "_tools" / "workspace-health" / "src"))

from workspace_health.checks import build_checks, discover_tool_test_dirs, filter_checks
from workspace_health.runner import serialize_check


class WorkspaceHealthTests(unittest.TestCase):
    def make_repo(self) -> Path:
        root = Path(tempfile.mkdtemp(prefix="workspace-health-test-"))
        (root / "_tools" / "alpha" / "tests").mkdir(parents=True)
        (root / "_tools" / "beta" / "src").mkdir(parents=True)
        (root / "agent-platform").mkdir()
        (root / "presentation-agent").mkdir()
        (root / "presentation-agent" / "package.json").write_text("{}", encoding="utf-8")
        (root / "platform-desktop-app").mkdir()
        (root / "platform-desktop-app" / "package.json").write_text("{}", encoding="utf-8")
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
        self.assertIn("naming audit", names)
        self.assertIn("privacy audit", names)
        self.assertIn("philosophy traceability", names)
        self.assertIn("agent-platform tests", names)
        self.assertIn("presentation-agent tests", names)
        self.assertIn("presentation-agent browser validation", names)
        self.assertIn("platform-desktop-app tests", names)
        self.assertIn("platform-desktop-app readiness", names)
        self.assertIn("tool tests: alpha", names)
        self.assertIn("workspace-monitor tests", names)
        self.assertNotIn("workspace-monitor build", names)

    def test_include_build_adds_workspace_monitor_build(self):
        checks = build_checks(self.make_repo(), include_build=True)

        self.assertIn("workspace-monitor build", [check.name for check in checks])

    def test_filter_checks_by_category(self):
        checks = build_checks(self.make_repo(), include_build=True)
        filtered = filter_checks(checks, ["frontend"])

        self.assertTrue(filtered)
        self.assertTrue(all(check.category == "frontend" for check in filtered))

    def test_serialize_check_uses_relative_cwd_and_category(self):
        root = self.make_repo()
        check = filter_checks(build_checks(root), ["projects"])[0]

        data = serialize_check(check, root)

        self.assertIn(data["category"], {"projects"})
        self.assertNotIn(str(root), data["cwd"])

    def test_legacy_wrapper_preserves_script_entrypoint(self):
        wrapper = ROOT / "_tools" / "workspace-health" / "src" / "workspace_health.py"

        self.assertTrue(wrapper.exists())


if __name__ == "__main__":
    unittest.main()
