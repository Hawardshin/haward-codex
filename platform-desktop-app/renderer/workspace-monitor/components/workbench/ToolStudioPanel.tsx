"use client";

import * as ContextMenu from "@radix-ui/react-context-menu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Bot,
  Box,
  Braces,
  CheckCircle2,
  ChevronDown,
  Code2,
  Copy,
  Cpu,
  ExternalLink,
  FileCode2,
  GitBranch,
  Keyboard,
  PackageCheck,
  PlayCircle,
  Rocket,
  ScrollText,
  Settings,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  UploadCloud,
  Wand2
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { writeClipboardText } from "@/lib/clipboard.mjs";

export type ToolStudioMode = "build" | "environment" | "deploy" | "registry";
type ToolStudioStage = "create" | "ship";
export type ToolStudioModeRequest = {
  mode: ToolStudioMode;
  requestId: number;
};

type ToolStudioPanelProps = {
  language: "ko" | "en";
  requestedMode?: ToolStudioModeRequest | null;
  agentCount: number;
  activeTaskCount: number;
  blockedTaskCount: number;
  sourceFileCount: number;
  runtimeAdapterId: string;
  providerConfiguredCount: number;
  onOpenAgents: () => void;
  onOpenSource: () => void;
  onOpenTerminal: () => void;
  onOpenProviderSettings: () => void;
};

type ToolMode = {
  id: ToolStudioMode;
  stage: ToolStudioStage;
  labelKo: string;
  labelEn: string;
  detailKo: string;
  detailEn: string;
  shortcut: string;
  icon: LucideIcon;
};

type ToolStage = {
  id: ToolStudioStage;
  labelKo: string;
  labelEn: string;
  detailKo: string;
  detailEn: string;
  icon: LucideIcon;
};

type ToolCard = {
  id: string;
  labelKo: string;
  labelEn: string;
  detailKo: string;
  detailEn: string;
  status: "ready" | "draft" | "review";
  runtime: string;
  path: string;
  mode: ToolStudioMode;
  icon: LucideIcon;
};

type ToolBuilderBlueprint = {
  id: string;
  labelKo: string;
  labelEn: string;
  detailKo: string;
  detailEn: string;
  packageName: string;
  moduleName: string;
  entrypoint: string;
  pyprojectPath: string;
  testPath: string;
  initCommand: string;
  sourcePath: string;
  schemaPath: string;
  runCommand: string;
  packageCommand: string;
  gatewayKo: string;
  gatewayEn: string;
  riskKo: string;
  riskEn: string;
  manifest: string;
  editTargets: string[];
  sourceChecklistKo: string[];
  sourceChecklistEn: string[];
  outputs: string[];
  icon: LucideIcon;
};

type ToolDeployTarget = {
  id: string;
  labelKo: string;
  labelEn: string;
  detailKo: string;
  detailEn: string;
  target: string;
  command: string;
  artifact: string;
  authKo: string;
  authEn: string;
  observabilityKo: string;
  observabilityEn: string;
  rollback: string;
  preflight: string[];
  icon: LucideIcon;
};

type PythonEnvironmentProfile = {
  id: string;
  labelKo: string;
  labelEn: string;
  detailKo: string;
  detailEn: string;
  interpreter: string;
  venvPath: string;
  dependencyFile: string;
  lockfile: string;
  installCommand: string;
  runCommand: string;
  sandboxKo: string;
  sandboxEn: string;
  cacheKo: string;
  cacheEn: string;
  healthChecks: string[];
  icon: LucideIcon;
};

type VirtualEnvironmentLifecycleStep = {
  id: string;
  labelKo: string;
  labelEn: string;
  detailKo: string;
  detailEn: string;
  evidenceKo: string;
  evidenceEn: string;
  command: (environment: PythonEnvironmentProfile) => string;
  icon: LucideIcon;
};

const toolStudioStages: ToolStage[] = [
  {
    id: "create",
    labelKo: "제작 준비",
    labelEn: "Create",
    detailKo: "소스와 실행환경을 먼저 정리합니다.",
    detailEn: "Start with source and runtime setup.",
    icon: Wand2
  },
  {
    id: "ship",
    labelKo: "출시 관리",
    labelEn: "Ship",
    detailKo: "배포와 등록 상태만 따로 봅니다.",
    detailEn: "Focus on deployment and registry state.",
    icon: Rocket
  }
];

const toolModes: ToolMode[] = [
  {
    id: "build",
    stage: "create",
    labelKo: "툴 만들기",
    labelEn: "Build Tool",
    detailKo: "파이썬 소스, 입력 스키마, 검증 명령을 한 단계씩 정의합니다.",
    detailEn: "Define Python source, input schema, and validation commands one step at a time.",
    shortcut: "⌘B",
    icon: Wand2
  },
  {
    id: "environment",
    stage: "create",
    labelKo: "파이썬 환경",
    labelEn: "Python Env",
    detailKo: "venv, requirements, 실행 명령, 격리 경계를 확인합니다.",
    detailEn: "Check venv, requirements, run commands, and isolation boundaries.",
    shortcut: "⌘⇧E",
    icon: Cpu
  },
  {
    id: "deploy",
    stage: "ship",
    labelKo: "툴 배포",
    labelEn: "Deploy Tool",
    detailKo: "검증, 패키징, 배포 전 점검을 분리된 단계로 진행합니다.",
    detailEn: "Run validation, packaging, and preflight as separate steps.",
    shortcut: "⌘⏎",
    icon: Rocket
  },
  {
    id: "registry",
    stage: "ship",
    labelKo: "툴만 관리",
    labelEn: "Tool Registry",
    detailKo: "툴 목록, 소유 경계, 상태, rollback만 관리합니다.",
    detailEn: "Manage only tool list, ownership, status, and rollback.",
    shortcut: "⌘⌥T",
    icon: PackageCheck
  }
];

const toolCards: ToolCard[] = [
  {
    id: "python-runner",
    labelKo: "Python Runner",
    labelEn: "Python Runner",
    detailKo: "입력 JSON을 받아 venv 안에서 안전하게 실행하는 기본 툴",
    detailEn: "Base tool that accepts input JSON and runs inside an isolated venv.",
    status: "ready",
    runtime: "python3 .venv",
    path: "agent-platform/tools/python-runner",
    mode: "environment",
    icon: FileCode2
  },
  {
    id: "tool-packager",
    labelKo: "Tool Packager",
    labelEn: "Tool Packager",
    detailKo: "소스, README, schema, 검증 기록을 배포 단위로 묶습니다.",
    detailEn: "Bundles source, README, schema, and validation records into a deployable unit.",
    status: "draft",
    runtime: "pnpm + python",
    path: "agent-platform/tools/tool-packager",
    mode: "deploy",
    icon: Box
  },
  {
    id: "mcp-gateway-tool",
    labelKo: "MCP Gateway Tool",
    labelEn: "MCP Gateway Tool",
    detailKo: "승인된 connector와 tool call 기록을 Agent Core 흐름에 연결합니다.",
    detailEn: "Connects approved connectors and tool-call records to the Agent Core flow.",
    status: "review",
    runtime: "local gateway",
    path: "agent-platform/configs/tools/mcp-gateway-tool.json",
    mode: "registry",
    icon: GitBranch
  }
];

const buildSteps = [
  { labelKo: "소스 선택", labelEn: "Choose Source", detailKo: "Python 파일 또는 template", detailEn: "Python file or template", icon: Code2 },
  { labelKo: "입력 스키마", labelEn: "Input Schema", detailKo: "JSON schema와 예시", detailEn: "JSON schema and examples", icon: Braces },
  { labelKo: "실행 검증", labelEn: "Run Check", detailKo: "pytest 또는 CLI smoke", detailEn: "pytest or CLI smoke", icon: PlayCircle },
  { labelKo: "배포 전 점검", labelEn: "Preflight", detailKo: "license, rollback, docs", detailEn: "license, rollback, docs", icon: ShieldCheck }
];

