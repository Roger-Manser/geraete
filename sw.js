// Version: 1.0.4 (30.08.2026)
// Update CACHE_NAME mit jeder neuen Version
const CACHE_NAME = 'geraete-v1.0.9';
const ASSETS = [
  '/geraete/',
  '/geraete/index.html',
  '/geraete/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        return caches.match('/geraete/index.html');
      });
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'UPDATE_IMMEDIATELY') {
    self.skipWaiting();
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-devices') {
    event.waitUntil(syncDevices());
  }
});

async function syncDevices() {
  try {
    const response = await fetch('/geraete/sync');
    if (response.ok) {
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'SYNC_SUCCESS'
          });
        });
      });
    }
  } catch (error) {
    console.error('Sync failed:', error);
  }
}
