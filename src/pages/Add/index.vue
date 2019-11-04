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
    <div class="fieldset">
      <label>
        <span class="field__label">
          Word
        </span>
        <input
          id="field_word"
          v-model="word"
        />
      </label>
      <label>
        <span class="field__label">
          Translation
        </span>
        <input
          id="field_translation"
          v-model="translation"
        />
      </label>
    </div>
    <Button>
      Add
    </Button>
  </form>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import reduce from 'lodash/reduce'
  import Input from '@/components/Input/index.vue'
  import Button from '@/components/Button/index.vue'
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
      Input,
      Button
    }
  })
  export default class AddView extends Vue {
    word: string = '';
    translation: string = '';

    $refs!: {
      form: HTMLFormElement
    }
    @State('words') words: any

    @Mutation('addWord') addWordToStore: any

    mounted () {
      if (this.words.length < 3) {
        this.focusFirstInput()
      }
    }

    showError (fieldName: string) {
      const el = document.getElementById(`field_${fieldName}`)

      setTimeout(() => {
        el.classList.remove('field_error')
      }, 500)
      el.classList.add('field_error')
      el.focus()
      this.resetField(fieldName)
    }

    resetField (name: string) {
      this[name] = ''
    }

    addWord () {
      const {
        word,
        translation
      } = this
      let fieldWithError: string = ''

      const fields: IFields = reduce({
        word,
        translation
      }, (acc, value, fieldName) => {
        value = value.trim()

        if (value === '' && !fieldWithError) {
          fieldWithError = fieldName
        }

        acc[fieldName] = value
        return acc
      }, {} as IFields)

      if (fieldWithError) {
        this.showError(fieldWithError)
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
