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
    tabindex='0'
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
    background-color: desaturate(darken($brand-light-a, 10%), 20%)
    position: absolute
    top: 5%
    bottom: 5%
    left: 40%
    right: 40%
  .button
    display: flex
    flex-wrap: nowrap
    align-items: center
    transform: scale(1)
    transition: transform 0.25s cubic-bezier(0,1,.74,1)
    cursor: pointer
    &:focus
      outline: none
      .circle
        outline: 0.25rem solid $brand-medium-a
    .circle
      width: 100%
      padding-top: 100%
      flex: 0 0 100%
      border-radius: 50%
      background-color: $brand-light-a
      display: inline-block
      margin-right: 0.5rem
    span
      white-space: nowrap
      text-transform: capitalize
</style>

<script lang='ts'>
import { defineComponent, ref, Ref } from 'vue'
import { clamp } from '@/utilities/number'

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
    const links: Ref<Map<string, HTMLElement> | undefined> = ref(undefined)
      
    return {
      links,
    }
  },
  mounted () {
    (this.$refs.container as HTMLElement).parentElement?.addEventListener('scroll', this.onScroll)
  },
  updated () {
    if (this.links === undefined) {
      this.links = new Map()
      ;(this.$refs.container as HTMLElement).querySelectorAll('span').forEach((element) => {
        this.links?.set(element.innerHTML.replaceAll(' ', '-'), element.parentElement as HTMLElement)
      })
    }
  },
  methods: {
    onScroll () {
      const links = this.links as Map<string, HTMLElement>
      const parent = (this.$refs.container as HTMLElement).parentElement as HTMLElement
      const minDistance = Math.round(parent.scrollHeight / (links.size))
      const sectionRatios = Array
        .from(document.querySelectorAll(`${this.selector}`))
        .map((element) => ({
          anchor: element,
          scrollAnchor: element.querySelector(`${this.scrollSelectorPath}`),
        }))
        .map((element) => ({
          ratio: Math.abs(
              (element.scrollAnchor as HTMLElement).getBoundingClientRect().top +
              ((element.scrollAnchor as HTMLElement).getBoundingClientRect().height / 2)
            ) / minDistance,
          id: element.anchor.id,
        }))
      links.forEach((element, key) => {
        const section = sectionRatios.find((other) => other.id === key) as { ratio: number }
        element.style.transform = `scale(${clamp(1.5 - (section.ratio * 0.8), 1, 3)})`
      })
    },
    onNavigate (id: string) {
      const route = `#${id.replaceAll(' ', '-')}`
      this.$router.push(route)
      document.querySelector(`${route}${this.scrollSelectorPath}`)?.scrollIntoView({ behavior: 'smooth' })
    },
  },
})
</script>
