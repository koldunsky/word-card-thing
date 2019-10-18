<template>
  <div class="container">
    <div class="word">
      {{this.$store.state.currentWord.word}}
    </div>
    <div
      v-if="answer"
      class="answer"
    >
      {{answer}}
    </div>
    <input
      v-else
      @input="onInputChange"
      v-model="value"
      type="text"
    />
    <br>
    <br>
    <button
      class="button"
      @click="skipWord"
    >
      Skip
    </button>
    <button
      class="button"
      v-if="!answer"
      @click="showAnswer"
    >
      Show answer
    </button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import {
    Mutation
  } from 'vuex-class'

  @Component
  export default class Drill extends Vue {
    @Mutation('setRandomWordAsCurrent') setRandomWordAsCurrent: any
    value: string = ''
    answer: string = ''

    onInputChange (e: any) {
      const {
        value
      } = e.target
      const {
        translation
      } = this.$store.state.currentWord

      if (value.toLowerCase() === translation.toLowerCase()) {
        this.skipWord()
      }
    }

    showAnswer () {
      this.answer = this.$store.state.currentWord.translation
    }

    skipWord () {
      this.setRandomWordAsCurrent()
      this.value = ''
      this.answer = ''
    }
  }
</script>
<style src="./index.scss" lang="scss"></style>
