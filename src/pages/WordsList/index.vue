<template>
  <div class="words-list">
    <div class="words-list__inner">
      <ul>
        <li
          class="list-item"
          v-for="w in words"
          :key="w.id"
        >
          <span class="word">
            {{w.word}}
          </span>
          <span class="translation">
            {{w.translation}}
          </span>
          <button
            class="delete-button"
            v-if="words.length > 3"
            @click="() => deleteWord(w.id)"
          >
            x
          </button>
        </li>
      </ul>
    </div>
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
