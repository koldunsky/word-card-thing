<template>
  <div class="introScreen" v-if="1">
    <div class="introScreen__inner">
      <i class="highlight">kolenki</i> is an app that helps to remember words. Type in a&nbsp;<IntroScreenInput ref="wordInput" placeholder="word" v-model="word" /> and its&nbsp;<IntroScreenInput ref="translationInput" placeholder="translation" v-model="translation" />
      <Button class="introScreen__button" v-if="canShowButton">Continue</Button>
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

    get canShowButton () {
      const {
        shouldShowButton,
        word: w,
        translation: t
      } = this

      return (Boolean(w) && Boolean(t) && w.length + t.length > 4) || shouldShowButton
    }

    mounted () {

    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
