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
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class App extends Vue {}
</script>

<style lang="scss">
  body {
    font-family: 'Fira Sans Condensed', sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    overflow-scrolling: touch;
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  input {
    font-size: 16px;
    padding: 10px;
  }

  button {
    padding: 10px 20px;
  }

  .nav {
    display: flex;
    justify-content: center;
    align-items: stretch;
    margin-bottom: 40px;
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
