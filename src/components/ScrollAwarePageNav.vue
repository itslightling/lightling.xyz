<template lang='pug'>
.page-navigator(
  ref='container',
)
  .line
  .button(
    v-for='section in sections',
    :key='`nav_${section}`',
    @click='() => onNavigate(section)',
    @keyup.enter='() => onNavigate(section)',
  )
    .circle
    span {{ section }}
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

.page-navigator
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
    transform: scale(1)
    transition: transform 0.25s cubic-bezier(0,1,.74,1)
    cursor: pointer
    &.current
      transform: scale(2)
    .circle
      width: 2rem
      height: 2rem
      flex: 0 0 2rem
      border-radius: 50%
      background-color: white
      display: inline-block
      margin-right: 0.5rem
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
    },
    selector: {
      type: String,
      required: true,
    },
    scrollSelectorPath: {
      type: String,
      required: false,
    }
  },
  setup () {
    const observer: Ref<IntersectionObserver | undefined> = ref(undefined)
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    }
    const links: Ref<Map<string, HTMLElement> | undefined> = ref(undefined)
      
    return {
      links,
      observer,
      observerOptions,
    }
  },
  updated () {
    if (this.links === undefined) {
      this.links = new Map()
      ;(this.$refs.container as HTMLElement).querySelectorAll('span').forEach((element) => {
        this.links?.set(element.innerHTML, element.parentElement as HTMLElement)
      })
    }
    if (this.observer === undefined) {
      this.observer = new IntersectionObserver(this.sectionCallback, this.observerOptions)
    }
    this.observer.disconnect()
    document.querySelectorAll(this.selector).forEach((card) => this.observer?.observe(card))
  },
  methods: {
    sectionCallback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
      let intersectingEntry = entries.find((entry) => entry.isIntersecting)
      if (!!intersectingEntry){
        this.links?.forEach((element, key) => {
          if (intersectingEntry?.target.id === key) {
            element.classList.add('current')
          } else {
            element.classList.remove('current')
          }
        })
      }
    },
    onNavigate(id: string) {
      const route = `#${id.replaceAll(' ', '-')}`
      this.$router.push(route)
      document.querySelector(`${route}${this.scrollSelectorPath}`)?.scrollIntoView({ behavior: 'smooth' })
    },
  },
})
</script>
