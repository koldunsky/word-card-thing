workbox.core.setCacheNameDetails({ prefix: "kolenki" });

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});


console.log('111111');
// Will print 'my-app-install-time-v1'
console.log(workbox.core.cacheNames.precache);

// Will print 'my-app-run-time-v1'
console.log(workbox.core.cacheNames.runtime);
//
self.addEventListener('fetch', function(event) {
  console.log(event);
  caches.open(workbox.core.cacheNames.precache).then(function(cache) {
    console.log('cache:', cache)
    cache.match(event.request).then(function(response) {
      console.log('response:', response)
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
