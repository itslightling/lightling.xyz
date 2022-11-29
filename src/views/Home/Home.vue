<template lang='pug'>
#main
  CardEmbed(
    v-for='(card, i) in cards'
    :key='`card_${i}`'
    :card='card',
  )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

#main
  overflow-y: scroll
  height: 100vh
  .card
    margin: auto
    height: 50vh
    width: 70vw

@media screen and (max-width: 1023px)
  #main
    .card
      width: calc(95vw - 2rem)

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
</style>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

import { Card } from '@/types/Card'
import { fetchAndParseContent } from '@/utilities/fetcher'
import CardEmbed from '@/components/Card.vue'

export default defineComponent({
  components: {
    CardEmbed,
  },
  setup () {
    const cards = ref([] as Card[])

    return {
      cards,
    }
  },
  mounted () {
    fetchAndParseContent('/content/info.yml')
    .then((cards) => {
      this.cards = cards as Card[]
    })
  },
})
</script>
