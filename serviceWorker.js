const staticCacheName = 'listHomesApp_cache_v2';
const runtimeCacheName = 'runtime_cache_v1';
const maxCacheSize = 30;

const cachedAssets = [
  './',
  './index.html',
  './offline.html',
  './serviceWorker.js',
  './js/index.js',
  './js/prefixfree.min.js',
  './js/lib/GetPropertyInfo.js',
  './js/lib/PropertyDetailPage.js',
  './js/lib/PropertyListItem.js',
  './js/lib/RouteProperty.js',
  './manifest.json',
  './css/style.css',
  './css/normalize.css',
  './favicon.ico',
  './image/offline-image.png',
  './icons/icon-512x512.png',
  './icons/icon-384x384.png',
  './icons/icon-256x256.png',
  './icons/icon-192x192.png',
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  console.log('[Service Worker] installed');

  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => cache.addAll(cachedAssets))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [staticCacheName, runtimeCacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return caches.open(runtimeCacheName).then(cache => {
        return fetch(event.request).then(response => {
          // Put a copy of the response in the runtime cache.
          return cache.put(event.request, response.clone()).then(() => {
            limitCacheSize = (runtimeCacheName, maxCacheSize);    // limit runtimeCacheName size to maxCacheSize
            return response;
          });
        });
      });
    }).catch(() => {
        if (event.request.url.indexOf('.html') > -1){ // we are tyring to GET an html page 
          return caches.match('/offline.html');
        }
        else if (event.request.url.indexOf('/images/house-') > -1){
          return caches.match('/image/offline-image.png');
        }
      })
  );
});

let limitCacheSize = (name, size) =>{
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size){
        cache.delete(key[0]).then(limitCacheSize = (name, size));  // recursive call
      }
    })
  })
};