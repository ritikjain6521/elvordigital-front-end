// Central API base URL — normalizes URL (removes any trailing /api or /)
const rawUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
export const API_BASE = rawUrl.replace(/\/api\/?$/, "").replace(/\/+$/, "");
