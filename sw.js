const CACHE_NAME = 'commerce-hub-v3';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './setting.html',
    './style.css',
    './script.js',
    './data.js',
    './global.js',
    './manifest.json'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate Event
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

// Fetch Event - Network First for HTML pages to prevent back-button error
self.addEventListener('fetch', (event) => {
    const request = event.request;
    
    // For HTML navigation (like opening app or going back from settings)
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((networkResponse) => {
                    return networkResponse;
                })
                .catch(() => {
                    return caches.match('./index.html') || caches.match('./');
                })
        );
        return;
    }

    // For other assets (CSS, JS, Images)
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                // Fetch in background to update cache
                fetch(request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, networkResponse);
                        });
                    }
                }).catch(() => {});
                return cachedResponse;
            }

            return fetch(request).then((networkResponse) => {
                return networkResponse;
            }).catch(() => {
                // Custom offline message for non-page requests if needed
                return new Response(
                    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script></head><body class="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center min-h-screen p-4"><div class="text-center max-w-md bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800"><h2 class="text-lg font-bold mb-2">Connection Error</h2><p class="text-sm text-slate-600 dark:text-slate-400 mb-6">Your internet connection is wrong please try again</p><button onclick="window.location.reload()" class="w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold py-2.5 px-4 rounded-xl text-sm">Try Again</button></div></body></html>',
                    { status: 503, headers: { 'Content-Type': 'text/html' } }
                );
            });
        })
    );
});
