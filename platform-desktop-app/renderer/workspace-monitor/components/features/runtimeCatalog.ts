import type {
  AdapterSetupGuide,
  CliAdapterStatus,
  LocalizedText,
  ProviderCredentialReport,
  RuntimeCustomization,
  UiLanguage,
  NativePtyQuickCommand
} from "@/types/desktop";

export const providerPanelFeedbackId = "__provider_accounts_panel__";

const providerLabelKoMap: Record<string, string> = {
  ollama: "올라마",
  openai: "오픈AI",
  anthropic: "클로드",
  "google-gemini": "제미니"
};

export const providerDisplayName = (providerId: string, fallback: string, uiLanguage: UiLanguage) => {
  if (uiLanguage !== "ko") {
    return fallback;
  }
  return providerLabelKoMap[providerId] || fallback;
};

export function localizedAdapterGuideText(
  guide: AdapterSetupGuide | undefined,
  language: UiLanguage,
  field: keyof AdapterSetupGuide
) {
  if (!guide) {
    return "";
  }
  if (field === "sourceUrl") {
    return guide.sourceUrl;
  }
  const localized = guide[field] as unknown as LocalizedText;
  return language === "ko" ? localized.ko : localized.en;
}

export const fallbackDesktopAdapters: CliAdapterStatus[] = [
  { adapterId: "claude-code-cli", label: "Claude Code CLI", command: "claude", available: false, lastError: "데스크톱 런타임이 필요합니다." },
  { adapterId: "gemini-cli", label: "Gemini CLI", command: "gemini", available: false, lastError: "데스크톱 런타임이 필요합니다." },
  { adapterId: "codex-cli", label: "Codex CLI", command: "codex", available: false, lastError: "데스크톱 런타임이 필요합니다." },
  { adapterId: "opencode-cli", label: "OpenCode", command: "opencode", available: false, lastError: "데스크톱 런타임이 필요합니다." },
  { adapterId: "claw-code-cli", label: "Claw Code", command: "claw", available: false, lastError: "데스크톱 런타임이 필요합니다." }
];

export const adapterSetupGuides: Record<string, AdapterSetupGuide> = {
  "claude-code-cli": {
    installHint: {
      ko: "npm install -g @anthropic-ai/claude-code",
      en: "npm install -g @anthropic-ai/claude-code"
    },
    authHint: {
      ko: "claude login",
      en: "claude login"
    },
    verifyCommand: {
      ko: "claude --version",
      en: "claude --version"
    },
    firstRunCommand: {
      ko: "claude",
      en: "claude"
    },
    expectedResult: {
      ko: "선택한 작업공간에서 Claude Code 대화형 세션이 열립니다.",
      en: "Interactive Claude Code session opens in the selected workspace."
    },
    sourceUrl: "https://docs.claude.com/en/docs/claude-code/setup",
    caution: {
      ko: "Node.js와 계정 인증이 필요합니다.",
      en: "Node.js and account auth are required."
    }
  },
  "gemini-cli": {
    installHint: {
      ko: "npm install -g @google/gemini-cli",
      en: "npm install -g @google/gemini-cli"
    },
    authHint: {
      ko: "gemini auth login",
      en: "gemini auth login"
    },
    verifyCommand: {
      ko: "gemini --version",
      en: "gemini --version"
    },
    firstRunCommand: {
      ko: "gemini",
      en: "gemini"
    },
    expectedResult: {
      ko: "현재 작업공간이 Gemini CLI의 명령 컨텍스트로 사용됩니다.",
      en: "Gemini CLI starts with the current workspace as its command context."
    },
    sourceUrl: "https://github.com/google-gemini/gemini-cli",
    caution: {
      ko: "설치 전 패키지 출처와 라이선스를 꼭 확인하세요.",
      en: "Verify the package scope before install."
    }
  },
  "codex-cli": {
    installHint: {
      ko: "npm install -g @openai/codex",
      en: "npm install -g @openai/codex"
    },
    authHint: {
      ko: "codex login",
      en: "codex login"
    },
    verifyCommand: {
      ko: "codex --version",
      en: "codex --version"
    },
    firstRunCommand: {
      ko: "codex",
      en: "codex"
    },
    expectedResult: {
      ko: "플랫폼이 작업 상태를 소유한 채 Codex 게스트 실행 경로가 시작됩니다.",
      en: "Codex CLI starts as a guest execution lane; the platform keeps task state."
    },
    sourceUrl: "https://help.openai.com/en/articles/11096431",
    caution: {
      ko: "공식 패키지와 계정 인증 방식만 사용하세요.",
      en: "Use the official package and account auth."
    }
  },
  "opencode-cli": {
    installHint: {
      ko: "npm install -g opencode-ai",
      en: "npm install -g opencode-ai"
    },
    authHint: {
      ko: "공급자 API 키를 설정한 뒤 OpenCode의 auth 확인 절차를 실행하세요.",
      en: "Set the provider API key, then run the CLI auth check documented by OpenCode."
    },
    verifyCommand: {
      ko: "opencode --version",
      en: "opencode --version"
    },
    firstRunCommand: {
      ko: "opencode",
      en: "opencode"
    },
    expectedResult: {
      ko: "선택한 공급자 키와 작업공간 경계를 기준으로 OpenCode가 시작됩니다.",
      en: "OpenCode starts with the selected provider key and workspace boundary."
    },
    sourceUrl: "https://opencode.ai/docs/cli/",
    caution: {
      ko: "PATH에 opencode 실행 파일이 해석되는지 먼저 확인하세요.",
      en: "Confirm PATH resolves the expected binary."
    }
  },
  "claw-code-cli": {
    installHint: {
      ko: "프로젝트 문서의 Claw Code 설치 경로를 따라 설치 후 `claw`가 PATH에 있는지 확인하세요.",
      en: "Use the project-documented Claw Code install path, then ensure `claw` is on PATH."
    },
    authHint: {
      ko: "Claw Code 사용 전 프로젝트 문서의 계정/키 설정 절차를 완료하세요.",
      en: "Follow the project-documented account or provider-key setup before use."
    },
    verifyCommand: {
      ko: "claw --version",
      en: "claw --version"
    },
    firstRunCommand: {
      ko: "claw",
      en: "claw"
    },
    expectedResult: {
      ko: "소스/라이선스/바이너리 출처 검증 후 실행됩니다.",
      en: "Claw Code starts only after source, license, and binary provenance are checked."
    },
    sourceUrl: "https://github.com/Hawardshin/claw-code",
    caution: {
      ko: "검토 단계에서 저장소 클론이 제한되어 있었으므로 설치/번들링 전 출처, 라이선스, 바이너리 근거를 확인하세요.",
      en: "The referenced repository was disabled for clone during review; verify source, license, and binary provenance before installing or bundling."
    }
  }
};

