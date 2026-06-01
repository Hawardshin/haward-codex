"use client";

import {
  Activity,
  BookOpenText,
  Bot,
  ClipboardCheck,
  FileSearch,
  FolderKanban,
  GitBranch,
  History,
  Layers,
  ListFilter,
  Search,
  ShieldCheck
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { categoryLabel, formatDate, type WorkspaceSnapshot } from "@/lib/snapshot";

type SectionId = "overview" | "projects" | "history" | "documents" | "requirements" | "agents";

type Section = {
  id: SectionId;
  label: string;
  icon: LucideIcon;
};

const sections: Section[] = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "history", label: "History", icon: History },
  { id: "documents", label: "Documents", icon: BookOpenText },
  { id: "requirements", label: "Requirements", icon: ClipboardCheck },
  { id: "agents", label: "Agents", icon: Bot }
];

export function MonitorShell({ snapshot }: { snapshot: WorkspaceSnapshot }) {
  const [section, setSection] = useState<SectionId>("overview");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const normalizedQuery = query.trim().toLowerCase();
  const filteredDocuments = useMemo(() => {
    return snapshot.documents.filter((document) => {
      const categoryMatches = category === "all" || document.category === category;
      const queryMatches =
        !normalizedQuery ||
        `${document.title} ${document.path} ${document.excerpt}`.toLowerCase().includes(normalizedQuery);
      return categoryMatches && queryMatches;
    });
  }, [category, normalizedQuery, snapshot.documents]);

  const recentHistory = snapshot.documents
    .filter((document) => ["work-summary", "request-trace", "user-request", "evaluation"].includes(document.category))
    .slice(0, 8);
  const recentDocuments = filteredDocuments.slice(0, section === "documents" ? 30 : 10);

  return (
    <main>
      <header className="topbar">
        <div>
          <p className="eyebrow">Codex Repository</p>
          <h1>Workspace Monitor</h1>
          <p className="summary">
            저장소 문서 스냅샷을 기반으로 프로젝트, 히스토리, 에이전트 상태, 요구사항, 평가를 한 곳에서 탐색합니다.
          </p>
        </div>
        <div className="snapshot-meta">
          <span>Snapshot</span>
          <strong>{formatDate(snapshot.generatedAt)}</strong>
        </div>
      </header>

      <nav className="section-tabs" aria-label="Monitor sections">
        {sections.map((item) => (
          <button
            key={item.id}
            className={section === item.id ? "active" : ""}
            onClick={() => setSection(item.id)}
            type="button"
            title={item.label}
          >
            <item.icon size={16} aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <section className="toolbar" aria-label="Document filters">
        <label className="search-box">
          <Search size={16} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="문서, 경로, 요약 검색"
          />
        </label>
        <label className="select-box">
          <ListFilter size={16} aria-hidden="true" />
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">모든 문서</option>
            {snapshot.categories.map((item) => (
              <option key={item} value={item}>
                {categoryLabel(item)}
              </option>
            ))}
          </select>
        </label>
      </section>

      {section === "overview" && (
        <div className="content-grid">
          <section className="metrics-band">
            <Metric label="Projects" value={snapshot.stats.projects} icon={FolderKanban} tone="green" />
            <Metric label="Documents" value={snapshot.stats.documents} icon={BookOpenText} tone="blue" />
            <Metric label="Requirements" value={snapshot.stats.requirements} icon={ClipboardCheck} tone="amber" />
            <Metric label="Evaluations" value={snapshot.stats.evaluations} icon={ShieldCheck} tone="red" />
            <Metric label="Web Searches" value={snapshot.stats.webSearches} icon={FileSearch} tone="violet" />
            <Metric label="Tasks" value={snapshot.stats.tasks} icon={GitBranch} tone="slate" />
          </section>

          <section className="panel wide">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Recent</p>
                <h2>최근 히스토리</h2>
              </div>
              <button type="button" onClick={() => setSection("history")}>
                <History size={16} aria-hidden="true" />
                <span>히스토리 보기</span>
              </button>
            </div>
            <DocumentList documents={recentHistory} compact />
          </section>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Public Readiness</p>
                <h2>공개 전 점검</h2>
              </div>
              <ShieldCheck size={18} aria-hidden="true" />
            </div>
            <p className="status-pill">{snapshot.publicReview.status}</p>
            <ul className="checklist">
              {snapshot.publicReview.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {section === "projects" && (
        <section className="records-grid">
          {snapshot.projects.map((project) => (
            <article className="record-card" key={project.name}>
              <div className="record-header">
                <FolderKanban size={18} aria-hidden="true" />
                <div>
                  <h2>{project.name}</h2>
                  <p>{project.path}</p>
                </div>
              </div>
              <p>{project.purpose}</p>
              <dl>
                <dt>Status</dt>
                <dd>{project.status}</dd>
                <dt>Type</dt>
                <dd>{project.type}</dd>
                <dt>Scope</dt>
                <dd>{project.scope}</dd>
              </dl>
            </article>
          ))}
        </section>
      )}

      {section === "history" && (
        <section className="panel wide">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">History</p>
              <h2>작업 흐름</h2>
            </div>
            <span className="result-count">{recentDocuments.length} shown</span>
          </div>
          <DocumentList documents={recentDocuments} />
        </section>
      )}

      {section === "documents" && (
        <section className="document-browser">
          {recentDocuments.map((document) => (
            <article className="doc-preview" key={document.id}>
              <div className="doc-meta">
                <span>{categoryLabel(document.category)}</span>
                <span>{document.language}</span>
              </div>
              <h2>{document.title}</h2>
              <p className="path">{document.path}</p>
              <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: document.html }} />
            </article>
          ))}
        </section>
      )}

      {section === "requirements" && (
        <section className="panel wide">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Requirements</p>
              <h2>요구사항 목록</h2>
            </div>
            <span className="result-count">{snapshot.requirements.length} total</span>
          </div>
          <div className="requirements-table">
            {snapshot.requirements.map((requirement) => (
              <article key={`${requirement.id}-${requirement.sourcePath}`}>
                <strong>{requirement.id}</strong>
                <span>{requirement.priority}</span>
                <p>{requirement.requirement}</p>
                <small>{requirement.sourcePath}</small>
              </article>
            ))}
          </div>
        </section>
      )}

      {section === "agents" && (
        <div className="content-grid">
          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Agents</p>
                <h2>에이전트 상태</h2>
              </div>
              <Bot size={18} aria-hidden="true" />
            </div>
            <div className="agent-list">
              {snapshot.agents.map((agent) => (
                <article key={agent.id}>
                  <strong>{agent.name || agent.id}</strong>
                  <span>{agent.status}</span>
                  <p>{agent.current_task || agent.role || "No current task"}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="panel wide">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Tasks</p>
                <h2>작업 보드</h2>
              </div>
              <Layers size={18} aria-hidden="true" />
            </div>
            <div className="task-table">
              {snapshot.tasks.slice(0, 28).map((task) => (
                <article key={task.id}>
                  <strong>{task.title || task.id}</strong>
                  <span>{task.status}</span>
                  <p>{task.next_action || task.evaluation_report || "No next action"}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function Metric({ label, value, icon: Icon, tone }: { label: string; value: number; icon: LucideIcon; tone: string }) {
  return (
    <article className={`metric metric-${tone}`}>
      <Icon size={18} aria-hidden="true" />
      <span>{label}</span>
      <strong>{value.toLocaleString("ko-KR")}</strong>
    </article>
  );
}

function DocumentList({
  documents,
  compact = false
}: {
  documents: WorkspaceSnapshot["documents"];
  compact?: boolean;
}) {
  return (
    <div className={compact ? "document-list compact" : "document-list"}>
      {documents.map((document) => (
        <article key={document.id}>
          <div>
            <span>{categoryLabel(document.category)}</span>
            <h3>{document.title}</h3>
            <p>{document.excerpt || document.path}</p>
          </div>
          <small>{document.path}</small>
        </article>
      ))}
    </div>
  );
}

