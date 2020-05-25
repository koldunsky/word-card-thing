import get from 'lodash/get'

function isStandaloneCheck (): boolean {
  return get(window, 'navigator.standalone', false)
}

export const isStandalone = isStandaloneCheck()
