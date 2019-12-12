<template>
  <div
    id="nav"
    class="nav"
    :class="{
        'nav_visible': words.length >= 3
      }"
  >
    <div class="nav__container">
      <button
        v-for="name in pages"
        :key="name"
        class="nav__item"
        :class="{
          'nav__item_active': currentPage === name
        }"
        @click="navigateTo(name)"
      >
        <component
          :is="name === 'drill' ? 'BrainIcon' : 'span'"
          :class="`nav__item-icon nav__item-icon_${name}`"
        ></component>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { State, namespace } from 'vuex-class'
  import { TPageName } from '../../types'
  import BrainIcon from '../../assets/icons/brain.svg'

  const NavModule = namespace('NavModule')

  @Component({
    components: {
      BrainIcon
    }
  })
  export default class Nav extends Vue {
    @State('words') words: any

    @NavModule.State
    currentPage: TPageName;

    @NavModule.State
    pages: Array<TPageName>;

    @NavModule.Mutation
    private navigateTo!: (page: TPageName) => void
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
