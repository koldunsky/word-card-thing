workbox.core.setCacheNameDetails({ prefix: "kolenki" });

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});


console.log('111111');
console.log(workbox.core.cacheNames);
//
self.addEventListener('fetch', function(event) {
  console.log(event);
  caches.open(workbox.core.cacheNames.precache).then(function(cache) {
    console.log('cache:', cache)
    cache.match(event.request).then(function(response) {
      console.log('response:', response)
    })
  })

  caches.open(workbox.core.cacheNames.runtime).then(function(cache) {
    console.log('cache_кгтешьу:', cache)
    cache.match(event.request).then(function(response) {
      console.log('response_кгтешьу:', response)
    })
  })

  // event.respondWith(
  //   caches.open('mysite-dynamic').then(function(cache) {
  //     return cache.match(event.request).then(function(response) {
  //       var fetchPromise = fetch(event.request).then(function(networkResponse) {
  //         cache.put(event.request, networkResponse.clone());
  //         return networkResponse;
  //       })
  //       return response || fetchPromise;
  //     })
  //   })
  // );
});
/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
