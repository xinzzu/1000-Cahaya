const CACHE_NAME = "1000-cahaya-v1";
const ASSETS = ["/", "/offline", "/icon-192x192.png", "/icon-512x512.png", "/apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : undefined))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const { request } = e;
  if (request.mode === "navigate") {
    e.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        return cache.match("/offline");
      })
    );
    return;
  }
  if (request.method === "GET") {
    e.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request)
            .then((resp) => {
              const copy = resp.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
              return resp;
            })
            .catch(() => cached)
      )
    );
  }
});
