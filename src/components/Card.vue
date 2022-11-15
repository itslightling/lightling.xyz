<template lang='pug'>
.card
  .content
    h2 {{ card.title }}
    p(
      v-for='description in card.description',
      v-html='description'
    )
  .preview
    .image(
      :style='{ backgroundImage: card.backgroundImage }',
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
  background-color: #000a
  backdrop-filter: blur(2rem)
  border-radius: 2rem
  .content
    flex: 1 1 auto
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
import { Card } from '@/types/card/Card'

export default defineComponent({
  props: {
    card: {
      type: Object as () => Card,
      required: true,
    }
  },
})
</script>
