const CACHE_NAME = 'v2';

const cacheFirstNetwork = ['slow-2g', '2g'];
const cacheFirstUrl = ['/about', '/singleplayer'];
const assets = [...global.serviceWorkerOption.assets.map(asset => '/dist' + asset), '/', '/favicon.ico', ...cacheFirstUrl];

self.addEventListener('install', event => {
    console.log(assets);
    event.waitUntil(
        global.caches
            .open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(assets);
            })
            .then(() => {
                console.log('Added to cache: ', assets);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        global.caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName.indexOf(CACHE_NAME) === 0) {
                        return null;
                    }

                    return global.caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') {
        return;
    }

    const url = new URL(event.request.url);
    console.log(url);
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
        return;
    }

    if (url.pathname.indexOf('/api') !== -1 || url.pathname.indexOf('/storage') !== -1) {
        return;
    }

    if (global.navigator.connection !== undefined &&
        global.navigator.connection.effectiveType !== undefined &&
        cacheFirstNetwork.includes(global.navigator.connection.effectiveType)) {

        console.log('Connection:' + global.navigator.connection.effectiveType);
        event.respondWith(
            global.caches.match(url.pathname)
                .catch(() => fetch(event.request))
        );
        event.waitUntil(
            update(event.request)
        );
    } else {
        event.respondWith(
            update(event.request)
                .catch(() => global.caches.match(url.pathname))
        );
    }
});

function update (request) {
    return fetch(request)
        .then((resp) => {
            if (resp.ok) {
                return global.caches.open(CACHE_NAME)
                    .then((cache) => {
                        console.log('update cache');
                        cache.put(request, resp.clone());
                        return resp;
                    });
            }
        });
}
