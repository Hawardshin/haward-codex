"use client";

import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CoreFeatureDrilldownId = "files" | "agents" | "tools" | "run" | "learn";

export type CoreFeatureDrilldownItem = {
  id: CoreFeatureDrilldownId;
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

export type CoreFeatureDrilldownProps = {
  feature: CoreFeatureDrilldownItem;
  language: "ko" | "en";
};

export function CoreFeatureDrilldown({ feature, language }: CoreFeatureDrilldownProps) {
  return (
    <section className="panel wide quick-start-panel main-workbench-panel" aria-label={language === "ko" ? "핵심 기능 상세" : "Core feature detail"}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{feature.kicker}</p>
          <h2>{feature.label}</h2>
        </div>
        <span className="result-count">{feature.metric}</span>
      </div>
      <div className="main-feature-detail">
        <div>
          <p className="eyebrow">{language === "ko" ? "선택한 기능" : "Selected feature"}</p>
          <h3>{feature.title}</h3>
          <p>{feature.detail}</p>
        </div>
        <ol className="main-feature-steps">
          {feature.steps.map((step, index) => (
            <li key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
        <div className="main-feature-actions quick-start-flow single-action-flow">
          <button type="button" onClick={feature.run}>
            <ArrowRight size={16} aria-hidden="true" />
            <span>{feature.cta}</span>
            <small>{feature.label}</small>
          </button>
        </div>
      </div>
    </section>
  );
}
