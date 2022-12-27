<template lang='pug'>
.card(
  :id='card.title.replaceAll(" ", "-")',
)
  .content
    .preview
      .image(
        :style=`{
          backgroundImage: card.featured.src,
          backgroundPosition: card.featured.position,
        }`,
      )
      .title
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
        :social='social',
      )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

.card
  position: relative
  padding: 2rem
  grid-gap: 2rem
  background-color: $brand-bright-a
  background-attachment: fixed
  background-size: cover
  border: 1px dotted $brand-dark-a
  border-left: none
  border-right: none
  .content
    grid-gap: 1rem
    overflow: hidden
    .preview
      float: left
      position: relative
      display: block
      width: 25vmin
      height: 25vmin
      margin-right: 1rem
      margin-bottom: 1rem
      .image
        width: 100%
        height: 100%
        border-radius: 1rem
        position: absolute
        background-size: cover
        background-position: center center
        background-repeat: no-repeat
        background-color: $brand-dark-c
        backdrop-filter: blur(0.5rem)
      .title
        position: absolute
        display: flex
        top: 0
        left: 0
        bottom: 0
        right: 0
        h2
          margin: auto
          padding: 0.5rem
          font-size: 1.75rem
          border-radius: 1rem
          background-color: #0009
          color: $brand-bright-a
          width: calc(100% - 2rem)
          word-wrap: break-word
          text-align: center
          backdrop-filter: blur(2px)
    p
      color: $brand-dark-b
      margin-top: 0
      font-size: 1.2rem
      &:nth-last-child(1)
        margin-bottom: 0
    .social
      display: flex
      flex-wrap: wrap
      grid-gap: 1rem
      clear: both
      background-color: $brand-dark-b
      border-radius: 1rem
      padding: 1rem
      .social-button
        flex: 0 0 10vmin

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

@media screen and (max-width: 480px)
  .card
    padding: 0.5rem
    .content
      .text
        p
          font-size: 0.9rem
    .preview
      .image
        border-radius: 0.5rem
</style>

<script lang='ts'>
import {
  defineComponent,
} from 'vue'

import {
  Card,
} from '@/types/Card'

import SocialButton from './SocialButton.vue'

export default defineComponent({
  props: {
    card: {
      type: Object as () => Card,
      required: true,
    },
  },
  components: {
    SocialButton,
  },
  methods: {
    swap () {
      requestAnimationFrame(() => {
        const textContainer = this.$refs.textContainer as HTMLElement
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
