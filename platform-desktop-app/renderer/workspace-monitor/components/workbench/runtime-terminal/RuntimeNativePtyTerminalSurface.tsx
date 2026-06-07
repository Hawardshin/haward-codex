"use client";

import { ChevronLeft, ChevronRight, Clipboard, ClipboardPaste, Eraser, Maximize2, Search, SquareTerminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { readClipboardText, writeClipboardText } from "@/lib/clipboard.mjs";
import type { NativePtyQuickCommand, RuntimeNativePtySession } from "./runtimeTerminalTypes";
import { isWritableSessionStatus } from "./runtimeTerminalUtils";

// 한국어 주석: xterm.js와 PTY 입출력 생명주기를 드로어 레이아웃에서 분리해 터미널 런타임 경계를 명확히 둔다.
export function NativePtyTerminalSurface({
  ariaLabel,
  labels,
  placeholder,
  quickCommands,
  runtimeAvailable,
  session,
  startLabel,
  onResize,
  onStart,
  onWrite
}: {
  ariaLabel: string;
  labels: Record<string, string>;
  placeholder: string;
  quickCommands: NativePtyQuickCommand[];
  runtimeAvailable: boolean;
  session: RuntimeNativePtySession | null;
  startLabel: string;
  onResize: (sessionId: string, size: { rows: number; cols: number }) => void | Promise<void>;
  onStart: (size: { rows: number; cols: number }) => void | Promise<void>;
  onWrite: (sessionId: string, input: string) => void | Promise<void>;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const terminalRef = useRef<import("@xterm/xterm").Terminal | null>(null);
  const fitAddonRef = useRef<import("@xterm/addon-fit").FitAddon | null>(null);
  const searchAddonRef = useRef<import("@xterm/addon-search").SearchAddon | null>(null);
  const lastOutputRef = useRef("");
  const resizeSignatureRef = useRef("");
  const pendingInputRef = useRef("");
  const flushTimerRef = useRef<number | null>(null);
  const noticeTimerRef = useRef<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const fitAndResizeRef = useRef<() => void>(() => {});
  const sessionRef = useRef<RuntimeNativePtySession | null>(session);
  const runtimeAvailableRef = useRef(runtimeAvailable);
  const onResizeRef = useRef(onResize);
  const onWriteRef = useRef(onWrite);
  const [searchQuery, setSearchQuery] = useState("");
  const [terminalNotice, setTerminalNotice] = useState("");

  useEffect(() => {
    sessionRef.current = session;
    runtimeAvailableRef.current = runtimeAvailable;
    onResizeRef.current = onResize;
    onWriteRef.current = onWrite;
  }, [runtimeAvailable, session, onResize, onWrite]);

  useEffect(() => {
    return () => {
      if (noticeTimerRef.current !== null && typeof window !== "undefined") {
        window.clearTimeout(noticeTimerRef.current);
        noticeTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    let disposed = false;
    let dataDisposable: { dispose: () => void } | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const flushInput = () => {
      if (flushTimerRef.current !== null && typeof window !== "undefined") {
        window.clearTimeout(flushTimerRef.current);
        flushTimerRef.current = null;
      }
      const input = pendingInputRef.current;
      pendingInputRef.current = "";
      const activeSession = sessionRef.current;
      if (!input || !runtimeAvailableRef.current || !activeSession || !isWritableSessionStatus(activeSession.status)) {
        return;
      }
      void onWriteRef.current(activeSession.sessionId, input);
    };

    const fitAndResize = () => {
      const terminal = terminalRef.current;
      const fitAddon = fitAddonRef.current;
      if (!terminal || !fitAddon) {
        return;
      }
      try {
        fitAddon.fit();
      } catch {
        return;
      }
      const activeSession = sessionRef.current;
      if (!activeSession || !runtimeAvailableRef.current || !isWritableSessionStatus(activeSession.status)) {
        return;
      }
      const signature = `${activeSession.sessionId}:${terminal.rows}:${terminal.cols}`;
      if (resizeSignatureRef.current === signature) {
        return;
      }
      resizeSignatureRef.current = signature;
      void onResizeRef.current(activeSession.sessionId, { rows: terminal.rows, cols: terminal.cols });
    };
    fitAndResizeRef.current = fitAndResize;

    void (async () => {
      const [{ Terminal }, { FitAddon }, { WebLinksAddon }, { SearchAddon }] = await Promise.all([
        import("@xterm/xterm"),
        import("@xterm/addon-fit"),
        import("@xterm/addon-web-links"),
        import("@xterm/addon-search")
      ]);
      if (disposed || !hostRef.current) {
        return;
      }
      const terminal = new Terminal({
        allowProposedApi: false,
        convertEol: false,
        cursorBlink: true,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        fontSize: 13,
        letterSpacing: 0,
        lineHeight: 1.15,
        scrollback: 5000,
        theme: {
          background: "#0d1117",
          foreground: "#d6deeb",
          cursor: "#7cc9b7",
          selectionBackground: "#264f78",
          black: "#0d1117",
          blue: "#58a6ff",
          brightBlack: "#6e7681",
          brightBlue: "#79c0ff",
          brightCyan: "#56d4dd",
          brightGreen: "#7ee787",
          brightMagenta: "#d2a8ff",
          brightRed: "#ff7b72",
          brightWhite: "#ffffff",
          brightYellow: "#f2cc60",
          cyan: "#39c5cf",
          green: "#3fb950",
          magenta: "#bc8cff",
          red: "#f85149",
          white: "#d6deeb",
          yellow: "#d29922"
        }
      });
      const fitAddon = new FitAddon();
      const searchAddon = new SearchAddon();
      terminal.loadAddon(fitAddon);
      terminal.loadAddon(searchAddon);
      terminal.loadAddon(new WebLinksAddon());
      terminal.open(hostRef.current);
      terminalRef.current = terminal;
      fitAddonRef.current = fitAddon;
      searchAddonRef.current = searchAddon;
      terminal.attachCustomKeyEventHandler((event) => {
        const key = event.key.toLowerCase();
        if ((event.metaKey || event.ctrlKey) && key === "f") {
          window.setTimeout(() => searchInputRef.current?.focus(), 0);
          return false;
        }
        if ((event.metaKey || event.ctrlKey) && event.shiftKey && key === "c") {
          void copyTerminalSelection();
          return false;
        }
        if ((event.metaKey || event.ctrlKey) && event.shiftKey && key === "v") {
          void pasteFromClipboard();
          return false;
        }
        if ((event.metaKey || event.ctrlKey) && key === "l") {
          clearTerminalScreen();
          return false;
        }
        return true;
      });
      dataDisposable = terminal.onData((data) => {
        pendingInputRef.current += data;
        if (data.includes("\r") || data.includes("\u0003")) {
          flushInput();
          return;
        }
        if (flushTimerRef.current === null && typeof window !== "undefined") {
          flushTimerRef.current = window.setTimeout(flushInput, 16);
        }
      });
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(fitAndResize);
        resizeObserver.observe(hostRef.current);
      }
      fitAndResize();
      const activeSession = sessionRef.current;
      if (activeSession?.output) {
        terminal.write(activeSession.output);
        lastOutputRef.current = activeSession.output;
      }
    })();

    return () => {
      disposed = true;
      if (flushTimerRef.current !== null && typeof window !== "undefined") {
        window.clearTimeout(flushTimerRef.current);
        flushTimerRef.current = null;
      }
      dataDisposable?.dispose();
      resizeObserver?.disconnect();
      terminalRef.current?.dispose();
      terminalRef.current = null;
      fitAddonRef.current = null;
      searchAddonRef.current = null;
    };
  }, []);

  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) {
      return;
    }
    if (!session) {
      terminal.clear();
      lastOutputRef.current = "";
      return;
    }
    const output = session.output || "";
    const previous = lastOutputRef.current;
    if (!previous || !output.startsWith(previous)) {
      terminal.clear();
      if (output) {
        terminal.write(output);
      }
    } else if (output.length > previous.length) {
      terminal.write(output.slice(previous.length));
    }
    lastOutputRef.current = output;
  }, [session?.output, session?.sessionId, session]);

  const startFromSurface = () => {
    const terminal = terminalRef.current;
    void onStart({
      rows: terminal?.rows || session?.rows || 28,
      cols: terminal?.cols || session?.cols || 100
    });
  };

  const canUseActivePty = runtimeAvailable && Boolean(session) && Boolean(session && isWritableSessionStatus(session.status));

  function notify(message: string) {
    setTerminalNotice(message);
    if (noticeTimerRef.current !== null && typeof window !== "undefined") {
      window.clearTimeout(noticeTimerRef.current);
    }
    if (typeof window !== "undefined") {
      noticeTimerRef.current = window.setTimeout(() => {
        setTerminalNotice("");
        noticeTimerRef.current = null;
      }, 2600);
    }
  }

  async function copyTerminalSelection() {
    const terminal = terminalRef.current;
    const selectedText = terminal?.getSelection() || "";
    const fallbackOutput = sessionRef.current?.output || "";
    const copied = await writeClipboardText(selectedText || fallbackOutput);
    notify(copied ? labels.terminalCopied : labels.terminalCopyFailed);
  }

  async function pasteFromClipboard() {
    const activeSession = sessionRef.current;
    if (!activeSession || !runtimeAvailableRef.current || !isWritableSessionStatus(activeSession.status)) {
      notify(labels.terminalPasteBlocked);
      return;
    }
    try {
      const text = await readClipboardText();
      if (!text) {
        notify(labels.terminalPasteBlocked);
        return;
      }
      await onWriteRef.current(activeSession.sessionId, text);
      terminalRef.current?.focus();
      notify(labels.terminalPasted);
    } catch {
      notify(labels.terminalPasteBlocked);
    }
  }

  function clearTerminalScreen() {
    const terminal = terminalRef.current;
    terminal?.clear();
    lastOutputRef.current = sessionRef.current?.output || "";
    const activeSession = sessionRef.current;
    if (activeSession && runtimeAvailableRef.current && isWritableSessionStatus(activeSession.status)) {
      void onWriteRef.current(activeSession.sessionId, "\f");
    }
    terminal?.focus();
    notify(labels.terminalCleared);
  }

  function fitTerminalScreen() {
    fitAndResizeRef.current();
    terminalRef.current?.focus();
    notify(labels.terminalFitted);
  }

  function runTerminalSearch(direction: "next" | "previous") {
    const query = searchQuery.trim();
    if (!query || !searchAddonRef.current) {
      searchInputRef.current?.focus();
      return;
    }
    const found = direction === "previous" ? searchAddonRef.current.findPrevious(query) : searchAddonRef.current.findNext(query);
    notify(found ? labels.terminalSearchMatch : labels.terminalSearchNoMatch);
  }

  function writeQuickCommand(input: string) {
    const activeSession = sessionRef.current;
    if (!activeSession || !runtimeAvailableRef.current || !isWritableSessionStatus(activeSession.status)) {
      notify(labels.terminalPasteBlocked);
      return;
    }
    void onWriteRef.current(activeSession.sessionId, input);
    terminalRef.current?.focus();
    notify(labels.terminalCommandSent);
  }

  return (
    <div className="native-pty-terminal-shell" aria-label={ariaLabel}>
      <div className="native-pty-command-center" data-terminal-command-center>
        <label className="native-pty-search-control">
          <Search size={14} aria-hidden="true" />
          <span>{labels.terminalSearch}</span>
          <input
            ref={searchInputRef}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                runTerminalSearch(event.shiftKey ? "previous" : "next");
              }
            }}
            placeholder={labels.terminalSearchPlaceholder}
            data-terminal-search-input
          />
        </label>
        <div className="native-pty-toolbar" role="toolbar" aria-label={labels.nativePtySurface}>
          <button type="button" onClick={() => runTerminalSearch("previous")} disabled={!searchQuery.trim()} data-terminal-search-action="previous" title={labels.terminalSearchPrevious}>
            <ChevronLeft size={15} aria-hidden="true" />
            <span>{labels.terminalSearchPrevious}</span>
          </button>
          <button type="button" onClick={() => runTerminalSearch("next")} disabled={!searchQuery.trim()} data-terminal-search-action="next" title={labels.terminalSearchNext}>
            <ChevronRight size={15} aria-hidden="true" />
            <span>{labels.terminalSearchNext}</span>
          </button>
          <button type="button" onClick={() => void copyTerminalSelection()} data-terminal-action="copy-selection" title={labels.terminalCopySelection}>
            <Clipboard size={15} aria-hidden="true" />
            <span>{labels.terminalCopySelection}</span>
          </button>
          <button type="button" onClick={() => void pasteFromClipboard()} disabled={!canUseActivePty} data-terminal-action="paste" title={labels.terminalPaste}>
            <ClipboardPaste size={15} aria-hidden="true" />
            <span>{labels.terminalPaste}</span>
          </button>
          <button type="button" onClick={clearTerminalScreen} data-terminal-action="clear" title={labels.terminalClear}>
            <Eraser size={15} aria-hidden="true" />
            <span>{labels.terminalClear}</span>
          </button>
          <button type="button" onClick={fitTerminalScreen} data-terminal-action="fit" title={labels.terminalFit}>
            <Maximize2 size={15} aria-hidden="true" />
            <span>{labels.terminalFit}</span>
          </button>
        </div>
      </div>
      <div className="native-pty-quick-commands" data-terminal-quick-commands aria-label={labels.terminalQuickCommands}>
        <span>{labels.terminalQuickCommands}</span>
        {quickCommands.map((command) => (
          <button key={command.id} type="button" onClick={() => writeQuickCommand(command.input)} disabled={!canUseActivePty} data-terminal-quick-command={command.id}>
            <strong>{command.label}</strong>
            <small>{command.detail}</small>
          </button>
        ))}
      </div>
      {terminalNotice && <p className="native-pty-notice" role="status">{terminalNotice}</p>}
      <div className="native-pty-terminal-stage">
        <div ref={hostRef} className="native-pty-terminal-host" />
        {!session && (
          <div className="native-pty-placeholder">
            <span>{placeholder}</span>
            <button type="button" onClick={startFromSurface} disabled={!runtimeAvailable}>
              <SquareTerminal size={15} aria-hidden="true" />
              <strong>{startLabel}</strong>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
