<template>
  <div class="settings">
      <div class="settings__inner">
        <SettingsOption :title="$t('settings.colorTheme')">
          <button
            v-for="t in themeVariants"
            :key="t"
            class="settings__button-option"
            :class="t === theme && 'settings__button-option_active'"
            data-qa="settings-theme-button"
            :tabindex="t === theme ? '-1' : tabindex"
            @click="() => onChangeClick(t)"
            v-t="`settings.${getThemeTranslationId(t)}`"
          >
          </button>
        </SettingsOption>
      </div>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins, Prop } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import Tabindex from '@/mixins/Tabindex.vue'
  import SettingsOption from './settingsOption.vue'

  const UserRelatedSettings = namespace('UserRelatedSettings')

  @Component({
    components: {
      SettingsOption
    }
  })
  export default class Settings extends Mixins(Tabindex) {
    pageName: TPageName = 'settings'
    themeVariants: Array<TTheme> = [null, 'dark', 'light']

    @UserRelatedSettings.State
    theme: TTheme

    @UserRelatedSettings.Getter
    computedTheme: TTheme

    @UserRelatedSettings.Mutation
    changeTheme

    onChangeClick (theme: TTheme) {
      this.changeTheme(theme)
    }

    getThemeTranslationId (id) {
      return !id ? 'system' : id
    }

    get currentThemeString () {
      return this.getThemeTranslationId(this.theme)
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
