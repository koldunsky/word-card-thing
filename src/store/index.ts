import Vue from 'vue'
import Vuex from 'vuex'
import remove from 'lodash/remove'
import getGuid from '@/utils/getGuid'

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

const STORAGE_STATE = 'lsd_state'

const store = new Vuex.Store({
  state: {
    words: [] as Array<IWord>,
    isDrillTranslationInsteadWord: false,
    currentWord: {
      id: '',
      word: '',
      translation: ''
    } as IWord
  },
  actions: {
    deleteWord ({ commit, state }, id) {
      // @ts-ignore
      const foundWords: IWord = state.words.find((word: IWord) => word.id === id)

      if (!foundWords) {
        return false
      }

      const reallyDelete = confirm(`Delete ${foundWords.word} (${foundWords.translation})?`)

      if (reallyDelete) {
        commit('deleteWordWithoutConfirmation', id)
        return true
      }
    }
  },
  mutations: {
    initializeStore (state) {
      // Check if the ID exists
      if (localStorage.getItem(STORAGE_STATE)) {
        // Replace the state object with the stored item
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
  },
  modules: {
  }
})
store.subscribe((mutation, state) => {
  localStorage.setItem(STORAGE_STATE, JSON.stringify(state))
})

export default store
