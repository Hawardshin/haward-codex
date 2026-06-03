export type ClipboardWriteEnvironment = {
  document?: Pick<Document, "body" | "createElement" | "execCommand">;
  navigator?: {
    clipboard?: {
      writeText?: (value: string) => Promise<void> | void;
    };
  };
};

export function defaultClipboardEnvironment(): ClipboardWriteEnvironment;

export function writeClipboardText(
  value: string,
  environment?: ClipboardWriteEnvironment
): Promise<boolean>;
