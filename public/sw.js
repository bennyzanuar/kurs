const PRECACHE = 'cache-v1';
const RUNTIME = 'runtime';

const PRECACHE_URLS = [
    './',
    './main.bundle.js',
    './vendor.bundle.js',
    './offline.html'
];

const OFFLINE_URL = '/offline.html';

function createCacheBustedRequest(url) {
    let request = new Request(url, {cache: 'reload'})
    if ('cache' in request) {
        return request;
    }

    let bustedUrl = new URL(url, self.location.href)
    bustedUrl.search += (bustedUrl.search ? '&' : '') + 'cachebust=' + Date.now()

    return new Request(bustedUrl)
}

self.addEventListener('install', e => {
    e.waitUntil(
        fetch(createCacheBustedRequest(OFFLINE_URL))
        .then(function(response) {
            caches.open(PRECACHE)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
            
        })
    );
});

self.addEventListener('activate', e => {
    const currentCaches = [PRECACHE, RUNTIME];
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        })
        .then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        })
        .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {    
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.open(RUNTIME)
            .then(function(cache) {
                return fetch(event.request)
                .then(function(fetchResponse) {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                })
            })
            .catch(error => {
                return caches.match(event.request)
                .then(function(response) {
                    if (typeof response == 'undefined') {
                        return caches.open(PRECACHE)
                        .then(function(cache) {
                            return cache.match(OFFLINE_URL);
                        });
                    }
                    return response
                })
            })
        );
    }
});
