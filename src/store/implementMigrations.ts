import assign from 'lodash/assign'

const importAllMigrations = () => {
  const migrations = {}

  function doIt (r) {
    r.keys().forEach((key) => { // key === "./0-1.ts"
      const fileName = key.split('/')[1] // fileName === "0-1.ts"
      const [name] = fileName.split('.') // name === "0-1"
      const path = r(key)
      migrations[name] = r(key)
    })
  }
  doIt(require.context('./migrations/', false, /\.ts$/))

  return migrations
}

export const implementMigrations = (baseState, localState) => {
  const migrations = importAllMigrations()

  if (typeof localState.version === 'undefined') {
    localState = migrations[0].default(localState)
  }

  while (baseState.version > localState.version) {
    const v = localState.version
    localState = migrations[`${v}-${v + 1}`].default(localState)
  }

  return localState
}
