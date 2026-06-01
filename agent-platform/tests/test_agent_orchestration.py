import unittest

from agent_platform.orchestration.agent_orchestration import check_agent_orchestration_registry


def valid_registry():
    return {
        "schema_version": "2026-06-02",
        "name": "agent-orchestration-registry",
        "purpose": "Define how platform agents are created and orchestrated.",
        "reader_guide": {"summary": "Read this before creating or orchestrating agents."},
        "reference_links": [{"id": "docs", "path": "agent-platform/docs/agent-orchestration-platform.ko.md"}],
        "structure_rules": [{"id": "keep-contract", "rule": "Keep the registry self-documenting."}],
        "field_guide": [{"field": "agent_blueprints", "meaning": "Reusable agent creation templates."}],
        "platform_principle": "Agents are reusable capability units with explicit state, tools, handoffs, and validation.",
        "agent_spec_contract": {
            "required_fields": ["name", "description", "runtime", "skills", "tools", "metadata"],
            "required_metadata": ["status", "trigger", "input_schema", "output_contract", "validation_commands"],
            "input_contract": "Each agent declares accepted input shape.",
            "output_contract": "Each agent declares expected output shape.",
        },
        "agent_blueprints": [
            {
                "blueprint_id": "research_agent",
                "purpose": "Gather and rank evidence.",
                "default_runtime": "python",
                "spec_template_path": "agent-platform/configs/agents/example-python-agent.json",
                "creation_gates": ["research", "spec", "validation"],
                "validation_commands": ["PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents"],
                "docs_targets": ["agent-platform/docs/agent-orchestration-platform.ko.md"],
            }
        ],
        "creation_pipeline": [
            {"step_id": "intake", "required_output": "request summary"},
            {"step_id": "blueprint_select", "required_output": "selected blueprint"},
            {"step_id": "spec_write", "required_output": "agent spec"},
            {"step_id": "validation", "required_output": "validation results"},
            {"step_id": "registry_update", "required_output": "registry entry"},
        ],
        "orchestration_patterns": [
            _pattern("single_agent"),
            _pattern("supervisor_router"),
            _pattern("sequential_pipeline"),
            _pattern("parallel_fanout_merge"),
            _pattern("handoff_network"),
        ],
        "orchestration_controls": [
            {"control_id": "state", "rule": "State must be explicit.", "verification": ["state contract"]},
            {"control_id": "handoff", "rule": "Handoffs must be explicit.", "verification": ["handoff contract"]},
            {"control_id": "tool_access", "rule": "Tools must be allowlisted.", "verification": ["tool list"]},
            {
                "control_id": "human_checkpoint",
                "rule": "Human decisions must checkpoint.",
                "verification": ["decision inbox"],
            },
            {"control_id": "observability", "rule": "Runs must be traceable.", "verification": ["logs"]},
            {"control_id": "resource", "rule": "Resources must be bounded.", "verification": ["resource guard"]},
            {"control_id": "evaluation", "rule": "Outputs must be evaluated.", "verification": ["evaluate-work"]},
        ],
        "lifecycle_gates": [
            {"gate_id": "intake", "required_evidence": ["request"]},
            {"gate_id": "research", "required_evidence": ["references"]},
            {"gate_id": "spec", "required_evidence": ["spec"]},
            {"gate_id": "creation", "required_evidence": ["agent spec"]},
            {"gate_id": "orchestration", "required_evidence": ["pattern"]},
            {"gate_id": "validation", "required_evidence": ["commands"]},
            {"gate_id": "evaluation", "required_evidence": ["report"]},
        ],
        "validation_commands": [
            "PYTHONPATH=src python3 -m agent_platform.cli check-agent-orchestration configs/orchestration/agent-orchestration-registry.json",
            "PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents",
            "PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/example-python-agent.json",
        ],
    }


def _pattern(pattern_id):
    return {
        "pattern_id": pattern_id,
        "use_when": "Use for tests.",
        "coordination_model": "deterministic",
        "state_contract": {"owner": "orchestrator"},
        "handoff_contract": {"mode": "none"},
        "observability_contract": {"log": "required"},
        "failure_policy": {"retry": "bounded"},
        "required_gates": ["intake", "validation", "evaluation"],
    }


class AgentOrchestrationTests(unittest.TestCase):
    def test_ready_registry(self):
        report = check_agent_orchestration_registry(valid_registry())

        self.assertEqual("ready", report["status"])
        self.assertFalse(report["requires_rework"])

    def test_missing_required_pattern_requires_rework(self):
        registry = valid_registry()
        registry["orchestration_patterns"] = [
            pattern for pattern in registry["orchestration_patterns"] if pattern["pattern_id"] != "handoff_network"
        ]

        report = check_agent_orchestration_registry(registry)

        self.assertTrue(report["requires_rework"])
        self.assertIn("handoff_network", "\n".join(report["gaps"]))

    def test_missing_agent_spec_field_requires_rework(self):
        registry = valid_registry()
        registry["agent_spec_contract"]["required_fields"] = ["name", "description"]

        report = check_agent_orchestration_registry(registry)

        self.assertTrue(report["requires_rework"])
        self.assertIn("metadata", "\n".join(report["gaps"]))

    def test_validation_commands_require_platform_commands(self):
        registry = valid_registry()
        registry["validation_commands"] = ["python3 -m unittest"]

        report = check_agent_orchestration_registry(registry)

        self.assertTrue(report["requires_rework"])
        self.assertIn("check-agent-orchestration", "\n".join(report["gaps"]))


if __name__ == "__main__":
    unittest.main()
