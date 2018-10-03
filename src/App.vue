<template>
  <div class="main">
    <Map></Map>
    <Info></Info>
  </div>
</template>

<script>
import './fonts/Roboto/stylesheet.css'
import Map from './components/Map'
import Info from './components/Info'

export default {
  components: {
    Map, Info
  }
}
</script>

<style lang="stylus" scoped>
  @import './variables'
  .main
    display flex
    flex-direction row
    width 100vw
    height 100vh
    @media (max-width $mobileBreak)
      flex-direction column
</style>

<style lang="stylus">
  body
    font-family 'Roboto', 'Helvetica', Arial, sans-serif
</style>
