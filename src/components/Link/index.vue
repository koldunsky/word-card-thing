<template>
  <a
    class="link"
    @click="onClick"
  >
    <slot></slot>
  </a>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const NavModule = namespace('NavModule')

  @Component
  export default class Link extends Vue {
    @Prop() to!: string;

    @NavModule.Mutation
    navigateTo: (id: string) => void

    onClick (e) {
      e.preventDefault()
      this.navigateTo(this.to)
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
