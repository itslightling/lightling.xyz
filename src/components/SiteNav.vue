<template lang='pug'>
.header
  .photo-button(
    :style=`{
      backgroundImage: image.src,
      backgroundPosition: image.position,
    }`,
  )
  a(
    v-for:='location in locations'
    :href='`${location.url}`',
  ) {{ location.display }}
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

.header
  background-color: $brand-dark-a
  display: flex
  align-items: center
  grid-gap: 1rem
  height: 4rem
  box-shadow: 0 0 0.5rem 0.15rem black
  .photo-button
    flex: 0 0 3.5rem
    height: 3.5rem
    width: 3.5rem
    border-radius: 50%
    margin-left: 1rem
    background-size: contain
    background-color: $brand-bright-a
  a
    font-size: 1.5rem
    color: $brand-bright-a
    margin: 0
    transition: all 0.5s cubic-bezier(0,1,.74,1)
    padding: 0.25rem
    &:hover
      text-shadow: 0 0 0.5rem $brand-dark-b, 0 0 0.25rem $brand-bright-a
</style>

<script lang='ts'>
import { defineComponent } from 'vue'

import { BackgroundImage } from '@/types/BackgroundImage'
import { GenericLink } from '@/types/SocialLink'

export default defineComponent({
  props: {
    image: {
      type: Object as () => BackgroundImage,
      required: true,
    },
    locations: {
      type: Array<GenericLink>,
      required: true,
    },
  },
})
</script>
