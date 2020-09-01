import get from 'lodash/get'
import set from 'lodash/set'
import assign from 'lodash/assign'

export default (localState) => {
  const words = get(localState, 'UserRelatedData.words', [])

  set(localState, 'UserRelatedData.introScreenPassed', words.length > 1)
  localState['version'] = 1

  return localState
}
