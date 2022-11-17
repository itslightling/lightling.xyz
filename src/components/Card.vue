<template lang='pug'>
.card
  .content
    .text
      h2 {{ card.title }}
      p(
        v-for='description in card.description',
        v-html='description',
      )
    .social(
      v-if='card.social',
    )
      SocialButton(
        v-for='social in card.social',
        :social='social'
      )
  .preview
    .image(
      :style=`{
        backgroundImage: card.featured.src,
        backgroundPosition: card.featured.position,
      }`,
    )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

.card
  padding: 3rem
  grid-gap: 3rem
  display: flex
  justify-content: space-between
  align-items: flex-start
  background-color: #0005
  backdrop-filter: blur(1rem)
  border-radius: 2rem
  overflow: hidden
  max-height: 100%
  .content
    flex: 1 1 auto
    display: flex
    flex-direction: column
    justify-content: space-between
    height: 100%
    overflow: hidden
    .text
      overflow-y: auto
      height: calc(100% - 7rem)
      h2
        color: $brand-light-b
        text-transform: capitalize
      p
        color: $brand-bright-a
    .social
      display: flex
      flex-wrap: wrap
      grid-gap: 1rem
  .preview
    flex: 0 0 40%
    display: block
    height: 100%
    .image
      border-radius: 2rem
      display: block
      width: 100%
      height: 100%
      background-size: cover
      background-position: center center
</style>

<script lang='ts'>
import { defineComponent } from 'vue'

import { Card } from '@/types/Card'
import SocialButton from './SocialButton.vue';

export default defineComponent({
  props: {
    card: {
      type: Object as () => Card,
      required: true,
    }
  },
  components: {
    SocialButton,
  }
})
</script>
