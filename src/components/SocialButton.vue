<template lang='pug'>
.social-button(
  :class=`{
    'no-link': social.display !== undefined,
  }`,
)
  a.link(
    v-if='social.url',
    :href='social.url',
    :title='social.title',
    :style=`{
      backgroundImage: 'url(' + social.imageHref + ')',
    }`,
    target='_blank',
  )
  .link(
    v-else-if='social.display',
    :title='`${social.title} : ${social.display}`',
    :style=`{
      backgroundImage: 'url(' + social.imageHref + ')',
    }`,
  )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

.social-button
  .link
    width: 100%
    padding-top: 100%
    background-color: white
    background-size: cover
    background-position: center center
    border-radius: 50%
    text-decoration: none
    display: inline-block
    &::after
      display: none
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
