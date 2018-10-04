<template>
  <header class="header">
    <div class="header__logo">
      <NavButton v-on:click.native='handleNavButton' :active='navIsOpen' /><img v-bind:src='logo.file' v-once alt='HPMD Network'>
    </div>
    <transition name='nav-in'>
      <Navigation v-show='navShouldBeVisible' class='header__navigation' />
    </transition>
  </header>
</template>

<script>
import { logo } from 'config'
import Navigation from 'components/Navigation'
import NavButton from 'components/NavButton'

export default {
  data () {
    return {
      logo,
      navIsOpen: false,
      navShouldBeVisible: true
    }
  },
  components: {
    Navigation,
    NavButton
  },
  methods: {
    setNavStatus () {
      if (window.innerWidth > 970 || this.navIsOpen) {
        this.navShouldBeVisible = true
      } else {
        this.navShouldBeVisible = false
      }
    },
    handleNavButton () {
      this.navIsOpen = !this.navIsOpen
      this.setNavStatus()
    }
  },
  created () {
    this.setNavStatus()
    window.addEventListener('resize', this.setNavStatus)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/variables'

.header
  margin-left 9.77rem
  @media (max-width $mobileBreak)
    margin 0
  &__logo
    display flex
    @media (max-width $mobileBreak)
      position fixed
      top 1.5rem
      left 1.5rem
      z-index 2
  &__navigation
    margin-top 6.77rem
    @media (max-width $mobileBreak)
      position fixed
      display flex
      align-items center
      justify-content center
      top 0
      left 0
      margin 0
      width 100vw
      height 100vh
      background rgba(255,255,255,1)
      z-index 1

.nav-in-enter-active
  animation bounce-in .2s
.nav-in-leave-active
  animation bounce-in .2s reverse

@keyframes bounce-in
  0%
    transform scale(1)
    background rgba(255,255,255,0)
  50%
    transform scale(1.5)
  100%
    transform scale(1)
</style>
