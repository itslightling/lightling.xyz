<template lang='pug'>
.container
  .primary(
    :style=`{
      backgroundImage: primaryImage?.src,
      backgroundPosition: primaryImage?.position,
    }`,
  )
  .swap(
    v-if='swapImage !== undefined',
  )
    .swapA(
      ref='swapA'
      :style=`{
        backgroundImage: primaryImage?.src,
        backgroundPosition: primaryImage?.position,
      }`,
    )
    .swapB(
      ref='swapB'
      :style=`{
        backgroundImage: swapImage?.src,
        backgroundPosition: swapImage?.position,
      }`,
    )
</template>

<style lang='sass' scoped>
.container
  position: relative
  display: block
  .swap,
  .swapA,
  .swapB,
  .primary
    position: absolute
    display: block
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-size: cover

.transitioning
  .swapA
    animation: fadeIn 1s linear 0s 1 reverse
  .swapB
    animation: fadeIn 1s linear 0s 1

@keyframes fadeIn
  from
    opacity: 0
  to
    opacity: 1
</style>

<script lang='ts'>
import {
  defineComponent, ref,
} from 'vue'

import {
  BackgroundImage,
} from '@/types/BackgroundImage'

export default defineComponent({
  setup () {
    const primaryImage = ref({} as BackgroundImage | undefined)
    const swapImage = ref({} as BackgroundImage | undefined)
    const transitionRef = ref(null as number | null)

    return {
      primaryImage,
      swapImage,
      transitionRef,
    }
  },
  methods: {
    transition(next: BackgroundImage) {
      if (this.primaryImage === undefined) {
        this.primaryImage = next
      } else if (this.transitionRef !== null) {
        this.swapImage = next
      } else {
        (this.$el as HTMLElement).classList.add('transitioning')
        this.transitionRef = setTimeout(() => {
          (this.$el as HTMLElement).classList.remove('transitioning')
          const finalImage = this.swapImage
          this.swapImage = undefined
          this.primaryImage = finalImage
          this.transitionRef = null
        }, 1000)
        this.swapImage = next
      }
    },
  },
})
</script>
