<template>
  <button
    class="button"
    :class="{
      button_accent: accent
    }"
    @click="(e) => $emit('click', e)"
  >
    <slot />
  </button>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    props: {
      accent: [Boolean]
    }
  })
  export default class Button extends Vue {
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
