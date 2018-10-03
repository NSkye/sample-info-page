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
  font-size 1.6rem
  line-height 2.4rem
  letter-spacing .02rem
  font-weight 300
  @media (max-width $mobileBreak)
    width auto
    font-size 1.2rem
    line-height 1.8rem
    letter-spacing auto
  &__logo
    position absolute
    top 0
    left 3.9rem
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
      transform translate(-15%, calc(-100% - .4rem))

.address
  margin-left 9.77rem
  @media (max-width $mobileBreak)
    margin-left 3rem
  &__name
    position relative
    font-weight 400
  @media (max-width  $mobileBreak)
    font-size 1.2rem
</style>
