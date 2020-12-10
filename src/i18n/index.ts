import Vue from 'vue'
import VueI18n from 'vue-i18n'
import get from 'lodash/get'
import { en } from './locales/en'
import { ru } from './locales/ru'
import { doLocaleCheck } from './getLocalesDiff'
import { getUserLocale } from 'get-user-locale'
import { store } from '../store'
import { STORAGE_STATE_NAME } from '../store/constants'

Vue.use(VueI18n)

const localeFromLocalhostStorage = get(JSON.parse(localStorage.getItem(STORAGE_STATE_NAME)), 'UserRelatedSettings.locale')

console.info(localeFromLocalhostStorage, getUserLocale())
console.info(STORAGE_STATE_NAME)
setTimeout(() => {
  console.info(STORAGE_STATE_NAME)
}, 1000)

export const i18n = new VueI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages: {
    en,
    ru
  }
})
