<template>
  <form
    ref="form"
    class="container"
    @submit.prevent="addWord"
  >
    <div v-if="words.length < 3" class="notification">
      <span v-if="words.length === 0">Add <span class="notification__accent">3</span> words</span>
      <span v-if="words.length > 0">Add <span class="notification__accent">{{ 3 - words.length}}</span> more</span>
    </div>
    <label>Word<br />
      <input
        id="field_word"
        v-model="word"
      />
    </label>
    <label>Translation<br />
      <input
        id="field_translation"
        v-model="translation"
      />
    </label>
    <br />
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

    mounted () {
      console.info('mounted')
      if (this.words.length < 3) {
        this.focusFirstInput()
      }
    }

    updated () {
      const { fieldWithError } = this
      if (fieldWithError) {
        const el = document.getElementById(`field_${fieldWithError}`)

        setTimeout(() => {
          el.classList.remove('field_error')
        }, 500)
        el.classList.add('field_error')
        el.focus()
        this.resetField(fieldWithError)
        this.fieldWithError = ''
      }
    }

    resetField (name: string) {
      this[name] = ''
    }

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

    focusFirstInput () {
      const form: Element = this.$refs.form
      const firstInput: HTMLInputElement = form.querySelector('input')
      firstInput.focus()
    }

    resetForm () {
      this.word = ''
      this.translation = ''
      this.focusFirstInput()
    }
  }
</script>
<style src="./index.scss" scoped lang="scss"></style>
