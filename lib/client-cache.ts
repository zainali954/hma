type CacheEntry = { data: unknown; expires: number };
const store = new Map<string, CacheEntry>();

export function getCached<T>(key: string): T | null {
  const entry = store.get(key);
  if (!entry || Date.now() > entry.expires) {
    store.delete(key);
    return null;
  }
  return entry.data as T;
}

export function setCached(key: string, data: unknown, ttlMs = 120_000) {
  store.set(key, { data, expires: Date.now() + ttlMs });
}

export function bustCache(...keys: string[]) {
  if (keys.length === 0) store.clear();
  else keys.forEach((k) => store.delete(k));
}

export function bustPrefix(prefix: string) {
  for (const key of store.keys()) {
    if (key.startsWith(prefix)) store.delete(key);
  }
}
