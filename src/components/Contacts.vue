<template>
  <div class="contact-info">
    <p v-for='(item, index) in contactInformation' v-bind:key='index' v-html='item' class="contact-info__item"></p>
  </div>
</template>

<script>
import { contactInformation } from 'config'

export default {
  data () {
    return {
      contactInformation
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/variables'

.contact-info
  display flex
  flex-direction column
  font-weight 300
  font-size 1.6rem
  &__item
    margin 0
    margin-bottom 1.4rem
    max-width 50%
    &:last-child
      margin-bottom 0
    @media (max-width $mobileBreak)
      max-width 32rem
      font-size 1.2rem
</style>
