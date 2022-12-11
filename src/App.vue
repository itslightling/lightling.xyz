<template lang='pug'>
SiteNav(
  :image='headerImage',
  :locations=`[
    { url: '/', display: 'Home' },
    { url: '/places', display: 'Places' },
  ]`,
)
#entry
  main
    router-view
</template>

<style lang='sass' scoped>
.header
  position: fixed
  top: 0
  left: 0
  right: 0
  z-index: 999
#entry
  width: 100vw
  height: 100vh
  overflow: hidden
  position: relative
</style>

<script lang='ts'>
import {
  defineComponent,
  ref,
  Ref,
} from 'vue'

import {
  fetchAndParseContent,
} from '@/utilities/fetcher'

import {
  BackgroundImage,
} from '@/types/BackgroundImage'

import SiteNav from '@/components/SiteNav.vue'

export default defineComponent({
  components: {
    SiteNav,
  },
  setup () {
    const headerImage: Ref<BackgroundImage> = ref({} as BackgroundImage)

    return {
      headerImage,
    }
  },
  mounted () {
    fetchAndParseContent('/content/site-config.yml')
      .then((content) => {
        this.headerImage = (content as { logo: BackgroundImage }).logo
      })
  },
})
</script>
