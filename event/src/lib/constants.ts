// put all shared constants here

export const ONE_HOUR_IN_MS = 60 * 60 * 1000;
export const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
export const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
export const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const CATEGORIES = [
  "Sports",
  "Music",
  "Games",
  "Comedy",
  "Art",
  "Social",
  "Outdoors",
  "Food",
] as const;

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";
