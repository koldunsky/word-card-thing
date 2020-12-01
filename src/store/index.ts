import Vue from 'vue'
import Vuex from 'vuex'

import getGuid from '@/utils/getGuid'

import NavModule from './entities/nav'
import UserRelatedData from './entities/userRelated/data'
import UserRelatedSettings from './entities/userRelated/settings'
import { implementMigrations } from './implementMigrations'

Vue.use(Vuex)

const STORAGE_STATE = 'kolenki_state'

export const store = new Vuex.Store({
  state: {
    version: 1
  },
  modules: {
    NavModule,
    UserRelatedSettings,
    UserRelatedData
  },
  mutations: {
    initializeStore (state) {
      if (localStorage.getItem(STORAGE_STATE)) {
        let localState = JSON.parse(localStorage.getItem(STORAGE_STATE) as string)
        if (localState.version !== state.version) {
          localState = implementMigrations(state, localState)
        }

        this.replaceState({ ...state, ...localState })
      }
    }
  }
})

store.subscribe((mutation, state) => {
  localStorage.setItem(STORAGE_STATE, JSON.stringify(state))
})
