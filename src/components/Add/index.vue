<template>
  <form
    class="add"
    @submit.prevent="addWord"
  >
    <div class="add__inner">
      <div v-if="words.length < 3" class="notification">
        <span v-if="words.length === 0" v-t="'add.three'" />
        <span v-if="words.length > 0">
          {{$tc('add.others', 3 - words.length)}}
        </span>
      </div>
      <div class="fieldset">
        <Input
          translationKey="Word"
          ref="inputWord11"
          id="field_word"
          v-model="word"
        />
        <Input
          translationKey="Translation"
          id="field_translation"
          v-model="translation"
        />
      </div>
      <Button v-t="'Add'" id="button_add"/>
    </div>
  </form>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import reduce from 'lodash/reduce'
  import Button from '@/ui-kit/Button/index.vue'
  import Input from '@/ui-kit/Input/index.vue'
  import {
    namespace
  } from 'vuex-class'

  interface IFields {
    word: string;
    translation: string;
  }

  const NavModule = namespace('NavModule')
  const UserRelatedData = namespace('UserRelatedData')

  @Component({
    components: {
      Button,
      Input
    }
  })
  export default class AddView extends Vue {
    word: string = '';
    translation: string = '';

    $refs!: {
      inputWord: Input
    }

    @UserRelatedData.State
    words

    @UserRelatedData.Mutation('addWord')
    addWordToStore

    @NavModule.Mutation
    addPointingDot: (id: TPageName) => void

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
      debugger;
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
      const input = this.$refs.inputWord.$refs.inputEl as HTMLInputElement

      input.focus()
    }

    resetForm () {
      this.word = ''
      this.translation = ''
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
