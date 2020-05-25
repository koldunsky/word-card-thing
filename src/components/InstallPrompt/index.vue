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
  import { isIos } from '@/utils/isIos'
  import { isStandalone } from '@/utils/isStandalone'

  @Component({
    components: { ShareIcon }
  })
  export default class InstallPrompt extends Vue {
    showInstallMessage: boolean = false;

    onDismissButtonClick () {
      this.showInstallMessage = false
    }

    mounted () {
      // Checks if should display install popup notification:
      if (isIos && !isStandalone) {
        setTimeout(() => {
          this.showInstallMessage = true
        }, 1000)
      }
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
