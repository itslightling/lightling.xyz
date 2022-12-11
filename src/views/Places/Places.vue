<template lang='pug'>
#main
  .container
    .place(
      v-for='place in places',
    )
      a(
        v-if='place.url',
        :href='place.url',
        tabindex='-1',
      )
      SocialButton(
        :social='place',
      )
      .expanded-info
        span {{ place.display ? `${place.title} : ${place.display}` : place.title }}
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

#main
  overflow-y: scroll
  height: 100vh
  .container
    margin-top: 8rem
    display: grid
    grid-gap: 2rem
    .place
      position: relative
      display: flex
      align-items: center
      grid-gap: 1rem
      padding: 1rem
      border: 0.25rem solid $brand-medium-a
      background-color: $brand-light-a
      color: $brand-dark-b
      width: 64vmin
      margin: auto
      .social-button
        flex: 0 0 4rem
        width: 4rem
        height: 4rem
      a
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        outline: none
        &:after
          display: none

@media screen and (max-width: 640px)
  #main
    .container
      grid-gap: 1rem
      .place
        width: calc(100% - 4rem)

@media screen and (max-width: 360px)
  #main
    .container
      .place
        grid-gap: 0.5rem
        padding: 0.25rem
        width: calc(100% - 2rem)
</style>

<script lang='ts'>
import {
  Ref, defineComponent, ref,
} from 'vue'

import {
  SocialLink,
} from '@/types/SocialLink'
import {
  fetchAndParseContent,
} from '@/utilities/fetcher'
import SocialButton from '@/components/SocialButton.vue'

export default defineComponent({
  components: {
    SocialButton,
  },
  setup () {
    const places: Ref<Array<SocialLink>> = ref([])

    return {
      places,
    }
  },
  mounted () {
    fetchAndParseContent('/content/places.yml')
      .then((placesInfo) => {
        this.places = (placesInfo as { allPlaces: Array<SocialLink> }).allPlaces
      })
  },
})
</script>
