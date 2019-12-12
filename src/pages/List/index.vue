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
        Go on! <LocalLink v-on:navigation="onNav" to="add">Add</LocalLink> more words to the list. <br>
        Words may be deleted if there is <b>more than 3 words</b> in the list.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import {
    Action,
    State
  } from 'vuex-class'
  import LocalLink from '../../components/Link/index.vue'

  @Component({
    components: {
      LocalLink
    }
  })

  export default class List extends Vue {
    @State('words') words: any
    @Action('deleteWord') deleteWord: any

    onNav () {
      console.warn(11)
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
