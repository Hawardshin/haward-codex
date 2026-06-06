use super::{command, NativeRuntimeFeatureGroupReport};

pub(super) fn group() -> NativeRuntimeFeatureGroupReport {
    NativeRuntimeFeatureGroupReport {
        group_id: "agent-factory",
        label: "Agent Factory",
        source_module: "src-tauri/src/features/agent_factory.rs",
        role:
            "Owns proposal records for new agent capabilities and learning improvement decisions.",
        commands: vec![
            command(
                "create_agent_factory_proposal",
                "Create agent factory proposal",
                "Writes proposal record under runtime data",
            ),
            command(
                "record_learning_improvement_decision",
                "Record learning improvement decision",
                "Writes learning feedback record under runtime data",
            ),
            command(
                "run_subagent_tool_plan",
                "Run manager-as-tools subagent plan",
                "Bounded agent-platform planner execution with task-run persistence",
            ),
            command(
                "start_subagent_tool_execution",
                "Start one subagent tool lane",
                "Validates a saved subagent plan and starts one cancellable CLI session lane",
            ),
        ],
        follow_up: vec![
            "Move proposal normalization into features/agent_factory/.",
            "Keep generated proposal artifacts separate from direct source mutation.",
        ],
    }
}
