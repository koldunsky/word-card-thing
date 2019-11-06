<template>
  <input class="input" />
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class SomeComponent extends Vue {
    @Prop() private msg!: string;
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
