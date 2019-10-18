<template>
  <div id="app">
    <div id="nav" class="nav">
      <router-link to="/">Add</router-link>
      <router-link to="/drill">Drill (yeah, bitch!)</router-link>
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

    a {
      flex: 1 1 50%;
      padding: 20px;
    }
  }

  .router-link-exact-active {
    background: blanchedalmond;
  }

</style>
