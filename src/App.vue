<template>
  <div id="app">
    <div id="nav"
         class="nav"
         :class="{
          'nav_visible': $store.state.words.length >= 3
         }"
    >
      <button
        v-for="page in pages"
        class="nav-item"
        :class="{
          'nav-item_active': currentPage === page
        }"
        :key="page"
        @click="() => setActivePage(page)"
      >
        {{page}}
      </button>
    </div>
    <div
      class="scroller"
      ref="scroller"
      @scroll="onScrollerScroll"
    >
      <div class="scroller__inner">
        <Add />
        <Drill />
        <List />
      </div>
    </div>
    <UpdateChecker />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import _debounce from 'lodash/debounce'
  import Add from './pages/Add/Add.vue'
  import Drill from './pages/Drill/index.vue'
  import List from './pages/List/index.vue'
  import UpdateChecker from './components/updateChecker/index.vue'

  @Component({
    components: {
      UpdateChecker,
      Add,
      Drill,
      List
    }
  })
  export default class App extends Vue {
    $refs: {
      scroller: HTMLDivElement
    }

    pages: string[] = ['Add', 'Drill', 'List']
    currentPage: string = 'Add'

    get currentPageIndex () {
      return this.pages.indexOf(this.currentPage)
    }

    get scrollerWidth () {
      return this.$refs.scroller.offsetWidth
    }

    setActivePage (page: string) {
      const { scroller } = this.$refs
      const index = this.pages.indexOf(page)

      scroller.scrollTo({
        top: 0,
        left: this.scrollerWidth * index,
        behavior: 'smooth'
      })
      this.currentPage = page
    }

    fixScrollerScroll (e) {
      const index = Math.round(e.target.scrollLeft / this.scrollerWidth)

      this.setActivePage(this.pages[index])
    }

    onScrollerScroll = _debounce(this.fixScrollerScroll, 50)
  }
</script>
<style lang="scss" src="./assets/style/index.scss" ></style>
