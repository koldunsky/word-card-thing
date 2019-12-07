<template>
  <div id="app">
    <UpdateChecker/>
    <div
      class="scene"
    >
      <div
        class="scene__inner"
        :style="{
          transform: `translateX(${currentIndex * -33.33333}%)`
        }"
      >
        <Add/>
        <Drill/>
        <List/>
      </div>
    </div>
    <div
      id="nav"
      class="nav"
      :class="{
        'nav_visible': $store.state.words.length >= 3
      }"
    >
      <div
        v-for="(name, index) in ['add', 'drill', 'list']"
        :key="name"
        class="nav__item"
        :class="{
          'nav__item_active': currentIndex === index
        }"
        @click="() => currentIndex = index"
      >
        <BrainIcon
          v-if="name === 'drill'"
          :class="`nav__item-icon nav__item-icon_${name}`"
        />
        <span
          v-else
          :class="`nav__item-icon nav__item-icon_${name}`"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { State } from 'vuex-class'
  import Add from './pages/Add/index.vue'
  import Drill from './pages/Drill/index.vue'
  import List from './pages/List/index.vue'
  import { Component, Vue } from 'vue-property-decorator'
  import UpdateChecker from './components/updateChecker/index.vue'
  import BrainIcon from './assets/icons/brain.svg'

  @Component({
    components: {
      UpdateChecker,
      Add,
      Drill,
      List,
      BrainIcon
    }
  })
  export default class App extends Vue {
    @State('words') words: any

    currentIndex: number = 0;

    beforeMount () {
      if (this.words.length > 2) {
        this.currentIndex = 1
      }
    }

    mounted () {
      console.info(this.words)
      document.body.addEventListener('scroll', (e) => {
        alert('scroll')
      })
    }
  }
</script>
<style src="./assets/style/index.scss" lang="scss"></style>
