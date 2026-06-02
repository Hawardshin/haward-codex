"""Governance helpers for platform configuration and operating contracts."""

from agent_platform.governance.config_contract import check_config_contract
from agent_platform.governance.philosophy_features import check_philosophy_feature_registry
from agent_platform.governance.philosophy_trace import check_philosophy_traceability

__all__ = ["check_config_contract", "check_philosophy_feature_registry", "check_philosophy_traceability"]
