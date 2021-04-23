import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

export type TPointingDots = {
  [key in TPageName]: boolean
}

type TWord = {
  id: string;
  correct: boolean;
}

@Module({
  namespaced: true
})

class WordsLog extends VuexModule {
  public log: Array<TWord> = []

  @Mutation
  addWordToLog (word: TWord) {
    let tempLog = this.log.reverse()
    tempLog.push(word)
    tempLog = tempLog.reverse()
    this.log = tempLog.slice(0, 10)
  }
}

export default WordsLog
