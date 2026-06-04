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

export type ToolStudioMode = "build" | "environment" | "deploy" | "registry";
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
  labelKo: string;
  labelEn: string;
  detailKo: string;
  detailEn: string;
  shortcut: string;
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

const toolModes: ToolMode[] = [
  {
    id: "build",
    labelKo: "툴 만들기",
    labelEn: "Build Tool",
    detailKo: "파이썬 소스, 입력 스키마, 검증 명령을 한 단계씩 정의합니다.",
    detailEn: "Define Python source, input schema, and validation commands one step at a time.",
    shortcut: "⌘B",
    icon: Wand2
  },
  {
    id: "environment",
    labelKo: "파이썬 환경",
    labelEn: "Python Env",
    detailKo: "venv, requirements, 실행 명령, 격리 경계를 확인합니다.",
    detailEn: "Check venv, requirements, run commands, and isolation boundaries.",
    shortcut: "⌘⇧E",
    icon: Cpu
  },
  {
    id: "deploy",
    labelKo: "툴 배포",
    labelEn: "Deploy Tool",
    detailKo: "검증, 패키징, 배포 전 점검을 분리된 단계로 진행합니다.",
    detailEn: "Run validation, packaging, and preflight as separate steps.",
    shortcut: "⌘⏎",
    icon: Rocket
  },
  {
    id: "registry",
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
  const [mode, setMode] = useState<ToolStudioMode>("build");
  const [selectedToolId, setSelectedToolId] = useState(toolCards[0].id);
  const ko = language === "ko";
  const activeMode = toolModes.find((item) => item.id === mode) || toolModes[0];
  const selectedTool = toolCards.find((item) => item.id === selectedToolId) || toolCards[0];
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
    setMode(nextMode);
    const matchingTool = toolCards.find((item) => item.mode === nextMode);
    if (matchingTool) {
      setSelectedToolId(matchingTool.id);
    }
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
              <button type="button" className="tool-studio-primary-action" data-tool-primary-menu>
                <activeMode.icon size={16} aria-hidden="true" />
                <span>{labelFor(language, activeMode.labelKo, activeMode.labelEn)}</span>
                <ChevronDown size={15} aria-hidden="true" />
              </button>
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
          <button type="button" onClick={onOpenAgents}>
            <Bot size={16} aria-hidden="true" />
            <span>{ko ? "에이전트 코어" : "Agent Core"}</span>
          </button>
          <button type="button" onClick={onOpenTerminal}>
            <SquareTerminal size={16} aria-hidden="true" />
            <span>{ko ? "실행 콘솔" : "Run Console"}</span>
          </button>
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

      <nav className="tool-studio-mode-rail" aria-label={ko ? "툴 스튜디오 단계" : "Tool Studio modes"}>
        {toolModes.map((item) => (
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
