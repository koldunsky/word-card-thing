<template>
  <div class="settings">
      <div class="settings__inner">
        <div>
          <span v-t="'settings.currentTheme'" />: <b v-t="`settings.${currentThemeString}`" />
        </div>

        <button
          data-qa="settings-theme-button"
          :tabindex="tabindex"
          @click="onChangeClick"
        >
          Change
        </button>
      </div>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins, Prop } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import Tabindex from '@/mixins/Tabindex.vue'

  const UserRelatedSettings = namespace('UserRelatedSettings')

  @Component
  export default class Settings extends Mixins(Tabindex) {
    pageName: TPageName = 'settings'
    themeVariants: Array<TTheme> = ['dark', 'light', null]

    @UserRelatedSettings.State
    theme: TTheme

    @UserRelatedSettings.Getter
    computedTheme: TTheme

    @UserRelatedSettings.Mutation
    changeTheme

    onChangeClick () {
      const index = this.themeVariants.indexOf(this.theme)
      let nextOne = this.themeVariants[index + 1]

      if (typeof nextOne === 'undefined') {
        nextOne = this.themeVariants[0]
      }

      this.changeTheme(nextOne)
    }

    get currentThemeString () {
      return !this.theme ? 'system' : this.theme
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
