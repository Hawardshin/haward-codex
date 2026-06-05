"use client";

import { Float, Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
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

const agentPalette = ["#66d9b1", "#8ab8ff", "#f7c66f", "#ff9a96", "#c4b5fd", "#67e8f9", "#f9a8d4", "#a7f3d0"];
const lanePalette = ["#58a6ff", "#66d9b1", "#f7c66f", "#ff9a96", "#c4b5fd"];

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

export function AgentCollaborationScene({ board, language }: { board: CollaborationBoard; language: UiLanguage }) {
  const agents = board.agents.slice(0, 8);
  const lanes = board.lanes.slice(0, 5);

  if (!agents.length) {
    return (
      <div className="agent-collaboration-scene-empty" data-agent-collaboration-scene>
        {language === "ko" ? "표시할 에이전트 협업 캐릭터가 없습니다." : "No agent collaboration characters to show."}
      </div>
    );
  }

  return (
    <div className="agent-collaboration-scene-shell" data-agent-collaboration-scene data-agent-3d-canvas>
      <Canvas
        camera={{ position: [0, 4.35, 8.25], fov: 42, near: 0.1, far: 80 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.domElement.setAttribute("data-agent-collaboration-3d-ready", "true");
          gl.domElement.setAttribute("role", "img");
          gl.domElement.setAttribute(
            "aria-label",
            language === "ko" ? "3D 에이전트 협업 작업면" : "3D agent collaboration workspace"
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
        <span>{language === "ko" ? "Agent mesh" : "Agent mesh"}</span>
        <strong>{board.summary.agents}</strong>
        <span>{language === "ko" ? "handoffs" : "handoffs"}</span>
        <strong>{board.summary.handoffs}</strong>
        <span>{language === "ko" ? "blocked" : "blocked"}</span>
        <strong>{board.summary.blockedTasks}</strong>
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

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
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
  const scale = node.agent.activeTaskCount > 0 ? 1.05 : 0.94;
  const workloadHeight = Math.min(0.56, 0.16 + node.agent.taskCount / Math.max(totalAgents, 1) * 0.42);

  return (
    <Float floatIntensity={0.2} rotationIntensity={0.12} speed={1.25 + node.index * 0.08}>
      <group position={node.position} scale={[scale, scale, scale]}>
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.38, 0.018, 10, 44]} />
          <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.32} />
        </mesh>
        <mesh position={[0, 0.52, 0]}>
          <capsuleGeometry args={[0.24, 0.44, 8, 16]} />
          <meshStandardMaterial color={node.color} roughness={0.38} metalness={0.28} />
        </mesh>
        <mesh position={[0, 0.98, 0]}>
          <sphereGeometry args={[0.25, 22, 18]} />
          <meshStandardMaterial color="#e6edf3" roughness={0.44} metalness={0.18} />
        </mesh>
        <mesh position={[-0.085, 1.01, 0.22]}>
          <sphereGeometry args={[0.032, 10, 8]} />
          <meshStandardMaterial color="#0d1117" />
        </mesh>
        <mesh position={[0.085, 1.01, 0.22]}>
          <sphereGeometry args={[0.032, 10, 8]} />
          <meshStandardMaterial color="#0d1117" />
        </mesh>
        <mesh position={[-0.34, 0.55, 0]}>
          <sphereGeometry args={[0.075, 12, 10]} />
          <meshStandardMaterial color="#d7e0ea" roughness={0.45} />
        </mesh>
        <mesh position={[0.34, 0.55, 0]}>
          <sphereGeometry args={[0.075, 12, 10]} />
          <meshStandardMaterial color="#d7e0ea" roughness={0.45} />
        </mesh>
        <mesh position={[0.36, 0.22 + workloadHeight / 2, -0.16]}>
          <boxGeometry args={[0.08, workloadHeight, 0.08]} />
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
