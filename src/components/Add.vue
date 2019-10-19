<template>
  <form class="container" @submit.prevent="addWord">
    <div v-if="words.length < 3" class="notification">
      <span v-if="words.length === 0">Add 3 words</span>
      <span v-if="words.length > 0">Add {{ 3 - words.length}} more</span>
    </div>
    <label>Word<br/>
      <input v-model="word"/>
    </label>
    <label>Translation<br/>
      <input v-model="translation"/>
    </label>
    <br/>
    <button type="submit">Add</button>
  </form>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Input from './Input/index.vue'
  import {
    Mutation,
    State
  } from 'vuex-class'

  @Component({
    components: {
      Input
    }
  })
  export default class AddView extends Vue {
    word: string = '';
    translation: string = '';
    @State('words') words: any

    @Mutation('addWord') addWordToStore: any

    addWord () {
      const { word, translation } = this
      this.addWordToStore({ word, translation })
      this.resetForm()
    }

    resetForm () {
      this.word = ''
      this.translation = ''
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

  .notification {
    font-style: italic;
    margin-bottom: 40px;
  }

  label {
    margin-bottom: 20px;
  }
</style>
