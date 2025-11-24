const CACHE_NAME = "mi-cache-v2";

const ARCHIVOS_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json"
];

// INSTALACIÓN
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("✅ Cache creado");
      return cache.addAll(ARCHIVOS_CACHE);
    })
  );
  self.skipWaiting();
});

// ACTIVACIÓN (limpia cachés viejos)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log("🗑 Cache viejo eliminado:", key);
            return caches.delete(key);
          })
      );
    })
  );
  self.clients.claim();
});

// OFFLINE
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cacheResponse => {

      // Si está en cache → úsalo
      if (cacheResponse) {
        return cacheResponse;
      }

      // Si no, intenta red
      return fetch(event.request).catch(() => {
        // Si no hay internet, vuelve al index
        return caches.match("/index.html");
      });
    })
  );
});
