import Vue from 'vue'
import Vuex from 'vuex'
import getGuid from '@/utils/getGuid'

Vue.use(Vuex)

interface IWordSetter {
  word: string;
  translation: string;
}

interface IWord {
  id: string;
  word: string;
  translation: string;
}

const STORAGE_STATE = 'lsd_state'

const store = new Vuex.Store({
  state: {
    words: [] as Array<IWord>,
    currentWord: {
      id: '',
      word: '',
      translation: ''
    } as IWord
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
    setRandomWordAsCurrent (state) {
      const getIndex = () => Math.round(Math.random() * (state.words.length - 1))
      let randomId = getIndex()
      while (state.words[randomId].id === state.currentWord.id) {
        randomId = getIndex()
      }

      state.currentWord = state.words[randomId]
    }
  },
  actions: {
  },
  modules: {
  }
})
store.subscribe((mutation, state) => {
  localStorage.setItem(STORAGE_STATE, JSON.stringify(state))
})

export default store
