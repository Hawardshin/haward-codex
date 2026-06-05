import {
  Box,
  Braces,
  Code2,
  Cpu,
  FileCode2,
  GitBranch,
  PackageCheck,
  PlayCircle,
  Rocket,
  ScrollText,
  ShieldCheck,
  SquareTerminal,
  Wand2
} from "lucide-react";

import type {
  PythonEnvironmentProfile,
  ToolBuildStep,
  ToolBuilderBlueprint,
  ToolCard,
  ToolDeployTarget,
  ToolEnvironmentRow,
  ToolMode,
  ToolStage,
  VirtualEnvironmentLifecycleStep
} from "./types";

export const toolStudioStages: ToolStage[] = [
  {
    id: "create",
    labelKo: "제작 준비",
    labelEn: "Create",
    detailKo: "소스와 실행 환경을 먼저 정리합니다.",
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

export const toolModes: ToolMode[] = [
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
    detailKo: "가상 환경, requirements, 실행 명령, 격리 경계를 확인합니다.",
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
    detailKo: "툴 목록, 소유 경계, 상태, 롤백만 관리합니다.",
    detailEn: "Manage only tool list, ownership, status, and rollback.",
    shortcut: "⌘⌥T",
    icon: PackageCheck
  }
];

export const toolCards: ToolCard[] = [
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
    detailKo: "소스, README, 스키마, 검증 기록을 배포 단위로 묶습니다.",
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
    detailKo: "승인된 커넥터와 도구 호출 기록을 에이전트 코어 흐름에 연결합니다.",
    detailEn: "Connects approved connectors and tool-call records to the Agent Core flow.",
    status: "review",
    runtime: "local gateway",
    path: "agent-platform/configs/tools/mcp-gateway-tool.json",
    mode: "registry",
    icon: GitBranch
  }
];

export const buildSteps: ToolBuildStep[] = [
  { labelKo: "소스 선택", labelEn: "Choose Source", detailKo: "Python 파일 또는 템플릿", detailEn: "Python file or template", icon: Code2 },
  { labelKo: "입력 스키마", labelEn: "Input Schema", detailKo: "JSON 스키마와 예시", detailEn: "JSON schema and examples", icon: Braces },
  { labelKo: "실행 검증", labelEn: "Run Check", detailKo: "pytest 또는 CLI 스모크 테스트", detailEn: "pytest or CLI smoke", icon: PlayCircle },
  { labelKo: "배포 전 점검", labelEn: "Preflight", detailKo: "라이선스, 롤백, 문서", detailEn: "license, rollback, docs", icon: ShieldCheck }
];

