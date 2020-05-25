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
  import { getScreenRatio } from '@/utils/screenRatio'
  import { TPageName } from './types'

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

    @NavModule.State
    pages: Array<TPageName>

    @NavModule.State
    currentPage: TPageName

    @NavModule.Getter
    currentPageIndex: number

    @NavModule.Action
    navigateTo: any

    beforeMount () {
      if (this.words.length > 2) {
        this.navigateTo('drill')
      }

      if (isIphoneRoundedScreen) {
        document.querySelector('html').classList.add('rounded-screen')
      }
    }
  }
</script>
<style src="./assets/style/index.scss" lang="scss"></style>
<style src="./assets/fonts/FiraSansCondensed/stylesheet.scss" lang="scss"></style>
