const CACHE_NAME = "v1.0.1";

const cacheFirstUrl = ['/about', '/singleplayer'];
const assets = [...global.serviceWorkerOption.assets.map( asset => "/dist" + asset), '/', '/favicon.ico', ...cacheFirstUrl];


self.addEventListener('install', event => {
    console.log(assets);
    event.waitUntil(
        global.caches
            .open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(assets)
            })
            .then(() => {
                console.log("Added to cache: ", assets)
            })
            .catch((err) => {
                console.log(err);
                throw err
            })
    )
});

self.addEventListener('activate', event => {
    event.waitUntil(
        global.caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName.indexOf(CACHE_NAME) === 0) {
                        return null
                    }

                    return global.caches.delete(cacheName)
                })
            )
        })
    )
});

self.addEventListener('fetch', event => {

    if (event.request.method !== "GET") {
        return;
    }

    const url = new URL(event.request.url);
    console.log(url);
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin'){
        return;
    }

    if (url.pathname.indexOf('/api') !== -1 || url.pathname.indexOf('/storage') !== -1) {
        return;
    }

    if (cacheFirstUrl.findIndex((path) => url.pathname === path) !== -1) {
        event.respondWith(
            global.caches.match(url.pathname).then((resp) => {
                return resp || fetch(event.request)
                    .then((response) => {
                        return caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, response.clone());
                                return response;
                            })
                })
            })
        )
    } else {
        event.respondWith(
            fetch(event.request)
                .then((resp) => {
                    if (resp.ok) {
                        return global.caches.open(CACHE_NAME)
                            .then((cache) => {
                                console.log("update cache");
                                cache.put(event.request, resp.clone());
                                return resp;
                            });
                    }
                })
                .catch(() => global.caches.match(url.pathname))
        )
    }
});