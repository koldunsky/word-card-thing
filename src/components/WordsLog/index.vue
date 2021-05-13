<template>
 <div class="wordsLog">
   {{prevLogList}}
     <transition-group name="list" tag="ul" class="listWrapper">
     <li
       v-for="(w) in completeLog"
       :key="w.id"
       class="list-item"
       :class="{
          'correct': w.correct,
          'incorrect': !w.correct
        }"
       @click="() => {
          words.length > 3 && deleteWord({id: w.id})
       }"
     >
       <span class="word">{{isDrillTranslationInsteadWord ? w.translation : w.word}}</span>
     </li>
     </transition-group>
   <transition name="footer-button">
     <Button @click="clearLog" accent class="footer-button" v-if="log.length >= 3">
       Clear
     </Button>
   </transition>
 </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  import Button from '@/ui-kit/Button/index.vue'

  const WordsLogModule = namespace('WordsLog')
  const UserRelatedData = namespace('UserRelatedData')
  const UserRelatedSettings = namespace('UserRelatedSettings')

  @Component({
    components: {
      Button
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

    @UserRelatedData.State
    words

    @UserRelatedSettings.State
    isDrillTranslationInsteadWord

    @UserRelatedData.Action
    deleteWord

    @WordsLogModule.Mutation
    clear

    prevLog = [];

    get prevLogList () {
      return this.prevLog.map((list) => {
        return list.map(({ word }) => {
          return word
        })
      })
    }

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

      this.prevLog.push(cmplLog.filter(({ id }) => Boolean(id)))
      return cmplLog.filter(({ id }) => Boolean(id))
    }

    clearLog () {
      const reallyClear = confirm(`Do you want to clear the table? It won't affect the list of words.`)

      this.clear()
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped />
