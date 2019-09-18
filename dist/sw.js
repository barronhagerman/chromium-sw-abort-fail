self.addEventListener('install', event => self.skipWaiting())
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))

self.addEventListener('fetch', event => {
  console.log(`${new Date().toISOString()} ${event.request.method} ${event.request.url}`, event);
});
