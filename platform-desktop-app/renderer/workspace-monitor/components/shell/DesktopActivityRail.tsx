"use client";

import { Bot, Settings, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type UiLanguage = "ko" | "en";

export type DesktopActivityRailSection<TSectionId extends string = string> = {
  id: TSectionId;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
};

type DesktopActivityRailProps<TSectionId extends string = string> = {
  language: UiLanguage;
  activeSectionId: TSectionId;
  homeSectionId: TSectionId;
  sections: Array<DesktopActivityRailSection<TSectionId>>;
  onPrimeSection: (sectionId: TSectionId) => void;
  onOpenSection: (sectionId: TSectionId) => void;
  onOpenOperatorCenter: () => void;
  onOpenSettings: () => void;
};

export function DesktopActivityRail<TSectionId extends string = string>({
  language,
  activeSectionId,
  homeSectionId,
  sections,
  onPrimeSection,
  onOpenSection,
  onOpenOperatorCenter,
  onOpenSettings
}: DesktopActivityRailProps<TSectionId>) {
  const homeLabel = language === "ko" ? "작업공간 홈" : "Workspace Home";
  const railLabel = language === "ko" ? "주요 기능 레일" : "Primary activity rail";
  const sectionNavLabel = language === "ko" ? "주요 데스크톱 섹션" : "Pinned desktop sections";
  const operatorLabel = language === "ko" ? "운영 센터 열기" : "Open Operator Center";
  const settingsLabel = language === "ko" ? "설정" : "Settings";

  return (
    <aside
      className="activity-rail"
      data-intellij-zone="tool-window-stripe"
      aria-label={railLabel}
    >
      <button
        className="activity-brand"
        type="button"
        onPointerDown={() => onPrimeSection(homeSectionId)}
        onClick={() => onOpenSection(homeSectionId)}
        title={homeLabel}
        aria-label={homeLabel}
      >
        <Bot size={22} aria-hidden="true" />
      </button>
      <nav aria-label={sectionNavLabel}>
        {sections.map((item) => (
          <button
            key={item.id}
            type="button"
            onPointerDown={() => onPrimeSection(item.id)}
            onClick={() => onOpenSection(item.id)}
            className={activeSectionId === item.id ? "active" : ""}
            title={item.label}
            aria-label={item.label}
            aria-current={activeSectionId === item.id ? "page" : undefined}
            data-section-id={item.id}
          >
            <item.icon size={19} aria-hidden="true" />
            <span>{item.shortLabel}</span>
          </button>
        ))}
      </nav>
      <button
        className="activity-settings"
        type="button"
        onClick={onOpenOperatorCenter}
        title={operatorLabel}
        aria-label={operatorLabel}
      >
        <ShieldCheck size={19} aria-hidden="true" />
      </button>
      <button
        className="activity-settings"
        type="button"
        onClick={onOpenSettings}
        title={settingsLabel}
        aria-label={settingsLabel}
      >
        <Settings size={19} aria-hidden="true" />
      </button>
    </aside>
  );
}