const toolBuilderBlueprints: ToolBuilderBlueprint[] = [
  {
    id: "python-cli-tool",
    labelKo: "Python CLI Tool",
    labelEn: "Python CLI Tool",
    detailKo: "입력 JSON을 받아 stdout artifact를 만드는 기본 툴",
    detailEn: "Base tool that accepts input JSON and writes stdout artifacts.",
    packageName: "new-python-tool",
    moduleName: "new_python_tool",
    entrypoint: "new-python-tool=new_python_tool.__main__:main",
    pyprojectPath: "tools/new-python-tool/pyproject.toml",
    testPath: "tools/new-python-tool/tests/smoke_test.py",
    initCommand: "uv init --package tools/new-python-tool && uv add --dev pytest",
    sourcePath: "tools/new-python-tool/src/new_python_tool/__main__.py",
    schemaPath: "tools/new-python-tool/schema/input.schema.json",
    runCommand: "python -m new_python_tool --input fixtures/smoke.json",
    packageCommand: "python -m build && pytest tests/smoke_test.py",
    gatewayKo: "local runtime에서 먼저 검증 후 registry에 등록",
    gatewayEn: "Validate in local runtime before adding it to the registry.",
    riskKo: "파일 쓰기, 네트워크, secret 접근은 기본 비활성",
    riskEn: "File writes, network, and secret access are disabled by default.",
    manifest: "tool.json",
    editTargets: [
      "tools/new-python-tool/src/new_python_tool/__main__.py",
      "tools/new-python-tool/src/new_python_tool/tool.py",
      "tools/new-python-tool/tests/smoke_test.py",
      "tools/new-python-tool/pyproject.toml"
    ],
    sourceChecklistKo: [
      "src/ layout으로 import 경계를 먼저 고정",
      "console script는 main() 하나만 호출",
      "schema 예시와 smoke fixture를 같은 입력으로 유지"
    ],
    sourceChecklistEn: [
      "Use a src/ layout to lock the import boundary first.",
      "Keep the console script pointed at one main() entry.",
      "Keep schema examples and smoke fixtures on the same input."
    ],
    outputs: ["stdout.json", "artifacts/", "validation-record.json"],
    icon: FileCode2
  },
  {
    id: "mcp-wrapper-tool",
    labelKo: "MCP Wrapper",
    labelEn: "MCP Wrapper",
    detailKo: "승인된 MCP server의 list/call을 로컬 툴로 감쌉니다",
    detailEn: "Wraps approved MCP server list/call operations as a local tool.",
    packageName: "mcp-wrapper",
    moduleName: "mcp_wrapper",
    entrypoint: "mcp-wrapper=mcp_wrapper.client:main",
    pyprojectPath: "tools/mcp-wrapper/pyproject.toml",
    testPath: "tools/mcp-wrapper/tests/smoke_test.py",
    initCommand: "uv init --package tools/mcp-wrapper && uv add --dev pytest",
    sourcePath: "tools/mcp-wrapper/src/mcp_wrapper/client.py",
    schemaPath: "tools/mcp-wrapper/schema/tool-call.schema.json",
    runCommand: "python -m mcp_wrapper smoke --server local",
    packageCommand: "python scripts/package_mcp_wrapper.py --preflight",
    gatewayKo: "AgentCore Gateway처럼 tool discovery와 invoke를 분리",
    gatewayEn: "Separates tool discovery from invocation like AgentCore Gateway.",
    riskKo: "connector 권한과 호출 trace가 없는 server는 등록 보류",
    riskEn: "Servers without connector scope and call traces remain blocked.",
    manifest: "mcp-tool.json",
    editTargets: [
      "tools/mcp-wrapper/src/mcp_wrapper/client.py",
      "tools/mcp-wrapper/src/mcp_wrapper/schema.py",
      "tools/mcp-wrapper/tests/smoke_test.py",
      "tools/mcp-wrapper/pyproject.toml"
    ],
    sourceChecklistKo: [
      "discover와 invoke 코드를 분리",
      "server id, tool name, input schema를 명시",
      "호출 trace fixture를 smoke test에 고정"
    ],
    sourceChecklistEn: [
      "Separate discovery code from invocation code.",
      "Declare server id, tool name, and input schema.",
      "Pin call-trace fixtures in the smoke test."
    ],
    outputs: ["tools-list.json", "call-trace.json", "gateway-preflight.json"],
    icon: GitBranch
  },
  {
    id: "automation-tool",
    labelKo: "Automation Tool",
    labelEn: "Automation Tool",
    detailKo: "반복 작업을 재사용 가능한 명령/검증 단위로 승격합니다",
    detailEn: "Promotes repeated work into a reusable command and validation unit.",
    packageName: "automation-tool",
    moduleName: "automation_tool",
    entrypoint: "automation-tool=automation_tool.run:main",
    pyprojectPath: "tools/automation-tool/pyproject.toml",
    testPath: "tools/automation-tool/tests/smoke_test.py",
    initCommand: "uv init --package tools/automation-tool && uv add --dev pytest",
    sourcePath: "tools/automation-tool/src/automation_tool/run.py",
    schemaPath: "tools/automation-tool/schema/task.schema.json",
    runCommand: "python -m automation_tool run --dry-run",
    packageCommand: "python -m automation_tool package --audit",
    gatewayKo: "agent task-run store와 결과 기록을 기본 출력으로 연결",
    gatewayEn: "Connects task-run store and result records as default outputs.",
    riskKo: "반복 실행, 비용, 외부 변경은 승인 gate 뒤에 둠",
    riskEn: "Repeated runs, cost, and external mutations stay behind approval gates.",
    manifest: "automation-tool.json",
    editTargets: [
      "tools/automation-tool/src/automation_tool/run.py",
      "tools/automation-tool/src/automation_tool/plan.py",
      "tools/automation-tool/tests/smoke_test.py",
      "tools/automation-tool/pyproject.toml"
    ],
    sourceChecklistKo: [
      "dry-run과 실제 실행 함수를 분리",
      "rollback plan을 출력 계약에 포함",
      "반복 실행 비용과 외부 변경 gate를 명시"
    ],
    sourceChecklistEn: [
      "Separate dry-run from real execution.",
      "Include a rollback plan in the output contract.",
      "Declare repeated-run cost and external mutation gates."
    ],
    outputs: ["task-run.json", "rollback-plan.md", "operator-summary.md"],
    icon: Wand2
  }
];

const toolDeployTargets: ToolDeployTarget[] = [
  {
    id: "local-registry",
    labelKo: "Local Registry",
    labelEn: "Local Registry",
    detailKo: "검증된 툴을 로컬 registry에 먼저 게시합니다",
    detailEn: "Publishes a verified tool to the local registry first.",
    target: "agent-platform/configs/tools/registry.json",
    command: "python scripts/tool_deploy.py --target local --preflight",
    artifact: "artifacts/tool-package.tar.gz",
    authKo: "로컬 실행 권한만 허용",
    authEn: "Allows local execution scope only.",
    observabilityKo: "task-run record와 validation record 연결",
    observabilityEn: "Links task-run and validation records.",
    rollback: "restore registry entry + remove package artifact",
    preflight: ["schema validation", "smoke test", "license review", "rollback plan"],
    icon: PackageCheck
  },
  {
    id: "agentcore-gateway",
    labelKo: "AgentCore Gateway",
    labelEn: "AgentCore Gateway",
    detailKo: "MCP/OpenAPI target schema와 credential 범위를 점검합니다",
    detailEn: "Checks MCP/OpenAPI target schema and credential scope.",
    target: "gateway-target/tools.json",
    command: "agentcore add gateway-target --tool-schema-file tools.json --dry-run",
    artifact: "artifacts/gateway-target-preflight.json",
    authKo: "credential provider, OAuth/API key, least privilege",
    authEn: "Credential provider, OAuth/API key, least privilege.",
    observabilityKo: "tool call trace, latency, error metric 기록",
    observabilityEn: "Records tool-call trace, latency, and error metrics.",
    rollback: "disable gateway target + revoke credential provider",
    preflight: ["tool schema file", "credential scope", "invoke dry-run", "trace mapping"],
    icon: GitBranch
  },
  {
    id: "desktop-bundle",
    labelKo: "Desktop Bundle",
    labelEn: "Desktop Bundle",
    detailKo: "데스크톱 앱에 포함할 툴 package와 업데이트 경계를 만듭니다",
    detailEn: "Creates a tool package and update boundary for the desktop app.",
    target: "platform-desktop-app/tool-bundles/",
    command: "corepack pnpm run desktop:verify:quick && python scripts/package_tool_bundle.py",
    artifact: "artifacts/desktop-tool-bundle.zip",
    authKo: "앱 내부 adapter 권한과 workspace boundary 사용",
    authEn: "Uses app adapter permissions and workspace boundaries.",
    observabilityKo: "desktop run log, bundle hash, install audit 기록",
    observabilityEn: "Records desktop run logs, bundle hash, and install audit.",
    rollback: "restore previous bundle hash + restart adapter",
    preflight: ["bundle hash", "desktop quick verify", "workspace boundary", "install audit"],
    icon: Rocket
  }
];

