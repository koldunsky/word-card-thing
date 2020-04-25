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
        <span class="nav__item-icon-container">
          <span :class="`nav__item-icon nav__item-icon_${name}`"/>
          <PointingDot
            v-if="pointingDots[name]"
          />
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { State, namespace } from 'vuex-class'
  import { TPageName } from '@/types'
  import { TPointingDots } from '@/entities/nav'
  import PointingDot from '../../ui-kit/PointingDot/index.vue'
  import BrainIcon from '../../assets/icons/brain.svg'

  const NavModule = namespace('NavModule')

  @Component({
    components: {
      BrainIcon,
      PointingDot
    }
  })
  export default class Nav extends Vue {
    @State('words') words: any

    @NavModule.State
    currentPage: TPageName;

    @NavModule.State
    pages: Array<TPageName>;

    @NavModule.State
    pointingDots: TPointingDots;

    @NavModule.Action
    navigateTo: (page: TPageName) => void
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
