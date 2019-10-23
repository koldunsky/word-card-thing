// This is the code piece that GenerateSW mode can't provide for us.
// This code listens for the user's confirmation to update the app.
self.addEventListener('message', (e) => {
  if (!e.data) {
    return
  }
  console.info("self.addEventListener('message'", e)

  switch (e.data) {
    case 'skipWaiting':
      self.skipWaiting()
      break
    default:
      // NOOP
      break
  }
})
console.info('sw.js:self', self)
workbox.clientsClaim()

// The precaching code provided by Workbox.
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