const pythonEnvironmentProfiles: PythonEnvironmentProfile[] = [
  {
    id: "local-venv",
    labelKo: "Local venv",
    labelEn: "Local venv",
    detailKo: "툴별 `.venv`를 만들고 requirements 파일로 재생성합니다.",
    detailEn: "Creates a per-tool `.venv` and recreates it from a requirements file.",
    interpreter: "Python 3.12",
    venvPath: ".venv",
    dependencyFile: "requirements.txt",
    lockfile: "requirements.lock",
    installCommand: "python -m venv .venv && .venv/bin/python -m pip install -r requirements.txt",
    runCommand: ".venv/bin/python -m tool --input fixtures/smoke.json",
    sandboxKo: "로컬 workspace 파일만 읽고 secret, network, 외부 쓰기는 기본 차단",
    sandboxEn: "Reads local workspace files only; secrets, network, and external writes are blocked by default.",
    cacheKo: "pip wheel cache는 workspace cache 아래에서 툴별로 분리",
    cacheEn: "Pip wheel cache is separated per tool under the workspace cache.",
    healthChecks: ["python -V", "pip check", "pytest tests/smoke_test.py"],
    icon: FileCode2
  },
  {
    id: "isolated-runner",
    labelKo: "Isolated runner",
    labelEn: "Isolated runner",
    detailKo: "매 실행마다 임시 venv를 준비하고 editable install로 smoke를 통과시킵니다.",
    detailEn: "Prepares an ephemeral venv per run and validates it with editable install smoke tests.",
    interpreter: "Python 3.12",
    venvPath: ".venv-run",
    dependencyFile: "pyproject.toml",
    lockfile: "uv.lock",
    installCommand: "python -m venv .venv-run && .venv-run/bin/python -m pip install -e \".[test]\"",
    runCommand: ".venv-run/bin/python -m pytest tests/smoke_test.py",
    sandboxKo: "기본 network off, writable temp만 허용, 실행 뒤 환경 삭제",
    sandboxEn: "Network off by default, writable temp only, and the environment is removed after the run.",
    cacheKo: "빌드 산출물은 run cache에 남기고 interpreter와 site-packages는 폐기",
    cacheEn: "Build artifacts remain in the run cache while interpreter and site-packages are discarded.",
    healthChecks: ["python -m pip check", "pytest -q", "python -m tool --help"],
    icon: ShieldCheck
  },
  {
    id: "agent-sandbox",
    labelKo: "Agent sandbox",
    labelEn: "Agent sandbox",
    detailKo: "AgentCore Code Interpreter식 격리 실행 경계를 로컬 툴에 적용합니다.",
    detailEn: "Applies AgentCore Code Interpreter-style isolation boundaries to local tools.",
    interpreter: "Python 3.12 sandbox",
    venvPath: "runtime/sandbox/.venv",
    dependencyFile: "pyproject.toml",
    lockfile: "sandbox-report.json",
    installCommand: "python scripts/run_sandbox.py --prepare --timeout 120 --memory 512",
    runCommand: "python scripts/run_sandbox.py --invoke fixtures/smoke.json --timeout 120 --memory 512",
    sandboxKo: "network, secret, browser credential, host path 접근은 명시 승인 전 차단",
    sandboxEn: "Network, secrets, browser credentials, and host paths are blocked before explicit approval.",
    cacheKo: "sandbox image hash와 dependency report만 보존하고 실행 파일시스템은 폐기",
    cacheEn: "Only sandbox image hash and dependency report are kept; the run filesystem is discarded.",
    healthChecks: ["sandbox-report.json", "stdout/stderr capture", "timeout and memory guard"],
    icon: Cpu
  }
];

const virtualEnvironmentLifecycleSteps: VirtualEnvironmentLifecycleStep[] = [
  {
    id: "create",
    labelKo: "생성",
    labelEn: "Create",
    detailKo: "base Python 위에 disposable venv를 만듭니다.",
    detailEn: "Create a disposable venv on top of the base Python.",
    evidenceKo: "pyvenv.cfg, bin/python, site-packages 경로 확인",
    evidenceEn: "Check pyvenv.cfg, bin/python, and site-packages paths.",
    command: (environment) => `python -m venv ${environment.venvPath}`,
    icon: Cpu
  },
  {
    id: "activate",
    labelKo: "활성화",
    labelEn: "Activate",
    detailKo: "shell PATH를 바꾸거나 venv Python을 직접 호출합니다.",
    detailEn: "Change shell PATH or call the venv Python directly.",
    evidenceKo: "sys.prefix와 sys.base_prefix가 다른지 확인",
    evidenceEn: "Check that sys.prefix differs from sys.base_prefix.",
    command: (environment) => `source ${environment.venvPath}/bin/activate || ${environment.venvPath}/bin/python -c "import sys; print(sys.prefix)"`,
    icon: SquareTerminal
  },
  {
    id: "install",
    labelKo: "설치",
    labelEn: "Install",
    detailKo: "requirements 또는 pyproject 기준으로 venv 안에만 설치합니다.",
    detailEn: "Install only inside the venv from requirements or pyproject.",
    evidenceKo: "pip check와 smoke test로 충돌을 확인",
    evidenceEn: "Use pip check and smoke tests to check conflicts.",
    command: (environment) => environment.dependencyFile === "requirements.txt"
      ? `${environment.venvPath}/bin/python -m pip install -r ${environment.dependencyFile}`
      : `${environment.venvPath}/bin/python -m pip install -e ".[test]"`,
    icon: PackageCheck
  },
  {
    id: "freeze",
    labelKo: "고정",
    labelEn: "Freeze",
    detailKo: "현재 설치 상태를 재현 가능한 lock/report로 남깁니다.",
    detailEn: "Write the current install state to a reproducible lock or report.",
    evidenceKo: "lock/report diff와 dependency provenance 확인",
    evidenceEn: "Review lock/report diff and dependency provenance.",
    command: (environment) => `${environment.venvPath}/bin/python -m pip freeze > ${environment.lockfile}`,
    icon: ScrollText
  },
  {
    id: "rebuild",
    labelKo: "재생성",
    labelEn: "Rebuild",
    detailKo: "환경은 옮기지 않고 삭제 후 같은 입력으로 다시 만듭니다.",
    detailEn: "Do not move the environment; delete and recreate it from the same inputs.",
    evidenceKo: "새 pyvenv.cfg, pip check, smoke output 확인",
    evidenceEn: "Check the new pyvenv.cfg, pip check, and smoke output.",
    command: (environment) => environment.dependencyFile === "requirements.txt"
      ? `rm -rf ${environment.venvPath} && python -m venv ${environment.venvPath} && ${environment.venvPath}/bin/python -m pip install -r ${environment.dependencyFile}`
      : `rm -rf ${environment.venvPath} && python -m venv ${environment.venvPath} && ${environment.venvPath}/bin/python -m pip install -e ".[test]"`,
    icon: ShieldCheck
  }
];

const environmentRows = [
  {
    labelKo: "가상 환경",
    labelEn: "Virtual Env",
    value: ".venv",
    detailKo: "툴별 격리 기본값",
    detailEn: "Default isolation per tool"
  },
  {
    labelKo: "소스 관리",
    labelEn: "Source",
    value: "src/",
    detailKo: "Python package와 tests 분리",
    detailEn: "Separate Python package and tests"
  },
  {
    labelKo: "의존성",
    labelEn: "Dependencies",
    value: "requirements.txt",
    detailKo: "pin, audit, rollback 기록",
    detailEn: "Pin, audit, and rollback records"
  },
  {
    labelKo: "실행",
    labelEn: "Run",
    value: "python -m tool",
    detailKo: "stdout/stderr/task-run 기록",
    detailEn: "stdout/stderr/task-run records"
  }
];

function labelFor(language: "ko" | "en", ko: string, en: string) {
  return language === "ko" ? ko : en;
}

function isFormField(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  const tagName = target.tagName.toLowerCase();
  return tagName === "input" || tagName === "textarea" || tagName === "select" || target.isContentEditable;
}

