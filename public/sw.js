const CACHE_NAME = "direktoryo-cache-v2.0.2";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json"
];

self.addEventListener("install", (event) => {
  self.skipWaiting(); // Forces the new service worker to become active immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate (cleanup old cache)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      // Immediately take control of all open windows/tabs
      self.clients.claim(), 
      // Delete every cache that isn't the current version
      caches.keys().then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        );
      })
    ])
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Optional: Update the cache with the fresh network response
        const clonedResponse = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clonedResponse);
        });
        return response;
      })
      .catch(async () => {
        // OFFLINE: Fallback to cache
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;
        // If even the cache fails (e.g. navigating to a new page offline)
        if (event.request.mode === "navigate") {
          return caches.match("/");
        }
      })
  );
});