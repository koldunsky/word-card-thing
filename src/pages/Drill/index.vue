<template>
  <div class="container">
    <button class="switcher" @click="toggleTranslationFlow">
      <span v-if="isDrillTranslationInsteadWord">
        <b>T</b> &rarr; <span>W</span>
      </span>
      <span v-else>
        <b>W</b> &rarr; <span>T</span>
      </span>
    </button>
    <div
      class="word"
      :class="{
        'word_medium': word.length > 10,
        'word_small': word.length > 13
      }"
    >
      {{word}}
    </div>
    <div
      v-if="isShowAnswer"
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
    <Button
      class="button"
      @click="skipWord"
    >
      Skip
    </Button>
    <Button
      class="button"
      v-if="!isShowAnswer"
      @click="showAnswer"
    >
      Show answer
    </Button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import {
    Mutation,
    State
  } from 'vuex-class'
  import Button from '../../components/Button'

  @Component({
    components: {
      Button
    }
  })
  export default class Drill extends Vue {
    value: string = ''
    isShowAnswer: boolean = false
    isReadOnly: boolean = false
    isRightAnswer: boolean = false

    @State('isDrillTranslationInsteadWord') isDrillTranslationInsteadWord: boolean | undefined
    @State('currentWord') currentWord: any

    @Mutation('setRandomWordAsCurrent') setRandomWordAsCurrent: any
    @Mutation('toggleTranslationFlow') toggleTranslationFlow: any

    created () {
      this.setRandomWordAsCurrent()
    }

    onInputChange (e: any) {
      const {
        value
      } = e.target

      if (value.toLowerCase() === this.answer.toLowerCase()) {
        this.isReadOnly = true
        this.isRightAnswer = true
        setTimeout(this.skipWord, 300)
      }
    }

    showAnswer () {
      this.isShowAnswer = true
    }

    skipWord () {
      this.setRandomWordAsCurrent()
      this.resetView()
    }

    resetView () {
      this.value = ''
      this.isShowAnswer = false
      this.isReadOnly = false
      this.isRightAnswer = false
    }

    get word () {
      const {
        word,
        translation
      } = this.currentWord
      return this.isDrillTranslationInsteadWord ? translation : word
    }

    get answer () {
      const {
        word,
        translation
      } = this.currentWord
      return this.isDrillTranslationInsteadWord ? word : translation
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
