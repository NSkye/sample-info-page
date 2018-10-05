<template>
  <div class='map' ref='map'>
    <div v-if='showFallback' class='map__fallback'>
      <span class='map__fallback-caption'>К сожалению, в данный момент карта недоступна, приносим свои извинения.</span>
    </div>
  </div>
</template>

<script>
import { loadMaps } from 'libs/ymaps'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      mapInstance: null,
      showFallback: false
    }
  },
  computed: {
    ...mapGetters([
      'getMapFocus'
    ])
  },
  async mounted () {
    try {
      this.displayMap(await loadMaps('https://api-maps.yandex.ru/2.1/?lang=ru_RU'))
    } catch (e) {
      console.log('Failed to load maps: ', e)
      return this.displayFallback()
    }
  },
  watch: {
    getMapFocus: function () {
      this.mapInstance && this.getMapFocus && this.mapInstance.setCenter(this.getMapFocus, 12)
    }
  },
  methods: {
    displayFallback () {
      this.showFallback = true
    },
    displayMap (ymaps) {
      // Create map instance with default parameters and assign it to a container
      this.mapInstance = new ymaps.Map(this.$refs.map, {
        center: this.getMapFocus || [55.76, 37.64],
        zoom: 12,
        controls: []
      })
      // Style map according to design
      this.mapInstance
        .panes
        .get('ground')
        .getElement()
        .style.filter = 'grayscale(100%) brightness(20%)'
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~@/variables'

.map
  flex 7 1 1822px
  background-color #4a4a4a
  height 100%
  @media (max-width $mobileBreak)
    height 0
    min-height 60%
  &__fallback
    display flex
    justify-content center
    align-items center
    height 100%
    width 100%
    font-size 3rem
    font-weight bold
    color #2d2d2d
    text-shadow 0 1px 0 rgba(255, 255, 255, 0.1)
  &__fallback-caption
    max-width 80%
</style>
