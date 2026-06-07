export function scheduleAfterFirstPaint(callback: () => void, delayMs = 0) {
  if (typeof window === "undefined") {
    callback();
    return () => undefined;
  }
  let canceled = false;
  let firstFrame = 0;
  let secondFrame = 0;
  let timeoutId = 0;
  const run = () => {
    if (!canceled) {
      callback();
    }
  };
  firstFrame = window.requestAnimationFrame(() => {
    secondFrame = window.requestAnimationFrame(() => {
      timeoutId = window.setTimeout(run, delayMs);
    });
  });
  return () => {
    canceled = true;
    window.cancelAnimationFrame(firstFrame);
    window.cancelAnimationFrame(secondFrame);
    window.clearTimeout(timeoutId);
  };
}

function findInstantButtonTarget(root: HTMLElement, eventTarget: EventTarget | null) {
  if (!(eventTarget instanceof Element)) {
    return null;
  }
  const target = eventTarget.closest<HTMLElement>("button, [role='button'], summary, a[href]");
  if (!target || !root.contains(target)) {
    return null;
  }
  if (target instanceof HTMLButtonElement && target.disabled) {
    return null;
  }
  if (target.getAttribute("aria-disabled") === "true") {
    return null;
  }
  return target;
}

export function installInstantButtonFeedback(root: HTMLElement) {
  const cleanupByElement = new WeakMap<HTMLElement, () => void>();
  const activeCleanups = new Set<() => void>();
  let activeFeedbackCount = 0;
  root.setAttribute("data-button-feedback-ready", "true");

  const mark = (target: HTMLElement, inputType: "pointer" | "keyboard") => {
    cleanupByElement.get(target)?.();
    activeFeedbackCount += 1;
    root.setAttribute("data-button-response-active", "true");
    target.setAttribute("data-instant-button-feedback", "active");
    target.setAttribute("data-instant-button-input", inputType);
    target.removeAttribute("data-instant-button-painted");

    let cleaned = false;
    let clearTimeoutId = 0;
    let cleanup: () => void = () => undefined;
    const cancelFrame = scheduleAfterFirstPaint(() => {
      target.setAttribute("data-instant-button-painted", "true");
      clearTimeoutId = window.setTimeout(cleanup, inputType === "keyboard" ? 220 : 180);
    });
    cleanup = () => {
      if (cleaned) {
        return;
      }
      cleaned = true;
      cancelFrame();
      window.clearTimeout(clearTimeoutId);
      target.removeAttribute("data-instant-button-feedback");
      target.removeAttribute("data-instant-button-input");
      target.removeAttribute("data-instant-button-painted");
      cleanupByElement.delete(target);
      activeCleanups.delete(cleanup);
      activeFeedbackCount = Math.max(0, activeFeedbackCount - 1);
      if (activeFeedbackCount === 0) {
        root.removeAttribute("data-button-response-active");
      }
    };
    cleanupByElement.set(target, cleanup);
    activeCleanups.add(cleanup);
  };

  const handlePointerDown = (event: PointerEvent) => {
    const target = findInstantButtonTarget(root, event.target);
    if (target) {
      mark(target, "pointer");
    }
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    const target = findInstantButtonTarget(root, event.target);
    if (target) {
      mark(target, "keyboard");
    }
  };

  root.addEventListener("pointerdown", handlePointerDown, true);
  root.addEventListener("keydown", handleKeyDown, true);
  return () => {
    root.removeEventListener("pointerdown", handlePointerDown, true);
    root.removeEventListener("keydown", handleKeyDown, true);
    activeCleanups.forEach((cleanup) => cleanup());
    activeCleanups.clear();
    root.removeAttribute("data-button-response-active");
    root.removeAttribute("data-button-feedback-ready");
  };
}
