import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
import { TPageName } from '../../types'

@Module({
  namespaced: true
})
class NavModule extends VuexModule {
  public pages: Array<TPageName> = ['add', 'drill', 'list']
  public currentPage: TPageName = 'add'

  @Mutation
  navigateTo (id: TPageName) {
    this.currentPage = id
  }

  get currentPageIndex () {
    return this.pages.indexOf(this.currentPage)
  }
}

export default NavModule
