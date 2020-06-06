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
    <button
      class="theme-switcher"
      @click="switchTheme"
    >
      change theme
    </button>
    <div
      class="scene"
    >
      <div
        class="scene__inner"
        :style="{
          transform: `translateX(${currentPageIndex * -33.33333}%)`
        }"
      >
        <Add/>
        <Drill/>
        <List/>
      </div>
    </div>
    <Nav :pages="pages"/>
  </div>
</template>

<script lang="ts">
  import { State, namespace } from 'vuex-class'
  import Add from './components/Add/index.vue'
  import Drill from './components/Drill/index.vue'
  import List from './components/List/index.vue'
  import { Component, Vue } from 'vue-property-decorator'
  import UpdateChecker from './components/UpdateChecker/index.vue'
  import InstallPrompt from './components/InstallPrompt/index.vue'
  import Nav from './components/Nav/index.vue'
  import { isIphoneRoundedScreen } from '@/utils/isIphoneRoundedScreen'
  import { TPageName } from './types'

  const DARK_THEME_ID: string = 'dark-mode'
  const LIGHT_THEME_ID: string = 'light-mode'

  const NavModule = namespace('NavModule')

  @Component({
    components: {
      UpdateChecker,
      InstallPrompt,
      Add,
      Drill,
      List,
      Nav
    }
  })
  export default class App extends Vue {
    @State('words') words: any
    isDarkMode: boolean = null;

    @NavModule.State
    pages: Array<TPageName>

    @NavModule.State
    currentPage: TPageName

    @NavModule.Getter
    currentPageIndex: number

    @NavModule.Action
    navigateTo: any

    switchTheme () {
      this.setAndUpdateTheme(!this.isDarkMode)
    }

    setAndUpdateTheme (dark?: boolean) {
      this.isDarkMode = dark
      this.updateTheme(dark)
    }

    updateTheme (dark?: boolean) {
      const themes: Array<string> = [LIGHT_THEME_ID, DARK_THEME_ID]
      const current = dark ? themes.pop() : themes.shift()
      const html = document.querySelector('html')
      html.classList.remove(current)
      html.classList.add(themes[0])
    }

    beforeMount () {
      if (this.words.length > 2) {
        this.navigateTo('drill')
      }

      if (isIphoneRoundedScreen) {
        document.querySelector('html').classList.add('rounded-screen')
      }

      const darkThemePreferred = window.matchMedia('')
      if (darkThemePreferred) {
        this.setAndUpdateTheme(true)
      } else {
        this.setAndUpdateTheme()
      }
    }
  }
</script>
<style src="./assets/style/index.scss" lang="scss"></style>
<style src="./assets/fonts/FiraSansCondensed/stylesheet.scss" lang="scss"></style>
