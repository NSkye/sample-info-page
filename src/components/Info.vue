<template>
  <div class="info">
    <div class="info__aside">
      <div class="info__logo">
        <img v-bind:src='logo.file' v-once alt='HPMD LOGO'>
      </div>
      <Navigation class='info__navigation' />
    </div>
    <div class="info__contents">
      <CityList class="info__city-list" />
      <footer class="info__footer">
        <Contacts class="info__contacts" />
        <SocialLinks class="info__social-links" />
      </footer>
    </div>
  </div>
</template>

<script>
import { logo } from '../app.config'
import Navigation from './Navigation'
import CityList from './CityList'
import Contacts from './Contacts'
import SocialLinks from './SocialLinks'

export default {
  data () {
    return {
      logo
    }
  },
  components: {
    Navigation,
    CityList,
    Contacts,
    SocialLinks
  }
}
</script>

<style lang="stylus" scoped>
@import '../variables'
.info
  box-sizing border-box
  display flex
  flex-direction column
  justify-content space-between
  flex 3 3 738px
  height 100%
  min-width 475px
  padding-top 35px
  background-color white
  @media (max-width $mobileBreak)
    justify-content flex-start
    padding-top 5px
    padding-left 15px
    padding-right 15px
    width 100%
    min-width 0
    height auto
    min-height 40%
  &__contents
    width 100%
  &__logo
    margin-left 97.7px
    @media (max-width $mobileBreak)
      position absolute
      margin 0
      top 15px
      left 15px
  &__navigation
    margin-left 97.7px
    margin-top 62.3px
    @media (max-width $mobileBreak)
      position absolute
      top 0
      left 0
      margin 0
      width 100%
      height 100%
      background white
      display flex
      align-items center
      justify-content center
      display none
  &__city-list
    margin-bottom 72px
    @media (max-width $mobileBreak)
      margin-bottom 20px
  &__footer
    display flex
    flex-direction column
  &__contacts
    margin-left 97.7px
    margin-bottom 30px
    @media (max-width $mobileBreak)
      margin-left 30px
  &__social-links
    margin-left 97.7px
    max-width 40%
    margin-bottom 35px
    @media (max-width $mobileBreak)
      margin-left 0
      align-self center
      max-width 70%
      width 70%
</style>
