<template>
  <div
    id="app"
    class="app"
    :class="{
      'app_has-3-words': words.length >= 3
    }"
  >
    <UpdateChecker/>
    <InstallPrompt/>
    <div
      class="scene"
    >
      <div
        v-if="words.length > 0"
        class="scene__inner"
        :style="{
          width: `${sceneInnerWidth}%`,
          transform: `translateX(${scenePosition}%)`
        }"
      >
        <Add />
        <Drill v-if="words.length > 2" />
        <List  v-if="words.length > 2" />
        <Settings v-if="words.length > 2" />
      </div>
      <IntroScreen />
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import IntroScreen from './components/IntroScreen/index.vue'
  import Add from './components/Add/index.vue'
  import Drill from './components/Drill/index.vue'
  import List from './components/List/index.vue'
  import Settings from './components/Settings/index.vue'
  import UpdateChecker from './components/UpdateChecker/index.vue'
  import InstallPrompt from './components/InstallPrompt/index.vue'
  import Nav from './components/Nav/index.vue'
  import { isIphoneRoundedScreen } from '@/utils/isIphoneRoundedScreen'

  const DARK_THEME_ID: string = 'dark-mode'
  const LIGHT_THEME_ID: string = 'light-mode'

  const NavModule = namespace('NavModule')
  const UserRelatedSettings = namespace('UserRelatedSettings')
  const UserRelatedData = namespace('UserRelatedData')

  @Component({
    components: {
      UpdateChecker,
      InstallPrompt,
      IntroScreen,
      Add,
      Drill,
      List,
      Settings,
      Nav
    }
  })
  export default class App extends Vue {
    unsubscribe: any

    @NavModule.State
    pages: Array<TPageName>

    @UserRelatedSettings.State
    theme

    @UserRelatedData.State
    introScreenPassed

    @NavModule.Getter
    currentPageIndex: number

    @UserRelatedSettings.Getter
    computedTheme: TTheme

    @UserRelatedSettings.Mutation
    changeTheme

    @UserRelatedData.State
    words

    setTheme (theme: TTheme) {
      const html = document.querySelector('html')
      const themes: Array<string> = [LIGHT_THEME_ID, DARK_THEME_ID]

      if (!theme) {
        themes.forEach((themeId) => html.classList.remove(themeId))
        return
      }

      const current = theme === 'dark' ? themes.shift() : themes.pop()
      html.classList.remove(current)
      html.classList.add(themes[0])
    }

    get pagesLength () {
      return this.words.length < 3 ? 1 : this.pages.length
    }

    get sceneInnerWidth () {
      return 100 * this.pagesLength
    }

    get scenePosition () {
      return this.currentPageIndex * (100 / (this.pagesLength)) * -1
    }

    beforeMount () {
      if (isIphoneRoundedScreen) {
        document.querySelector('html').classList.add('rounded-screen')
      }

      this.setTheme(this.theme)
    }

    created () {
      this.unsubscribe = this.$store.subscribe(({ type }) => {
        if (type === 'UserRelatedSettings/changeTheme') {
          this.setTheme(this.theme)
        }
      })
    }

    beforeDestroy () {
      this.unsubscribe()
    }
  }
</script>
<style src="./assets/style/index.scss" lang="scss"></style>
<style src="./assets/fonts/FiraSansCondensed/stylesheet.scss" lang="scss"></style>