export const fallbackProviderCredentialReport: ProviderCredentialReport = {
  schemaVersion: "provider-credentials.v2",
  status: "provider_credentials_ready",
  source: "browser_fallback",
  credentialFilePath: "",
  storageWarning: "프로바이더 키는 브라우저 미리보기가 아닌 네이티브 앱 런타임의 앱 설정 파일에서 관리됩니다.",
  configuredCount: 1,
  providers: [
    {
      providerId: "ollama",
      label: "올라마 / 로컬",
      authMethod: "local_http",
      envVar: "",
      defaultModel: "llama3.2",
      configured: true,
      environmentAvailable: true,
      status: "local_runtime_configured",
      accountHint: "로컬 런타임",
      secretPreview: "API 키 없음",
      lastUpdatedAt: "",
      storage: "local_http_runtime",
      credentialSource: "local_runtime",
      setupUrl: "https://ollama.com/download",
      loginUrl: "https://ollama.com/download",
      docsUrl: "https://docs.ollama.com/api",
      caution: "127.0.0.1:11434에서 실행되는 로컬 Ollama 런타임을 사용합니다. API key는 저장하지 않습니다.",
      requiresSubscriptionVerification: false,
      subscriptionState: "not_required",
      subscriptionCheckedAt: "",
      subscriptionMessage: "구독 검증이 필요하지 않습니다."
    },
    {
      providerId: "openai",
      label: "오픈AI",
      authMethod: "api_key",
      envVar: "OPENAI_API_KEY",
      defaultModel: "gpt-5.2",
      configured: false,
      environmentAvailable: false,
      status: "not_connected",
      accountHint: "",
      secretPreview: "",
      lastUpdatedAt: "",
      storage: "not_configured",
      credentialSource: "not_configured",
      setupUrl: "https://platform.openai.com/api-keys",
      loginUrl: "https://platform.openai.com/api-keys",
      docsUrl: "https://platform.openai.com/docs/api-reference/authentication",
      caution: "OpenAI 공식 API key 페이지에서 대상 계정으로 로그인 후 프로젝트 키를 발급받아 저장하세요. ChatGPT 웹 세션 쿠키는 저장하지 않습니다.",
      requiresSubscriptionVerification: true,
      subscriptionState: "not_configured",
      subscriptionCheckedAt: "",
      subscriptionMessage: "먼저 계정 키를 설정한 뒤 구독을 확인하세요."
    },
    {
      providerId: "anthropic",
      label: "클로드",
      authMethod: "api_key",
      envVar: "ANTHROPIC_API_KEY",
      defaultModel: "claude-sonnet-4-6",
      configured: false,
      environmentAvailable: false,
      status: "not_connected",
      accountHint: "",
      secretPreview: "",
      lastUpdatedAt: "",
      storage: "not_configured",
      credentialSource: "not_configured",
      setupUrl: "https://console.anthropic.com/settings/keys",
      loginUrl: "https://claude.ai/login",
      docsUrl: "https://platform.claude.com/docs/en/api/authentication/overview",
      caution: "Claude API key 또는 제공자가 지원하는 인증 연동을 사용하세요. 소비자 웹 OAuth 토큰은 저장되지 않습니다.",
      requiresSubscriptionVerification: true,
      subscriptionState: "not_configured",
      subscriptionCheckedAt: "",
      subscriptionMessage: "먼저 계정 키를 설정한 뒤 구독을 확인하세요."
    },
    {
      providerId: "google-gemini",
      label: "제미니",
      authMethod: "api_key",
      envVar: "GEMINI_API_KEY",
      defaultModel: "gemini-3.5-flash",
      configured: false,
      environmentAvailable: false,
      status: "not_connected",
      accountHint: "",
      secretPreview: "",
      lastUpdatedAt: "",
      storage: "not_configured",
      credentialSource: "not_configured",
      setupUrl: "https://aistudio.google.com/api-keys",
      loginUrl: "https://aistudio.google.com/api-keys",
      docsUrl: "https://ai.google.dev/gemini-api/docs/api-key",
      caution: "Google AI Studio API key 페이지에서 대상 Google 계정으로 로그인 후 제한된 Gemini 키를 발급받아 저장하세요. Vertex AI OAuth/ADC는 별도 운영 흐름입니다.",
      requiresSubscriptionVerification: true,
      subscriptionState: "not_configured",
      subscriptionCheckedAt: "",
      subscriptionMessage: "먼저 계정 키를 설정한 뒤 구독을 확인하세요."
    }
  ]
};

