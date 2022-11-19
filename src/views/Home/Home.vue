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
      :class=`{
        selected: index === selected,
      }`,
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
      flex: 0 0 auto
      padding: 1rem
      color: $brand-dark-b
      border: 0.25rem solid transparent
      outline: 0.25rem solid transparent
      box-sizing: border-box
      min-width: 5rem
      text-transform: uppercase
      background-color: $brand-bright-a
      transition: all 0.25s ease-out
      box-shadow: 0 0.15rem 0.15rem $brand-dark-b
      position: relative
      &:focus
        outline-color: $brand-medium-a
      &:hover
        background-color: $brand-medium-a
      &:active
        background-color: $brand-medium-c
      &.selected
        border-color: $brand-dark-d
        background-color: $brand-dark-d
        color: $brand-bright-a
  .card
    height: 50vh
    width: 70vw

@media screen and (max-width: 1023px)
  #main
    .nav
      grid-gap: 0.25rem
      padding: 0.25rem 1rem
      width: calc(95vw - 2rem)
      justify-content: space-between
      button
        padding: 0.25rem 0.5rem
    .card
      width: calc(95vw - 2rem)
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
