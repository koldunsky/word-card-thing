import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import uniqBy from 'lodash/uniqBy'

type TWord = {
  id: string;
  correct: boolean;
}

@Module({
  namespaced: true
})

class WordsLog extends VuexModule {
  public log: Array<TWord> = []
  public correctAnswers: number = 0;
  public wrongAnswers: number = 0;

  @Mutation
  addWordToLog (word: TWord) {
    console.info('🐙addWordToLog')
    let tempLog = this.log.reverse()
    tempLog.push(word)
    tempLog = tempLog.reverse()
    tempLog = uniqBy(tempLog, 'id')
    this.log = tempLog.slice(0, 10)

    if (word.correct) {
      this.correctAnswers++
    } else {
      this.wrongAnswers++
    }
  }

  @Mutation
  clear () {
    this.log = []
  }
}

export default WordsLog
