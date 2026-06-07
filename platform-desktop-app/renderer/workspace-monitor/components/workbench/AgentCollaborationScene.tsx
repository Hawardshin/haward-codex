"use client";

import { Float, Html, Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { getConsoleFunction, setConsoleFunction } from "three";
import type * as THREE from "three";

import type { WorkspaceSnapshot } from "@/lib/snapshot";

type CollaborationBoard = NonNullable<WorkspaceSnapshot["collaborationBoard"]>;
type AgentNode = CollaborationBoard["agents"][number];
type CollaborationFlow = CollaborationBoard["flows"][number];
type UiLanguage = "ko" | "en";

type SceneAgent = {
  agent: AgentNode;
  color: string;
  index: number;
  label: string;
  position: [number, number, number];
};

type SceneLane = {
  id: string;
  label: string;
  color: string;
  count: number;
  position: [number, number, number];
};

type SceneLink = {
  id: string;
  color: string;
  points: [[number, number, number], [number, number, number]];
};

const suppressedThreeWarnings = new Set([
  "THREE.Clock: This module has been deprecated. Please use THREE.Timer instead."
]);

function installThreeConsoleBoundary() {
  const previousThreeConsoleFunction = getConsoleFunction();

  setConsoleFunction((type, message, ...params) => {
    // 최신 React Three Fiber가 내부 Clock을 Timer로 옮기기 전까지 알려진 의존성 경고만 숨긴다.
    if (type === "warn" && suppressedThreeWarnings.has(message)) {
      return;
    }
    if (previousThreeConsoleFunction) {
      previousThreeConsoleFunction(type, message, ...params);
      return;
    }
    console[type](message, ...params);
  });
}

installThreeConsoleBoundary();

const agentPalette = ["#66d9b1", "#8ab8ff", "#f7c66f", "#ff9a96", "#c4b5fd", "#67e8f9", "#f9a8d4", "#a7f3d0"];
const lanePalette = ["#58a6ff", "#66d9b1", "#f7c66f", "#ff9a96", "#c4b5fd"];
const sealBodyPalette = ["#d8e1ea", "#d4dde5", "#e4ddd3", "#dce7df", "#d5d8e8", "#d7e4e8", "#ead8e1", "#d8e8dc"];
const sealBellyPalette = ["#f6f2ea", "#f2f5f8", "#f7eee2", "#f1f6ef", "#f0eff8", "#eef7f8", "#f8edf3", "#eff8f1"];
const sealAccentPalette = ["#9fd4ff", "#b7f7d4", "#ffe29a", "#ffc4c1", "#ddd6fe", "#a5f3fc", "#fbcfe8", "#bbf7d0"];

const statusColor = (status: string, fallback: string) => {
  const normalized = status.toLowerCase();
  if (normalized.includes("block")) return "#ff9a96";
  if (normalized.includes("active") || normalized.includes("running")) return "#66d9b1";
  if (normalized.includes("queue") || normalized.includes("pending")) return "#f7c66f";
  if (normalized.includes("complete") || normalized.includes("done")) return "#8ab8ff";
  return fallback;
};

const shortLabel = (value: string, fallback: string) => {
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  return trimmed
    .split(/[-_\s]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.slice(0, 1).toUpperCase())
    .join("");
};

const compactAgentName = (value: string, fallback: string) => {
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  return trimmed.replace(/[-_\s]*agent$/i, "").replace(/[-_]+/g, " ");
};

export function AgentCollaborationScene({ board, language }: { board: CollaborationBoard; language: UiLanguage }) {
  const agents = board.agents.slice(0, 8);
  const lanes = board.lanes.slice(0, 5);
  const identityItems = agents.map((agent, index) => {
    const identityName = agent.name || agent.id;
    return {
      id: agent.id || identityName,
      renderKey: `${agent.id || identityName}-${index}`,
      code: shortLabel(identityName, `A${index + 1}`),
      color: statusColor(agent.status, agentPalette[index % agentPalette.length]),
      name: compactAgentName(identityName, `A${index + 1}`),
      title: agent.role ? `${identityName} · ${agent.role}` : identityName
    };
  });
  const agentIdentitySummary = agents
    .map((agent, index) => `${shortLabel(agent.name || agent.id, `A${index + 1}`)} ${agent.name || agent.id}`)
    .join(", ");

  if (!agents.length) {
    return (
      <div className="agent-collaboration-scene-empty" data-agent-collaboration-scene>
        {language === "ko" ? "표시할 물개형 에이전트가 없습니다." : "No seal-shaped agents to show."}
      </div>
    );
  }

  return (
    <div className="agent-collaboration-scene-shell" data-agent-collaboration-scene data-agent-3d-canvas>
      <Canvas
        camera={{ position: [0, 4.35, 8.25], fov: 42, near: 0.1, far: 80 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: false, preserveDrawingBuffer: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.domElement.setAttribute("data-agent-collaboration-3d-ready", "true");
          gl.domElement.setAttribute("role", "img");
          gl.domElement.setAttribute(
            "aria-label",
            language === "ko"
              ? `3D 물개형 에이전트 협업 작업면: ${agentIdentitySummary}`
              : `3D seal agent collaboration workspace: ${agentIdentitySummary}`
          );
        }}
      >
        <color attach="background" args={["#0d1117"]} />
        <fog attach="fog" args={["#0d1117", 9, 21]} />
        <ambientLight intensity={0.82} />
        <directionalLight color="#ffffff" intensity={1.6} position={[4, 6, 6]} />
        <pointLight color="#58a6ff" intensity={14} position={[-3.5, 2.5, 2.5]} />
        <pointLight color="#66d9b1" intensity={8} position={[3.5, 1.8, -3]} />
        <AgentCollaborationWorld agents={agents} board={board} flows={board.flows.slice(0, 16)} lanes={lanes} />
      </Canvas>
      <div className="agent-collaboration-scene-hud">
        <span>{language === "ko" ? "Seal agents" : "Seal agents"}</span>
        <strong>{board.summary.agents}</strong>
        <span>{language === "ko" ? "handoffs" : "handoffs"}</span>
        <strong>{board.summary.handoffs}</strong>
        <span>{language === "ko" ? "blocked" : "blocked"}</span>
        <strong>{board.summary.blockedTasks}</strong>
      </div>
      <div
        className="agent-collaboration-identity-strip"
        aria-label={language === "ko" ? "에이전트 코드 식별" : "Agent code identity"}
      >
        {identityItems.map((item) => (
          <span key={item.renderKey} title={item.title}>
            <i style={{ backgroundColor: item.color }} aria-hidden="true" />
            <b>{item.code}</b>
            <strong>{item.name}</strong>
          </span>
        ))}
      </div>
    </div>
  );
}

function AgentCollaborationWorld({
  agents,
  board,
  flows,
  lanes
}: {
  agents: AgentNode[];
  board: CollaborationBoard;
  flows: CollaborationFlow[];
  lanes: CollaborationBoard["lanes"];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Group>(null);
  const elapsedRef = useRef(0);

  const sceneAgents = useMemo<SceneAgent[]>(() => {
    const count = Math.max(agents.length, 1);
    return agents.map((agent, index) => {
      const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
      const radius = count <= 4 ? 2.5 : 3.25;
      const color = statusColor(agent.status, agentPalette[index % agentPalette.length]);
      return {
        agent,
        color,
        index,
        label: shortLabel(agent.name || agent.id, `A${index + 1}`),
        position: [Math.cos(angle) * radius, 0.18, Math.sin(angle) * radius]
      };
    });
  }, [agents]);

  const sceneLanes = useMemo<SceneLane[]>(() => {
    const width = Math.max(lanes.length - 1, 1);
    return lanes.map((lane, index) => ({
      id: lane.id,
      label: lane.label,
      color: lanePalette[index % lanePalette.length],
      count: lane.tasks.length,
      position: [((index - width / 2) * 1.42) as number, 0.08, 0]
    }));
  }, [lanes]);

  const links = useMemo<SceneLink[]>(() => {
    if (!sceneAgents.length || !sceneLanes.length) return [];
    return flows.map((flow, index) => {
      const agent =
        sceneAgents.find((item) => item.agent.name === flow.agent || item.agent.id === flow.agent) ??
        sceneAgents[index % sceneAgents.length];
      const lane = sceneLanes.find((item) => item.id === flow.lane) ?? sceneLanes[index % sceneLanes.length];
      const color = statusColor(flow.status, lane.color);
      return {
        id: flow.id,
        color,
        points: [
          [agent.position[0], 0.68, agent.position[2]],
          [lane.position[0], 0.34 + (index % 3) * 0.08, lane.position[2]]
        ]
      };
    });
  }, [flows, sceneAgents, sceneLanes]);

  useFrame((_, delta) => {
    elapsedRef.current += Math.min(delta, 0.08);
    const elapsed = elapsedRef.current;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(elapsed * 0.16) * 0.12;
    }
    if (pulseRef.current) {
      const scale = 1 + Math.sin(elapsed * 1.8) * 0.025;
      pulseRef.current.scale.set(scale, 1, scale);
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={pulseRef}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, 0]}>
          <ringGeometry args={[1.2, 3.95, 96]} />
          <meshStandardMaterial color="#17212d" emissive="#111827" roughness={0.8} metalness={0.1} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.025, 0]}>
          <circleGeometry args={[4.08, 96]} />
          <meshStandardMaterial color="#101923" roughness={0.88} metalness={0.05} />
        </mesh>
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
        <ringGeometry args={[0.32, 0.34, 80]} />
        <meshStandardMaterial color="#58a6ff" emissive="#1f6feb" emissiveIntensity={0.45} />
      </mesh>

      {links.map((link) => (
        <Line key={link.id} points={link.points} color={link.color} lineWidth={1.6} transparent opacity={0.58} />
      ))}

      {sceneLanes.map((lane) => (
        <TaskLaneNode key={lane.id} lane={lane} />
      ))}

      {sceneAgents.map((agent) => (
        <AgentCharacter key={`${agent.agent.id}-${agent.index}`} node={agent} totalAgents={board.summary.agents} />
      ))}
    </group>
  );
}

