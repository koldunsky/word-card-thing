import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

Vue.use(Vuex)

interface IStore {
  words: IWord[]
}

interface IWord {
  word: string;
  translation: string;
}

const store: StoreOptions<IStore> = new Vuex.Store({
  state: {
    words: [{
      word: '111',
      translation: '222'
    }]
  },
  mutations: {
    addWord (state, payload: IWord) {
      state.words.push(payload)
      console.info(state)
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
