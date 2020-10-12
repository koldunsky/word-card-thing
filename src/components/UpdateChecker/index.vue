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
          viewBox="0 6 168 168" xml:space="preserve">
         <path class="st1" d="M136.78,91.41l-50.75,50.75c-1.95,1.95-5.12,1.95-7.07,0L30.34,93.54c-1.95-1.95-1.95-5.12,0-7.07l48.63-48.63c1.95-1.95,5.12-1.95,7.07,0l50.75,50.75C137.56,89.37,137.56,90.63,136.78,91.41z"/>
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
