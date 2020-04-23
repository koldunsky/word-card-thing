<template>
  <div
    class="onboarding"
  >
    <div
      class="mask"
      :class="{active: maskIsActive}"
    />
    <button @click="toggleMask">11</button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class OnboardingLayer extends Vue {
    maskIsActive = false;

    toggleMask () {
      console.info('tt')
      this.maskIsActive = !this.maskIsActive
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
