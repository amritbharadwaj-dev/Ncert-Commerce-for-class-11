const CACHE_NAME = 'commerce-hub-v2';
const ASSETS_TO_CACHE = [
    './index.html',
    './setting.html',
    './style.css',
    './script.js',
    './data.js',
    './global.js',
    './manifest.json'
];

// Install Event - Caching all essential files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate Event - Clean up old caches
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

// Fetch Event - Fast loading, offline support & custom internet error page
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Background update for fresh content
                fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, networkResponse);
                        });
                    }
                }).catch(() => {});
                return cachedResponse;
            }

            // If not in cache, try fetching from network
            return fetch(event.request).then((networkResponse) => {
                return networkResponse;
            }).catch(() => {
                // If it's a page navigation request (like back button or opening app offline)
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }

                // For other assets/requests offline, show user-friendly message
                return new Response(
                    `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>No Internet Connection</title>
                        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
                    </head>
                    <body class="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center min-h-screen p-4">
                        <div class="text-center max-w-md bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
                            <div class="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" />
                                </svg>
                            </div>
                            <h2 class="text-lg font-bold mb-2">Connection Error</h2>
                            <p class="text-sm text-slate-600 dark:text-slate-400 mb-6">Your internet connection is wrong please try again</p>
                            <button onclick="window.location.reload()" class="w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold py-2.5 px-4 rounded-xl text-sm transition active:scale-95">
                                Try Again
                            </button>
                        </div>
                    </body>
                    </html>`,
                    {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: { 'Content-Type': 'text/html' }
                    }
                );
            });
        })
    );
});
