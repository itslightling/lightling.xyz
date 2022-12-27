<template lang='pug'>
#main
  CardEmbed(
    v-for='(card, i) in cards',
    :key='`card_${i}`',
    :card='card',
  )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

#main
  margin-top: 4rem
  overflow-y: scroll
  height: calc(100vh - 4rem)
  .card
    margin: 0 auto 0
    width: 40rem

@media screen and (max-width: 1023px)
  #main
    .card
      width: 75vw

@media screen and (max-width: 640px)
  #main
    display: grid
    grid-template-rows: min-content
    grid-gap: 0.5rem
    .card
      width: calc(100vw - 3rem)
      height: unset
      border-radius: 0.5rem
      align-self: stretch
      margin-bottom: 0.5rem

@media screen and (max-width: 480px)
  #main
    margin-top: 4.5rem
    .card
      width: calc(100vw - 2rem)
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
