import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

@Module({
  namespaced: true
})

class UserRelatedSettings extends VuexModule {
  public theme: TTheme = null
  public isDrillTranslationInsteadWord: boolean = false

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
  toggleTranslationFlow (state) {
    state.isDrillTranslationInsteadWord = !state.isDrillTranslationInsteadWord
  }
}

export default UserRelatedSettings
