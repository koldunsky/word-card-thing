import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { en } from './locales/en'
import { ru } from './locales/ru'
import { getUserLocale } from 'get-user-locale'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: getUserLocale(),
  messages: {
    en,
    ru
  }
})
