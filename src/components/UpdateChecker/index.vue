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
    <div class="overlay">
      <div class="iconContainer">
        <svg
          class="icon" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="-75 6 318 168" xml:space="preserve">
          <path class="st1" d="M136.78,91.41l-50.75,50.75c-1.95,1.95-5.12,1.95-7.07,0L30.34,93.54c-1.95-1.95-1.95-5.12,0-7.07l48.63-48.63
		c1.95-1.95,5.12-1.95,7.07,0l50.75,50.75C137.56,89.37,137.56,90.63,136.78,91.41z"/>
          <path v-for="(_, i) in new Array(10).fill('')"  :key="i" :class="`st st_${i}`" d="M136.78,91.41l-50.75,50.75c-1.95,1.95-5.12,1.95-7.07,0L30.34,93.54c-1.95-1.95-1.95-5.12,0-7.07l48.63-48.63
		c1.95-1.95,5.12-1.95,7.07,0l50.75,50.75C137.56,89.37,137.56,90.63,136.78,91.41z"/>
          <path class="st2" d="M149.66,93.54l-48.63,48.63c-1.95,1.95-5.12,1.95-7.07,0L43.93,92.12c-1.17-1.17-1.17-3.07,0-4.24l50.04-50.04
		c1.95-1.95,5.12-1.95,7.07,0l48.63,48.63C151.62,88.42,151.62,91.58,149.66,93.54z"/>

</svg>
        <div class="moviet">

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'

  @Component
  export default class UpdateChecker extends Vue {
    refreshing: boolean = false
    registration: any = null
    updateExists: boolean = true

    created() {
      document.addEventListener(
        'swUpdated',
        this.showRefreshUI as EventListener,
        {once: true}
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

    showRefreshUI(e: CustomEvent) {
      this.registration = e.detail
      this.updateExists = true
    }

    refreshApp() {
      this.updateExists = false
      if (!this.registration || !this.registration.waiting) {
        return
      }
      this.registration.waiting.postMessage({type: 'SKIP_WAITING'})
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
