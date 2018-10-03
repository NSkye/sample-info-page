<template>
  <ul class="city-list">
    <li v-for="(item, index) in addresses" :key='index' class="city-list__item">
      <CityItem :item='item' :itemKey='index' />
    </li>
  </ul>
</template>

<script>
import CityItem from './CityItem'
import { addresses } from '../app.config'

export default {
  data () {
    return {
      addresses
    }
  },
  components: {
    CityItem
  }
}
</script>

<style lang="stylus" scoped>
@import '../variables'

.city-list
  display flex
  flex-direction column
  destyle-list()
  @media (max-width $mobileBreak)
    flex-direction row
  &__item
    margin-bottom 2.4rem
    @media (max-width $mobileBreak)
      margin-bottom 0
      margin-right 1.5rem
    &:last-child
      margin-bottom 0
      @media (max-width $mobileBreak)
        margin-right 0
</style>
