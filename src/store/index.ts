import Vue from 'vue'
import Vuex from 'vuex'

import remove from 'lodash/remove'
import each from 'lodash/each'
import defaultsDeep from 'lodash/defaultsDeep'
import getGuid from '@/utils/getGuid'

import NavModule from '../entities/nav'
import UserRelatedSettings from '../entities/userRelated/settings'

Vue.use(Vuex)

interface IWordSetter {
  word: string;
  translation: string;
}

export interface IWord {
  id: string;
  word: string;
  translation: string;
}

const STORAGE_STATE = 'kolenki_state'

const store = new Vuex.Store({
  modules: {
    NavModule,
    UserRelatedSettings
  },
  state: {
    words: [] as Array<IWord>,
    //   new Array(25).fill('').map((item, i) => ({
    //   id: `ttt_${i}`,
    //   word: `www_${i}`,
    //   translation: 'ttt_' + String(Date.now() * Math.random())
    // })) as Array<IWord>,
    currentWord: {
      id: '',
      word: '',
      translation: ''
    } as IWord
  },
  actions: {
    deleteWord ({ commit, state }, id) {
      return new Promise((resolve) => {
        // @ts-ignore
        const foundWords: IWord = state.words.find((word: IWord) => word.id === id)
        const reallyDelete = confirm(`Delete ${foundWords.word} (${foundWords.translation})?`)

        if (reallyDelete) {
          commit('deleteWordWithoutConfirmation', id)
          if (id === state.currentWord.id) {
            commit('setRandomWordAsCurrent')
          }
          return resolve()
        }
        throw Error(`Word removing cancelled (${foundWords.word}|${foundWords.translation})`)
      })
    }
  },
  mutations: {
    initializeStore (state) {
      const OLD_SHITTY_STATE_NAME = 'lsd_state'
      const oldShittyStateThatIRenamed = localStorage.getItem(OLD_SHITTY_STATE_NAME)

      if (oldShittyStateThatIRenamed) {
        localStorage.setItem(STORAGE_STATE, oldShittyStateThatIRenamed)
        localStorage.removeItem(OLD_SHITTY_STATE_NAME)
      }

      if (localStorage.getItem(STORAGE_STATE)) {
        const localState = JSON.parse(localStorage.getItem(STORAGE_STATE) as string)
        const onlyUserRelatedLocalState = {}

        each(localState, (value, name) => {
          if (name.includes('UserRelated')) {
            onlyUserRelatedLocalState[name] = value
          }
        })
        console.info('NavModule', NavModule)
        console.info('state', state)
        console.info('localState', localState)
        console.info('onlyUserRelatedLocalState', onlyUserRelatedLocalState)

        this.replaceState({
          ...(typeof state === 'object' ? state : {}),
          ...(typeof onlyUserRelatedLocalState === 'object' ? onlyUserRelatedLocalState : {})
        })
      }
    },
    addWord (state, payload: IWordSetter) {
      state.words.push({
        id: getGuid(),
        ...payload
      } as IWord)
    },
    deleteWordWithoutConfirmation (state, id: string) {
      let words = [...state.words]

      remove(words, (word: IWord) => word.id === id)
      state.words = words
    },
    setRandomWordAsCurrent (state) {
      if (!state.words.length) {
        return false
      }
      const getIndex = () => Math.round(Math.random() * (state.words.length - 1))
      let randomId = getIndex()
      while (state.words[randomId].id === state.currentWord.id) {
        randomId = getIndex()
      }

      state.currentWord = state.words[randomId]
    }
  }
})

store.subscribe((mutation, state) => {
  localStorage.setItem(STORAGE_STATE, JSON.stringify(state))
})

export default store
