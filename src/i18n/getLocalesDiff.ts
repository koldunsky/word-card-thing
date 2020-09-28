import each from 'lodash/each'
import set from 'lodash/set'
import get from 'lodash/get'
import { en } from './locales/en'
import { ru } from './locales/ru'

type TLocaleId = 'en'| 'ru';

const localesMap = {
  en,
  ru
}

const trerere = (mainLocaleTree, localeId, mismatches: string[], path?: string) => {
  const mainTarget = get(mainLocaleTree, path, mainLocaleTree)
  each(mainTarget, (translationString, translationKey) => {
    const oLocaleEntity = get(localesMap, [localeId, path, translationKey].filter(Boolean))

    if (oLocaleEntity) {
      if (typeof oLocaleEntity !== 'string') {
        const pathNew = [path, translationKey].filter(Boolean).join('.')
        trerere(mainLocaleTree, localeId, mismatches, pathNew)
      }
    } else {
      mismatches.push(path + '.' + translationKey)
    }
  })
}

const getLocalesDiff = (mainLocale: TLocaleId, otherLocales: [TLocaleId]) => {
  const mismatches = {}

  each(otherLocales, (localeId) => {
    if (!mismatches[localeId]) {
      mismatches[localeId] = []
    }

    trerere(localesMap[mainLocale], localeId, mismatches[localeId])
  })

  console.info(mismatches)
}

export const doLocaleCheck = () => {
  getLocalesDiff('en', [
    'ru'
  ])
}
