<template>
    <div class="setting__option-wrapper">
      <div class="setting__option-headline">
        {{title}}
      </div>
      <slot />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import Tabindex from '@/mixins/Tabindex.vue'

  @Component
  export default class SettingsOption extends Vue {
    @Prop()
    title: string
  }
</script>

<style src="./index.scss" lang="scss" scoped></style>
