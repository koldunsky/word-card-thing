<template>
  <div id="app">
    <div id="nav"
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
        Drill (yeah, bitch!)
      </router-link>
      <router-link
        class="router-link"
        to="/words-list"
      >
        List
      </router-link>
    </div>
    <router-view/>
    <UpdateChecker />
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

<style lang="scss">
  html,
  body {
    position: fixed;
    overflow: hidden;
    font-family: 'Fira Sans Condensed', sans-serif;
    padding: 0;
    margin: 0;
  }

  #app {
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch; /* enables “momentum” (smooth) scrolling */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-bottom: 10px;
  }

  input {
    font-size: 16px;
    padding: 10px;
    border: 1px solid #cdc;
    box-shadow: none !important;
    font-family: inherit;
    border-radius: 0 !important;

    &:hover,
    &:focus,
    &:active {
      outline-color: coral;
    }
  }

  button {
    padding: 10px 20px;
  }

  .nav {
    display: flex;
    justify-content: center;
    align-items: stretch;
    overflow: hidden;
    transition: .3s ease all;
    max-height: 0;
    background: darkslategray;

    &_visible {
      max-height: 100px;
    }
  }

  .router-link {
    color: white;
    text-decoration: none;
    flex: 1 1 50%;
    padding: 20px 0;
    white-space: nowrap;
    font-size: 1.2em;
  }

  .router-link-exact-active {
    border-bottom: 3px solid coral;
    color: lighten(coral, 15%);
  }
</style>
<style lang="scss" src="./assets/style/index.scss" ></style>
