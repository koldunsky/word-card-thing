<template>
  <div class="container">
    <label>Word<br/>
      <input v-model="word"/>
    </label>
    <label>Translation<br/>
      <input v-model="translation"/>
    </label>
    <button @click="addWord">Add</button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import {
    Mutation
  } from 'vuex-class'

  @Component
  export default class HelloWorld extends Vue {
    word: string = '';
    translation: string = '';

    @Mutation('addWord') addWordToStore: any
    addWord () {
      const { word, translation } = this
      this.addWordToStore({ word, translation })
    }
  }
</script>
<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
