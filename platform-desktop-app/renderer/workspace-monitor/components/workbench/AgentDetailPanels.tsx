"use client";

import { Bot, Layers } from "lucide-react";

import type { WorkspaceCollaborationBoard, WorkspaceSnapshot } from "@/lib/snapshot";

export type AgentCollaborationBoardPanelProps = {
  board: WorkspaceCollaborationBoard;
};

export type AgentInventoryPanelProps = {
  agents: NonNullable<WorkspaceSnapshot["agentCatalog"]>;
};

export type AgentRuntimeOverviewPanelProps = {
  runtimeCounts: Array<{ key: string; count: number }>;
  statusCounts: Array<{ key: string; count: number }>;
  taskStatusCounts: Array<{ key: string; count: number }>;
  tasks: WorkspaceSnapshot["tasks"];
};

export function AgentCollaborationBoardPanel({ board }: AgentCollaborationBoardPanelProps) {
  if (!board.lanes.length) {
    return <p className="empty-state">표시할 에이전트 협업 데이터가 없습니다.</p>;
  }

  return (
    <div className="collaboration-board" data-agent-detail-panel="collaboration">
      <div className="collaboration-summary">
        <article>
          <span>agents</span>
          <strong>{board.summary.agents}</strong>
        </article>
        <article>
          <span>active</span>
          <strong>{board.summary.activeTasks}</strong>
        </article>
        <article>
          <span>queued</span>
          <strong>{board.summary.queuedTasks}</strong>
        </article>
        <article>
          <span>blocked</span>
          <strong>{board.summary.blockedTasks}</strong>
        </article>
      </div>
      <div className="collaboration-lanes">
        {board.lanes.map((lane) => (
          <section key={lane.id} className={`collaboration-lane lane-${lane.id}`}>
            <header>
              <h3>{lane.label}</h3>
              <span>{lane.tasks.length}</span>
            </header>
            {lane.tasks.length === 0 ? (
              <p className="lane-empty">현재 항목 없음</p>
            ) : (
              lane.tasks.slice(0, 8).map((task) => (
                <article key={task.id}>
                  <div className="task-card-heading">
                    <strong>{task.title}</strong>
                    <span>{task.priority || task.status}</span>
                  </div>
                  <p>
                    {task.agent} / {task.project}
                  </p>
                  {(task.timingTotal || task.bottleneck) && (
                    <small>
                      {task.timingTotal || "unknown"} {task.bottleneck ? `/ ${task.bottleneck}` : ""}
                    </small>
                  )}
                  {task.nextAction && <small>{task.nextAction}</small>}
                  {task.blockers.length > 0 && (
                    <div className="blocker-list">
                      {task.blockers.slice(0, 2).map((blocker) => (
                        <span key={blocker}>{blocker}</span>
                      ))}
                    </div>
                  )}
                </article>
              ))
            )}
          </section>
        ))}
      </div>
      <div className="agent-workload-strip">
        {board.agents.slice(0, 10).map((agent, index) => (
          <article key={`${agent.id}-${index}`}>
            <div>
              <strong>{agent.name}</strong>
              <span>{agent.status}</span>
            </div>
            <p>
              active {agent.activeTaskCount} / blocked {agent.blockedTaskCount} / total {agent.taskCount}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function AgentInventoryPanel({ agents }: AgentInventoryPanelProps) {
  return (
    <section className="panel wide" data-agent-detail-panel="inventory">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Inventory</p>
          <h2>에이전트 구성 맵</h2>
        </div>
        <Bot size={18} aria-hidden="true" />
      </div>
      {!agents.length ? (
        <p className="empty-state">등록된 에이전트 설정을 찾지 못했습니다.</p>
      ) : (
        <div className="agent-map">
          {agents.map((agent) => (
            <article key={agent.id}>
              <header>
                <div>
                  <span>{agent.runtime}</span>
                  <h3>{agent.name}</h3>
                </div>
                <strong>{agent.definitionStatus}</strong>
              </header>
              <p>{agent.description}</p>
              <div className="agent-signal-row">
                <span>{agent.runtimeStatus}</span>
                <span>{agent.tools.length} tools</span>
                <span>{agent.skills.length} skills</span>
                <span>{agent.docPaths.length} docs</span>
              </div>
              {agent.trigger && <small>{agent.trigger}</small>}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export function AgentRuntimeOverviewPanel({
  runtimeCounts,
  statusCounts,
  taskStatusCounts,
  tasks
}: AgentRuntimeOverviewPanelProps) {
  return (
    <section className="panel wide" data-agent-detail-panel="runtime">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Runtime</p>
          <h2>상태와 작업 흐름</h2>
        </div>
        <Layers size={18} aria-hidden="true" />
      </div>
      <div className="agent-visual-grid">
        <AgentRuntimeBars runtimeCounts={runtimeCounts} statusCounts={statusCounts} />
        <TaskStatusLanes taskStatusCounts={taskStatusCounts} />
      </div>
      <div className="task-table">
        {tasks.slice(0, 28).map((task) => (
          <article key={task.id}>
            <strong>{task.title || task.id}</strong>
            <span>{task.status}</span>
            <p>
              {task.timing_summary
                ? `시간 ${task.timing_summary.total || "unknown"} / 병목 ${task.timing_summary.bottleneck || "unknown"}`
                : task.next_action || task.evaluation_report || "No next action"}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AgentRuntimeBars({
  runtimeCounts,
  statusCounts
}: {
  runtimeCounts: Array<{ key: string; count: number }>;
  statusCounts: Array<{ key: string; count: number }>;
}) {
  return (
    <div className="agent-bars">
      <BarGroup title="Runtime" items={runtimeCounts} />
      <BarGroup title="Status" items={statusCounts} />
    </div>
  );
}

function TaskStatusLanes({ taskStatusCounts }: { taskStatusCounts: Array<{ key: string; count: number }> }) {
  return (
    <div className="task-lanes" aria-label="Task status visualization">
      <h3>작업 상태</h3>
      <div>
        {taskStatusCounts.map((item) => (
          <article key={item.key}>
            <span>{item.key}</span>
            <strong>{item.count}</strong>
          </article>
        ))}
      </div>
    </div>
  );
}

function BarGroup({ title, items }: { title: string; items: Array<{ key: string; count: number }> }) {
  if (!items.length) {
    return <p className="empty-state">{title} 데이터가 없습니다.</p>;
  }
  const maxCount = Math.max(...items.map((item) => item.count), 1);

  return (
    <div className="bar-group">
      <h3>{title}</h3>
      {items.map((item) => (
        <article key={item.key}>
          <div>
            <span>{item.key}</span>
            <strong>{item.count}</strong>
          </div>
          <div className="bar-track">
            <span style={{ width: `${Math.max(8, Math.round((item.count / maxCount) * 100))}%` }} />
          </div>
        </article>
      ))}
    </div>
  );
}
