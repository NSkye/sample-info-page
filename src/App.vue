<template>
  <div class='main'>
    <Map />
    <Info />
  </div>
</template>

<script>
import 'fonts/Roboto/stylesheet.css'
import Map from 'components/Map'
import Info from 'components/Info'

export default {
  components: {
    Map, Info
  }
}
</script>

<style lang='stylus' scoped>
  @import '~@/variables'
  .main
    display flex
    flex-direction row
    width 100vw
    height 100vh
    @media (max-width $mobileBreak)
      flex-direction column
</style>

<style lang='stylus'>
  @import '~@/variables'
  // 1rem = 10px with most common screen resolutions
  html
    font-size 10px
    @media (max-width $desktopBreak)
      font-size 7px
      @media (max-width $mobileBreak)
        font-size 9px

  body
    font-family 'Roboto', 'Helvetica', Arial, sans-serif
    overflow-x hidden
</style>
