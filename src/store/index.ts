import Vue from 'vue'
import Vuex from 'vuex'
import remove from 'lodash/remove'
import getGuid from '@/utils/getGuid'

import NavModule from '../entities/nav'

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
    NavModule
  },
  state: {
    words: new Array(15).fill('').map((item, i) => ({
      id: `ttt_${i}`,
      word: `22`,
      translation: '22'
    })) as Array<IWord>,
    isDrillTranslationInsteadWord: false,
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
        this.replaceState({
          ...(typeof state === 'object' ? state : {}),
          ...(typeof localState === 'object' ? localState : {})
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
    },
    toggleTranslationFlow (state) {
      state.isDrillTranslationInsteadWord = !state.isDrillTranslationInsteadWord
    }
  }
})

store.subscribe((mutation, state) => {
  localStorage.setItem(STORAGE_STATE, JSON.stringify(state))
})

export default store
