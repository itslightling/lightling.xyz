<template lang='pug'>
.container
  .primary(
    :style=`{
      backgroundImage: primaryImage?.src,
      backgroundPosition: primaryImage?.position,
    }`,
  )
  .swap
</template>

<style lang='sass' scoped>
.container
  position: relative
  display: block
  .primary
    position: absolute
    display: block
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-size: cover
</style>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

import { BackgroundImage } from '@/types/BackgroundImage'

export default defineComponent({
  setup () {
    const primaryImage = ref({} as BackgroundImage)
    const swapImage = ref({} as BackgroundImage)

    return {
      primaryImage,
      swapImage,
    }
  },
  methods: {
    transition(next: BackgroundImage) {
      this.primaryImage = next
    },
  },
})
</script>
