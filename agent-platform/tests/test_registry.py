from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.core.registry import AgentRegistry, load_agent_spec, load_registry_dir


class RegistryTests(unittest.TestCase):
    def test_load_agent_spec_from_json(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            path = Path(tmp_dir) / "agent.json"
            path.write_text(
                json.dumps(
                    {
                        "name": "test-agent",
                        "description": "Test agent",
                        "runtime": "python",
                        "skills": ["memory"],
                        "tools": ["search"],
                    }
                ),
                encoding="utf-8",
            )

            agent = load_agent_spec(path)

        self.assertEqual(agent.name, "test-agent")
        self.assertEqual(agent.skills, ("memory",))
        self.assertEqual(agent.tools, ("search",))

    def test_registry_rejects_duplicates(self) -> None:
        registry = AgentRegistry()
        with tempfile.TemporaryDirectory() as tmp_dir:
            path = Path(tmp_dir) / "agent.json"
            path.write_text(
                json.dumps({"name": "same", "description": "First"}),
                encoding="utf-8",
            )
            agent = load_agent_spec(path)

        registry.add(agent)
        with self.assertRaises(ValueError):
            registry.add(agent)

    def test_load_registry_dir_sorts_agents(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            root = Path(tmp_dir)
            (root / "b.json").write_text(
                json.dumps({"name": "b-agent", "description": "B"}),
                encoding="utf-8",
            )
            (root / "a.json").write_text(
                json.dumps({"name": "a-agent", "description": "A"}),
                encoding="utf-8",
            )

            registry = load_registry_dir(root)

        self.assertEqual([agent.name for agent in registry.list_agents()], ["a-agent", "b-agent"])


if __name__ == "__main__":
    unittest.main()
