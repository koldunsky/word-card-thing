<template>
  <div
    v-if="updateExists && !updateSkipped"
    class="updateChecker"
  >
    New version available!
    <button
      class="button"
      @click="refreshApp">
      Click here
    </button>
    to update
    <button @click="skipUpdate" class="skip-button" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class UpdateChecker extends Vue {
    refreshing: boolean = false
    registration: any = null
    updateExists: boolean = false
    updateSkipped: boolean = false

    created () {
      document.addEventListener(
        'swUpdated',
        this.showRefreshUI as EventListener,
        { once: true }
      )
      navigator.serviceWorker.addEventListener(
        'controllerchange', () => {
          if (this.refreshing) {
            return
          }
          this.refreshing = true
          window.location.replace('/')
        }
      )
    }

    showRefreshUI (e: CustomEvent) {
      this.registration = e.detail
      this.updateExists = true
    }

    refreshApp () {
      this.updateExists = false
      if (!this.registration || !this.registration.waiting) {
        return
      }
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }

    skipUpdate () {
      this.updateSkipped = true
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
