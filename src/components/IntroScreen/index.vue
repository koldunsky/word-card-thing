<template>
  <div class="introScreen" v-if="words.length === 0">
      It's empty, bitch
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const UserRelatedData = namespace('UserRelatedData')

  @Component
  export default class IntroScreen extends Vue {
    @Prop() private msg!: string;

    @UserRelatedData.State
    words
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
