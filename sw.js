// Service Worker disabled/bypassed to fix back-button navigation error completely
self.addEventListener('fetch', (event) => {
    return;
});
