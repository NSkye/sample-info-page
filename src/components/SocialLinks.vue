<template>
  <ul class="social-info">
    <li class="social-info__item" v-for='(item, index) in socialInformation' :key='index'>
      <a v-bind:href="item.link"><img v-bind:src="item.logo" v-bind:alt="item.name"></a>
    </li>
  </ul>
</template>

<script>
import { socialInformation } from '../app.config'

export default {
  data () {
    return {
      socialInformation
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../variables'

.social-info
  destyle-list()
  display flex
  flex-direction row
  justify-content space-between
  height 2.6rem
  &__item
    height 100%
    width 2.6rem
    &>a
      height 100%
      width 100%
      display flex
      justify-content center
      &>img
        height 100%
</style>
