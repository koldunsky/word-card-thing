<template>
  <div class="settings">
      <div class="settings__inner">
        <div>
          <span v-t="'settings.currentTheme'" />: <b v-t="`settings.${currentThemeString}`" />
        </div>

        <button @click="onChangeClick">
          Change
        </button>
      </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const UserRelatedSettings = namespace('UserRelatedSettings')

  @Component
  export default class Settings extends Vue {
    themeVariants: Array<TTheme> = ['dark', 'light', null];

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