export const toolBuilderBlueprints: ToolBuilderBlueprint[] = [
  {
    id: "python-cli-tool",
    labelKo: "Python CLI Tool",
    labelEn: "Python CLI Tool",
    detailKo: "입력 JSON을 받아 표준 출력 산출물을 만드는 기본 툴",
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
    gatewayKo: "로컬 런타임에서 먼저 검증한 뒤 레지스트리에 등록",
    gatewayEn: "Validate in local runtime before adding it to the registry.",
    riskKo: "파일 쓰기, 네트워크, 비밀값 접근은 기본 비활성",
    riskEn: "File writes, network, and secret access are disabled by default.",
    manifest: "tool.json",
    editTargets: [
      "tools/new-python-tool/src/new_python_tool/__main__.py",
      "tools/new-python-tool/src/new_python_tool/tool.py",
      "tools/new-python-tool/tests/smoke_test.py",
      "tools/new-python-tool/pyproject.toml"
    ],
    sourceChecklistKo: [
      "src/ 구조로 패키지 경계를 먼저 고정",
      "console script는 main() 하나만 호출",
      "스키마 예시와 스모크 테스트 fixture를 같은 입력으로 유지"
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
    detailKo: "승인된 MCP 서버의 목록 조회와 호출을 로컬 툴로 감쌉니다",
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
    gatewayKo: "AgentCore Gateway처럼 도구 탐색과 호출을 분리",
    gatewayEn: "Separates tool discovery from invocation like AgentCore Gateway.",
    riskKo: "커넥터 권한과 호출 추적이 없는 서버는 등록 보류",
    riskEn: "Servers without connector scope and call traces remain blocked.",
    manifest: "mcp-tool.json",
    editTargets: [
      "tools/mcp-wrapper/src/mcp_wrapper/client.py",
      "tools/mcp-wrapper/src/mcp_wrapper/schema.py",
      "tools/mcp-wrapper/tests/smoke_test.py",
      "tools/mcp-wrapper/pyproject.toml"
    ],
    sourceChecklistKo: [
      "탐색 코드와 호출 코드를 분리",
      "서버 ID, 도구 이름, 입력 스키마를 명시",
      "호출 추적 fixture를 스모크 테스트에 고정"
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
    gatewayKo: "에이전트 작업 실행 저장소와 결과 기록을 기본 출력으로 연결",
    gatewayEn: "Connects task-run store and result records as default outputs.",
    riskKo: "반복 실행, 비용, 외부 변경은 승인 게이트 뒤에 둠",
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
      "롤백 계획을 출력 계약에 포함",
      "반복 실행 비용과 외부 변경 게이트를 명시"
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

export const toolDeployTargets: ToolDeployTarget[] = [
  {
    id: "local-registry",
    labelKo: "로컬 레지스트리",
    labelEn: "Local Registry",
    detailKo: "검증된 툴을 로컬 레지스트리에 먼저 게시합니다",
    detailEn: "Publishes a verified tool to the local registry first.",
    target: "agent-platform/configs/tools/registry.json",
    command: "python scripts/tool_deploy.py --target local --preflight",
    artifact: "artifacts/tool-package.tar.gz",
    authKo: "로컬 실행 권한만 허용",
    authEn: "Allows local execution scope only.",
    observabilityKo: "작업 실행 기록과 검증 기록 연결",
    observabilityEn: "Links task-run and validation records.",
    rollback: "restore registry entry + remove package artifact",
    preflight: ["schema validation", "smoke test", "license review", "rollback plan"],
    icon: PackageCheck
  },
  {
    id: "agentcore-gateway",
    labelKo: "AgentCore Gateway",
    labelEn: "AgentCore Gateway",
    detailKo: "MCP/OpenAPI 대상 스키마와 인증 범위를 점검합니다",
    detailEn: "Checks MCP/OpenAPI target schema and credential scope.",
    target: "gateway-target/tools.json",
    command: "agentcore add gateway-target --tool-schema-file tools.json --dry-run",
    artifact: "artifacts/gateway-target-preflight.json",
    authKo: "인증 제공자, OAuth/API 키, 최소 권한",
    authEn: "Credential provider, OAuth/API key, least privilege.",
    observabilityKo: "도구 호출 추적, 지연 시간, 오류 지표 기록",
    observabilityEn: "Records tool-call trace, latency, and error metrics.",
    rollback: "disable gateway target + revoke credential provider",
    preflight: ["tool schema file", "credential scope", "invoke dry-run", "trace mapping"],
    icon: GitBranch
  },
  {
    id: "desktop-bundle",
    labelKo: "데스크톱 번들",
    labelEn: "Desktop Bundle",
    detailKo: "데스크톱 앱에 포함할 툴 패키지와 업데이트 경계를 만듭니다",
    detailEn: "Creates a tool package and update boundary for the desktop app.",
    target: "platform-desktop-app/tool-bundles/",
    command: "corepack pnpm run desktop:verify:quick && python scripts/package_tool_bundle.py",
    artifact: "artifacts/desktop-tool-bundle.zip",
    authKo: "앱 내부 어댑터 권한과 작업공간 경계 사용",
    authEn: "Uses app adapter permissions and workspace boundaries.",
    observabilityKo: "데스크톱 실행 로그, 번들 해시, 설치 감사 기록",
    observabilityEn: "Records desktop run logs, bundle hash, and install audit.",
    rollback: "restore previous bundle hash + restart adapter",
    preflight: ["bundle hash", "desktop quick verify", "workspace boundary", "install audit"],
    icon: Rocket
  }
];

export const pythonEnvironmentProfiles: PythonEnvironmentProfile[] = [
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
    sandboxKo: "로컬 작업공간 파일만 읽고 비밀값, 네트워크, 외부 쓰기는 기본 차단",
    sandboxEn: "Reads local workspace files only; secrets, network, and external writes are blocked by default.",
    cacheKo: "pip 휠 캐시는 작업공간 캐시 아래에서 툴별로 분리",
    cacheEn: "Pip wheel cache is separated per tool under the workspace cache.",
    healthChecks: ["python -V", "pip check", "pytest tests/smoke_test.py"],
    icon: FileCode2
  },
  {
    id: "isolated-runner",
    labelKo: "Isolated runner",
    labelEn: "Isolated runner",
    detailKo: "매 실행마다 임시 venv를 준비하고 편집 가능 설치와 스모크 테스트로 검증합니다.",
    detailEn: "Prepares an ephemeral venv per run and validates it with editable install smoke tests.",
    interpreter: "Python 3.12",
    venvPath: ".venv-run",
    dependencyFile: "pyproject.toml",
    lockfile: "uv.lock",
    installCommand: "python -m venv .venv-run && .venv-run/bin/python -m pip install -e \".[test]\"",
    runCommand: ".venv-run/bin/python -m pytest tests/smoke_test.py",
    sandboxKo: "네트워크는 기본 차단, 쓰기 가능한 임시 폴더만 허용, 실행 뒤 환경 삭제",
    sandboxEn: "Network off by default, writable temp only, and the environment is removed after the run.",
    cacheKo: "빌드 산출물은 실행 캐시에 남기고 인터프리터와 site-packages는 폐기",
    cacheEn: "Build artifacts remain in the run cache while interpreter and site-packages are discarded.",
    healthChecks: ["python -m pip check", "pytest -q", "python -m tool --help"],
    icon: ShieldCheck
  },
  {
    id: "agent-sandbox",
    labelKo: "Agent sandbox",
    labelEn: "Agent sandbox",
    detailKo: "AgentCore Code Interpreter 방식의 격리 실행 경계를 로컬 툴에 적용합니다.",
    detailEn: "Applies AgentCore Code Interpreter-style isolation boundaries to local tools.",
    interpreter: "Python 3.12 sandbox",
    venvPath: "runtime/sandbox/.venv",
    dependencyFile: "pyproject.toml",
    lockfile: "sandbox-report.json",
    installCommand: "python scripts/run_sandbox.py --prepare --timeout 120 --memory 512",
    runCommand: "python scripts/run_sandbox.py --invoke fixtures/smoke.json --timeout 120 --memory 512",
    sandboxKo: "네트워크, 비밀값, 브라우저 인증 정보, 호스트 경로 접근은 명시 승인 전 차단",
    sandboxEn: "Network, secrets, browser credentials, and host paths are blocked before explicit approval.",
    cacheKo: "샌드박스 이미지 해시와 의존성 보고서만 보존하고 실행 파일 시스템은 폐기",
    cacheEn: "Only sandbox image hash and dependency report are kept; the run filesystem is discarded.",
    healthChecks: ["sandbox-report.json", "stdout/stderr capture", "timeout and memory guard"],
    icon: Cpu
  }
];

export const virtualEnvironmentLifecycleSteps: VirtualEnvironmentLifecycleStep[] = [
  {
    id: "create",
    labelKo: "생성",
    labelEn: "Create",
    detailKo: "기본 Python 위에 폐기 가능한 가상 환경을 만듭니다.",
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
    detailKo: "셸 PATH를 바꾸거나 가상 환경의 Python을 직접 호출합니다.",
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
    evidenceKo: "pip check와 스모크 테스트로 충돌을 확인",
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
    detailKo: "현재 설치 상태를 재현 가능한 잠금 파일이나 보고서로 남깁니다.",
    detailEn: "Write the current install state to a reproducible lock or report.",
    evidenceKo: "잠금 파일/보고서 변경과 의존성 출처 확인",
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
    evidenceKo: "새 pyvenv.cfg, pip check, 스모크 테스트 출력 확인",
    evidenceEn: "Check the new pyvenv.cfg, pip check, and smoke output.",
    command: (environment) => environment.dependencyFile === "requirements.txt"
      ? `rm -rf ${environment.venvPath} && python -m venv ${environment.venvPath} && ${environment.venvPath}/bin/python -m pip install -r ${environment.dependencyFile}`
      : `rm -rf ${environment.venvPath} && python -m venv ${environment.venvPath} && ${environment.venvPath}/bin/python -m pip install -e ".[test]"`,
    icon: ShieldCheck
  }
];

export const environmentRows: ToolEnvironmentRow[] = [
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
    detailKo: "Python 패키지와 테스트 분리",
    detailEn: "Separate Python package and tests"
  },
  {
    labelKo: "의존성",
    labelEn: "Dependencies",
    value: "requirements.txt",
    detailKo: "고정, 감사, 롤백 기록",
    detailEn: "Pin, audit, and rollback records"
  },
  {
    labelKo: "실행",
    labelEn: "Run",
    value: "python -m tool",
    detailKo: "표준 출력/오류와 작업 실행 기록",
    detailEn: "stdout/stderr/task-run records"
  }
];
