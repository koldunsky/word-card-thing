<template>
  <div class="introScreen" v-if="activeScreen < 2">
    <div
      v-if="activeScreen === 0"
      class="introScreen__inner introScreen_screen_first">
      <i18n
        path="introFirstScreen.text"
        tag="div"
      >
        <template v-slot:appName>
          <span class="highlight" v-t="'introFirstScreen.appName'" />
        </template><template v-slot:word>
          <IntroScreenInput ref="wordInput" :placeholder="$t('introFirstScreen.word')" v-model="word" />
        </template>
        <template v-slot:translation>
          <IntroScreenInput ref="translationInput" :placeholder="$t('introFirstScreen.translation')" v-model="translation" />
        </template>
      </i18n>
      <Button
        class="introScreen__button"
        v-t="'introFirstScreen.button'"
        v-if="canShowButton"
        @click="onButtonClick"
      />
   </div>
    <div
      v-else-if="activeScreen === 1"
      class="introScreen__inner introScreen_screen_second"
    >
      <i18n
        path="introSecondScreen.text"
        tag="div"
      >
        <template v-slot:atLeastThreeWords>
          <span class="highlight" v-t="'introSecondScreen.atLeastThreeWords'" />
        </template>
      </i18n>
      <Button
        class="introScreen__button"
        v-t="'introSecondScreen.button'"
        v-if="canShowButton"
        @click="onButtonClick"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
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

    word: string = ''
    translation: string = ''
    shouldShowButton: boolean = false
    activeScreen: number = 0

    get canShowButton () {
      const {
        shouldShowButton,
        word: w,
        translation: t
      } = this

      return (Boolean(w) && Boolean(t) && w.length + t.length > 4) || shouldShowButton
    }

    onButtonClick () {
      this.activeScreen++
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
