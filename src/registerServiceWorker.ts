/* eslint-disable no-console */

import { register } from 'register-service-worker'

declare global {
  interface Window {
    workerState: any;
  }
}

window.workerState = []

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready (...args) {
      window.workerState.push(['ready', args])
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered (...args) {
      window.workerState.push(['regisred', args])
      console.log('Service worker has been registered.')
    },
    cached (...args) {
      window.workerState.push(['cached', args])
      console.log('Content has been cached for offline use.')
    },
    updatefound (...args) {
      window.workerState.push(['updatefound', args])
      console.log('New content is downloading.')
    },
    updated (...args) {
      window.workerState.push(['updated', args])
      console.log('New content is available; please refresh.')
    },
    offline (...args) {
      window.workerState.push(['offline', args])
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      window.workerState.push(['error', error])
      console.error('Error during service worker registration:', error)
    }
  })
}
