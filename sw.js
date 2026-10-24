// Offline support: serve from cache right away (no signal on the highway),
// and refresh the cache in the background so updates show up on the next launch.
const CACHE = 'rtq-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './data.js',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(e.request, { ignoreSearch: true });
      const fresh = fetch(e.request, { cache: 'no-cache' })
        .then((res) => {
          if (res.ok) cache.put(e.request, res.clone());
          return res;
        })
        .catch(() => cached || (e.request.mode === 'navigate' ? cache.match('./index.html') : undefined));
      return cached || fresh;
    }),
  );
});
