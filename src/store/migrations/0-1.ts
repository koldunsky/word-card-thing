import get from 'lodash/get'
import set from 'lodash/set'
import assign from 'lodash/assign'

export default (baseState, localState) => {
  const words = get(localState, 'UserRelatedData.words', [])
  set(localState, 'UserRelatedData.introScreenPassed', words.length > 1)

  return assign(baseState, localState, { version: 1 })
}
