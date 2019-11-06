<template>
  <button
    class="button"
    @click="(e) => $emit('click', e)"
  >
    <slot />
  </button>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class SomeComponent extends Vue {}
</script>
<style src="./index.scss" lang="scss" scoped></style>
