const CACHE_NAME = 'my-app-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/offline-pdf-error.html' // Yeh tumhara custom error page hoga
];

// 1. Install Event: Saari zaroori files cache me daal do
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. Activate Event: Purana cache saaf karne ke liye
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Fetch Event: Network request ko intercept karna
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Agar user PDF open karne ki koshish kar raha hai aur net nahi hai
  if (requestUrl.pathname.endsWith('.pdf')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Net nahi hai toh custom HTML error page dikha do
        return caches.match('/offline-pdf-error.html');
      })
    );
    return;
  }

  // Baaki sabhi requests ke liye: Cache First, phir Network
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Fast speed se cache se dega
      }
      return fetch(event.request).catch(() => {
        // Agar normal page ke liye bhi net nahi hai, toh home page fallback de sakte ho
        return caches.match('/index.html');
      });
    })
  );
});
