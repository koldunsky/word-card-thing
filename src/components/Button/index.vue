<template>
  <button
    class="button"
    @click="click"
  >
    <slot />
  </button>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class SomeComponent extends Vue {
    @Prop() click: string;
  }
</script>
<style src="./index.scss" lang="scss"></style>