export const providerIdsByAdapter: Record<string, string[]> = {
  "codex-cli": ["ollama", "openai"],
  "claude-code-cli": ["anthropic"],
  "gemini-cli": ["google-gemini"],
  "opencode-cli": ["ollama", "openai", "anthropic", "google-gemini"],
  "claw-code-cli": ["ollama", "openai", "anthropic", "google-gemini"]
};

export function providerAuthStatusForAdapter(
  adapterId: string,
  report: ProviderCredentialReport | null | undefined,
  uiLanguage: UiLanguage
) {
  const providerIds = providerIdsByAdapter[adapterId] || [];
  if (providerIds.length === 0) {
    return uiLanguage === "ko" ? "인증 선택" : "auth optional";
  }
  const providers = report?.providers || [];
  const matched = providers.filter((provider) => providerIds.includes(provider.providerId));
  if (matched.some((provider) => provider.configured)) {
    return uiLanguage === "ko" ? "계정 연결됨" : "account connected";
  }
  return uiLanguage === "ko" ? "계정 필요" : "account needed";
}

const runtimeProviderDefaultBaseUrls: Record<string, string> = {
  ollama: "http://127.0.0.1:11434",
  openai: "https://api.openai.com/v1",
  anthropic: "https://api.anthropic.com",
  "google-gemini": "https://generativelanguage.googleapis.com"
};

export const defaultTerminalQuickCommands: NativePtyQuickCommand[] = [
  { id: "pwd", label: "현재 위치", detail: "pwd", input: "pwd\n" },
  { id: "list", label: "파일 목록", detail: "ls -la", input: "ls -la\n" },
  { id: "git", label: "Git 상태", detail: "git status --short", input: "git status --short\n" }
];

export const defaultRuntimeCustomization: RuntimeCustomization = {
  providerOverrides: fallbackProviderCredentialReport.providers.map((provider) => ({
    providerId: provider.providerId,
    defaultModel: provider.defaultModel,
    baseUrl: runtimeProviderDefaultBaseUrls[provider.providerId] || ""
  })),
  prompts: {
    sessionPrompts: {},
    taskPipePrompts: {}
  },
  terminal: {
    shellCommand: "",
    startupCommand: "",
    quickCommands: defaultTerminalQuickCommands
  }
};

export function providerDefaultModelFor(providerId: string) {
  return fallbackProviderCredentialReport.providers.find((provider) => provider.providerId === providerId)?.defaultModel || "";
}

export function providerDefaultBaseUrlFor(providerId: string) {
  return runtimeProviderDefaultBaseUrls[providerId] || "";
}

export function trimRuntimeSetting(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function normalizeRuntimeQuickCommands(commands: unknown): NativePtyQuickCommand[] {
  const sourceCommands = Array.isArray(commands) ? commands : defaultTerminalQuickCommands;
  const normalized = sourceCommands
    .map((command, index) => {
      const source = command as Partial<NativePtyQuickCommand>;
      const input = trimRuntimeSetting(source.input, 500);
      if (!input) {
        return null;
      }
      return {
        id: trimRuntimeSetting(source.id, 48) || `quick-${index + 1}`,
        label: trimRuntimeSetting(source.label, 48) || `Command ${index + 1}`,
        detail: trimRuntimeSetting(source.detail, 120) || input.replace(/\s+/g, " ").slice(0, 80),
        input: input.endsWith("\n") ? input : `${input}\n`
      };
    })
    .filter((command): command is NativePtyQuickCommand => Boolean(command))
    .slice(0, 8);
  return normalized.length ? normalized : defaultTerminalQuickCommands;
}
