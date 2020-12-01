<template>
  <div class="settings">
      <div class="settings__inner">
        <SettingsOption :title="$t('settings.language')">
          <button
            v-for="l in languages"
            :key="l"
            class="settings__button-option"
            :class="l === $i18n.locale && 'settings__button-option_active'"
            data-qa="settings-language-button"
            :tabindex="l === $i18n.locale ? '-1' : tabindex"
            @click="() => $i18n.locale = l"
          >
            {{languagesNameMap[l]}}
          </button>
        </SettingsOption>
        <SettingsOption :title="$t('settings.colorTheme')">
          <button
            v-for="t in themeVariants"
            :key="t"
            v-t="`settings.${getThemeTranslationId(t)}`"
            class="settings__button-option"
            :class="t === theme && 'settings__button-option_active'"
            data-qa="settings-theme-button"
            :tabindex="t === theme ? '-1' : tabindex"
            @click="() => onThemeChangeClick(t)"
          />
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

  type TLanguage = 'ru' | 'en'

  @Component({
    components: {
      SettingsOption
    }
  })
  export default class Settings extends Mixins(Tabindex) {
    pageName: TPageName = 'settings'
    themeVariants: Array<TTheme> = [null, 'dark', 'light']
    languages: Array<TLanguage> = ['en', 'ru']
    languagesNameMap: { [key in TLanguage]: string } = {
      en: 'English',
      ru: 'Русский'
    }

    @UserRelatedSettings.State
    theme: TTheme

    @UserRelatedSettings.Getter
    computedTheme: TTheme

    @UserRelatedSettings.Mutation
    changeTheme

    onThemeChangeClick (theme: TTheme) {
      this.changeTheme(theme)
    }

    getThemeTranslationId (id) {
      return !id ? 'system' : id
    }

    get currentThemeString () {
      return this.getThemeTranslationId(this.theme)
    }

    created () {
      console.info(this.$i18n.locale)
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
