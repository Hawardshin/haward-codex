import unittest
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))


class SmokeTests(unittest.TestCase):
    def test_template_imports(self) -> None:
        import agent_app

        self.assertIsNotNone(agent_app)


if __name__ == "__main__":
    unittest.main()
