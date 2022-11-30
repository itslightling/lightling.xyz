<template lang='pug'>
.card(
  :style=`{
    backgroundImage: card.wallpaper.src,
    backgroundPosition: card.wallpaper.position,
  }`,
)
  .content
    .text(
      ref='textContainer',
    )
      h2 {{ card.title }}
      p(
        v-for='description in card.description',
        v-html='description',
      )
    .social(
      v-if='card.social',
    )
      SocialButton(
        v-for='social in card.social',
        :social='social'
      )
  .preview
    .image(
      :style=`{
        backgroundImage: card.featured.src,
        backgroundPosition: card.featured.position,
      }`,
    )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

.card
  position: relative
  padding: 2rem
  grid-gap: 2rem
  background-color: #0005
  background-attachment: fixed
  background-size: cover
  border-radius: 2rem
  margin: 25vmin auto 0
  box-shadow: 0 0.25rem 1rem 0 #0009
  .content
    display: flex
    flex-direction: column
    justify-content: space-between
    grid-gap: 1rem
    overflow: hidden
    .text,
    .social
      background-color: #0009
      backdrop-filter: blur(0.5rem)
      border-radius: 1rem
      padding: 1rem
    .text
      position: relative
      h2
        color: $brand-light-b
        text-transform: capitalize
      p
        color: $brand-bright-a
        text-shadow: 0.05rem 0.05rem 0.05rem $brand-dark-b
        font-size: 1.2rem
        &:nth-last-child(1)
          margin-bottom: 0
    .social
      display: flex
      flex-wrap: wrap
      grid-gap: 1rem
      .social-button
        flex: 0 0 10vmin
  .preview
    position: absolute
    display: block
    margin-left: auto
    margin-right: auto
    left: 0
    right: 0
    width: 25vmin
    top: -12.5vmin
    height: 25vmin
    .image
      border-radius: 2rem
      display: block
      width: 100%
      height: 100%
      background-size: cover
      background-position: center center
      background-repeat: no-repeat
      background-color: #0009
      backdrop-filter: blur(0.5rem)
      box-shadow: 0 0.25rem 0.25rem 0 #0009

@media screen and (max-width: 1023px)
  .card
    padding: 1rem
    grid-gap: 0.5rem
    .content
      .social
        grid-gap: 0.25rem

@media screen and (max-width: 640px)
  .card
    .content
      .text
        padding-top: 12.5vmin
        h2
          text-align: center
      .social

        .social-button
          flex: 0 0 15vmin
</style>

<script lang='ts'>
import { defineComponent } from 'vue'

import { Card } from '@/types/Card'
import SocialButton from './SocialButton.vue'

export default defineComponent({
  props: {
    card: {
      type: Object as () => Card,
      required: true,
    }
  },
  components: {
    SocialButton,
  },
  methods: {
    swap () {
      requestAnimationFrame(() => {
        const textContainer = this.$refs.textContainer as any
        if (textContainer.scrollHeight > textContainer.clientHeight) {
          textContainer.classList.add('scroller')
        } else {
          textContainer.classList.remove('scroller')
        }
      })
    },
  },
})
</script>
