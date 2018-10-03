<template>
  <div class="city-item">
    <img class="city-item__logo" v-bind:src="item.city.logo" alt="logo">
    <div class="city-item__triangle"></div>
    <div class="address">
      <div class="address__name"><span class="address__contents">{{ item.city.name }}</span></div>
      <div class="address__phone"><span class="address__contents">{{ item.phone }}</span></div>
      <div class="address__stret"><span class="address__contents">{{ item.street }}</span></div>
      <div class="address__building"><span class="address__contents">{{ item.building }}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  }
}
</script>

<style lang="stylus" scoped>
@import '../variables'

.city-item
  display flex
  position relative
  box-sizing border-box
  width 100%
  font-size 16px
  line-height 24px
  letter-spacing 0.2px
  font-weight 300
  @media (max-width $mobileBreak)
    width auto
    font-size 12px
    line-height 18px
    letter-spacing auto
  &__logo
    position absolute
    top 0
    left 39px
    height 1.6em
    width 1.6em
    @media (max-width $mobileBreak)
      left 0
  &__triangle
    shape-triangle(1.3em, 1.3em, white)
    position absolute
    top 0
    left 0
    transform translate(-100%, -20%)
    @media (max-width $mobileBreak)
      shape-triangle-alt(1em, 1em, white)
      transform translate(-15%, calc(-100% - 4px))

.address
  margin-left 97.7px
  @media (max-width $mobileBreak)
    margin-left 30px
  &__name
    position relative
    font-weight 400
  @media (max-width  $mobileBreak)
    font-size 12px
</style>
