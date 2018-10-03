<template>
  <div role="button" aria-label="navigation" class="menu-button" v-bind:class="{ ['menu-button--active']: active }">
    <div class="menu-button__element"></div>
  </div>
</template>

<script>
export default {
  props: {
    active: Boolean
  },
  created () {
    console.log(this.active)
  }
}
</script>

<style lang="stylus" scoped>
@import '../variables'

$time = .2s
d2(a)
  a / 2
animate-backwards(function, timing)
  transition top d2(timing) function d2(timing), transform d2(timing) function, opacity d2(timing) function
animate-forwards(function, timing)
  transition top d2(timing) function, transform d2(timing) function d2(timing), opacity d2(timing) function d2(timing)
deploy-el(m, time)
  content ""
  position absolute
  box-sizing border-box
  height 2px
  width 100%
  background #00e0a9
  top m
  animate-backwards(ease, time)
set-btn-size(s)
  height s
  width s

.menu-button
  set-btn-size(27px)
  margin-right 10px
  position relative
  display none
  @media (max-width $mobileBreak)
    display block
  &:hover
    cursor pointer
  &::before
    deploy-el(0, $time)
  &__element
    deploy-el(50%, $time)
    transform translate(0, -50%)
  &::after
    deploy-el(calc(100% - 2px), $time)
  &--active
    &::before, &::after, &>.menu-button__element
      top 50%
      animate-forwards(ease, $time)
    &::before
      transform rotate(45deg)
    &::after
      transform rotate(-45deg)
    &>.menu-button__element
      opacity 0
</style>
