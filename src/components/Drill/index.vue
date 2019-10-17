<template>
  <div class="COMPONENT_NAME">
    {{this.$store.state.words}}
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Drill extends Vue {
  }
</script>
<style src="./index.scss" lang="scss"></style>
