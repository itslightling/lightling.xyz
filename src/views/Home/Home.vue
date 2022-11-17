<template lang='pug'>
TransitionableImage(
  ref='wallpaper',
  class='page-wallpaper',
)
#main
  .nav
    p(
      v-if='cards === undefined'
    ) Loading...
    button(
      v-else,
      v-for='(card, index) in cards',
      :key='`link_${card.title}`',
      @click='() => onNavigate(index)',
      @keyup.enter='() => onNavigate(index)',
    ) {{ card.title }}
  CardEmbed(
    v-if='cards.length > 0',
    :card='cards[selected]',
  )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

.page-wallpaper
  position: absolute
  top: 0
  bottom: 0
  left: 0
  right: 0
  display: block
#main
  position: absolute
  top: 0
  bottom: 0
  left: 0
  right: 0
  display: flex
  grid-gap: 3rem
  flex-direction: column
  justify-content: center
  align-items: center
  .nav
    background-color: #0005
    backdrop-filter: blur(1rem)
    border-radius: 3rem
    display: flex
    grid-gap: 1rem
    width: 70vw
    padding: 0.5rem 3rem
    button
      font-size: 1.25rem
      border-radius: 3rem
      padding: 1rem
      border: none
      box-sizing: border-box
      min-width: 5rem
      text-transform: uppercase
      &:focus
        outline: 0.25rem solid $brand-medium-a
  .card
    height: 50vh
    width: 70vw
</style>

<script lang='ts'>
import { defineComponent, Ref, ref } from 'vue'

import { Card } from '@/types/Card'
import { fetchAndParseContent } from '@/utilities/fetcher'
import CardEmbed from '@/components/Card.vue'
import TransitionableImage from '@/components/TransitionableImage.vue'

export default defineComponent({
  components: {
    CardEmbed,
    TransitionableImage,
  },
  setup () {
    const cards = ref([] as Card[])
    const selected = ref(0)

    return {
      cards,
      selected
    }
  },
  mounted () {
    fetchAndParseContent('/content/info.yml')
    .then((cards) => {
      this.cards = cards as Card[]
      (this.$refs.wallpaper as any).transition(this.cards[0].wallpaper)
    })
  },
  methods: {
    onNavigate(index: number) {
      (this.$refs.wallpaper as any).transition(this.cards[index].wallpaper)
      this.selected = index
    },
  },
})
</script>
