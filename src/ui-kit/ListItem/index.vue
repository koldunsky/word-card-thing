<template>
  <li
    class="list-item"
    data-qa="list-item"
  >
    <span class="word">
      {{ word }}
    </span>
    <span class="translation">
      {{ translation }}
    </span>
    <button
      :tabindex="tabindex"
      class="delete-button"
      v-if="deletable"
      @click="() => deleteWord(id)"
      data-qa="list-item-delete-button"
    />
  </li>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const UserRelatedData = namespace('UserRelatedData')

@Component
  export default class ListItem extends Vue {
  @Prop() private word!: string;
  @Prop() private translation!: string;
  @Prop() private id!: string;
  @Prop() private deletable: boolean
  @Prop() private tabindex: string

  @UserRelatedData.Action
  deleteWord
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
