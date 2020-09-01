<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  interface IFields {
    word: string;
    translation: string;
  }

  @Component
  export class Hello extends Vue {
    word: string = '';
    translation: string = '';

    resetField (name: string) {
      this[name] = ''
    }

    resetForm () {
      this.word = ''
      this.translation = ''
    }
  }
</script>
