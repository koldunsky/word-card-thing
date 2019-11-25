<template>
  <button
    class="button"
    @click="(e) => $emit('click', e)"
  >
    <slot />
  </button>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Button extends Vue {}
</script>
<style src="./index.scss" lang="scss"></style>
