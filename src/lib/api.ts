// Central API base URL — reads from env on Vercel, falls back to localhost for dev
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
