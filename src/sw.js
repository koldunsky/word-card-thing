// This is the code piece that GenerateSW mode can't provide for us.
// This code listens for the user's confirmation to update the app.

workbox.core.setCacheNameDetails({ prefix: 'word-card-thing' })

self.addEventListener('message', (event) => {
  console.info('self.addEventListener(\'message\'', event)
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
    console.info('self.skipWaiting() 1')
  }
  if (!e.data) {
    return
  }

  switch (event.data) {
    case 'skipWaiting':
      self.skipWaiting()
      console.info('self.skipWaiting() 2')
      break
    default:
      // NOOP
      break
  }
})

self.addEventListener('message', (e) => {
})
console.info(self)
/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
