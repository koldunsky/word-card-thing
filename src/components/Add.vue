<template>
  <div class="container">
    <label>Word<br/>
      <input v-model="word"/>
    </label>
    <label>Translation<br/>
      <input v-model="translation"/>
    </label>
    <br/>
    <button @click="addWord">Add</button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Input from './Input/index.vue'
  import {
    Mutation
  } from 'vuex-class'

  @Component({
    components: {
      Input
    }
  })
  export default class AddView extends Vue {
    word: string = '';
    translation: string = '';

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

  label {
    margin-bottom: 20px;
  }
</style>
