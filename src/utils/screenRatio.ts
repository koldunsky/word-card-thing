export function getScreenRatio (): number {
  try {
    return window.innerHeight / window.innerWidth
  } catch (e) {
    console.error(e)
  }
}

export const screenRatio = getScreenRatio()
