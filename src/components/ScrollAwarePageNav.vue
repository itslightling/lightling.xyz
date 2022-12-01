<template lang='pug'>
.page-navigator
  .line
  .button(
    v-for='section in sections',
    :key='`nav_${section}`',
  )
    .circle
    span {{ section }}
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

.page-navigator
  width: 2rem
  position: absolute
  top: 25vh
  bottom: 25vh
  left: 8rem
  display: flex
  flex-direction: column
  justify-content: space-between
  .line
    background-color: white
    position: absolute
    top: 0
    bottom: 0
    left: 40%
    right: 40%
  .button
    display: flex
    flex-wrap: nowrap
    align-items: center
    .circle
      width: 2rem
      height: 2rem
      flex: 0 0 2rem
      border-radius: 50%
      background-color: white
      display: inline-block
    span
      white-space: nowrap
</style>

<script lang='ts'>
import { defineComponent, ref, Ref } from 'vue'

export default defineComponent({
  props: {
    sections: {
      type: Array<string>,
      required: true,
    }
  },
  setup () {
    const observer: Ref<IntersectionObserver | undefined> = ref(undefined)
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    }
      
    return {
      observer,
      observerOptions,
    }
  },
  updated () {
    if (this.observer === undefined) {
      this.observer = new IntersectionObserver(this.sectionCallback, this.observerOptions)
    }
    this.observer.disconnect()
    document.querySelectorAll('.card').forEach((card) => this.observer?.observe(card))
  },
  methods: {
    sectionCallback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          console.log(entry.target)
        }
      })
    },
  },
})
</script>
