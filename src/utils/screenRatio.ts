export function getScreenRatio (): number {
  try {
    return window.innerWidth / window.innerWidth
  } catch (e) {
    console.error(e)
  }
}

export const screenRatio = getScreenRatio()
