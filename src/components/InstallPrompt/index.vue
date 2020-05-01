<template>
  <transition name="fade">
    <div class="installPrompt" v-if="showInstallMessage">
      <i class="icon-add"/>
      <div class="text">
        Install this app on your device: <br>
        tap
        <ShareIcon class="icon-share"/>
        and then Add to Home Screen.
      </div>
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
