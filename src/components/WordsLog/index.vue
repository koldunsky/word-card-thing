<template>
  <ul class="wordsLog">
    <li
      v-for="(w, i) in completeLog"
      :key="w.id + i"
      class="list-item"
      :class="w.correct ? 'correct' : 'incorrect'"
    >
      {{isDrillTranslationInsteadWord ? w.translation : w.word}}
    </li>
  </ul>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import ListItem from '@/ui-kit/ListItem/index.vue'

  const WordsLogModule = namespace('WordsLog')
  const UserRelatedData = namespace('UserRelatedData')
  const UserRelatedSettings = namespace('UserRelatedSettings')

  @Component({
    components: {
      ListItem
    }
  })
  export default class WordsLog extends Vue {
    @Prop() private tabindex!: string;

    @WordsLogModule.State
    log

    @UserRelatedData.State
    words

    @UserRelatedSettings.State
    isDrillTranslationInsteadWord

    get completeLog () {
      const cmplLog = this.log.map(({ id: logWordId, correct }) => {
        const nashParen = this.words.find(({ id }) => {
          return logWordId === id
        })

        return {
          ...nashParen,
          correct
        }
      })

      return cmplLog.filter(({ id }) => Boolean(id))
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped />
