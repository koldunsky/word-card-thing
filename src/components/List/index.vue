<template>
  <div class="list">
    <div class="list__inner">
      <ul class="list__items-wrapper">
        <li
          class="list-item list-heading"
          :class="{
            'list-heading_sorted': sortBy
          }"
        >
          <span
            v-for="value in sortCategories"
            :key="value"
            @click="() => onSortingChange(value)"
            :class="[value, 'list-heading__item', sortBy === value ? 'list-heading__item_active' : '']"
          >
            <span v-t="capitalize(value)" />
            <span
              class="order-icon"
              :class="{
                'order-icon_asc': isASC,
                'order-icon_desc': !isASC,
                'order-icon_hidden': sortBy !== key
              }"
              @click="toggleOrder"
            >
              <span class="order-icon__bar order-icon__bar_first" />
              <span class="order-icon__bar" />
              <span class="order-icon__bar order-icon__bar_last" />
            </span>
          </span>
          <button
            v-if="sortBy"
            class="delete-button list-heading__reset-button"
            @click="resetSorting"
          >
            x
          </button>
        </li>
        <li
          class="list-item"
          v-for="w in sortedWords"
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
      <i18n
        path="list.addMore"
        tag="div"
        class="notice"
        v-if="words.length < 4"
      >
        <template v-slot:addLinkText>
          <LocalLink to="add" v-t="'list.addLinkText'" />
        </template>
        <template v-slot:moreThanThree>
          <b v-t="'list.moreThanThree'"/>
        </template>
      </i18n>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import sortBy from 'lodash/sortBy'
  import capitalize from 'lodash/capitalize'
  import reverse from 'lodash/reverse'
  import {
    Action,
    State
  } from 'vuex-class'
  import LocalLink from '../../ui-kit/Link/index.vue'

  type TSortCategory = 'word' | 'translation'

  @Component({
    components: {
      LocalLink
    }
  })

  export default class List extends Vue {
    @State('words') words: any
    @Action('deleteWord') deleteWord: any

    sortBy: TSortCategory = null
    sortCategories: Array<TSortCategory> = ['word', 'translation']
    isASC: boolean = true;

    toggleOrder () {
      this.isASC = !this.isASC
    }

    resetOrder () {
      this.isASC = true
    }

    resetSorting () {
      this.sortBy = null
      this.resetOrder()
    }

    onSortingChange (type) {
      if (this.sortBy === type) {
        this.toggleOrder()
      } else {
        this.sortBy = type
        this.resetOrder()
      }
    }

    get sortedWords () {
      const sorted = sortBy(this.words, (item) => {
        return item[this.sortBy]
      })

      if (!this.isASC) {
        reverse(sorted)
      }

      return sorted
    }

    capitalize = capitalize
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
