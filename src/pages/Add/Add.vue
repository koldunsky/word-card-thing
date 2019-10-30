<template>
  <form
    ref="form"
    class="container"
    @submit.prevent="addWord"
  >
    <div v-if="words.length < 3" class="notification">
      <span v-if="words.length === 0">Add <span>3</span> words</span>
      <span v-if="words.length > 0">Add <span>{{ 3 - words.length}}</span> more</span>
    </div>
    <label :class="{
      field_error: fieldWithError === 'word'
    }">Word<br />
      <input
        id="field_word"
        v-model="word"
      />
    </label>
    <label :class="{
      field_error: fieldWithError === 'translation'
    }">Translation<br />
      <input
        id="field_translation"
        v-model="translation"
      />
    </label>
    <br />
    {{fieldWithError}}
    <button type="submit">Add</button>
  </form>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import reduce from 'lodash/reduce'
  import Input from '@/components/Input/index.vue'
  import {
    Mutation,
    State
  } from 'vuex-class'

  interface IFields {
    word: string;
    translation: string;
  }

  @Component({
    components: {
      Input
    }
  })
  export default class AddView extends Vue {
    word: string = '';
    translation: string = '';
    fieldWithError: string = '';

    $refs!: {
      form: HTMLFormElement
    }
    @State('words') words: any

    @Mutation('addWord') addWordToStore: any

    addWord () {
      const {
        word,
        translation
      } = this

      const fields: IFields = reduce({
        word,
        translation
      }, (acc, value, fieldName) => {
        value = value.trim()

        if (value === '' && !this.fieldWithError) {
          this.fieldWithError = fieldName
        }

        acc[fieldName] = value
        return acc
      }, {} as IFields)

      if (this.fieldWithError) {
        return false
      }

      this.addWordToStore({
        word: fields.word,
        translation: fields.translation
      })
      this.resetForm()
    }

    resetForm () {
      this.word = ''
      this.translation = ''
      const form: Element = this.$refs.form
      const firstInput: HTMLInputElement = form.querySelector('input')
      firstInput.focus()
    }
  }
</script>
<style src="./index.scss" scoped lang="scss"></style>
