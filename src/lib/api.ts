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
