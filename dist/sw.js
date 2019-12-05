importScripts('/cache-polyfill.js');


self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('localhost').then(function (cache) {
            return cache.addAll([
                "bundle.js",
                "index.html",
                "css/main.css",
                "img/favicon.ico"
            ]);
        })
    );
});

self.addEventListener("fetch", function (event) {
    console.log(event.request.url);

    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});