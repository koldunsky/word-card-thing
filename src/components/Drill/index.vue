<template>
  <div class="drill">
    <button
      class="switcher"
      :class="{
            'switcher_reversed': isDrillTranslationInsteadWord
          }"
      @click="toggleTranslationFlow"
    >
      <span>{{$t('Word').slice(0, 1)}}</span> <i class="arrowIcon" /> <span>{{$t('Translation').slice(0, 1)}}</span>
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
        ref="input"
        @input="onInputChange"
        @keydown="onInputKeydown"
        v-model="value"
        type="text"
        class="input"
        autocomplete="off"
        :class="{
          'right-answer': isRightAnswer,
          'hidden': isShowAnswer
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
          @click="onSkipWordButtonClick"
        >
          {{$t('Skip')}}
        </Button>
        <Button
          class="button"
          v-if="!isShowAnswer"
          @click="onShowAnswerButtonClick"
        >
          {{$t('ShowAnswer')}}
        </Button>

        <Button
          class="button button_accent button_delete"
          v-if="isShowAnswer && words.length > 3"
          @click="onDeleteButtonClick"
        >
          {{$t('Delete')}}
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
    lastBlurTimeStamp: number = null;
    lastBlurTarget: EventTarget = null;

    $refs: {
      input: HTMLInputElement
    }

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

    onInputChange (e: Event) {
      const {
        value
      } = e.target as HTMLInputElement

      if (value.toLowerCase() === this.answer.toLowerCase()) {
        this.isReadOnly = true
        this.isRightAnswer = true
        this.resetView(true)
      }
    }

    onInputKeydown (e) {
      if (this.isReadOnly || this.isShowAnswer) { // Do nothing if already guessed or if showing answer
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    }

    onSkipWordButtonClick () {
      if (this.isShowAnswer) {
        this.$refs.input.focus()
      } else {
        this.handleFocusBehaviour()
      }
      this.resetView()
    }

    onShowAnswerButtonClick () {
      this.isShowAnswer = true
    }

    handleFocusBehaviour () {
      const itWasInput = this.lastBlurTarget === this.$refs.input
      const andItWasReallyFast = performance.now() - this.lastBlurTimeStamp < 150

      if (itWasInput && andItWasReallyFast) {
        this.$refs.input.focus()
      }
    }

    resetView (delayed?: boolean) {
      const reset = () => {
        this.value = ''
        this.isRightAnswer = false
        this.isReadOnly = false
        this.setRandomWordAsCurrent()
        this.isShowAnswer = false
      }

      if (delayed) {
        setTimeout(reset, 350)
      } else {
        reset()
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

    onFocusOut (e) {
      this.lastBlurTimeStamp = e.timeStamp
      this.lastBlurTarget = e.target
    }

    mounted () {
      window.addEventListener('focusout', this.onFocusOut)
    }

    unmounted () {
      window.removeEventListener('focusout', this.onFocusOut)
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
