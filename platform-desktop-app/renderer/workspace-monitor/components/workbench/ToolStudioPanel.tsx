"use client";

import * as ContextMenu from "@radix-ui/react-context-menu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Bot,
  CheckCircle2,
  ChevronDown,
  Copy,
  Cpu,
  ExternalLink,
  FileCode2,
  GitBranch,
  Keyboard,
  PackageCheck,
  PlayCircle,
  ScrollText,
  Settings,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  UploadCloud,
  Wand2
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ActionGroup } from "@/components/ui/ActionGroup";
import { Button } from "@/components/ui/Button";
import { writeClipboardText } from "@/lib/clipboard.mjs";
import {
  buildSteps,
  environmentRows,
  pythonEnvironmentProfiles,
  toolBuilderBlueprints,
  toolCards,
  toolDeployTargets,
  toolModes,
  toolStudioStages,
  virtualEnvironmentLifecycleSteps
} from "./tool-studio/data";
import type { ToolStudioMode, ToolStudioModeRequest, ToolStudioStage } from "./tool-studio/types";

export type { ToolStudioMode, ToolStudioModeRequest } from "./tool-studio/types";

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
  const [actionMenuOpen, setActionMenuOpen] = useState(false);
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

  const selectMode = useCallback((nextMode: ToolStudioMode) => {
    const nextModeItem = toolModes.find((item) => item.id === nextMode) || toolModes[0];
    setStage(nextModeItem.stage);
    setMode(nextMode);
    const matchingTool = toolCards.find((item) => item.mode === nextMode);
    if (matchingTool) {
      setSelectedToolId(matchingTool.id);
    }
  }, []);

  const selectStage = useCallback(
    (nextStage: ToolStudioStage) => {
      if (stage === nextStage) {
        return;
      }
      const firstMode = toolModes.find((item) => item.stage === nextStage) || toolModes[0];
      selectMode(firstMode.id);
    },
    [selectMode, stage]
  );

  const selectAdjacentMode = useCallback(
    (direction: 1 | -1) => {
      const currentIndex = Math.max(0, toolModes.findIndex((item) => item.id === mode));
      const nextIndex = (currentIndex + direction + toolModes.length) % toolModes.length;
      selectMode(toolModes[nextIndex].id);
    },
    [mode, selectMode]
  );

  const copyActionMap = useCallback(() => {
    void writeClipboardText(JSON.stringify({
      activeMode: mode,
      activeStage: stage,
      mouse: {
        leftClick: ko ? "상위 흐름 또는 세부 기능을 바로 선택" : "Select a parent flow or detail mode directly",
        rightClick: ko ? "현재 위치의 컨텍스트 액션 메뉴 열기" : "Open context actions for the current surface"
      },
      shortcuts: [
        { keys: "Alt+Enter", action: ko ? "빠른 액션 메뉴" : "Quick action menu" },
        { keys: "Alt+1 / Alt+2", action: ko ? "상위 흐름 선택" : "Choose parent flow" },
        { keys: "Alt+← / Alt+→", action: ko ? "이전/다음 세부 기능" : "Previous/next detail mode" },
        ...toolModes.map((item) => ({
          keys: item.shortcut,
          action: labelFor(language, item.labelKo, item.labelEn)
        }))
      ]
    }, null, 2));
  }, [ko, language, mode, stage]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isFormField(event.target)) {
        return;
      }
      const key = event.key.toLowerCase();
      if (event.altKey && event.key === "Enter") {
        event.preventDefault();
        setActionMenuOpen(true);
        return;
      }
      if (event.altKey && key === "1") {
        event.preventDefault();
        selectStage("create");
        return;
      }
      if (event.altKey && key === "2") {
        event.preventDefault();
        selectStage("ship");
        return;
      }
      if (event.altKey && event.key === "ArrowLeft") {
        event.preventDefault();
        selectAdjacentMode(-1);
        return;
      }
      if (event.altKey && event.key === "ArrowRight") {
        event.preventDefault();
        selectAdjacentMode(1);
        return;
      }
      if ((event.metaKey || event.ctrlKey) && key === "b") {
        event.preventDefault();
        selectMode("build");
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && key === "e") {
        event.preventDefault();
        selectMode("environment");
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        selectMode("deploy");
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.altKey && key === "t") {
        event.preventDefault();
        selectMode("registry");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectAdjacentMode, selectMode, selectStage]);

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
      const visorGeometry = new THREE.BoxGeometry(0.3, 0.07, 0.04);
      const chestPanelGeometry = new THREE.BoxGeometry(0.24, 0.16, 0.04);
      const footGeometry = new THREE.BoxGeometry(0.18, 0.09, 0.24);
      const handGeometry = new THREE.SphereGeometry(0.07, 12, 10);
      const antennaGeometry = new THREE.CylinderGeometry(0.012, 0.012, 0.18, 8);
      const statusLightGeometry = new THREE.SphereGeometry(0.045, 12, 10);
      const roleHaloGeometry = new THREE.TorusGeometry(0.42, 0.016, 8, 48);
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
        const accent = palette[index];
        const material = new THREE.MeshStandardMaterial({
          color: accent,
          emissive: accent,
          emissiveIntensity: 0.07,
          roughness: 0.36,
          metalness: 0.12
        });
        const shellMaterial = new THREE.MeshStandardMaterial({ color: 0xe6edf3, roughness: 0.44, metalness: 0.12 });
        const visorMaterial = new THREE.MeshStandardMaterial({
          color: 0x9fd4ff,
          emissive: accent,
          emissiveIntensity: 0.28,
          roughness: 0.2,
          metalness: 0.08
        });
        const panelMaterial = new THREE.MeshStandardMaterial({
          color: 0x0d1117,
          emissive: accent,
          emissiveIntensity: 0.18,
          roughness: 0.28,
          metalness: 0.12
        });
        const body = new THREE.Mesh(bodyGeometry.clone(), material);
        const head = new THREE.Mesh(headGeometry.clone(), shellMaterial.clone());
        const visor = new THREE.Mesh(visorGeometry.clone(), visorMaterial);
        const chestPanel = new THREE.Mesh(chestPanelGeometry.clone(), panelMaterial);
        const leftFoot = new THREE.Mesh(footGeometry.clone(), shellMaterial.clone());
        const rightFoot = new THREE.Mesh(footGeometry.clone(), shellMaterial.clone());
        const leftHand = new THREE.Mesh(handGeometry.clone(), shellMaterial.clone());
        const rightHand = new THREE.Mesh(handGeometry.clone(), shellMaterial.clone());
        const antenna = new THREE.Mesh(antennaGeometry.clone(), shellMaterial.clone());
        const statusLight = new THREE.Mesh(statusLightGeometry.clone(), new THREE.MeshStandardMaterial({
          color: accent,
          emissive: accent,
          emissiveIntensity: 0.55,
          roughness: 0.18
        }));
        const roleHalo = new THREE.Mesh(roleHaloGeometry.clone(), new THREE.MeshStandardMaterial({
          color: accent,
          emissive: accent,
          emissiveIntensity: 0.26,
          roughness: 0.36
        }));
        const character = new THREE.Group();
        character.position.set(Math.cos(angle) * 1.55, -0.46, Math.sin(angle) * 1.55);
        character.userData = { mode: item.id };
        character.name = `tool-agent-character-${item.id}`;
        body.name = "tool-agent-character-torso";
        head.name = "tool-agent-character-head";
        visor.name = "tool-agent-character-visor";
        chestPanel.name = "tool-agent-character-chest-panel";
        statusLight.name = "tool-agent-character-status-light";
        roleHalo.name = "tool-agent-character-role-halo";
        body.position.y = 0;
        head.position.y = 0.58;
        visor.position.set(0, 0.62, 0.23);
        chestPanel.position.set(0, 0.15, 0.3);
        leftFoot.position.set(-0.14, -0.44, 0.08);
        rightFoot.position.set(0.14, -0.44, 0.08);
        leftHand.position.set(-0.34, 0.08, 0);
        rightHand.position.set(0.34, 0.08, 0);
        antenna.position.set(0, 0.9, 0);
        statusLight.position.set(0, 1.02, 0);
        roleHalo.rotation.x = Math.PI / 2;
        roleHalo.position.y = -0.48;
        character.add(body);
        character.add(head);
        character.add(visor);
        character.add(chestPanel);
        character.add(leftFoot);
        character.add(rightFoot);
        character.add(leftHand);
        character.add(rightHand);
        character.add(antenna);
        character.add(statusLight);
        character.add(roleHalo);
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

      const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      let sceneVisible = true;
      let viewportCheckFrame = 0;
      let viewportCheckInterval = 0;

      const isCanvasInViewport = () => {
        if (document.hidden) {
          return false;
        }
        const rect = canvas.getBoundingClientRect();
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          rect.bottom > 0 &&
          rect.right > 0 &&
          rect.top < window.innerHeight &&
          rect.left < window.innerWidth
        );
      };

      const stopLoop = () => {
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        }
        canvas.setAttribute("data-agent-3d-paused", "true");
      };

      const renderFrame = (time: number) => {
        if (disposed || !sceneVisible || !isCanvasInViewport()) {
          sceneVisible = false;
          stopLoop();
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
      };

      const scheduleLoop = () => {
        if (disposed) {
          return;
        }
        if (document.hidden || reducedMotionQuery.matches || !sceneVisible) {
          stopLoop();
          return;
        }
        if (animationFrame) {
          return;
        }
        canvas.setAttribute("data-agent-3d-paused", "false");
        animationFrame = window.requestAnimationFrame(render);
      };

      const render = (time: number) => {
        animationFrame = 0;
        renderFrame(time);
        scheduleLoop();
      };

      const requestViewportCheck = () => {
        if (viewportCheckFrame) {
          return;
        }
        if (document.hidden) {
          sceneVisible = false;
          stopLoop();
          return;
        }
        viewportCheckFrame = window.requestAnimationFrame(() => {
          viewportCheckFrame = 0;
          sceneVisible = isCanvasInViewport();
          if (sceneVisible) {
            resize();
            renderFrame(performance.now());
            scheduleLoop();
          } else {
            stopLoop();
          }
        });
      };

      const visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          sceneVisible = Boolean(entry?.isIntersecting) && isCanvasInViewport();
          if (sceneVisible) {
            resize();
            renderFrame(performance.now());
            scheduleLoop();
          } else {
            stopLoop();
          }
        },
        { threshold: 0.08 }
      );
      visibilityObserver.observe(canvas);

      const handleReducedMotionChange = () => {
        stopLoop();
        if (sceneVisible) {
          renderFrame(performance.now());
          scheduleLoop();
        }
      };

      const handleDocumentVisibilityChange = () => {
        if (document.hidden) {
          sceneVisible = false;
          stopLoop();
        } else {
          requestViewportCheck();
        }
      };
      reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
      document.addEventListener("visibilitychange", handleDocumentVisibilityChange);
      window.addEventListener("scroll", requestViewportCheck, { passive: true });
      window.addEventListener("resize", requestViewportCheck);
      viewportCheckInterval = window.setInterval(requestViewportCheck, 400);
      renderFrame(performance.now());
      scheduleLoop();

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
        stopLoop();
        if (viewportCheckFrame) {
          window.cancelAnimationFrame(viewportCheckFrame);
        }
        if (viewportCheckInterval) {
          window.clearInterval(viewportCheckInterval);
        }
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
        document.removeEventListener("visibilitychange", handleDocumentVisibilityChange);
        window.removeEventListener("scroll", requestViewportCheck);
        window.removeEventListener("resize", requestViewportCheck);
        canvas.removeAttribute("data-agent-3d-ready");
        canvas.removeAttribute("data-agent-3d-paused");
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
  }, [requestedMode, selectMode]);

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
        <ActionGroup className="tool-studio-actions" aria-label={ko ? "툴 스튜디오 액션" : "Tool Studio actions"} align="end" density="compact">
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
                {toolStudioStages.map((stageItem) => (
                  <DropdownMenu.Group key={stageItem.id}>
                    <DropdownMenu.Label className="tool-menu-label">
                      {labelFor(language, stageItem.labelKo, stageItem.labelEn)}
                    </DropdownMenu.Label>
                    {toolModes.filter((item) => item.stage === stageItem.id).map((item) => (
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
                    {stageItem.id === "create" && <DropdownMenu.Separator className="tool-menu-separator" />}
                  </DropdownMenu.Group>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
          <DropdownMenu.Root open={actionMenuOpen} onOpenChange={setActionMenuOpen}>
            <DropdownMenu.Trigger asChild>
              <Button
                variant="secondary"
                className="tool-action-menu-trigger"
                data-tool-action-menu-trigger
                aria-haspopup="menu"
                title={ko ? "Alt+Enter 빠른 액션" : "Alt+Enter quick actions"}
              >
                <Keyboard size={16} aria-hidden="true" />
                <span>{ko ? "액션" : "Actions"}</span>
                <kbd>⌥↵</kbd>
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="tool-menu-content" sideOffset={8} align="end" data-tool-action-menu>
                <DropdownMenu.Label className="tool-menu-label">
                  {ko ? "빠른 액션" : "Quick actions"}
                </DropdownMenu.Label>
                <DropdownMenu.Item className="tool-menu-item" onSelect={() => selectAdjacentMode(-1)} data-tool-action-menu-item="previous-mode">
                  <ChevronDown size={15} aria-hidden="true" />
                  <span>{ko ? "이전 세부 기능" : "Previous detail mode"}</span>
                  <kbd>⌥←</kbd>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="tool-menu-item" onSelect={() => selectAdjacentMode(1)} data-tool-action-menu-item="next-mode">
                  <ChevronDown size={15} aria-hidden="true" />
                  <span>{ko ? "다음 세부 기능" : "Next detail mode"}</span>
                  <kbd>⌥→</kbd>
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="tool-menu-separator" />
                {toolStudioStages.map((item, index) => (
                  <DropdownMenu.Item
                    key={item.id}
                    className="tool-menu-item"
                    onSelect={() => selectStage(item.id)}
                    data-tool-action-stage={item.id}
                  >
                    <item.icon size={15} aria-hidden="true" />
                    <span>
                      <strong>{labelFor(language, item.labelKo, item.labelEn)}</strong>
                      <small>{labelFor(language, item.detailKo, item.detailEn)}</small>
                    </span>
                    <kbd>{`⌥${index + 1}`}</kbd>
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Separator className="tool-menu-separator" />
                <DropdownMenu.Item className="tool-menu-item" onSelect={onOpenSource} data-tool-action-menu-item="source">
                  <FileCode2 size={15} aria-hidden="true" />
                  <span>{ko ? "소스 열기" : "Open source"}</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="tool-menu-item" onSelect={onOpenTerminal} data-tool-action-menu-item="terminal">
                  <SquareTerminal size={15} aria-hidden="true" />
                  <span>{ko ? "터미널 열기" : "Open terminal"}</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="tool-menu-item" onSelect={copyActionMap} data-tool-action-menu-item="copy-action-map">
                  <Copy size={15} aria-hidden="true" />
                  <span>{ko ? "액션 맵 복사" : "Copy action map"}</span>
                </DropdownMenu.Item>
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
        </ActionGroup>
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
          <ContextMenu.Root key={item.id}>
            <ContextMenu.Trigger asChild>
              <button
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
            </ContextMenu.Trigger>
            <ContextMenu.Portal>
              <ContextMenu.Content className="tool-context-content" data-tool-stage-context-menu={item.id}>
                <ContextMenu.Label className="tool-menu-label">
                  {labelFor(language, item.labelKo, item.labelEn)}
                </ContextMenu.Label>
                <ContextMenu.Item className="tool-menu-item" onSelect={() => selectStage(item.id)}>
                  <item.icon size={15} aria-hidden="true" />
                  <span>{ko ? "이 흐름으로 이동" : "Go to this flow"}</span>
                </ContextMenu.Item>
                {toolModes.filter((modeItem) => modeItem.stage === item.id).map((modeItem) => (
                  <ContextMenu.Item key={modeItem.id} className="tool-menu-item" onSelect={() => selectMode(modeItem.id)}>
                    <modeItem.icon size={15} aria-hidden="true" />
                    <span>{labelFor(language, modeItem.labelKo, modeItem.labelEn)}</span>
                    <kbd>{modeItem.shortcut}</kbd>
                  </ContextMenu.Item>
                ))}
                <ContextMenu.Separator className="tool-menu-separator" />
                <ContextMenu.Item className="tool-menu-item" onSelect={() => setActionMenuOpen(true)}>
                  <Keyboard size={15} aria-hidden="true" />
                  <span>{ko ? "빠른 액션 메뉴" : "Quick action menu"}</span>
                  <kbd>⌥↵</kbd>
                </ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Portal>
          </ContextMenu.Root>
        ))}
      </nav>

      <nav className="tool-studio-mode-rail" aria-label={ko ? "툴 스튜디오 세부 단계" : "Tool Studio detail modes"} data-tool-mode-depth={stage}>
        {currentStageModes.map((item) => (
          <ContextMenu.Root key={item.id}>
            <ContextMenu.Trigger asChild>
              <button
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
            </ContextMenu.Trigger>
            <ContextMenu.Portal>
              <ContextMenu.Content className="tool-context-content" data-tool-mode-context-menu={item.id}>
                <ContextMenu.Label className="tool-menu-label">
                  {labelFor(language, item.labelKo, item.labelEn)}
                </ContextMenu.Label>
                <ContextMenu.Item className="tool-menu-item" onSelect={() => selectMode(item.id)}>
                  <item.icon size={15} aria-hidden="true" />
                  <span>{ko ? "이 세부 기능 열기" : "Open this detail mode"}</span>
                  <kbd>{item.shortcut}</kbd>
                </ContextMenu.Item>
                <ContextMenu.Item className="tool-menu-item" onSelect={() => selectAdjacentMode(-1)}>
                  <ChevronDown size={15} aria-hidden="true" />
                  <span>{ko ? "이전 세부 기능" : "Previous detail mode"}</span>
                  <kbd>⌥←</kbd>
                </ContextMenu.Item>
                <ContextMenu.Item className="tool-menu-item" onSelect={() => selectAdjacentMode(1)}>
                  <ChevronDown size={15} aria-hidden="true" />
                  <span>{ko ? "다음 세부 기능" : "Next detail mode"}</span>
                  <kbd>⌥→</kbd>
                </ContextMenu.Item>
                <ContextMenu.Separator className="tool-menu-separator" />
                <ContextMenu.Item className="tool-menu-item" onSelect={onOpenSource}>
                  <FileCode2 size={15} aria-hidden="true" />
                  <span>{ko ? "소스 보기" : "View source"}</span>
                </ContextMenu.Item>
                <ContextMenu.Item className="tool-menu-item" onSelect={copyActionMap}>
                  <Copy size={15} aria-hidden="true" />
                  <span>{ko ? "액션 맵 복사" : "Copy action map"}</span>
                </ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Portal>
          </ContextMenu.Root>
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