export function ToolStudioPanel({
  language,
  requestedMode,
  agentCount,
  activeTaskCount,
  blockedTaskCount,
  sourceFileCount,
  runtimeAdapterId,
  providerConfiguredCount,
  onOpenAgents,
  onOpenSource,
  onOpenTerminal,
  onOpenProviderSettings
}: ToolStudioPanelProps) {
  const [stage, setStage] = useState<ToolStudioStage>("create");
  const [mode, setMode] = useState<ToolStudioMode>("build");
  const [selectedToolId, setSelectedToolId] = useState(toolCards[0].id);
  const [selectedBlueprintId, setSelectedBlueprintId] = useState(toolBuilderBlueprints[0].id);
  const [selectedSourceTarget, setSelectedSourceTarget] = useState(toolBuilderBlueprints[0].editTargets[0]);
  const [selectedEnvironmentId, setSelectedEnvironmentId] = useState(pythonEnvironmentProfiles[0].id);
  const [selectedVenvStepId, setSelectedVenvStepId] = useState(virtualEnvironmentLifecycleSteps[0].id);
  const [selectedDeployTargetId, setSelectedDeployTargetId] = useState(toolDeployTargets[0].id);
  const ko = language === "ko";
  const activeMode = toolModes.find((item) => item.id === mode) || toolModes[0];
  const activeStage = toolStudioStages.find((item) => item.id === stage) || toolStudioStages[0];
  const currentStageModes = toolModes.filter((item) => item.stage === activeStage.id);
  const selectedTool = toolCards.find((item) => item.id === selectedToolId) || toolCards[0];
  const selectedBlueprint = toolBuilderBlueprints.find((item) => item.id === selectedBlueprintId) || toolBuilderBlueprints[0];
  const selectedSourceChecklist = ko ? selectedBlueprint.sourceChecklistKo : selectedBlueprint.sourceChecklistEn;
  const selectedEnvironment = pythonEnvironmentProfiles.find((item) => item.id === selectedEnvironmentId) || pythonEnvironmentProfiles[0];
  const selectedVenvStep = virtualEnvironmentLifecycleSteps.find((item) => item.id === selectedVenvStepId) || virtualEnvironmentLifecycleSteps[0];
  const selectedVenvCommand = selectedVenvStep.command(selectedEnvironment);
  const selectedDeployTarget = toolDeployTargets.find((item) => item.id === selectedDeployTargetId) || toolDeployTargets[0];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statusItems = useMemo(
    () => [
      {
        label: ko ? "에이전트" : "Agents",
        value: agentCount.toLocaleString("ko-KR"),
        detail: ko ? "툴을 쓰는 작업자" : "workers using tools",
        icon: Bot
      },
      {
        label: ko ? "진행 중" : "Active",
        value: activeTaskCount.toLocaleString("ko-KR"),
        detail: ko ? "실행 중 task" : "running tasks",
        icon: PlayCircle
      },
      {
        label: ko ? "보류" : "Blocked",
        value: blockedTaskCount.toLocaleString("ko-KR"),
        detail: ko ? "결정 필요" : "needs decision",
        icon: ShieldCheck
      },
      {
        label: ko ? "소스" : "Source",
        value: sourceFileCount.toLocaleString("ko-KR"),
        detail: ko ? "관리 가능한 파일" : "manageable files",
        icon: FileCode2
      }
    ],
    [activeTaskCount, agentCount, blockedTaskCount, ko, sourceFileCount]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isFormField(event.target)) {
        return;
      }
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === "b") {
        event.preventDefault();
        setMode("build");
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && key === "e") {
        event.preventDefault();
        setMode("environment");
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        setMode("deploy");
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.altKey && key === "t") {
        event.preventDefault();
        setMode("registry");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    let disposed = false;
    let animationFrame = 0;
    let cleanup = () => undefined;

    const mountScene = async () => {
      const THREE = await import("three");
      const canvas = canvasRef.current;
      if (disposed || !canvas) {
        return;
      }

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: true,
        powerPreference: "low-power",
        preserveDrawingBuffer: true
      });
      renderer.setClearColor(0x101923, 1);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x101923);
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 1.15, 5.4);
      camera.lookAt(0, -0.2, 0);
      scene.add(new THREE.AmbientLight(0xffffff, 1.9));
      const keyLight = new THREE.DirectionalLight(0x9fd4ff, 2.4);
      keyLight.position.set(4, 5, 6);
      scene.add(keyLight);

      const platform = new THREE.Mesh(
        new THREE.CylinderGeometry(2.9, 3.2, 0.16, 48),
        new THREE.MeshStandardMaterial({ color: 0x17202c, roughness: 0.78, metalness: 0.18 })
      );
      platform.position.y = -1.15;
      scene.add(platform);

      const palette = [0x58a6ff, 0x66d9b1, 0xf7c66f, 0xc8b6ff];
      const group = new THREE.Group();
      const bodyGeometry = new THREE.CylinderGeometry(0.28, 0.34, 0.82, 24);
      const headGeometry = new THREE.SphereGeometry(0.26, 24, 16);
      const orbitGeometry = new THREE.TorusGeometry(1.52, 0.012, 8, 80);
      const orbit = new THREE.Mesh(
        orbitGeometry,
        new THREE.MeshStandardMaterial({ color: 0x5f7488, roughness: 0.5, transparent: true, opacity: 0.7 })
      );
      orbit.rotation.x = Math.PI / 2;
      orbit.position.y = -0.7;
      group.add(orbit);

      toolModes.forEach((item, index) => {
        const angle = (index / toolModes.length) * Math.PI * 2 - Math.PI / 2;
        const material = new THREE.MeshStandardMaterial({
          color: palette[index],
          roughness: 0.42,
          metalness: 0.08
        });
        const body = new THREE.Mesh(bodyGeometry.clone(), material);
        const head = new THREE.Mesh(headGeometry.clone(), material.clone());
        const character = new THREE.Group();
        character.position.set(Math.cos(angle) * 1.55, -0.46, Math.sin(angle) * 1.55);
        character.userData = { mode: item.id };
        body.position.y = 0;
        head.position.y = 0.58;
        character.add(body);
        character.add(head);
        group.add(character);
      });

      scene.add(group);

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(260, Math.floor(rect.width || canvas.clientWidth || 360));
        const height = Math.min(360, Math.max(220, Math.floor(rect.height || canvas.clientHeight || 280)));
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        camera.lookAt(0, -0.2, 0);
      };

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
      resize();

      const render = (time: number) => {
        if (disposed) {
          return;
        }
        const seconds = time * 0.001;
        group.rotation.y = seconds * 0.18;
        group.children.forEach((child) => {
          if (child instanceof THREE.Group) {
            child.rotation.y = -group.rotation.y;
            child.position.y = -0.46 + Math.sin(seconds * 1.6 + child.position.x) * 0.035;
          }
        });
        renderer.render(scene, camera);
        canvas.setAttribute("data-agent-3d-ready", "true");
        animationFrame = window.requestAnimationFrame(render);
      };
      animationFrame = window.requestAnimationFrame(render);

      const disposeObject = (object: unknown) => {
        const candidate = object as {
          children?: unknown[];
          geometry?: { dispose: () => void };
          material?: { dispose: () => void } | Array<{ dispose: () => void }>;
        };
        candidate.children?.forEach(disposeObject);
        candidate.geometry?.dispose();
        if (Array.isArray(candidate.material)) {
          candidate.material.forEach((material) => material.dispose());
        } else {
          candidate.material?.dispose();
        }
      };

      cleanup = () => {
        window.cancelAnimationFrame(animationFrame);
        resizeObserver.disconnect();
        canvas.removeAttribute("data-agent-3d-ready");
        disposeObject(scene);
        renderer.dispose();
      };
    };

    void mountScene();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  const selectMode = (nextMode: ToolStudioMode) => {
    const nextModeItem = toolModes.find((item) => item.id === nextMode) || toolModes[0];
    setStage(nextModeItem.stage);
    setMode(nextMode);
    const matchingTool = toolCards.find((item) => item.mode === nextMode);
    if (matchingTool) {
      setSelectedToolId(matchingTool.id);
    }
  };

  const selectStage = (nextStage: ToolStudioStage) => {
    if (stage === nextStage) {
      return;
    }
    const firstMode = toolModes.find((item) => item.stage === nextStage) || toolModes[0];
    selectMode(firstMode.id);
  };

  useEffect(() => {
    const nextBlueprint = toolBuilderBlueprints.find((item) => item.id === selectedBlueprintId) || toolBuilderBlueprints[0];
    setSelectedSourceTarget(nextBlueprint.editTargets[0] || nextBlueprint.sourcePath);
  }, [selectedBlueprintId]);

  const copyBuilderSpec = () => {
    void writeClipboardText(JSON.stringify({
      id: selectedBlueprint.id,
      manifest: selectedBlueprint.manifest,
      packageName: selectedBlueprint.packageName,
      moduleName: selectedBlueprint.moduleName,
      entrypoint: selectedBlueprint.entrypoint,
      pyprojectPath: selectedBlueprint.pyprojectPath,
      sourcePath: selectedBlueprint.sourcePath,
      schemaPath: selectedBlueprint.schemaPath,
      testPath: selectedBlueprint.testPath,
      initCommand: selectedBlueprint.initCommand,
      runCommand: selectedBlueprint.runCommand,
      packageCommand: selectedBlueprint.packageCommand,
      editTargets: selectedBlueprint.editTargets,
      sourceChecklist: selectedSourceChecklist,
      outputs: selectedBlueprint.outputs
    }, null, 2));
  };

  const copyPythonSourcePlan = () => {
    void writeClipboardText(JSON.stringify({
      id: selectedBlueprint.id,
      packageName: selectedBlueprint.packageName,
      moduleName: selectedBlueprint.moduleName,
      entrypoint: selectedBlueprint.entrypoint,
      pyprojectPath: selectedBlueprint.pyprojectPath,
      selectedSourceTarget,
      editTargets: selectedBlueprint.editTargets,
      initCommand: selectedBlueprint.initCommand,
      runCommand: selectedBlueprint.runCommand,
      packageCommand: selectedBlueprint.packageCommand,
      testPath: selectedBlueprint.testPath,
      checklist: selectedSourceChecklist
    }, null, 2));
  };

  const copyDeployPlan = () => {
    void writeClipboardText(JSON.stringify({
      id: selectedDeployTarget.id,
      target: selectedDeployTarget.target,
      command: selectedDeployTarget.command,
      artifact: selectedDeployTarget.artifact,
      preflight: selectedDeployTarget.preflight,
      rollback: selectedDeployTarget.rollback
    }, null, 2));
  };

  const copyEnvironmentPlan = () => {
    void writeClipboardText(JSON.stringify({
      id: selectedEnvironment.id,
      interpreter: selectedEnvironment.interpreter,
      venvPath: selectedEnvironment.venvPath,
      dependencyFile: selectedEnvironment.dependencyFile,
      lockfile: selectedEnvironment.lockfile,
      installCommand: selectedEnvironment.installCommand,
      runCommand: selectedEnvironment.runCommand,
      sandbox: labelFor(language, selectedEnvironment.sandboxKo, selectedEnvironment.sandboxEn),
      cache: labelFor(language, selectedEnvironment.cacheKo, selectedEnvironment.cacheEn),
      healthChecks: selectedEnvironment.healthChecks
    }, null, 2));
  };

  const copyVirtualEnvironmentCommand = () => {
    void writeClipboardText(selectedVenvCommand);
  };

  const copyVirtualEnvironmentWorkflow = () => {
    void writeClipboardText(JSON.stringify({
      environmentId: selectedEnvironment.id,
      venvPath: selectedEnvironment.venvPath,
      dependencyFile: selectedEnvironment.dependencyFile,
      lockfile: selectedEnvironment.lockfile,
      steps: virtualEnvironmentLifecycleSteps.map((step) => ({
        id: step.id,
        label: labelFor(language, step.labelKo, step.labelEn),
        command: step.command(selectedEnvironment),
        evidence: labelFor(language, step.evidenceKo, step.evidenceEn)
      }))
    }, null, 2));
  };

  useEffect(() => {
    if (requestedMode) {
      selectMode(requestedMode.mode);
    }
  }, [requestedMode]);

  return (
    <section className="tool-studio-shell" data-tool-studio data-tool-studio-mode={mode} aria-label={ko ? "툴 스튜디오" : "Tool Studio"}>
      <header className="tool-studio-hero">
        <div className="tool-studio-title">
          <span className="tool-studio-mark" aria-hidden="true">
            <Sparkles size={18} />
          </span>
          <div>
            <p className="eyebrow">Tool Studio</p>
            <h2>{ko ? "툴을 만들고, 검증하고, 배포합니다" : "Build, validate, and deploy tools"}</h2>
            <p>
              {ko
                ? "Agent Core처럼 여러 능력을 연결하되, 현재 화면은 하나의 단계만 명확하게 보여줍니다."
                : "Connect multiple Agent Core-style capabilities while keeping the current screen focused on one clear step."}
            </p>
          </div>
        </div>
        <div className="tool-studio-actions">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button
                variant="primary"
                className="tool-studio-primary-action tool-dropdown-trigger"
                data-tool-primary-menu
                aria-haspopup="menu"
              >
                <span className="tool-dropdown-trigger-icon" aria-hidden="true">
                  <activeMode.icon size={16} aria-hidden="true" />
                </span>
                <span className="tool-dropdown-trigger-copy">
                  <span className="tool-dropdown-trigger-label">{labelFor(language, activeMode.labelKo, activeMode.labelEn)}</span>
                  <small>{labelFor(language, activeStage.labelKo, activeStage.labelEn)}</small>
                </span>
                <span className="tool-dropdown-trigger-caret" aria-hidden="true">
                  <ChevronDown size={15} aria-hidden="true" />
                </span>
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="tool-menu-content" sideOffset={8} align="end">
                <DropdownMenu.Label className="tool-menu-label">
                  {ko ? "작업 선택" : "Choose action"}
                </DropdownMenu.Label>
                {toolModes.map((item) => (
                  <DropdownMenu.Item
                    key={item.id}
                    className="tool-menu-item"
                    onSelect={() => selectMode(item.id)}
                    data-tool-menu-item={item.id}
                  >
                    <item.icon size={15} aria-hidden="true" />
                    <span>
                      <strong>{labelFor(language, item.labelKo, item.labelEn)}</strong>
                      <small>{labelFor(language, item.detailKo, item.detailEn)}</small>
                    </span>
                    <kbd>{item.shortcut}</kbd>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
          <Button variant="secondary" onClick={onOpenAgents}>
            <Bot size={16} aria-hidden="true" />
            <span>{ko ? "에이전트 코어" : "Agent Core"}</span>
          </Button>
          <Button variant="secondary" onClick={onOpenTerminal}>
            <SquareTerminal size={16} aria-hidden="true" />
            <span>{ko ? "실행 콘솔" : "Run Console"}</span>
          </Button>
        </div>
      </header>

      <div className="tool-studio-status-grid" aria-label={ko ? "툴 작업 상태" : "Tool work status"}>
        {statusItems.map((item) => (
          <article key={item.label}>
            <item.icon size={16} aria-hidden="true" />
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <small>{item.detail}</small>
          </article>
        ))}
      </div>

      <nav className="tool-studio-depth-rail" aria-label={ko ? "툴 스튜디오 상위 흐름" : "Tool Studio parent stages"} data-tool-stage-rail>
        {toolStudioStages.map((item) => (
          <button
            key={item.id}
            type="button"
            className={stage === item.id ? "active" : ""}
            onClick={() => selectStage(item.id)}
            aria-current={stage === item.id ? "step" : undefined}
            data-tool-stage-button={item.id}
          >
            <item.icon size={16} aria-hidden="true" />
            <span>
              <strong>{labelFor(language, item.labelKo, item.labelEn)}</strong>
              <small>{labelFor(language, item.detailKo, item.detailEn)}</small>
            </span>
          </button>
        ))}
      </nav>

      <nav className="tool-studio-mode-rail" aria-label={ko ? "툴 스튜디오 세부 단계" : "Tool Studio detail modes"} data-tool-mode-depth={stage}>
        {currentStageModes.map((item) => (
          <button
            key={item.id}
            type="button"
            className={mode === item.id ? "active" : ""}
            onClick={() => selectMode(item.id)}
            data-tool-mode-button={item.id}
          >
            <item.icon size={16} aria-hidden="true" />
            <span>
              <strong>{labelFor(language, item.labelKo, item.labelEn)}</strong>
              <small>{item.shortcut}</small>
            </span>
          </button>
        ))}
      </nav>

      <div className="tool-studio-workbench">
        <section className="tool-studio-list-pane" aria-label={ko ? "툴 목록" : "Tool list"}>
          <div className="tool-pane-heading">
            <div>
              <p className="eyebrow">{ko ? "툴만 관리" : "Tools Only"}</p>
              <h3>{ko ? "등록된 툴" : "Registered tools"}</h3>
            </div>
            <button type="button" onClick={onOpenSource} title={ko ? "소스 열기" : "Open source"}>
              <FileCode2 size={15} aria-hidden="true" />
            </button>
          </div>
          <div className="tool-card-scroll">
            {toolCards.map((tool) => (
              <ContextMenu.Root key={tool.id}>
                <ContextMenu.Trigger asChild>
                  <article
                    className={`tool-card ${selectedToolId === tool.id ? "active" : ""}`}
                    onClick={() => {
                      setSelectedToolId(tool.id);
                      setMode(tool.mode);
                    }}
                    data-tool-card={tool.id}
                    tabIndex={0}
                  >
                    <tool.icon size={17} aria-hidden="true" />
                    <span>
                      <strong>{labelFor(language, tool.labelKo, tool.labelEn)}</strong>
                      <small>{labelFor(language, tool.detailKo, tool.detailEn)}</small>
                    </span>
                    <em>{tool.status}</em>
                  </article>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                  <ContextMenu.Content className="tool-context-content" data-tool-context-menu>
                    <ContextMenu.Label className="tool-menu-label">
                      {labelFor(language, tool.labelKo, tool.labelEn)}
                    </ContextMenu.Label>
                    <ContextMenu.Item className="tool-menu-item" onSelect={() => selectMode("build")}>
                      <Wand2 size={15} aria-hidden="true" />
                      <span>{ko ? "빌드 단계 열기" : "Open build step"}</span>
                    </ContextMenu.Item>
                    <ContextMenu.Item className="tool-menu-item" onSelect={() => selectMode("deploy")}>
                      <UploadCloud size={15} aria-hidden="true" />
                      <span>{ko ? "배포 점검" : "Deployment preflight"}</span>
                    </ContextMenu.Item>
                    <ContextMenu.Item className="tool-menu-item" onSelect={onOpenSource}>
                      <FileCode2 size={15} aria-hidden="true" />
                      <span>{ko ? "소스 보기" : "View source"}</span>
                    </ContextMenu.Item>
                    <ContextMenu.Item className="tool-menu-item" onSelect={onOpenTerminal}>
                      <SquareTerminal size={15} aria-hidden="true" />
                      <span>{ko ? "콘솔 열기" : "Open console"}</span>
                    </ContextMenu.Item>
                  </ContextMenu.Content>
                </ContextMenu.Portal>
              </ContextMenu.Root>
            ))}
          </div>
        </section>

        <section className="tool-studio-detail-pane" aria-label={ko ? "툴 상세 작업" : "Tool detail work"}>
          <div className="tool-pane-heading">
            <div>
              <p className="eyebrow">{activeMode.shortcut}</p>
              <h3>{labelFor(language, activeMode.labelKo, activeMode.labelEn)}</h3>
            </div>
            <span className={`tool-status-pill status-${selectedTool.status}`}>{selectedTool.status}</span>
          </div>
          <div className="tool-detail-scroll">
            <article className="tool-selected-summary">
              <selectedTool.icon size={22} aria-hidden="true" />
              <div>
                <span>{selectedTool.runtime}</span>
                <strong>{labelFor(language, selectedTool.labelKo, selectedTool.labelEn)}</strong>
                <p>{labelFor(language, selectedTool.detailKo, selectedTool.detailEn)}</p>
                <small>{selectedTool.path}</small>
              </div>
            </article>
            <div className="tool-build-flow">
              {buildSteps.map((step, index) => (
                <article key={step.labelEn} className={index <= toolModes.findIndex((item) => item.id === mode) ? "ready" : ""}>
                  <span>{index + 1}</span>
                  <step.icon size={16} aria-hidden="true" />
                  <strong>{labelFor(language, step.labelKo, step.labelEn)}</strong>
                  <small>{labelFor(language, step.detailKo, step.detailEn)}</small>
                </article>
              ))}
            </div>
            {mode === "build" && (
              <section className="tool-builder-workbench" data-tool-builder-workbench aria-label={ko ? "툴 제작 작업대" : "Tool builder workbench"}>
                <div className="tool-builder-blueprints" aria-label={ko ? "툴 템플릿" : "Tool templates"}>
                  {toolBuilderBlueprints.map((blueprint) => (
                    <button
                      key={blueprint.id}
                      type="button"
                      className={blueprint.id === selectedBlueprint.id ? "active" : ""}
                      onClick={() => setSelectedBlueprintId(blueprint.id)}
                      aria-pressed={blueprint.id === selectedBlueprint.id}
                      data-tool-builder-blueprint={blueprint.id}
                    >
                      <blueprint.icon size={16} aria-hidden="true" />
                      <span>
                        <strong>{labelFor(language, blueprint.labelKo, blueprint.labelEn)}</strong>
                        <small>{labelFor(language, blueprint.detailKo, blueprint.detailEn)}</small>
                      </span>
                    </button>
                  ))}
                </div>

                <div className="tool-builder-canvas">
                  <article className="tool-builder-manifest" data-tool-builder-manifest>
                    <header>
                      <span>{ko ? "Manifest" : "Manifest"}</span>
                      <strong>{selectedBlueprint.manifest}</strong>
                    </header>
                    <dl>
                      <div>
                        <dt>{ko ? "소스" : "Source"}</dt>
                        <dd>{selectedBlueprint.sourcePath}</dd>
                      </div>
                      <div>
                        <dt>{ko ? "스키마" : "Schema"}</dt>
                        <dd>{selectedBlueprint.schemaPath}</dd>
                      </div>
                      <div>
                        <dt>{ko ? "Gateway" : "Gateway"}</dt>
                        <dd>{labelFor(language, selectedBlueprint.gatewayKo, selectedBlueprint.gatewayEn)}</dd>
                      </div>
                    </dl>
                  </article>

                  <article className="tool-builder-command" data-tool-builder-command="run">
                    <header>
                      <PlayCircle size={16} aria-hidden="true" />
                      <span>{ko ? "실행 검증" : "Run validation"}</span>
                    </header>
                    <code>{selectedBlueprint.runCommand}</code>
                    <small>{labelFor(language, selectedBlueprint.riskKo, selectedBlueprint.riskEn)}</small>
                  </article>

                  <article className="tool-builder-command" data-tool-builder-command="package">
                    <header>
                      <PackageCheck size={16} aria-hidden="true" />
                      <span>{ko ? "패키지 점검" : "Package preflight"}</span>
                    </header>
                    <code>{selectedBlueprint.packageCommand}</code>
                    <small>{ko ? "README, license, rollback, validation record를 함께 묶습니다." : "Bundles README, license, rollback, and validation records."}</small>
                  </article>

                  <article className="tool-builder-outputs" data-tool-builder-outputs>
                    <header>
                      <ScrollText size={16} aria-hidden="true" />
                      <span>{ko ? "출력 계약" : "Output contract"}</span>
                    </header>
                    <ul>
                      {selectedBlueprint.outputs.map((output) => (
                        <li key={output}>{output}</li>
                      ))}
                    </ul>
                  </article>
                </div>

                <section className="tool-python-source-manager" data-tool-python-source-manager aria-label={ko ? "Python 소스 관리" : "Python source management"}>
                  <header className="tool-python-source-heading">
                    <div>
                      <p className="eyebrow">Python Source</p>
                      <h4>{ko ? "소스 관리만 보기" : "Manage only source files"}</h4>
                      <span>
                        {ko
                          ? "패키지, 모듈, entry point, smoke test를 한 줄 흐름으로 고정합니다."
                          : "Pin package, module, entry point, and smoke test in one source flow."}
                      </span>
                    </div>
                    <strong>{selectedBlueprint.packageName}</strong>
                  </header>

                  <div className="tool-python-source-layout">
                    <div className="tool-python-source-files" data-tool-python-source-files aria-label={ko ? "편집 대상" : "Edit targets"}>
                      {selectedBlueprint.editTargets.map((target) => (
                        <button
                          key={target}
                          type="button"
                          className={target === selectedSourceTarget ? "active" : ""}
                          onClick={() => setSelectedSourceTarget(target)}
                          aria-pressed={target === selectedSourceTarget}
                          data-tool-python-source-target={target}
                        >
                          <FileCode2 size={15} aria-hidden="true" />
                          <span>{target}</span>
                        </button>
                      ))}
                    </div>

                    <article className="tool-python-source-card" data-tool-python-source-pyproject>
                      <header>
                        <PackageCheck size={16} aria-hidden="true" />
                        <span>{ko ? "pyproject" : "pyproject"}</span>
                      </header>
                      <dl>
                        <div>
                          <dt>{ko ? "파일" : "File"}</dt>
                          <dd>{selectedBlueprint.pyprojectPath}</dd>
                        </div>
                        <div>
                          <dt>{ko ? "패키지" : "Package"}</dt>
                          <dd>{selectedBlueprint.packageName}</dd>
                        </div>
                        <div>
                          <dt>{ko ? "모듈" : "Module"}</dt>
                          <dd>{selectedBlueprint.moduleName}</dd>
                        </div>
                      </dl>
                    </article>

                    <article className="tool-python-source-card" data-tool-python-source-entrypoint>
                      <header>
                        <PlayCircle size={16} aria-hidden="true" />
                        <span>{ko ? "entry point" : "entry point"}</span>
                      </header>
                      <code>{selectedBlueprint.entrypoint}</code>
                      <small>{selectedBlueprint.testPath}</small>
                    </article>

                    <article className="tool-python-source-card tool-python-source-checklist" data-tool-python-source-checklist>
                      <header>
                        <ShieldCheck size={16} aria-hidden="true" />
                        <span>{ko ? "소스 체크" : "Source check"}</span>
                      </header>
                      <ul>
                        {selectedSourceChecklist.map((item) => (
                          <li key={item}>
                            <CheckCircle2 size={14} aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>

                  <article className="tool-python-source-command" data-tool-python-source-command>
                    <header>
                      <SquareTerminal size={16} aria-hidden="true" />
                      <span>{ko ? "초기화 명령" : "Init command"}</span>
                    </header>
                    <code>{selectedBlueprint.initCommand}</code>
                  </article>

                  <div className="tool-python-source-actions">
                    <button type="button" onClick={onOpenSource} data-tool-python-source-action="open">
                      <FileCode2 size={16} aria-hidden="true" />
                      <span>{ko ? "선택 파일 열기" : "Open selected"}</span>
                    </button>
                    <button type="button" onClick={onOpenTerminal} data-tool-python-source-action="terminal">
                      <SquareTerminal size={16} aria-hidden="true" />
                      <span>{ko ? "터미널 열기" : "Open terminal"}</span>
                    </button>
                    <button type="button" onClick={copyPythonSourcePlan} data-tool-python-source-action="copy">
                      <Copy size={16} aria-hidden="true" />
                      <span>{ko ? "소스 계획 복사" : "Copy source plan"}</span>
                    </button>
                  </div>
                </section>

                <div className="tool-builder-actions">
                  <button type="button" onClick={onOpenSource} data-tool-builder-action="source">
                    <FileCode2 size={16} aria-hidden="true" />
                    <span>{ko ? "소스 열기" : "Open source"}</span>
                  </button>
                  <button type="button" onClick={onOpenTerminal} data-tool-builder-action="smoke">
                    <SquareTerminal size={16} aria-hidden="true" />
                    <span>{ko ? "Smoke 실행" : "Run smoke"}</span>
                  </button>
                  <button type="button" onClick={() => selectMode("deploy")} data-tool-builder-action="package">
                    <UploadCloud size={16} aria-hidden="true" />
                    <span>{ko ? "배포 점검" : "Deployment check"}</span>
                  </button>
                  <button type="button" className="tool-builder-copy" onClick={copyBuilderSpec} data-tool-builder-action="copy">
                    <Copy size={16} aria-hidden="true" />
                    <span>{ko ? "명세 복사" : "Copy spec"}</span>
                  </button>
                </div>
              </section>
            )}
            {mode === "environment" && (
              <section className="tool-environment-workbench" data-tool-environment-workbench aria-label={ko ? "Python 실행환경 작업대" : "Python execution environment workbench"}>
                <div className="tool-environment-profiles" aria-label={ko ? "실행환경 프로필" : "Execution environment profiles"}>
                  {pythonEnvironmentProfiles.map((profile) => (
                    <button
                      key={profile.id}
                      type="button"
                      className={profile.id === selectedEnvironment.id ? "active" : ""}
                      onClick={() => setSelectedEnvironmentId(profile.id)}
                      aria-pressed={profile.id === selectedEnvironment.id}
                      data-tool-environment-profile={profile.id}
                    >
                      <profile.icon size={16} aria-hidden="true" />
                      <span>
                        <strong>{labelFor(language, profile.labelKo, profile.labelEn)}</strong>
                        <small>{labelFor(language, profile.detailKo, profile.detailEn)}</small>
                      </span>
                    </button>
                  ))}
                </div>

                <div className="tool-environment-canvas">
                  <article className="tool-environment-runtime" data-tool-environment-runtime>
                    <header>
                      <Cpu size={16} aria-hidden="true" />
                      <span>{ko ? "Runtime" : "Runtime"}</span>
                    </header>
                    <dl>
                      <div>
                        <dt>{ko ? "Interpreter" : "Interpreter"}</dt>
                        <dd>{selectedEnvironment.interpreter}</dd>
                      </div>
                      <div>
                        <dt>{ko ? "venv" : "venv"}</dt>
                        <dd>{selectedEnvironment.venvPath}</dd>
                      </div>
                      <div>
                        <dt>{ko ? "Dependencies" : "Dependencies"}</dt>
                        <dd>{selectedEnvironment.dependencyFile}</dd>
                      </div>
                      <div>
                        <dt>{ko ? "Lock / Report" : "Lock / Report"}</dt>
                        <dd>{selectedEnvironment.lockfile}</dd>
                      </div>
                    </dl>
                  </article>

                  <article className="tool-environment-install" data-tool-environment-install>
                    <header>
                      <PackageCheck size={16} aria-hidden="true" />
                      <span>{ko ? "설치 명령" : "Install command"}</span>
                    </header>
                    <code>{selectedEnvironment.installCommand}</code>
                    <small>{labelFor(language, selectedEnvironment.cacheKo, selectedEnvironment.cacheEn)}</small>
                  </article>

                  <article className="tool-environment-run" data-tool-environment-run>
                    <header>
                      <PlayCircle size={16} aria-hidden="true" />
                      <span>{ko ? "실행 명령" : "Run command"}</span>
                    </header>
                    <code>{selectedEnvironment.runCommand}</code>
                    <small>{ko ? "stdout, stderr, exit code, artifact 경로를 task-run 기록으로 남깁니다." : "Records stdout, stderr, exit code, and artifact paths in a task-run record."}</small>
                  </article>

                  <article className="tool-environment-sandbox" data-tool-environment-sandbox>
                    <header>
                      <ShieldCheck size={16} aria-hidden="true" />
                      <span>{ko ? "격리 경계" : "Isolation boundary"}</span>
                    </header>
                    <p>{labelFor(language, selectedEnvironment.sandboxKo, selectedEnvironment.sandboxEn)}</p>
                  </article>

                  <article className="tool-environment-health" data-tool-environment-health>
                    <header>
                      <CheckCircle2 size={16} aria-hidden="true" />
                      <span>{ko ? "헬스체크" : "Health checks"}</span>
                    </header>
                    <ul>
                      {selectedEnvironment.healthChecks.map((check) => (
                        <li key={check}>
                          <CheckCircle2 size={14} aria-hidden="true" />
                          <span>{check}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>

                <section className="tool-venv-manager" data-tool-venv-manager aria-label={ko ? "가상 환경 관리" : "Virtual environment manager"}>
                  <header className="tool-venv-heading">
                    <div>
                      <p className="eyebrow">Virtual Env</p>
                      <h4>{ko ? "가상 환경만 관리" : "Manage only the virtual environment"}</h4>
                      <span>
                        {ko
                          ? "생성, 활성화, 설치, 고정, 재생성을 분리해서 실행합니다."
                          : "Run create, activate, install, freeze, and rebuild as separate steps."}
                      </span>
                    </div>
                    <strong>{selectedEnvironment.venvPath}</strong>
                  </header>

                  <div className="tool-venv-steps" aria-label={ko ? "가상 환경 단계" : "Virtual environment steps"}>
                    {virtualEnvironmentLifecycleSteps.map((step) => (
                      <button
                        key={step.id}
                        type="button"
                        className={step.id === selectedVenvStep.id ? "active" : ""}
                        onClick={() => setSelectedVenvStepId(step.id)}
                        aria-pressed={step.id === selectedVenvStep.id}
                        data-tool-venv-step={step.id}
                      >
                        <step.icon size={15} aria-hidden="true" />
                        <span>{labelFor(language, step.labelKo, step.labelEn)}</span>
                      </button>
                    ))}
                  </div>

                  <article className="tool-venv-command" data-tool-venv-command={selectedVenvStep.id}>
                    <header>
                      <selectedVenvStep.icon size={16} aria-hidden="true" />
                      <span>{labelFor(language, selectedVenvStep.labelKo, selectedVenvStep.labelEn)}</span>
                    </header>
                    <p>{labelFor(language, selectedVenvStep.detailKo, selectedVenvStep.detailEn)}</p>
                    <code>{selectedVenvCommand}</code>
                    <small>{labelFor(language, selectedVenvStep.evidenceKo, selectedVenvStep.evidenceEn)}</small>
                  </article>

                  <div className="tool-venv-actions">
                    <button type="button" onClick={onOpenTerminal} data-tool-venv-action="terminal">
                      <SquareTerminal size={16} aria-hidden="true" />
                      <span>{ko ? "터미널 열기" : "Open terminal"}</span>
                    </button>
                    <button type="button" onClick={copyVirtualEnvironmentCommand} data-tool-venv-action="copy-command">
                      <Copy size={16} aria-hidden="true" />
                      <span>{ko ? "명령 복사" : "Copy command"}</span>
                    </button>
                    <button type="button" onClick={copyVirtualEnvironmentWorkflow} data-tool-venv-action="copy-workflow">
                      <ScrollText size={16} aria-hidden="true" />
                      <span>{ko ? "workflow 복사" : "Copy workflow"}</span>
                    </button>
                  </div>
                </section>

                <div className="tool-environment-actions">
                  <button type="button" onClick={onOpenTerminal} data-tool-environment-action="create">
                    <Cpu size={16} aria-hidden="true" />
                    <span>{ko ? "venv 생성" : "Create venv"}</span>
                  </button>
                  <button type="button" onClick={onOpenTerminal} data-tool-environment-action="install">
                    <PackageCheck size={16} aria-hidden="true" />
                    <span>{ko ? "의존성 설치" : "Install deps"}</span>
                  </button>
                  <button type="button" onClick={onOpenTerminal} data-tool-environment-action="smoke">
                    <SquareTerminal size={16} aria-hidden="true" />
                    <span>{ko ? "Smoke 실행" : "Run smoke"}</span>
                  </button>
                  <button type="button" onClick={copyEnvironmentPlan} data-tool-environment-action="copy">
                    <Copy size={16} aria-hidden="true" />
                    <span>{ko ? "환경 계획 복사" : "Copy env plan"}</span>
                  </button>
                </div>
              </section>
            )}
            {mode === "deploy" && (
              <section className="tool-deploy-workbench" data-tool-deploy-workbench aria-label={ko ? "툴 배포 작업대" : "Tool deployment workbench"}>
                <div className="tool-deploy-targets" aria-label={ko ? "배포 대상" : "Deployment targets"}>
                  {toolDeployTargets.map((target) => (
                    <button
                      key={target.id}
                      type="button"
                      className={target.id === selectedDeployTarget.id ? "active" : ""}
                      onClick={() => setSelectedDeployTargetId(target.id)}
                      aria-pressed={target.id === selectedDeployTarget.id}
                      data-tool-deploy-target={target.id}
                    >
                      <target.icon size={16} aria-hidden="true" />
                      <span>
                        <strong>{labelFor(language, target.labelKo, target.labelEn)}</strong>
                        <small>{labelFor(language, target.detailKo, target.detailEn)}</small>
                      </span>
                    </button>
                  ))}
                </div>

                <div className="tool-deploy-canvas">
                  <article className="tool-deploy-release" data-tool-deploy-release>
                    <header>
                      <UploadCloud size={16} aria-hidden="true" />
                      <span>{ko ? "Release target" : "Release target"}</span>
                    </header>
                    <dl>
                      <div>
                        <dt>{ko ? "Target" : "Target"}</dt>
                        <dd>{selectedDeployTarget.target}</dd>
                      </div>
                      <div>
                        <dt>{ko ? "Artifact" : "Artifact"}</dt>
                        <dd>{selectedDeployTarget.artifact}</dd>
                      </div>
                      <div>
                        <dt>{ko ? "Command" : "Command"}</dt>
                        <dd>{selectedDeployTarget.command}</dd>
                      </div>
                    </dl>
                  </article>

                  <article className="tool-deploy-preflight" data-tool-deploy-preflight>
                    <header>
                      <ShieldCheck size={16} aria-hidden="true" />
                      <span>{ko ? "Preflight" : "Preflight"}</span>
                    </header>
                    <ul>
                      {selectedDeployTarget.preflight.map((item) => (
                        <li key={item}>
                          <CheckCircle2 size={14} aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>

                  <article className="tool-deploy-guardrails" data-tool-deploy-guardrails>
                    <header>
                      <Settings size={16} aria-hidden="true" />
                      <span>{ko ? "권한과 관측" : "Auth and observability"}</span>
                    </header>
                    <dl>
                      <div>
                        <dt>{ko ? "Auth" : "Auth"}</dt>
                        <dd>{labelFor(language, selectedDeployTarget.authKo, selectedDeployTarget.authEn)}</dd>
                      </div>
                      <div>
                        <dt>{ko ? "Observe" : "Observe"}</dt>
                        <dd>{labelFor(language, selectedDeployTarget.observabilityKo, selectedDeployTarget.observabilityEn)}</dd>
                      </div>
                    </dl>
                  </article>

                  <article className="tool-deploy-rollback" data-tool-deploy-rollback>
                    <header>
                      <ScrollText size={16} aria-hidden="true" />
                      <span>{ko ? "Rollback" : "Rollback"}</span>
                    </header>
                    <code>{selectedDeployTarget.rollback}</code>
                  </article>
                </div>

                <div className="tool-deploy-actions">
                  <button type="button" onClick={onOpenTerminal} data-tool-deploy-action="preflight">
                    <ShieldCheck size={16} aria-hidden="true" />
                    <span>{ko ? "사전점검 실행" : "Run preflight"}</span>
                  </button>
                  <button type="button" onClick={onOpenTerminal} data-tool-deploy-action="package">
                    <PackageCheck size={16} aria-hidden="true" />
                    <span>{ko ? "패키지 빌드" : "Build package"}</span>
                  </button>
                  <button type="button" onClick={() => selectMode("registry")} data-tool-deploy-action="registry">
                    <GitBranch size={16} aria-hidden="true" />
                    <span>{ko ? "Registry 반영" : "Update registry"}</span>
                  </button>
                  <button type="button" onClick={copyDeployPlan} data-tool-deploy-action="copy">
                    <Copy size={16} aria-hidden="true" />
                    <span>{ko ? "배포 계획 복사" : "Copy plan"}</span>
                  </button>
                </div>
              </section>
            )}
            <div className="tool-shortcut-grid">
              {toolModes.map((item) => (
                <article key={item.id}>
                  <Keyboard size={15} aria-hidden="true" />
                  <span>{labelFor(language, item.labelKo, item.labelEn)}</span>
                  <kbd>{item.shortcut}</kbd>
                </article>
              ))}
            </div>
          </div>
        </section>

        <aside className="tool-studio-side-pane" aria-label={ko ? "환경과 협업 상태" : "Environment and collaboration"}>
          <section className="tool-agent-scene-panel">
            <div className="tool-pane-heading">
              <div>
                <p className="eyebrow">Agent Work</p>
                <h3>{ko ? "협업 캐릭터 맵" : "3D collaboration map"}</h3>
              </div>
              <span>{runtimeAdapterId}</span>
            </div>
            <canvas ref={canvasRef} className="tool-agent-canvas" data-agent-3d-canvas aria-label={ko ? "에이전트 협업 3D 장면" : "Agent collaboration 3D scene"} />
          </section>

          <section className="tool-env-panel">
            <div className="tool-pane-heading">
              <div>
                <p className="eyebrow">Python</p>
                <h3>{ko ? "실행환경" : "Execution env"}</h3>
              </div>
              <button type="button" onClick={onOpenProviderSettings} title={ko ? "계정 설정" : "Provider settings"}>
                <Settings size={15} aria-hidden="true" />
              </button>
            </div>
            <div className="tool-env-scroll">
              {environmentRows.map((row) => (
                <article key={row.value}>
                  <CheckCircle2 size={15} aria-hidden="true" />
                  <span>{labelFor(language, row.labelKo, row.labelEn)}</span>
                  <strong>{row.value}</strong>
                  <small>{labelFor(language, row.detailKo, row.detailEn)}</small>
                </article>
              ))}
              <article>
                <ExternalLink size={15} aria-hidden="true" />
                <span>{ko ? "Provider" : "Provider"}</span>
                <strong>{providerConfiguredCount.toLocaleString("ko-KR")}</strong>
                <small>{ko ? "직접 실행 가능한 계정" : "direct-run accounts"}</small>
              </article>
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
