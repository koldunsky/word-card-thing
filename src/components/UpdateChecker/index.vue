<template>
  <div
    v-if="updateExists"
    class="updateChecker"
  >
    <i18n
      path="updateChecker.text"
      tag="div"
    >
      <template v-slot:cta>
        <button
          class="button"
          v-t="'updateChecker.cta'"
          @click="refreshApp"
        />
      </template>
    </i18n>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class UpdateChecker extends Vue {
    refreshing: boolean = false
    registration: any = null
    updateExists: boolean = true

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

      // setInterval(() => {
      //   this.updateExists = !this.updateExists
      // }, 1000)
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
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
