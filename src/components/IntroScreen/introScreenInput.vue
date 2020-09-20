<template>
  <span class="introScreen__inputContainer">
    <span class="introScreen__valueDummy">{{value}}</span>
    <span class="introScreen__placeholderDummy">{{placeholder}}</span>
    <input
      :placeholder="placeholder"
      class="introScreen__input"
      type="text"
      v-bind="$attrs"
      v-bind:value="value"
      v-on:input="onInput"
      ref="inputEl"
      @blur="(e) => $emit('blur', e)"
      @focus="(e) => $emit('focus', e)"
    />
  </span>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import Button from '@/ui-kit/Button/index.vue'

  const UserRelatedData = namespace('UserRelatedData')

  @Component({
    components: { Button }
  })
  export default class IntroScreenInput extends Vue {
    @Prop() value: string
    @Prop() placeholder: string

    inputValue: string = ''

    ref!: {
      inputEl: HTMLInputElement
    }

    onInput ($event) {
      const { value } = $event.target
      this.$emit('input', value)
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
