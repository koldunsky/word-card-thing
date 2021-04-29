import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

type TWord = {
  id: string;
  correct: boolean;
}

@Module({
  namespaced: true
})

class WordsLog extends VuexModule {
  public log: Array<TWord> = []
  public score: number = 0;
  public correctAnswers: number = 0;
  public wrongAnswers: number = 0;

  @Mutation
  addWordToLog (word: TWord) {
    let tempLog = this.log.reverse()
    tempLog.push(word)
    tempLog = tempLog.reverse()
    this.log = tempLog.slice(0, 10)

    if (word.correct) {
      this.score += 5
      this.correctAnswers++
    } else {
      this.score -= 10
      this.wrongAnswers++
    }
  }

  @Mutation
  clear () {
    this.log = []
    this.score = 0
  }
}

export default WordsLog
