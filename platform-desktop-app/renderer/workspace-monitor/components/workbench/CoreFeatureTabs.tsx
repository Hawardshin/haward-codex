"use client";

import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CoreFeatureTabId = "files" | "agents" | "run" | "learn";

export type CoreFeatureTab = {
  id: CoreFeatureTabId;
  label: string;
  kicker: string;
  title: string;
  detail: string;
  icon: LucideIcon;
  metric: string;
  cta: string;
  run: () => void;
  steps: string[];
};

type CoreFeatureTabsProps = {
  activeTab: CoreFeatureTabId;
  language: "ko" | "en";
  tabs: CoreFeatureTab[];
  onSelectTab: (tabId: CoreFeatureTabId) => void;
};

export function CoreFeatureTabs({ activeTab, language, tabs, onSelectTab }: CoreFeatureTabsProps) {
  const activeFeature = tabs.find((item) => item.id === activeTab) || tabs[0];

  return (
    <section className="panel wide quick-start-panel main-workbench-panel" aria-label={language === "ko" ? "핵심 기능 탭" : "Core feature tabs"}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{language === "ko" ? "핵심 기능" : "Core Work"}</p>
          <h2>{language === "ko" ? "먼저 무엇을 할지 고르세요" : "Choose what you want to do first"}</h2>
        </div>
        <span className="result-count">{activeFeature.label}</span>
      </div>
      <div className="core-feature-rail main-feature-tabs" role="tablist" aria-label={language === "ko" ? "핵심 기능" : "Core features"}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => onSelectTab(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
          >
            <span className="core-feature-icon">
              <tab.icon size={17} aria-hidden="true" />
            </span>
            <span className="core-feature-copy">
              <small>{tab.kicker}</small>
              <strong>{tab.label}</strong>
              <span>{tab.title}</span>
            </span>
            <span className="core-feature-metric">{tab.metric}</span>
          </button>
        ))}
      </div>
      <div className="main-feature-detail" role="tabpanel">
        <div>
          <p className="eyebrow">{activeFeature.kicker}</p>
          <h3>{activeFeature.title}</h3>
          <p>{activeFeature.detail}</p>
        </div>
        <ol className="main-feature-steps">
          {activeFeature.steps.map((step, index) => (
            <li key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
        <div className="main-feature-actions quick-start-flow single-action-flow">
          <button type="button" onClick={activeFeature.run}>
            <ArrowRight size={16} aria-hidden="true" />
            <span>{activeFeature.cta}</span>
            <small>{activeFeature.label}</small>
          </button>
        </div>
      </div>
    </section>
  );
}
