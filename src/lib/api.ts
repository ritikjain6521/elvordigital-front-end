// Central API base URL — normalizes URL (removes any trailing /api or /)
// Automatically falls back to live Render backend in production/browser environments
const isBrowser = typeof window !== "undefined";
const isLocal = isBrowser && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

const rawUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  (!isLocal && (process.env.NODE_ENV === "production" || isBrowser)
    ? "https://elvordigital-back-end.onrender.com"
    : "http://localhost:5000");

export const API_BASE = rawUrl.replace(/\/api\/?$/, "").replace(/\/+$/, "");

/**
 * Resolves relative `/uploads/...` or `/api/assets/image/...` paths (and rewrites stale
 * localhost / Render origins for those paths) to the active `API_BASE`.
 */
export function resolveMediaUrl(url?: string | null): string {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";

  if (trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
    return trimmed;
  }

  // Rewrite stale backend origins for our own uploaded media paths
  const mediaPathMatch = trimmed.match(/(\/(?:uploads|api\/assets\/image)\/[^?#\s]+(?:\?[^#\s]*)?)/);
  if (mediaPathMatch && (trimmed.startsWith("/") || trimmed.includes("localhost:") || trimmed.includes("127.0.0.1:") || trimmed.includes("onrender.com"))) {
    return `${API_BASE}${mediaPathMatch[1]}`;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `${API_BASE}${trimmed.startsWith("/") ? "" : "/"}${trimmed}`;
}
