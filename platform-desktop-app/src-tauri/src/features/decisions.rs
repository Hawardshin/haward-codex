use super::{command, NativeRuntimeFeatureGroupReport};

pub(super) fn group() -> NativeRuntimeFeatureGroupReport {
    NativeRuntimeFeatureGroupReport {
        group_id: "decision-inbox",
        label: "Decision Inbox",
        source_module: "src-tauri/src/features/decisions.rs",
        role: "Owns human decision inbox listing, answering, and safe CLI session resume.",
        commands: vec![
            command(
                "list_human_decision_inbox",
                "List open human decisions",
                "Decision inbox JSON store",
            ),
            command(
                "answer_human_decision",
                "Answer one human decision",
                "Decision inbox JSON update",
            ),
            command(
                "answer_and_resume_human_decision",
                "Answer and resume one CLI session",
                "Decision update plus bounded stdin write",
            ),
        ],
        follow_up: vec![
            "Move decision inbox persistence into features/decisions/.",
            "Keep answer-and-resume tied to explicit user action.",
        ],
    }
}
