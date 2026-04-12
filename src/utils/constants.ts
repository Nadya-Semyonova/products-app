export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.jikan.moe/v4";

export const API_ENDPOINTS = {
  TOP_ANIME: "/top/anime",
  ANIME_BY_ID: "/anime",
} as const;

export const DEFAULT_PAGE_SIZE =
  Number(import.meta.env.VITE_DEFAULT_PAGE_SIZE) || 20;
