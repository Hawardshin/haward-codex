"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { WorkspaceAdminHistoryIndex, WorkspaceSnapshot } from "@/lib/snapshot";

type AdminHistoryState = {
  status: "idle" | "loading" | "ready" | "error";
  index: WorkspaceAdminHistoryIndex | null;
  error: string;
};

let cachedAdminHistoryIndex: WorkspaceAdminHistoryIndex | null = null;
let adminHistoryIndexPromise: Promise<WorkspaceAdminHistoryIndex> | null = null;

export function preloadAdminHistoryIndex() {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }
  return loadAdminHistoryIndex(null).catch(() => null);
}

export function useAdminHistoryIndex(snapshot: WorkspaceSnapshot, section: string) {
  const [state, setState] = useState<AdminHistoryState>({ status: "idle", index: null, error: "" });
  const requestedRef = useRef(false);
  const mountedRef = useRef(true);
  const activeControllerRef = useRef<AbortController | null>(null);
  const hasAdminHistory = Boolean(snapshot.adminHistory?.summary.documents);
  const shouldLoadImmediately = section === "history" || section === "documents";

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      activeControllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (!hasAdminHistory || requestedRef.current) {
      return undefined;
    }

    const load = () => {
      if (requestedRef.current) {
        return;
      }
      requestedRef.current = true;
      const controller = typeof AbortController === "function" ? new AbortController() : null;
      activeControllerRef.current = controller;
      setState({ status: "loading", index: null, error: "" });
      void loadAdminHistoryIndex(controller)
        .then((index) => {
          if (mountedRef.current) {
            setState({ status: "ready", index, error: "" });
          }
        })
        .catch((caught) => {
          if (mountedRef.current) {
            requestedRef.current = false;
            setState({
              status: "error",
              index: null,
              error: caught instanceof Error ? caught.message : "관리자용 기록 색인을 불러오지 못했습니다."
            });
          }
        });
    };

    if (shouldLoadImmediately) {
      load();
      return undefined;
    }

    if (typeof window === "undefined" || typeof window.requestIdleCallback !== "function") {
      return undefined;
    }

    const idleId = window.requestIdleCallback(load, { timeout: 5000 });
    return () => {
      window.cancelIdleCallback(idleId);
    };
  }, [hasAdminHistory, section, shouldLoadImmediately]);

  const adminHistoryIndex = state.status === "ready" ? state.index : null;
  const documents = useMemo(
    () => mergeDocuments(snapshot.documents, adminHistoryIndex?.documents || []),
    [adminHistoryIndex, snapshot.documents]
  );
  const historyDays = useMemo(
    () => (adminHistoryIndex?.documents?.length ? buildHistoryDaysFromDocuments(adminHistoryIndex.documents) : snapshot.historyDays),
    [adminHistoryIndex, snapshot.historyDays]
  );
  const statusText = useMemo(() => adminHistoryStatusText(state, snapshot), [snapshot, state]);

  return {
    state,
    documents,
    historyDays,
    statusText
  };
}

function loadAdminHistoryIndex(controller: AbortController | null) {
  if (cachedAdminHistoryIndex) {
    return Promise.resolve(cachedAdminHistoryIndex);
  }
  if (!adminHistoryIndexPromise) {
    adminHistoryIndexPromise = fetchAdminHistoryIndex(controller).then((index) => {
      cachedAdminHistoryIndex = index;
      return index;
    });
  }
  return adminHistoryIndexPromise;
}

async function fetchAdminHistoryIndex(controller: AbortController | null) {
  const historyUrl = new URL("admin-history-index.json", window.location.href);
  const requestOptions: RequestInit = { cache: "no-cache" };
  if (controller) {
    requestOptions.signal = controller.signal;
  }
  const response = await fetch(historyUrl, requestOptions);
  if (!response.ok) {
    throw new Error(`Admin history request failed with ${response.status}`);
  }
  return (await response.json()) as WorkspaceAdminHistoryIndex;
}

function mergeDocuments(
  baseDocuments: WorkspaceSnapshot["documents"],
  adminDocuments: WorkspaceAdminHistoryIndex["documents"]
) {
  if (!adminDocuments.length) {
    return baseDocuments;
  }
  const byId = new Map(baseDocuments.map((document) => [document.id, document]));
  for (const document of adminDocuments) {
    byId.set(document.id, document);
  }
  return Array.from(byId.values()).sort(
    (left, right) => right.updatedAt.localeCompare(left.updatedAt) || left.path.localeCompare(right.path)
  );
}

function buildHistoryDaysFromDocuments(documents: WorkspaceAdminHistoryIndex["documents"]): WorkspaceSnapshot["historyDays"] {
  const byDate = new Map<string, WorkspaceSnapshot["historyDays"][number]>();
  for (const document of documents) {
    if (!document.historyDate) {
      continue;
    }
    const date = document.historyDate;
    const day = byDate.get(date) || {
      date,
      year: date.slice(0, 4),
      documentsCount: 0,
      categories: [],
      documents: []
    };
    day.documents.push({
      id: document.id,
      path: document.path,
      category: document.category,
      language: document.language,
      title: document.title,
      excerpt: document.excerpt,
      previewMode: document.previewMode,
      htmlTruncated: document.htmlTruncated,
      sourceBytes: document.sourceBytes,
      updatedAt: document.updatedAt,
      historyDate: document.historyDate
    });
    byDate.set(date, day);
  }

  return Array.from(byDate.values())
    .map((day) => {
      const categories = summarizeCategories(day.documents);
      return {
        ...day,
        documentsCount: day.documents.length,
        categories,
        documents: day.documents.sort(
          (left, right) => left.category.localeCompare(right.category) || left.path.localeCompare(right.path)
        )
      };
    })
    .sort((left, right) => right.date.localeCompare(left.date));
}

function summarizeCategories(documents: WorkspaceSnapshot["historyDays"][number]["documents"]) {
  const counts = new Map<string, number>();
  for (const document of documents) {
    counts.set(document.category, (counts.get(document.category) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((left, right) => right.count - left.count || left.category.localeCompare(right.category));
}

function adminHistoryStatusText(state: AdminHistoryState, snapshot: WorkspaceSnapshot) {
  if (state.status === "ready") {
    const count = state.index?.summary.documents ?? 0;
    return `관리자용 기록 ${count.toLocaleString("ko-KR")}개를 불러왔습니다. 기본 데이터에는 최근 요약만 포함됩니다.`;
  }
  if (state.status === "loading") {
    return "관리자용 기록을 불러오는 중입니다. 먼저 기본 요약을 보여줍니다.";
  }
  if (state.status === "error") {
    return `관리자용 기록을 불러오지 못했습니다. ${state.error}`;
  }
  const inlineCount = snapshot.adminHistory?.inlineHistoryDocuments ?? 0;
  const totalCount = snapshot.adminHistory?.summary.documents ?? inlineCount;
  return `기본 요약 ${inlineCount.toLocaleString("ko-KR")}개 / 관리자 전체 기록 ${totalCount.toLocaleString("ko-KR")}개`;
}
