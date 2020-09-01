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

export const implementMigrations = (baseState, userState) => {
  const migrations = importAllMigrations()

  if (typeof userState.version === 'undefined') {
    userState = migrations[0].default(userState)
  }

  while (baseState.version > userState.version) {
    const v = userState.version
    userState = migrations[`${v}-${v + 1}`].default(userState)
  }

  return userState
}
