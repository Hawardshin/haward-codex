export type SourceTemplateId =
  | "requirement-row"
  | "spec-section"
  | "validation-record"
  | "tauri-command"
  | "agent-config"
  | "decision-inbox-item";

export type SourceTemplate = {
  id: SourceTemplateId;
  label: string;
  detail: string;
  body: string;
};

export type SourceEditorProfile = {
  label: string;
  detail: string;
  accent: "governance" | "spec" | "runtime" | "config" | "source";
  templateId: SourceTemplateId;
};

export const sourceTemplates: SourceTemplate[] = [
  {
    id: "requirement-row",
    label: "Requirement Row",
    detail: "Baselined requirement table row",
    body:
      "| REQ-PLATFORM-000 | {{date}} | {{path}} | The platform shall ... | must | planned | spec: TBD | validation: TBD |\n"
  },
  {
    id: "spec-section",
    label: "Spec Section",
    detail: "Scope, acceptance, trace",
    body:
      "## Goal\n\n- User outcome:\n- Owner surface:\n\n## Scope\n\n- Included:\n- Excluded:\n\n## Acceptance\n\n- [ ] Requirement linked\n- [ ] Implementation path named\n- [ ] Validation command recorded\n- [ ] Rollback or backup path clear\n"
  },
  {
    id: "validation-record",
    label: "Validation Record",
    detail: "Command and browser evidence",
    body:
      "## Validation\n\n- Static check:\n- Build check:\n- Runtime smoke:\n- Browser viewport check:\n- Regression risk:\n- Evidence path:\n"
  },
  {
    id: "tauri-command",
    label: "Tauri Command",
    detail: "Workspace-scoped command stub",
    body:
      "#[tauri::command]\nfn command_name() -> Result<(), String> {\n    Ok(())\n}\n"
  },
  {
    id: "agent-config",
    label: "Agent Config",
    detail: "Bounded capability config",
    body:
      "{\n  \"id\": \"agent-id\",\n  \"label\": \"Agent Label\",\n  \"role\": \"bounded_capability\",\n  \"inputs\": [],\n  \"outputs\": [],\n  \"validation\": {\n    \"required_evidence\": [],\n    \"rollback\": \"\"\n  }\n}\n"
  },
  {
    id: "decision-inbox-item",
    label: "Decision Item",
    detail: "Human arbitration packet",
    body:
      "{\n  \"id\": \"decision-id\",\n  \"status\": \"open\",\n  \"priority\": \"normal\",\n  \"question\": \"\",\n  \"impact\": \"\",\n  \"options\": [],\n  \"resume_action\": \"\"\n}\n"
  }
];

export const sourceTemplateById = sourceTemplates.reduce(
  (lookup, template) => ({ ...lookup, [template.id]: template }),
  {} as Record<SourceTemplateId, SourceTemplate>
);

export function sourceEditorProfileForPath(relativePath: string): SourceEditorProfile {
  const normalized = relativePath.toLowerCase();
  if (normalized.includes("/docs/requirements/") || normalized.includes("_requirements/")) {
    return {
      label: "Requirements",
      detail: "baseline, status, trace",
      accent: "governance",
      templateId: "requirement-row"
    };
  }
  if (normalized.includes("/specs/") || normalized.includes("_specs/")) {
    return {
      label: "Spec Work",
      detail: "scope, acceptance, validation",
      accent: "spec",
      templateId: "spec-section"
    };
  }
  if (normalized.includes("src-tauri") || normalized.endsWith(".rs")) {
    return {
      label: "Runtime Command",
      detail: "Tauri boundary, Result contract",
      accent: "runtime",
      templateId: "tauri-command"
    };
  }
  if (normalized.includes("/configs/") || normalized.endsWith(".json")) {
    return {
      label: "Platform Config",
      detail: "schema, validation, rollback",
      accent: "config",
      templateId: "agent-config"
    };
  }
  if (normalized.includes("/validation") || normalized.includes("_history/evaluations/")) {
    return {
      label: "Validation",
      detail: "commands, evidence, risk",
      accent: "governance",
      templateId: "validation-record"
    };
  }
  return {
    label: "Source Patch",
    detail: "draft, diff, handoff",
    accent: "source",
    templateId: "spec-section"
  };
}

export function renderSourceTemplate(template: SourceTemplate, relativePath: string) {
  return template.body
    .split("{{date}}")
    .join(new Date().toISOString().slice(0, 10))
    .split("{{path}}")
    .join(relativePath || "workspace-relative-path");
}

export function appendSourceTemplate(content: string, templateBody: string) {
  const separator = content.length === 0 ? "" : content.endsWith("\n") ? "\n" : "\n\n";
  return `${content}${separator}${templateBody}`;
}
