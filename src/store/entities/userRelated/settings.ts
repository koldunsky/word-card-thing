import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

@Module({
  namespaced: true
})

class UserRelatedSettings extends VuexModule {
  public theme: TTheme = null
  public isDrillTranslationInsteadWord: boolean = false
  public locale: TLocale = null

  // Theme
  @Mutation
  changeTheme (theme: TTheme) {
    this.theme = theme
  }

  get computedTheme () {
    const systemThemeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const themeUnset = !this.theme

    if (themeUnset) {
      return systemThemeIsDark ? 'dark' : 'light'
    }

    return this.theme
  }

  // Word -> Translation
  @Mutation
  toggleTranslationFlow () {
    this.isDrillTranslationInsteadWord = !this.isDrillTranslationInsteadWord
  }

  // Locale
  @Mutation
  changeLocale (locale: TLocale) {
    this.locale = locale
  }
}

export default UserRelatedSettings
