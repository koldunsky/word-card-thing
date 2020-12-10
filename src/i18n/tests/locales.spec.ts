import { doLocaleCheck } from '@/i18n/getLocalesDiff'

describe('Locales', () => {
  it('has no not-translated strings', () => {
    expect(doLocaleCheck()).toStrictEqual({})
  })
})
