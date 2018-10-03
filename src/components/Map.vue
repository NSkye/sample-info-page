<template>
  <div class="map">
  </div>
</template>

<style lang="stylus" scoped>
@import '../variables'

.map
  flex-grow 7
  flex 7 1 1822px
  background-color #4a4a4a
  height 100%
  @media (max-width $mobileBreak)
    height 0
    min-height 60%
</style>
