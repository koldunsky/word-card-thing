import Vue from 'vue'
import Vuex from 'vuex'

import remove from 'lodash/remove'
import each from 'lodash/each'
import set from 'lodash/set'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import getGuid from '@/utils/getGuid'

import NavModule from '../entities/nav'
import UserRelatedData from '../entities/userRelated/data'
import UserRelatedSettings from '../entities/userRelated/settings'

Vue.use(Vuex)

const STORAGE_STATE = 'kolenki_state'

const store = new Vuex.Store({
  modules: {
    NavModule,
    UserRelatedSettings,
    UserRelatedData
  },
  mutations: {
    initializeStore (state) {
      if (localStorage.getItem(STORAGE_STATE)) {
        const localState = JSON.parse(localStorage.getItem(STORAGE_STATE) as string)

        const onlyUserRelatedLocalState = {}
        console.info("get(localState, 'words', [])", get(localState, 'words', []))

        each(localState, (value, name) => {
          if (name.includes('UserRelated')) {
            onlyUserRelatedLocalState[name] = value
          }
        })

        // Migrations
        const oldStateWords = get(localState, 'words', [])
        if (!isEmpty(oldStateWords)) {
          set(onlyUserRelatedLocalState, 'UserRelatedData.words', oldStateWords)
        }

        this.replaceState({
          ...(typeof state === 'object' ? state : {}),
          ...(typeof onlyUserRelatedLocalState === 'object' ? onlyUserRelatedLocalState : {})
        })
      }
    }
  }
})

store.subscribe((mutation, state) => {
  localStorage.setItem(STORAGE_STATE, JSON.stringify(state))
})

export default store
