<template>
  <div id="app">
    <div
      id="nav"
      class="nav"
      :class="{
        'nav_visible': $store.state.words.length >= 3
      }"
    >
      <router-link
        class="router-link"
        to="/"
      >
        Add
      </router-link>
      <router-link
        class="router-link"
        to="/drill"
      >
        Drill
      </router-link>
      <router-link
        class="router-link"
        to="/list"
      >
        List
      </router-link>
    </div>
    <UpdateChecker />
    <router-view/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import UpdateChecker from './components/updateChecker/index.vue'

  @Component({
    components: {
      UpdateChecker
    }
  })
  export default class App extends Vue {}
</script>

<style src="./assets/style/index.scss" lang="scss"></style>
