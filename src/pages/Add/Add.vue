<template>
  <form
    ref="form"
    class="container"
    @submit.prevent="addWord"
  >
    <div v-if="words.length < 3" class="notification">
      <span v-if="words.length === 0">Add 3 words</span>
      <span v-if="words.length > 0">Add {{ 3 - words.length}} more</span>
    </div>
    <label>Word<br />
      2
      <input v-model="word" />
    </label>
    <label>Translation<br />
      <input v-model="translation" />
    </label>
    <br />
    <button type="submit">Add</button>
  </form>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Input from '@/components/Input/index.vue'
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
    $refs!: {
      form: HTMLFormElement
    }
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
      const form: Element = this.$refs.form
      const firstInput: HTMLInputElement = form.querySelector('input')
      firstInput.focus()
    }
  }
</script>
<style src="./index.scss" scoped lang="scss"></style>
