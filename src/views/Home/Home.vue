<template lang='pug'>
#main(
)
  CardEmbed(
    v-for='card in cards'
    :key='card.title'
    :card='card'
  )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

#main
  position: absolute
  top: 0
  bottom: 0
  left: 0
  right: 0
  display: flex
  background-color: black
  background-size: cover
  background-position: center center
  justify-content: center
  align-items: center
  .card
    height: 80vh
    width: 80vw
</style>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

import { Card } from '@/types/card/Card'
import { fetchAndParseContent } from '@/utilities/fetcher'
import CardEmbed from '@/components/Card.vue'

export default defineComponent({
  components: {
    CardEmbed,
  },
  setup () {
    const cards = ref([] as Card[])

    return {
      cards
    }
  },
  mounted () {
    fetchAndParseContent('/content/info.yml')
    .then((cards) => {
      this.cards = cards as Card[]
      console.log(this.cards)
    })
  },
})
</script>
