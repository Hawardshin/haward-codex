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
        ],
        follow_up: vec![
            "Move proposal normalization into features/agent_factory/.",
            "Keep generated proposal artifacts separate from direct source mutation.",
        ],
    }
}
