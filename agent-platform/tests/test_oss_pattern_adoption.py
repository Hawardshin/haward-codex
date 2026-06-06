from __future__ import annotations

import copy
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.oss.pattern_adoption import check_pattern_adoption_plan


def _valid_plan() -> dict:
    return {
        "schema_version": "1.0",
        "name": "oss-pattern-adoption-test",
        "purpose": "Test OSS pattern adoption validation.",
        "reader_guide": {
            "summary": "Test fixture.",
            "how_to_read": ["Read sources, patterns, decisions, and validation commands."],
            "owner": "agent-platform",
            "last_reviewed": "2026-06-06",
            "update_triggers": ["When OSS pattern adoption rules change."],
        },
        "reference_links": [
            {
                "id": "source-a",
                "title": "Source A",
                "url": "https://github.com/example/source-a",
                "source_type": "repository",
                "used_for": ["Pattern fixture."],
                "last_checked": "2026-06-06",
            }
        ],
        "structure_rules": [
            {
                "id": "direct-import-gates",
                "rule": "Direct code imports require license, provenance, attribution, tests, rollback, and human review.",
                "reason": "Avoid unsafe copying.",
                "applies_to": ["adoption_decisions"],
            }
        ],
        "field_guide": [
            {"field": "source_repositories", "meaning": "Repositories inspected for patterns.", "required": True},
            {"field": "adoption_decisions", "meaning": "Decisions that drive implementation.", "required": True},
        ],
        "platform_context": "The platform prefers Python validators and local adapters before imported framework code.",
        "source_repositories": [
            _source_repo("source_a", "Python", "permissive", 100),
            _source_repo("source_b", "TypeScript", "unclear", 90),
            _source_repo("source_c", "C#", "permissive", 80),
        ],
        "pattern_candidates": [
            _pattern("pattern_a", ["source_a"]),
            _pattern("pattern_b", ["source_b"]),
            _pattern("pattern_c", ["source_c"]),
        ],
        "language_runtime_options": [
            {
                "option_id": "python",
                "language_or_runtime": "Python",
                "use_when": "Default deterministic validators and CLI checks.",
                "tradeoffs": "Best local fit, less suited for browser UI modules.",
                "tooling": "unittest and argparse.",
                "project_boundary_fit": "Fits agent-platform.",
            },
            {
                "option_id": "typescript",
                "language_or_runtime": "TypeScript",
                "use_when": "Provider packages or UI modules need typed frontend ecosystem.",
                "tradeoffs": "Requires separate build and adapter boundary.",
                "tooling": "npm and tsc.",
                "project_boundary_fit": "Fits only behind a package boundary.",
            },
        ],
        "selected_language_option_id": "python",
        "architecture_options": [
            {
                "option_id": "extend-validator",
                "name": "Extend validator",
                "fit": "Adds a deterministic gate.",
                "tradeoffs": "No imported framework runtime.",
                "decision": "selected",
            },
            {
                "option_id": "clone-framework",
                "name": "Clone framework",
                "fit": "Can copy features quickly if fully cleared.",
                "tradeoffs": "Higher license and maintenance risk.",
                "decision": "rejected for this slice",
            },
        ],
        "selected_architecture_option_id": "extend-validator",
        "folder_structure_options": [
            {
                "option_id": "oss-module",
                "name": "Existing OSS module",
                "semantics": "Keep OSS evaluation under agent_platform.oss.",
                "tradeoffs": "Smallest change.",
                "decision": "selected",
            },
            {
                "option_id": "new-root-project",
                "name": "New root project",
                "semantics": "Separate product boundary.",
                "tradeoffs": "Too broad for validation logic.",
                "decision": "rejected",
            },
        ],
        "selected_folder_structure_option_id": "oss-module",
        "clone_import_policy": {
            "direct_code_import_allowed": False,
            "allowed_clone_scopes": ["read-only inspection", "temporary isolated comparison"],
            "required_gates": [
                "license_review",
                "pinned_commit",
                "attribution",
                "tests",
                "rollback",
                "human_checkpoint",
            ],
            "disallowed_conditions": ["unclear license", "missing pinned commit"],
        },
        "hybrid_module_plan": {
            "enabled": True,
            "candidate_languages": [
                {
                    "language": "TypeScript",
                    "use_when": "Provider SDK module is better implemented in the JS ecosystem.",
                    "build_command": "npm run build",
                    "artifact_contract": "Emit a versioned CLI or JSON-over-stdio adapter.",
                    "risks": "Separate dependency and build lifecycle.",
                }
            ],
            "build_boundary": "Hybrid modules build outside the Python package and communicate through a stable adapter.",
            "interface_contract": "JSON input/output with versioned schema.",
            "verification_commands": ["npm run build", "PYTHONPATH=src python3 -m unittest discover -s tests"],
            "rollback_plan": "Disable the adapter and remove the hybrid package from config.",
        },
        "adoption_decisions": [
            _decision("adopt_a", "pattern_a", "adopt", "native_python"),
            _decision("trial_b", "pattern_b", "trial", "hybrid_module"),
        ],
        "validation_commands": [
            "PYTHONPATH=src python3 -m agent_platform.cli check-oss-pattern-adoption configs/open-source/pattern-adoption-template.json"
        ],
    }


