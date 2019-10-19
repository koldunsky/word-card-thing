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
      :readonly="isReadOnly"
      v-else
      @input="onInputChange"
      v-model="value"
      type="text"
      :class="{
        'right-answer': isRightAnswer
      }"
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
    isReadOnly: boolean = false
    isRightAnswer: boolean = false

    onInputChange (e: any) {
      const {
        value
      } = e.target
      const {
        translation
      } = this.$store.state.currentWord

      if (value.toLowerCase() === translation.toLowerCase()) {
        this.isReadOnly = true
        this.isRightAnswer = true
        setTimeout(this.skipWord, 300)
      }
    }

    showAnswer () {
      this.answer = this.$store.state.currentWord.translation
    }

    skipWord () {
      this.setRandomWordAsCurrent()
      this.resetView()
    }

    resetView () {
      this.value = ''
      this.answer = ''
      this.isReadOnly = false
      this.isRightAnswer = false
    }
  }
</script>
<style src="./index.scss" lang="scss"></style>
