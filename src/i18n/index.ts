import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { en } from './locales/en'
import { ru } from './locales/ru'
import { doLocaleCheck } from './getLocalesDiff'
// import { getUserLocale } from 'get-user-locale'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  // temporary use only en locale
  // locale: getUserLocale(),
  locale: 'en',
  messages: {
    en,
    ru
  }
})

doLocaleCheck()
