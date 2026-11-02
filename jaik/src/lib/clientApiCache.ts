"use client";

type JsonResponse<T> = {
  data: T;
  status: number;
  ok: boolean;
};

type CacheEntry<T> = {
  expiresAt: number;
  promise: Promise<JsonResponse<T>>;
};

const apiCache = new Map<string, CacheEntry<unknown>>();

export const cachedGet = <T = any>(
  url: string,
  ttlMs = 5 * 60 * 1000
): Promise<JsonResponse<T>> => {
  const now = Date.now();
  const cached = apiCache.get(url);

  if (cached && cached.expiresAt > now) {
    return cached.promise as Promise<JsonResponse<T>>;
  }

  const promise = fetch(url, {
    headers: { Accept: "application/json" },
  }).then(async (response) => {
    const data = (await response.json().catch(() => null)) as T;

    if (!response.ok) {
      throw new Error(`GET ${url} failed with ${response.status}`);
    }

    return {
      data,
      status: response.status,
      ok: response.ok,
    };
  });

  apiCache.set(url, {
    expiresAt: now + ttlMs,
    promise: promise as Promise<JsonResponse<unknown>>,
  });

  promise.catch(() => {
    const latest = apiCache.get(url);
    if (latest?.promise === (promise as Promise<JsonResponse<unknown>>)) {
      apiCache.delete(url);
    }
  });

  return promise;
};
