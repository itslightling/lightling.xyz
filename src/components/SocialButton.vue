<template lang='pug'>
.social-button
  a(
    v-if='social.url',
    :href='social.url',
    :title='social.title',
    :style=`{
      backgroundImage: 'url(' + social.imageHref + ')',
    }`,
    target='_blank',
  )
  .no-link(
    v-else-if='social.display',
  )
    div(
      :title='social.title',
      :style=`{
        backgroundImage: 'url(' + social.imageHref + ')',
      }`,
    )
    span {{ social.display }}
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

.social-button
  a
    width: 4rem
    height: 4rem
    background-color: white
    background-size: cover
    background-position: center center
    border-radius: 50%
    text-decoration: none
    display: inline-block
    &::after
      display: none
  .no-link
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    div
      width: 4rem
      height: 4rem
      background-color: white
      background-size: cover
      background-position: center center
      border-radius: 50%
      text-decoration: none
    span
      text-align: center
      background-color: transparentize($brand-dark-b, 0.25)
      padding: 0.25rem
      border-radius: 0.25rem
      backdrop-filter: blur(2rem)
</style>

<script lang='ts'>
import { defineComponent } from 'vue'

import { SocialLink } from '@/types/SocialLink'

export default defineComponent({
  props: {
    social: {
      type: Object as () => SocialLink,
      required: true,
    }
  }
})
</script>
