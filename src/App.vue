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
    {{computedTheme}}
<!--    <button-->
<!--      class="theme-switcher"-->
<!--      @click="switchTheme"-->
<!--    >-->
<!--      change theme-->
<!--    </button>-->
    <div
      class="scene"
    >
      <div
        class="scene__inner"
        :style="{
          transform: `translateX(${scenePosition}%)`
        }"
      >
        <Add/>
        <Settings/>
        <Drill/>
        <List/>
      </div>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { State, namespace } from 'vuex-class'
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
  const ThemeModule = namespace('ThemeModule')

  @Component({
    components: {
      UpdateChecker,
      InstallPrompt,
      Add,
      Drill,
      List,
      Settings,
      Nav
    }
  })
  export default class App extends Vue {
    unsubscribe: any

    @State('words') words: any

    @NavModule.State
    pages: Array<TPageName>

    @NavModule.Getter
    currentPageIndex: number

    @ThemeModule.Getter
    computedTheme: TTheme

    @ThemeModule.Mutation
    changeTheme

    switchTheme () {
      this.changeTheme(this.computedTheme === 'dark' ? 'light' : 'dark')
    }

    setTheme (theme: TTheme) {
      const themes: Array<string> = [LIGHT_THEME_ID, DARK_THEME_ID]
      const current = theme === 'dark' ? themes.shift() : themes.pop()
      const html = document.querySelector('html')
      html.classList.remove(current)
      html.classList.add(themes[0])
    }

    get scenePosition () {
      return this.currentPageIndex * (100 / (this.pages.length - 1)) * -1
    }

    beforeMount () {
      if (isIphoneRoundedScreen) {
        document.querySelector('html').classList.add('rounded-screen')
      }

      this.setTheme(this.computedTheme)
    }

    created () {
      this.unsubscribe = this.$store.subscribe(({ type, payload }, state) => {
        if (type === 'ThemeModule/changeTheme') {
          console.info(state.ThemeModule.rawTheme)
          console.info(this.computedTheme)
          this.setTheme(this.computedTheme)
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
