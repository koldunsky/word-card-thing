import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

interface IWord {
  word: string;
  translation: string;
}

export default new Vuex.Store({
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
