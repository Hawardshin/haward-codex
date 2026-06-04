import { ArrowRight, ShieldCheck, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ProductSectionId =
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

type OperatorCenterSection = {
  id: ProductSectionId;
  label: string;
  shortLabel: string;
  purpose: string;
  icon: LucideIcon;
  meta: string;
};

type OperatorCenterDialogProps = {
  sections: OperatorCenterSection[];
  onClose: () => void;
  onOpenSection: (section: ProductSectionId) => void;
};

export function OperatorCenterDialog({ sections, onClose, onOpenSection }: OperatorCenterDialogProps) {
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
      <section className="settings-dialog operator-center-dialog" role="dialog" aria-modal="true" aria-label="Operator Center">
        <header>
          <div>
            <p className="eyebrow">Operator Center</p>
            <h2>Monitoring, Docs, Governance</h2>
          </div>
          <button type="button" onClick={onClose} title="Close operator center">
            <X size={17} aria-hidden="true" />
          </button>
        </header>

        <div className="operator-center-note">
          <ShieldCheck size={17} aria-hidden="true" />
          <div>
            <strong>Operator tools are separate</strong>
            <p>Monitoring and admin surfaces live here so the main desktop starts from agent work, code, creation, and learning.</p>
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
                Open {section.shortLabel}
                <ArrowRight size={14} aria-hidden="true" />
              </em>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
