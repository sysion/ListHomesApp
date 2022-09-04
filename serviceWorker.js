const cacheName = 'listHomesApp_cache_v1';
const RUNTIME = 'runtime';
const cachedAssets = [
  './',
  './index.html',
  './offline.html',
  './serviceWorker.js',
  './js/index.js',
  './package.json',
  './manifest.json',
  './css/index.css',
  './css/reset.css',
  './css/fonts/roboto-slab.css',
  './css/fonts/poppins.css',
  './css/fonts/fontawesome-all.css',
  './css/webfonts/fa-regular-400.ttf',
  './css/webfonts/fa-brands-400.woff',
  './css/webfonts/fa-solid-900.svg',
  './css/webfonts/fa-brands-400.eot',
  './css/webfonts/fa-brands-400.ttf',
  './css/webfonts/fa-solid-900.eot',
  './css/webfonts/fa-solid-900.woff2',
  './css/webfonts/fa-brands-400.woff2',
  './css/webfonts/OFL.txt',
  './css/webfonts/fa-regular-400.woff2',
  './css/webfonts/fa-brands-400.svg',
  './css/webfonts/fa-regular-400.eot',
  './css/webfonts/fa-solid-900.ttf',
  './css/webfonts/fa-regular-400.woff',
  './css/webfonts/fa-solid-900.woff',
  './css/webfonts/fa-regular-400.svg',
  './css/webfonts/Roboto Slab/RobotoSlab-Bold.ttf',
  './css/webfonts/Roboto Slab/RobotoSlab-Black.ttf',
  './css/webfonts/Roboto Slab/RobotoSlab-SemiBold.ttf',
  './css/webfonts/Roboto Slab/RobotoSlab-Regular.ttf',
  './css/webfonts/Roboto Slab/RobotoSlab-Thin.ttf',
  './css/webfonts/Roboto Slab/RobotoSlab-ExtraBold.ttf',
  './css/webfonts/Roboto Slab/RobotoSlab-ExtraLight.ttf',
  './css/webfonts/Roboto Slab/RobotoSlab-Light.ttf',
  './css/webfonts/Roboto Slab/RobotoSlab-Medium.ttf',
  './css/webfonts/Poppins/Poppins-Regular.ttf',
  './css/webfonts/Poppins/Poppins-Black.ttf',
  './css/webfonts/Poppins/Poppins-Medium.ttf',
  './css/webfonts/Poppins/Poppins-SemiBold.ttf',
  './css/webfonts/Poppins/Poppins-Thin.ttf',
  './css/webfonts/Poppins/Poppins-ExtraBold.ttf',
  './css/webfonts/Poppins/Poppins-SemiBoldItalic.ttf',
  './css/webfonts/Poppins/Poppins-MediumItalic.ttf',
  './css/webfonts/Poppins/Poppins-ExtraLightItalic.ttf',
  './css/webfonts/Poppins/Poppins-LightItalic.ttf',
  './css/webfonts/Poppins/Poppins-Light.ttf',
  './css/webfonts/Poppins/Poppins-ExtraBoldItalic.ttf',
  './css/webfonts/Poppins/Poppins-BlackItalic.ttf',
  './css/webfonts/Poppins/Poppins-Bold.ttf',
  './css/webfonts/Poppins/Poppins-ExtraLight.ttf',
  './css/webfonts/Poppins/Poppins-BoldItalic.ttf',
  './css/webfonts/Poppins/Poppins-ThinItalic.ttf',
  './css/webfonts/Poppins/Poppins-Italic.ttf',
  './images/favicon.ico',
  './images/todo2-round.png',
  './icons/icon-512x512.png',
  './icons/icon-256x256.png',
  './icons/icon-384x384.png',
  './icons/icon-192x192.png'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cachedAssets)
      .then(cache => cache.addAll(cachedAssets))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [cachedAssets, RUNTIME];
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
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});