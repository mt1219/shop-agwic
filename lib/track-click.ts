/**
 * Client-side event tracking.
 *
 * Events are buffered in memory and flushed in batches to /api/track.
 * Flushes on:
 *   - buffer reaching 10 events
 *   - every 5 seconds if buffer is non-empty
 *   - page hide / unload (via sendBeacon)
 *   - explicit flushClicks() call
 */

type EventPayload = {
  event_name: string;
  page?: string | null;
  product_slug?: string | null;
  category?: string | null;
  session_id?: string | null;
  referrer?: string | null;
  metadata?: Record<string, unknown> | null;
};

const MAX_BUFFER = 10;
const FLUSH_INTERVAL_MS = 5000;
const SESSION_KEY = "agwic_sid";

let buffer: EventPayload[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let unloadHandlersAttached = false;

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    const existing = localStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const fresh =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    localStorage.setItem(SESSION_KEY, fresh);
    return fresh;
  } catch {
    return "";
  }
}

function scheduleFlush() {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flushClicks();
  }, FLUSH_INTERVAL_MS);
}

function attachUnloadHandlers() {
  if (unloadHandlersAttached) return;
  unloadHandlersAttached = true;
  const handler = () => flushClicks(true);
  window.addEventListener("pagehide", handler);
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushClicks(true);
  });
}

export function trackClick(
  eventName: string,
  extra: Omit<EventPayload, "event_name" | "session_id"> = {},
) {
  if (typeof window === "undefined") return;
  attachUnloadHandlers();

  buffer.push({
    event_name: eventName,
    session_id: getSessionId(),
    ...extra,
  });

  if (buffer.length >= MAX_BUFFER) {
    flushClicks();
  } else {
    scheduleFlush();
  }
}

export function flushClicks(sync = false) {
  if (typeof window === "undefined") return;
  if (buffer.length === 0) return;

  const payload = JSON.stringify({ events: buffer });

  if (sync && typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    try {
      navigator.sendBeacon(
        "/api/track",
        new Blob([payload], { type: "application/json" }),
      );
      buffer = [];
      return;
    } catch {
      // fall through to fetch
    }
  }

  const items = buffer;
  buffer = [];

  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // best-effort tracking; on failure, drop the batch
  });
}