function AgentCharacter({ node, totalAgents }: { node: SceneAgent; totalAgents: number }) {
  const scale = node.agent.activeTaskCount > 0 ? 0.92 : 0.84;
  const workloadHeight = Math.min(0.5, 0.12 + node.agent.taskCount / Math.max(totalAgents, 1) * 0.38);
  const bodyColor = sealBodyPalette[node.index % sealBodyPalette.length];
  const bellyColor = sealBellyPalette[node.index % sealBellyPalette.length];
  const accentColor = sealAccentPalette[node.index % sealAccentPalette.length];
  const spotColor = node.index % 2 === 0 ? "#aebbc6" : "#b9b0a8";
  const isActive = node.agent.activeTaskCount > 0;
  const isBlocked = node.agent.status.toLowerCase().includes("block");
  const signalColor = isBlocked ? "#ff9a96" : isActive ? "#66d9b1" : node.color;
  const identityName = node.agent.name || node.agent.id;
  const displayName = compactAgentName(identityName, node.label);
  const identityTitle = node.agent.role ? `${identityName} · ${node.agent.role}` : identityName;

  return (
    <Float floatIntensity={0.2} rotationIntensity={0.12} speed={1.25 + node.index * 0.08}>
      <group name="agent-seal-avatar" position={node.position} scale={[scale, scale, scale]}>
        <Html center className="agent-character-identity-anchor" position={[0, 1.46, 0]} zIndexRange={[30, 0]}>
          <div className="agent-character-identity" data-agent-character-identity title={identityTitle}>
            <span className="agent-character-identity-code" style={{ backgroundColor: node.color }}>
              {node.label}
            </span>
            <strong>{displayName}</strong>
          </div>
        </Html>
        <mesh name="agent-seal-ground-shadow" position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.78, 48]} />
          <meshBasicMaterial color="#020617" transparent opacity={0.34} />
        </mesh>
        <mesh name="agent-seal-role-halo" position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.52, 0.018, 10, 56]} />
          <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.32} />
        </mesh>
        <mesh name="agent-seal-body" position={[0, 0.42, -0.08]} scale={[0.84, 0.52, 1.08]} rotation={[-0.08, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 22]} />
          <meshStandardMaterial color={bodyColor} roughness={0.58} metalness={0.04} />
        </mesh>
        <mesh name="agent-seal-belly" position={[0, 0.34, 0.2]} scale={[0.56, 0.24, 0.7]} rotation={[-0.22, 0, 0]}>
          <sphereGeometry args={[0.42, 24, 14]} />
          <meshStandardMaterial color={bellyColor} roughness={0.62} metalness={0.02} />
        </mesh>
        <mesh name="agent-seal-head" position={[0, 0.74, 0.78]} scale={[1.05, 0.96, 0.92]}>
          <sphereGeometry args={[0.34, 30, 20]} />
          <meshStandardMaterial color={bodyColor} roughness={0.56} metalness={0.04} />
        </mesh>
        <mesh name="agent-seal-spot-left-back" position={[-0.24, 0.64, -0.2]} scale={[0.94, 0.28, 0.5]} rotation={[-0.14, 0.08, 0.24]}>
          <sphereGeometry args={[0.062, 12, 8]} />
          <meshStandardMaterial color={spotColor} roughness={0.66} metalness={0.02} transparent opacity={0.62} />
        </mesh>
        <mesh name="agent-seal-spot-right-back" position={[0.26, 0.58, -0.5]} scale={[1.12, 0.3, 0.58]} rotation={[-0.1, -0.16, -0.22]}>
          <sphereGeometry args={[0.056, 12, 8]} />
          <meshStandardMaterial color={spotColor} roughness={0.66} metalness={0.02} transparent opacity={0.58} />
        </mesh>
        <mesh name="agent-seal-flipper-front-left" position={[-0.54, 0.34, 0.34]} scale={[1.72, 0.32, 0.66]} rotation={[0.12, 0.18, -0.55]}>
          <sphereGeometry args={[0.16, 18, 10]} />
          <meshStandardMaterial color={bodyColor} roughness={0.6} metalness={0.03} />
        </mesh>
        <mesh name="agent-seal-flipper-front-right" position={[0.54, 0.34, 0.34]} scale={[1.72, 0.32, 0.66]} rotation={[0.12, -0.18, 0.55]}>
          <sphereGeometry args={[0.16, 18, 10]} />
          <meshStandardMaterial color={bodyColor} roughness={0.6} metalness={0.03} />
        </mesh>
        <mesh name="agent-seal-flipper-rear-left" position={[-0.2, 0.24, -0.86]} scale={[1.42, 0.28, 0.52]} rotation={[0.08, -0.22, -0.26]}>
          <sphereGeometry args={[0.15, 16, 10]} />
          <meshStandardMaterial color={bodyColor} roughness={0.62} metalness={0.03} />
        </mesh>
        <mesh name="agent-seal-flipper-rear-right" position={[0.2, 0.24, -0.86]} scale={[1.42, 0.28, 0.52]} rotation={[0.08, 0.22, 0.26]}>
          <sphereGeometry args={[0.15, 16, 10]} />
          <meshStandardMaterial color={bodyColor} roughness={0.62} metalness={0.03} />
        </mesh>
        <mesh name="agent-seal-tail" position={[0, 0.28, -1.0]} scale={[0.74, 0.28, 0.42]} rotation={[0.12, 0, 0]}>
          <sphereGeometry args={[0.18, 16, 10]} />
          <meshStandardMaterial color={bodyColor} roughness={0.62} metalness={0.03} />
        </mesh>
        <mesh name="agent-seal-eye-left" position={[-0.108, 0.84, 1.065]}>
          <sphereGeometry args={[0.028, 12, 8]} />
          <meshStandardMaterial color="#101923" roughness={0.38} metalness={0.04} />
        </mesh>
        <mesh name="agent-seal-eye-right" position={[0.108, 0.84, 1.065]}>
          <sphereGeometry args={[0.028, 12, 8]} />
          <meshStandardMaterial color="#101923" roughness={0.38} metalness={0.04} />
        </mesh>
        <mesh name="agent-seal-muzzle" position={[0, 0.71, 1.07]} scale={[1.42, 0.78, 0.54]}>
          <sphereGeometry args={[0.13, 18, 12]} />
          <meshStandardMaterial color={bellyColor} roughness={0.62} metalness={0.02} />
        </mesh>
        <mesh name="agent-seal-nose" position={[0, 0.75, 1.154]} scale={[1.1, 0.84, 0.72]}>
          <sphereGeometry args={[0.024, 12, 8]} />
          <meshStandardMaterial color="#101923" roughness={0.42} metalness={0.02} />
        </mesh>
        <group name="agent-seal-whisker-left-top">
          <Line points={[[-0.054, 0.73, 1.145], [-0.285, 0.78, 1.19]]} color="#243445" lineWidth={1.2} transparent opacity={0.84} />
        </group>
        <group name="agent-seal-whisker-left-bottom">
          <Line points={[[-0.052, 0.7, 1.148], [-0.278, 0.68, 1.195]]} color="#243445" lineWidth={1.2} transparent opacity={0.78} />
        </group>
        <group name="agent-seal-whisker-right-top">
          <Line points={[[0.054, 0.73, 1.145], [0.285, 0.78, 1.19]]} color="#243445" lineWidth={1.2} transparent opacity={0.84} />
        </group>
        <group name="agent-seal-whisker-right-bottom">
          <Line points={[[0.052, 0.7, 1.148], [0.278, 0.68, 1.195]]} color="#243445" lineWidth={1.2} transparent opacity={0.78} />
        </group>
        <mesh name="agent-seal-cheek-left" position={[-0.16, 0.72, 1.07]} scale={[1.1, 0.66, 0.36]}>
          <sphereGeometry args={[0.046, 10, 8]} />
          <meshStandardMaterial color="#ffd3d0" emissive="#ff9a96" emissiveIntensity={0.12} roughness={0.36} />
        </mesh>
        <mesh name="agent-seal-cheek-right" position={[0.16, 0.72, 1.07]} scale={[1.1, 0.66, 0.36]}>
          <sphereGeometry args={[0.046, 10, 8]} />
          <meshStandardMaterial color="#ffd3d0" emissive="#ff9a96" emissiveIntensity={0.12} roughness={0.36} />
        </mesh>
        <mesh name="agent-seal-collar-tag" position={[0, 0.56, 0.94]} scale={[1.08, 0.78, 0.28]}>
          <boxGeometry args={[0.12, 0.08, 0.04]} />
          <meshStandardMaterial color={accentColor} emissive={node.color} emissiveIntensity={0.14} roughness={0.28} metalness={0.1} />
        </mesh>
        <mesh name="agent-seal-status-light" position={[0, 0.56, 0.99]}>
          <sphereGeometry args={[0.03, 12, 10]} />
          <meshStandardMaterial color={signalColor} emissive={signalColor} emissiveIntensity={0.58} roughness={0.22} />
        </mesh>
        <mesh name="agent-seal-workload-buoy" position={[0.64, 0.2 + workloadHeight / 2, -0.22]}>
          <boxGeometry args={[0.074, workloadHeight, 0.074]} />
          <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.24} />
        </mesh>
      </group>
    </Float>
  );
}

function TaskLaneNode({ lane }: { lane: SceneLane }) {
  const height = Math.min(0.72, 0.18 + lane.count * 0.055);

  return (
    <group position={lane.position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[0.92, height, 0.46]} />
        <meshStandardMaterial color="#17212d" roughness={0.56} metalness={0.12} />
      </mesh>
      <mesh position={[0, height + 0.045, 0]}>
        <boxGeometry args={[0.76, 0.06, 0.52]} />
        <meshStandardMaterial color={lane.color} emissive={lane.color} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.45, 0.48, 44]} />
        <meshStandardMaterial color={lane.color} emissive={lane.color} emissiveIntensity={0.24} />
      </mesh>
    </group>
  );
}
