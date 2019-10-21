<template>
  <button v-if="updateExists" @click="refreshApp">
    ↺ New version available! Click to update
  </button>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class UpdateChecker extends Vue {
    refreshing: boolean = false
    registration: any = null
    updateExists: boolean = false

    created () {
      document.addEventListener(
        'swUpdated', this.showRefreshUI as EventListener, { once: true }
      )
      navigator.serviceWorker.addEventListener(
        'controllerchange', () => {
          if (this.refreshing) {
            return
          }
          this.refreshing = true
          window.location.reload()
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
      this.registration.waiting.postMessage('skipWaiting')
    }
  }
</script>
<style src="./index.scss" lang="scss"></style>
