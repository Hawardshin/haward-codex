use super::{command, NativeRuntimeFeatureGroupReport};

pub(super) fn group() -> NativeRuntimeFeatureGroupReport {
    NativeRuntimeFeatureGroupReport {
        group_id: "provider-accounts",
        label: "Provider Accounts",
        source_module: "src-tauri/src/features/providers.rs",
        role: "Owns provider credential metadata, model catalog checks, subscription verification, and direct model tasks.",
        commands: vec![
            command("list_provider_credentials", "List redacted provider credential state", "No raw secret in report"),
            command("save_provider_credential", "Save provider credential", "Local app config secret store"),
            command("clear_provider_credential", "Clear provider credential", "Provider allowlist"),
            command("open_provider_auth_url", "Open setup/login/docs URL", "Provider allowlisted URLs"),
            command("verify_provider_subscription", "Verify provider subscription state", "Provider API check with redacted output"),
            command("list_provider_models", "List provider model catalog", "Provider API or local HTTP check"),
            command("run_provider_agent_task", "Run one provider-backed agent task", "Bounded provider HTTP request"),
        ],
        follow_up: vec![
            "Move credential normalization and provider HTTP clients into features/providers/.",
            "Move public keychain storage behind a separate release gate before public distribution.",
        ],
    }
}
