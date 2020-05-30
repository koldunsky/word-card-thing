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
