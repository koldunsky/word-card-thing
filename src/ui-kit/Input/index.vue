<template>
  <label  v-bind="$attrs">
    <span v-if="translationKey" class="field__label" v-t="translationKey" />
    {{inputClassNames}}
    <input
      type="range"
      id="hdhyd"
      class="input"
      v-bind="$attrs"
      v-bind:value="value"
      v-on:input="onInput"
      ref="inputEl"
    />
  </label>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class Input extends Vue {
    @Prop() id: string;
    @Prop() translationKey: string;
    @Prop() value: string;
    @Prop() inputClassNames: {[key: string]: boolean}

    ref!: {
      inputEl: HTMLInputElement
    }

    onInput ($event) {
      this.$emit('input', $event.target.value)
    }

    mounted() {
      console.log(this)
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
