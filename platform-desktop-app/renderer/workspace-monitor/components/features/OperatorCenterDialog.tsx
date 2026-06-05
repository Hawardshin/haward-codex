import { ArrowRight, ShieldCheck, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type OperatorCenterSectionId =
  | "overview"
  | "desktop"
  | "projects"
  | "history"
  | "intent"
  | "structure"
  | "documents"
  | "source"
  | "tools"
  | "requirements"
  | "agents";

export type OperatorCenterSection = {
  id: OperatorCenterSectionId;
  label: string;
  shortLabel: string;
  purpose: string;
  icon: LucideIcon;
  meta: string;
};

export type OperatorCenterDialogProps = {
  sections: OperatorCenterSection[];
  language?: "ko" | "en";
  onClose: () => void;
  onOpenSection: (section: OperatorCenterSectionId) => void;
};

export function OperatorCenterDialog({ sections, language = "ko", onClose, onOpenSection }: OperatorCenterDialogProps) {
  const ko = language === "ko";

  return (
    <div
      className="settings-dialog-backdrop operator-center-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="settings-dialog operator-center-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={ko ? "운영 센터" : "Operator Center"}
      >
        <header>
          <div>
            <p className="eyebrow">{ko ? "운영 센터" : "Operator Center"}</p>
            <h2>{ko ? "기록, 문서, 거버넌스" : "Monitoring, Docs, Governance"}</h2>
          </div>
          <button type="button" onClick={onClose} title={ko ? "운영 센터 닫기" : "Close operator center"}>
            <X size={17} aria-hidden="true" />
          </button>
        </header>

        <div className="operator-center-note">
          <ShieldCheck size={17} aria-hidden="true" />
          <div>
            <strong>{ko ? "운영 도구는 주 작업면과 분리됩니다" : "Operator tools are separate"}</strong>
            <p>
              {ko
                ? "모니터링과 관리자 화면은 여기에서 열고, 기본 데스크톱은 에이전트 작업, 코드, 생성, 학습부터 시작합니다."
                : "Monitoring and admin surfaces live here so the main desktop starts from agent work, code, creation, and learning."}
            </p>
          </div>
        </div>

        <div className="operator-section-grid">
          {sections.map((section) => (
            <button
              key={section.id}
              className="operator-section-card"
              type="button"
              onClick={() => {
                onOpenSection(section.id);
                onClose();
              }}
            >
              <span>
                <section.icon size={17} aria-hidden="true" />
                <small>{section.meta}</small>
              </span>
              <strong>{section.label}</strong>
              <p>{section.purpose}</p>
              <em>
                {ko ? `${section.shortLabel} 열기` : `Open ${section.shortLabel}`}
                <ArrowRight size={14} aria-hidden="true" />
              </em>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
