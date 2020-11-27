<template>
  <div class="list">
    <div class="list__inner">
      <ul class="list__items-wrapper" data-qa="list-wrapper">
        <li
          class="list-item list-heading"
          :class="{
            'list-heading_sorted': sortBy
          }"
        >
          <button
            v-for="value in sortCategories"
            :key="value"
            :tabindex="tabindex"
            @click="() => onSortingChange(value)"
            :class="[value, 'list-heading__item', sortBy === value ? 'list-heading__item_active' : '']"
            :data-qa="`list-sorting-${value}`"
          >
            <span v-t="capitalize(value)" />
            <span
              class="order-icon"
              :class="{
                'order-icon_asc': isASC,
                'order-icon_desc': !isASC,
                'order-icon_hidden': sortBy !== value
              }"
              @click="toggleOrder"
            >
              <span class="order-icon__bar order-icon__bar_first" />
              <span class="order-icon__bar" />
              <span class="order-icon__bar order-icon__bar_last" />
            </span>
          </button>
          <button
            :tabindex="tabindex"
            data-qa="list-sorting-delete-button"
            v-if="sortBy"
            class="delete-button list-heading__reset-button"
            @click="resetSorting"
          />
        </li>
        <li
          class="list-item"
          v-for="w in sortedWords"
          :key="w.id"
          data-qa="list-item"
        >
          <span class="word">
            {{w.word}}
          </span>
          <span class="translation">
            {{w.translation}}
          </span>
          <button
            :tabindex="tabindex"
            class="delete-button"
            v-if="words.length > 3"
            @click="() => deleteWord(w.id)"
            data-qa="list-item-delete-button"
          />
        </li>
      </ul>
      <div v-if="words.length < 4">
        <div
          v-t="'list.notice'"
          class="notice"
        />
        <Button
          data-qa="list-add-more-cta"
          :tabindex="tabindex"
          v-t="'list.addMoreWords'"
          @click="onAddButtonClick"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator'
  import sortBy from 'lodash/sortBy'
  import capitalize from 'lodash/capitalize'
  import reverse from 'lodash/reverse'
  import { namespace } from 'vuex-class'
  import Button from '../../ui-kit/Button/index.vue'
  import Tabindex from '@/mixins/Tabindex.vue'

  const UserRelatedData = namespace('UserRelatedData')
  const NavModule = namespace('NavModule')

  type TSortCategory = 'word' | 'translation'

  @Component({
    components: {
      Button
    }
  })

  export default class List extends Mixins(Tabindex) {
    pageName: TPageName = 'list'

    @UserRelatedData.State
    words

    @UserRelatedData.Action
    deleteWord

    @NavModule.Action
    navigateTo: (id: string) => void

    sortCategories: Array<TSortCategory> = ['word', 'translation']
    sortBy: TSortCategory = this.sortCategories[0]
    isASC: boolean = true;

    toggleOrder () {
      this.isASC = !this.isASC
      console.info('ttt')
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

    onAddButtonClick (e) {
      e.preventDefault()
      this.navigateTo('add')
    }

    get sortedWords () {
      if (!this.sortBy) {
        return this.words
      }

      const sorted = sortBy(this.words, (item) => {
        return item[this.sortBy].toLowerCase()
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
