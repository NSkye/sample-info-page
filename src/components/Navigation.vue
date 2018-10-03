<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li v-for='(item, index) in navigation' v-bind:key='index' class="navigation__item">
        <a v-bind:href='item.link' class="navigation__link" v-bind:class="item.link == '/' ? 'navigation__link--current' : ''"> {{ item.name }} </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { navigation } from '../app.config'

export default {
  data () {
    return {
      navigation
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../variables'

.navigation
  font-size 2.13rem
  line-height 4.67rem
  letter-spacing .267rem
  &__list
    destyle-list()
  &__item
    padding 0
    margin 0
  &__link
    text-decoration none
    color inherit
    font-weight 300
    &--current
      font-weight 400
</style>
