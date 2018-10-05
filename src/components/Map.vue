<template>
  <div class='map' ref='map'>
    <div v-if='showFallback' class='map__fallback'>
      <span class='map__fallback-caption'>К сожалению, в данный момент карта недоступна, приносим свои извинения.</span>
    </div>
  </div>
</template>

<script>
import { loadMaps, openBalloon } from 'libs/ymaps'
import { logo } from 'config'
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
      'getDisplayedBalloon'
    ]),
    balloonContents () {
      const icon = this.getDisplayedBalloon.icon
      return `
        <div class='balloon-contents'>
          <img class='balloon-contents__icon' src='${icon}' alt='city emblem'>
          <img class='balloon-contents__logo' src='${logo.file}' alt='HPMD Network'>
        </div>
      `
    }
  },
  async mounted () {
    try {
      this.displayMap(await loadMaps('https://api-maps.yandex.ru/2.1/?lang=ru_RU'))
      this.displayBalloon()
    } catch (e) {
      console.log('Failed to load maps: ', e)
      return this.displayFallback()
    }
  },
  watch: {
    getDisplayedBalloon: function () {
      this.displayBalloon()
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
    },
    displayBalloon () {
      if (!this.mapInstance || !this.getDisplayedBalloon) { return null }
      const { coordinates, icon } = this.getDisplayedBalloon
      this.mapInstance.setCenter(coordinates, 12)
      openBalloon(this.mapInstance, coordinates, this.balloonContents, icon)
    }
  }
}
</script>

<style lang='stylus'>
.balloon-contents
  position relative
  display flex
  box-sizing border-box
  flex-direction column
  justify-content flex-end
  align-items center
  height 100px
  width 185px
  padding-bottom 8px
  &__icon
    position absolute
    top 0
    left 0
    height 20%
    transform translate(-100%, 0)
  &__logo
    width 80%
</style>

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
