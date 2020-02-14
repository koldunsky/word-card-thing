<template>
  <form
    ref="form"
    class="add"
    @submit.prevent="addWord"
  >
    <div class="add__inner">
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
            autocomplete="off"
          />
        </label>
        <label>
          <span class="field__label">
            Translation
          </span>
          <input
            id="field_translation"
            v-model="translation"
            autocomplete="off"
          />
        </label>
      </div>
      <Button>
        Add
      </Button>
    </div>
  </form>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import reduce from 'lodash/reduce'
  import Button from '@/ui-kit/Button/index.vue'
  import { TPageName } from '@/types'
  import {
    Mutation,
    State,
    namespace
  } from 'vuex-class'

  interface IFields {
    word: string;
    translation: string;
  }

  const NavModule = namespace('NavModule')

  @Component({
    components: {
      Button
    }
  })
  export default class AddView extends Vue {
    word: string = '';
    translation: string = '';
    windowWidth: number = 0

    $refs!: {
      form: HTMLFormElement
    }
    @State('words') words: any

    @Mutation('addWord') addWordToStore: any

    @NavModule.Mutation
    addPointingDot: (id: TPageName) => void

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

      if (this.words.length !== 3) {
        this.focusFirstInput()
      } else {
        // Когда добавим третье слово и покажем меню, уберем фокус,
        // чтобы было видно,чо произошло
        (document.activeElement as HTMLElement).blur()
        this.addPointingDot('drill')
      }
    }

    focusFirstInput () {
      const form: Element = this.$refs.form
      const firstInput: HTMLInputElement = form.querySelector('input')
      firstInput.focus()
    }

    resetForm () {
      this.word = ''
      this.translation = ''
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
