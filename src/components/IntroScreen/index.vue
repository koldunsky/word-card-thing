<template>
  <div class="introScreen" v-if="1">
    <i class="highlight">kolenki</i> is an app that helps to remember words. Type in a <IntroScreenInput placeholder="word" v-model="word" /> and its <IntroScreenInput placeholder="translation" v-model="translation" />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import Button from '@/ui-kit/Button/index.vue'
  import IntroScreenInput from './itroScreenInput.vue'

  const UserRelatedData = namespace('UserRelatedData')

  @Component({
    components: { Button, IntroScreenInput }
  })
  export default class IntroScreen extends Vue {
    @UserRelatedData.State
    words

    word: string = ''
    translation: string = ''
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
