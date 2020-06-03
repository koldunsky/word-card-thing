import get from 'lodash/get'

function isIosCheck (): boolean {
  const userAgent = window.navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(userAgent)
}

export const isIos = isIosCheck()
