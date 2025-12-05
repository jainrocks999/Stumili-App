export const STORAGE_KEYS = {
  TOKEN: "app_token",
  USER: "app_user",
} as const;

export type StorageKey = keyof typeof STORAGE_KEYS;
