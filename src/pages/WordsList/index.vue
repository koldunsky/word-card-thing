<template>
  <div class="words-list">
    <ul>
      <li
        class="list-item"
        v-for="(w, i) in words"
        :key="w.id"
      >
       {{i}}) {{w.word}} | {{w.translation}}
        <button
          v-if="words.length > 3"
          @click="() => deleteWord(w.id)"
        >
          x
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import {
    Mutation,
    State
  } from 'vuex-class'

  @Component
  export default class SomeComponent extends Vue {
    @State('words') words: any
    @Mutation('deleteWord') deleteWord: any
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
