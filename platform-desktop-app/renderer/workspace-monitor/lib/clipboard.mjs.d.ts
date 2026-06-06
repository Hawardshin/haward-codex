export type ClipboardWriteEnvironment = {
  document?: Pick<Document, "body" | "createElement" | "execCommand">;
  navigator?: {
    clipboard?: {
      readText?: () => Promise<string> | string;
      writeText?: (value: string) => Promise<void> | void;
    };
  };
  window?: Window;
  tauriInvoke?: <T = unknown>(command: string, args?: Record<string, unknown>) => Promise<T> | T;
};

export function defaultClipboardEnvironment(): ClipboardWriteEnvironment;

export function readClipboardText(
  environment?: ClipboardWriteEnvironment
): Promise<string>;

export function writeClipboardText(
  value: string,
  environment?: ClipboardWriteEnvironment
): Promise<boolean>;
