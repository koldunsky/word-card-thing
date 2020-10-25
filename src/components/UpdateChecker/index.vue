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
    <transition name="overlay-transition">
      <div
        class="overlay"
        :class="this.prepareToReload && 'overlay_prepare-to-reload'"
        v-if="this.refreshing"
        @click="() => onOverlayClick()"
      >
      <div class="iconContainer">
        <svg
          class="icon" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="-75 6 318 168" xml:space="preserve">
          <path class="greenShape" d="M136.78,91.41l-50.75,50.75c-1.95,1.95-5.12,1.95-7.07,0L30.34,93.54c-1.95-1.95-1.95-5.12,0-7.07l48.63-48.63c1.95-1.95,5.12-1.95,7.07,0l50.75,50.75C137.56,89.37,137.56,90.63,136.78,91.41z"/>
          <path class="greenShape_1" d="M136.78,91.41l-50.75,50.75c-1.95,1.95-5.12,1.95-7.07,0L30.34,93.54c-1.95-1.95-1.95-5.12,0-7.07l48.63-48.63c1.95-1.95,5.12-1.95,7.07,0l50.75,50.75C137.56,89.37,137.56,90.63,136.78,91.41z"/>
          <path class="orangeShape" d="M149.66,93.54l-48.63,48.63c-1.95,1.95-5.12,1.95-7.07,0L43.93,92.12c-1.17-1.17-1.17-3.07,0-4.24l50.04-50.04c1.95-1.95,5.12-1.95,7.07,0l48.63,48.63C151.62,88.42,151.62,91.58,149.66,93.54z"/>
          <path class="orangeShape_2" d="M149.66,93.54l-48.63,48.63c-1.95,1.95-5.12,1.95-7.07,0L43.93,92.12c-1.17-1.17-1.17-3.07,0-4.24l50.04-50.04c1.95-1.95,5.12-1.95,7.07,0l48.63,48.63C151.62,88.42,151.62,91.58,149.66,93.54z"/>
        </svg>
      </div>
    </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  let TIMEOUT_SHIFT = 0
  const TIMEOUT_OVERLAY = 500

  @Component
  export default class UpdateChecker extends Vue {
    refreshing: boolean = false
    registration: any = null
    updateExists: boolean = true
    prepareToReload: boolean = false

    created () {
      document.addEventListener(
        'swUpdated',
        this.showRefreshUI as EventListener,
        { once: true }
      )
      navigator.serviceWorker.addEventListener(
        'controllerchange', this.onControllerChange
      )

      TIMEOUT_SHIFT = (Math.round(Math.random() * 100) / 100) * 1000

      setTimeout(() => {
        this.refreshing = true
      }, 2000)
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

      this.registration.waiting.postMessage({
        type: 'SKIP_WAITING'
      })
    }

    get timeout () {
      return 2000 + TIMEOUT_SHIFT
    }

    get shortTimeout () {
      return this.timeout - 500
    }

    onControllerChange () {
      if (this.refreshing) {
        return
      }

      this.refreshing = true

      setTimeout(() => {
        this.prepareToReload = true
      }, this.shortTimeout)
      setTimeout(() => {
        window.location.replace('/')
      }, this.timeout)
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