def _source_repo(repo_id: str, language: str, license_status: str, stars: int) -> dict:
    return {
        "repo_id": repo_id,
        "name": repo_id,
        "url": f"https://github.com/example/{repo_id}",
        "source_type": "repository",
        "checked_date": "2026-06-06",
        "primary_language": language,
        "license_status": license_status,
        "stars": stars,
        "adoption_signal_role": "Adoption signal only; not standalone proof.",
        "inspected_paths": ["src"],
        "useful_patterns": ["local adapter boundary"],
        "caveats": "Fixture.",
    }


def _pattern(pattern_id: str, source_repo_ids: list[str]) -> dict:
    return {
        "pattern_id": pattern_id,
        "name": pattern_id,
        "pattern_type": "architecture",
        "source_repo_ids": source_repo_ids,
        "applicability": "Useful for platform validators.",
        "implementation_surface": "agent_platform.oss",
        "risks": "Needs local validation.",
        "evidence": "Repository structure was inspected.",
    }


def _decision(decision_id: str, pattern_id: str, decision: str, implementation_mode: str) -> dict:
    return {
        "decision_id": decision_id,
        "pattern_id": pattern_id,
        "decision": decision,
        "implementation_mode": implementation_mode,
        "rationale": "Fits the current validation layer.",
        "target_paths": ["agent-platform/src/agent_platform/oss/pattern_adoption.py"],
        "implementation_steps": ["Add validation logic."],
        "guardrails": ["Keep third-party imports behind adapters."],
        "validation_steps": ["Run unit tests."],
    }


class PatternAdoptionTests(unittest.TestCase):
    def test_valid_plan_is_ready(self) -> None:
        report = check_pattern_adoption_plan(_valid_plan())

        self.assertEqual(report["status"], "ready_to_implement")
        self.assertFalse(report["requires_rework"])
        self.assertEqual(report["checks"]["source_repository_count"], 3)
        self.assertEqual(report["hybrid_module_decisions"], ["trial_b"])

    def test_direct_import_requires_explicit_clone_gates_and_permission(self) -> None:
        plan = _valid_plan()
        plan["adoption_decisions"].append(_decision("copy_a", "pattern_a", "direct_import", "direct_code_import"))

        report = check_pattern_adoption_plan(plan)

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "adoption_decisions[3] requests direct code import, but clone_import_policy.direct_code_import_allowed is not true.",
            report["gaps"],
        )
        self.assertIn("adoption_decisions[3].source_commit is required for direct code import decisions.", report["gaps"])

    def test_hybrid_decision_requires_enabled_hybrid_plan(self) -> None:
        plan = copy.deepcopy(_valid_plan())
        plan["hybrid_module_plan"]["enabled"] = False

        report = check_pattern_adoption_plan(plan)

        self.assertTrue(report["requires_rework"])
        self.assertIn("adoption_decisions[2] uses hybrid_module, but hybrid_module_plan.enabled is not true.", report["gaps"])


if __name__ == "__main__":
    unittest.main()
