<template>
  <div class="drill">
    <button
      class="switcher"
      :class="{
            'switcher_reversed': isDrillTranslationInsteadWord
          }"
      @click="toggleTranslationFlow"
    >
      <span>W</span> <i class="arrowIcon"></i> <span>T</span>
    </button>
    <div class="drill__inner">
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
        class="input"
        autocomplete="off"
        :class="{
          'right-answer': isRightAnswer
        }"
      />
      <div
        class="button-set"
        :class="{
          'button-set_showing-answer': isShowAnswer
        }"
      >
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

        <Button
          class="button button_accent button_delete"
          v-if="isShowAnswer && words.length > 3"
          @click="onDeleteButtonClick"
        >
          Delete
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import {
    Mutation,
    Action,
    State
  } from 'vuex-class'
  import Button from '@/ui-kit/Button/index.vue'

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
    @State('words') words: any

    @Mutation('setRandomWordAsCurrent') setRandomWordAsCurrent: any
    @Mutation('toggleTranslationFlow') toggleTranslationFlow: any
    @Action('deleteWord') deleteWord: any

    onDeleteButtonClick () {
      this.deleteWord(this.currentWord.id).then(() => {
        this.resetView()
      })
    }

    onInputChange (e: any) {
      const {
        value
      } = e.target

      if (value.toLowerCase() === this.answer.toLowerCase()) {
        this.isReadOnly = true
        this.isRightAnswer = true
        this.skipWord(true)
      }
    }

    showAnswer () {
      this.isShowAnswer = true
    }

    skipWord (delayed?: boolean) {
      this.setRandomWordAsCurrent()
      this.resetView(delayed)
    }

    resetView (delayed?: boolean) {
      this.isShowAnswer = false
      this.isReadOnly = false
      if (delayed) {
        setTimeout(() => {
          this.isRightAnswer = false
          this.value = ''
        }, 300)
      } else {
        this.value = ''
        this.isRightAnswer = false
      }
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
