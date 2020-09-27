import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import set from 'lodash/set'
import each from 'lodash/each'

export default (localState) => {
  const onlyUserRelatedLocalState = {}

  each(localState, (value, name) => {
    if (name.includes('UserRelated')) {
      onlyUserRelatedLocalState[name] = value
    }
  })

  const oldStateWords = get(localState, 'words', [])
  if (!isEmpty(oldStateWords)) {
    set(onlyUserRelatedLocalState, 'UserRelatedData.words', oldStateWords)
  }

  if (!get(onlyUserRelatedLocalState, 'UserRelatedData.currentWord', false)) {
    set(onlyUserRelatedLocalState, 'UserRelatedData.currentWord', {
      id: '',
      word: '',
      translation: ''
    })
  }

  onlyUserRelatedLocalState['version'] = 0

  return onlyUserRelatedLocalState
}
