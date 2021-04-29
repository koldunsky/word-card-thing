<template>
 <div class="wordsLog">
   <div class="heading" v-if="log.length">
     <span>
       Score: {{score}}
     </span>
     <span>
       <span>
         {{correctAnswers + wrongAnswers}}
       </span>
       (
       <span class="score_correct">
         {{correctAnswers}}
       </span>
       /
       <span class="score_wrong">
         {{wrongAnswers}}
       </span>
       )
     </span>
     <span @click="clearLog">
       clear
     </span>
   </div>
   <ul class="listWrapper">
     <li
       v-for="(w, i) in completeLog"
       :key="w.id + i"
       class="list-item"
       :class="{
          'correct': w.correct,
          'incorrect': !w.correct
        }"
       @click="() => words.length > 3 && deleteWord(w.id)"
     >
       <span class="word">{{isDrillTranslationInsteadWord ? w.translation : w.word}}</span>
       <span class="score">{{w.correct ? '+5' : '-10'}}</span>
     </li>
   </ul>
 </div>
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

    @WordsLogModule.State
    correctAnswers

    @WordsLogModule.State
    wrongAnswers

    @WordsLogModule.State
    score

    @UserRelatedData.State
    words

    @UserRelatedSettings.State
    isDrillTranslationInsteadWord

    @UserRelatedData.Action
    deleteWord

    @WordsLogModule.Mutation
    clear

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

    clearLog () {
      const reallyClear = confirm(`Do you want to clear the table? It won't affect the list of words.`)

      this.clear()
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped />
