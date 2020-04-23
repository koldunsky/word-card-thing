import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { TPageName } from '../../types'

type TScenario = 'WTButton' | 'listItemDeleteButton';

@Module({
  namespaced: true
})

class OnboardingModule extends VuexModule {
  public scenario: TScenario = null;

  @Mutation
  addScenario (scenarioId: TScenario) {
    this.scenario = scenarioId
  }

  @Mutation
  removeScenario (id: TPageName) {
    this.scenario = null
  }
}

export default OnboardingModule
