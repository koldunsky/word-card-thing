import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import getGuid from "@/utils/getGuid";
import remove from "lodash/remove";

export interface IWord {
  id: string;
  word: string;
  translation: string;
}

interface IWordSetter {
  word: string;
  translation: string;
}

@Module({
  namespaced: true
})

class UserRelatedData extends VuexModule {
  public words: Array<IWord> = []
  // public words: Array<IWord> = new Array(25).fill('').map((item, i) => ({
  //   id: `ttt_${i}`,
  //   word: `www_${i}`,
  //   translation: 'ttt_' + String(Date.now() * Math.random())
  // }))
  public currentWord: IWord = {
    id: '',
    word: '',
    translation: ''
  }

  @Mutation
  addWord (payload: IWordSetter) {
    this.words.push({
      id: getGuid(),
      ...payload
    } as IWord)
  }

  @Mutation
  deleteWordWithoutConfirmation (id: string) {
    let words = [...this.words]

    remove(words, (word: IWord) => word.id === id)
    this.words = words
  }

  @Mutation
  setRandomWordAsCurrent () {
    if (!this.words.length) {
      return false
    }
    const getIndex = () => Math.round(Math.random() * (this.words.length - 1))
    let randomId = getIndex()
    while (this.words[randomId].id === this.currentWord.id) {
      randomId = getIndex()
    }

    this.currentWord = this.words[randomId]
  }

  @Action
  deleteWord (id) {
    return new Promise((resolve) => {
      const foundWords: IWord = this.words.find((word: IWord) => word.id === id)
      const reallyDelete = confirm(`Delete ${foundWords.word} (${foundWords.translation})?`)

      if (reallyDelete) {
        this.context.commit('deleteWordWithoutConfirmation', id)
        if (id === this.currentWord.id) {
          this.context.commit('setRandomWordAsCurrent')
        }
        return resolve()
      }
      throw Error(`Word removing cancelled (${foundWords.word}|${foundWords.translation})`)
    })
  }
}

export default UserRelatedData
