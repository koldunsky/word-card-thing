<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const NavModule = namespace('NavModule')

  interface IFields {
    word: string;
    translation: string;
  }

  @Component
  export default class Tabindex extends Vue {
    pageName: TPageName = null

    @NavModule.State
    currentPage

    getTabindex () {
      return this.currentPage !== this.pageName ? '-1' : '0'
    }

    get tabindex () {
      return this.getTabindex()
    }
  }
</script>
