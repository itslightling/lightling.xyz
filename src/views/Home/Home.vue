<template lang='pug'>
#main
  ScrollAwarePageNav(
    :sections='nav',
    selector='.card',
    scrollSelectorPath=' .image',
  )
  CardEmbed(
    v-for='(card, i) in cards',
    :key='`card_${i}`',
    :card='card',
  )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

#main
  overflow-y: scroll
  height: 100vh
  .page-navigator
    width: 2rem
    position: absolute
    top: 25vh
    bottom: 25vh
    left: 4vmax
  .card
    margin: 25vmin auto 0
    width: 40rem
    &:nth-last-child(1)
      margin-bottom: 25vmin

@media screen and (max-width: 1023px)
  #main
    .card
      margin-left: auto
      margin-right: 0
      width: 75vw

@media screen and (max-width: 860px)
  #main
    .page-navigator
      left: 0.5vmax
      width: 1rem
      font-size: 0.8rem

@media screen and (max-width: 640px)
  #main
    display: grid
    grid-template-rows: min-content
    grid-gap: 0.5rem
    .page-navigator
      display: none
    .card
      margin-right: auto
      width: calc(100vw - 3rem)
      height: unset
      border-radius: 0.5rem
      align-self: stretch
      margin-bottom: 0.5rem

@media screen and (max-width: 480px)
  #main
    padding-top: 25vmin
    .card
      width: calc(100vw - 2rem)
      margin-top: 15vmin
</style>

<script lang='ts'>
import {
  defineComponent,
  ref,
} from 'vue'

import {
  Card,
} from '@/types/Card'

import {
  fetchAndParseContent,
} from '@/utilities/fetcher'

import CardEmbed from '@/components/Card.vue'
import ScrollAwarePageNav from '@/components/ScrollAwarePageNav.vue'

export default defineComponent({
  components: {
    CardEmbed,
    ScrollAwarePageNav,
  },
  setup () {
    const cards = ref([] as Card[])
    const nav = ref([] as string[])

    return {
      cards,
      nav,
    }
  },
  mounted () {
    fetchAndParseContent('/content/info.yml')
      .then((cards) => {
        this.cards = cards as Card[]
        this.nav = (cards as Card[]).map((card) => card.title)
      })
  },
})
</script>
