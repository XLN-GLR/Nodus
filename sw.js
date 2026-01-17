
const CACHE_NAME = 'nodus-cache-v2';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './index.tsx',
  'https://cdn.tailwindcss.com'
];

// Instalación: Cacheamos los archivos críticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// Activación: Limpiamos cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Estrategia de red: Intentar red, si falla usar caché
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
