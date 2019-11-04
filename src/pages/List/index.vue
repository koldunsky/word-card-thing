<template>
  <div class="list">
    <div class="list__inner">
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
      <div
        v-if="words.length < 4"
        class="notice"
      >
        Go on! <router-link to="/">Add</router-link> more words to the list. <br>
        Words may be deleted if there is <b>more than 3 words</b> in the list.
      </div>
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
