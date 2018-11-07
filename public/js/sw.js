const CACHE_NAME = new Date().toString();
const assets = [...global.serviceWorkerOption.assets.map( asset => "/dist" + asset), '/', '/favicon.ico', '/about','/profile'];

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
    const url = new URL(event.request.url);
    console.log(url);
    console.log(event.request);

    if (event.request.method !== "GET"){
        return;
    }


    event.respondWith(
        fetch(event.request).catch(() => global.caches.match(url.pathname))
    )
});