<template>
  <div class="introScreen" :class="introScreenPassed && 'introScreen_inactive'" @keyup.enter="onSubmit" v-if="words.length < 2">
    <div class="introScreen__holder">
      <div
        class="introScreen__inner"
        :class="{
          'introScreen__inner_active': words.length === 0,
          'introScreen__inner_inactive': words.length > 0
        }"
      >
        <i18n
          path="introFirstScreen.text"
          tag="div"
        >
          <template v-slot:appName>
            <span class="highlight" v-t="'introFirstScreen.appName'"/>
          </template>
          <template v-slot:word>
            <IntroScreenInput
              ref="wordInput"
              :placeholder="$t('introFirstScreen.word')"
              v-model="word"
              @blur="onBlur"
              @focus="onFocus"
            />
          </template>
          <template v-slot:translation>
            <IntroScreenInput
              ref="translationInput"
              :placeholder="$t('introFirstScreen.translation')"
              v-model="translation"
              @blur="onBlur"
              @focus="onFocus"
            />
         </template>
        </i18n>
        <Button
          :tabindex="words.length > 0 ? '0' : '-1'"
          class="introScreen__button"
          :class="canShowFirstButton && 'introScreen__button_active'"
          @click="onSubmit"
        >
          {{$t('introFirstScreen.button')}}
        </Button>
      </div>
      <div
        class="introScreen__inner"
        :class="{
          'introScreen__inner_active': canShowSecondScreen,
          'introScreen__inner_inactive': introScreenPassed
        }"
      >
        <i18n
          path="introSecondScreen.text"
          tag="div"
        >
          <template v-slot:threeWords>
            <span class="highlight" v-t="'introSecondScreen.threeWords'"/>
          </template>
        </i18n>
        <Button
          :tabindex="canShowSecondButton ? '0' : '-1'"
          class="introScreen__button"
          :class="canShowSecondButton && 'introScreen__button_active'"
          v-t="'introSecondScreen.button'"
          @click="onSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import Button from '@/ui-kit/Button/index.vue'
  import IntroScreenInput from './introScreenInput.vue'

  const UserRelatedData = namespace('UserRelatedData')

  @Component({
    components: { Button, IntroScreenInput }
  })
  export default class IntroScreen extends Vue {
    @UserRelatedData.State
    words

    @UserRelatedData.State
    introScreenPassed

    @UserRelatedData.Mutation('addWord')
    addWordToStore

    word: string = ''
    translation: string = ''
    shouldShowFirstButton: boolean = false
    canShowSecondButton: boolean = false
    timerToShowSecondButton: number = null

    @UserRelatedData.Mutation
    passIntroScreen

    get inputsAreNotEmpty () {
      return Boolean(this.word) && Boolean(this.translation)
    }

    get canShowFirstButton () {
      const {
        shouldShowFirstButton,
        word: w,
        translation: t
      } = this

      return (this.inputsAreNotEmpty && w.length + t.length > 4) || shouldShowFirstButton
    }

    get canShowSecondScreen () {
      return this.words.length > 0 && !this.introScreenPassed
    }

    addWord () {
      if (!this.inputsAreNotEmpty) {
        console.warn('word or translation is empty')
        return false
      }

      const {
        word,
        translation
      } = this

      this.addWordToStore({
        word,
        translation
      })
    }

    onLastButtonClick () {
      this.passIntroScreen()
    }

    onBlur () {
      this.shouldShowFirstButton = this.inputsAreNotEmpty
    }

    onFocus () {
      this.shouldShowFirstButton = false
    }

    onSubmit () {
      if (this.words.length < 1) {
        this.addWord()
      } else {
        this.passIntroScreen()
      }
    }

    checkWhetherCanShowSecondButton () {
      if (this.timerToShowSecondButton === null && this.canShowSecondScreen) {
        this.timerToShowSecondButton = setTimeout(() => {
          this.canShowSecondButton = true
        }, 2000)
      }
    }

    updated () {
      this.checkWhetherCanShowSecondButton()
    }

    mounted () {
      this.checkWhetherCanShowSecondButton()
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
