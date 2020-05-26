<template>
  <transition name="fade">
    <div class="installPrompt" v-if="showInstallMessage">
      <i class="icon-add"/>
        <i18n
          path="installPrompt"
          tag="div"
          class="text"
        >
          <template v-slot:shareIcon>
            <ShareIcon class="icon-share"/>
          </template>
        </i18n>
      <button class="dismiss" @click="onDismissButtonClick"/>
    </div>
  </transition>
</template>

<script lang="ts">
  import get from 'lodash/get'
  import { Component, Vue } from 'vue-property-decorator'
  import ShareIcon from './assets/share-apple.svg'

  @Component({
    components: { ShareIcon }
  })
  export default class InstallPrompt extends Vue {
    showInstallMessage: boolean = false;

    // Detects if device is on iOS
    isIos () {
      const userAgent = window.navigator.userAgent.toLowerCase()
      return /iphone|ipad|ipod/.test(userAgent)
    }

    // Detects if device is in standalone mode
    isInStandaloneMode () {
      return get(window, 'navigator.standalone', false)
    }

    onDismissButtonClick () {
      this.showInstallMessage = false
    }

    mounted () {
      // Checks if should display install popup notification:
      if (this.isIos() && !this.isInStandaloneMode()) {
        setTimeout(() => {
          this.showInstallMessage = true
        }, 1000)
      }
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
