import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityItems: []
  },
  mutations: {
    /**
     * Adds city item to global state, which contains only 2 values: item's unique key and whether or not item should be selected right now
     * @param {Object} state Vuex state
     * @param {Object} itemData
     * @param {Number} itemData.key city list item's unique key
     * @param {Boolean} itemData.selected city list item's initial selection status
     */
    addCityItem (state, { key, selected }) {
      state.cityItems.push({ key, selected })
      console.log('state:', state)
    },
    /**
     * Applies selected status to the specified item and not selected status to rest of the items in city list
     * @param {Object} state Vuex state
     * @param {Number} key city list item's unique key
     */
    selectCityItem (state, key) {
      state.cityItems.filter(item => {
        if (item.key == key) {
          item.selected = true
        } else {
          item.selected = false
        }
      })
    }
  },
  getters: {
    /**
     * Provides function with which we can access selection status of specific city list item
     * @param {Object} state Vuex state
     * @returns {Function}
     */
    getCityItemState (state) {
      /**
       * @param {Number} key city list item's unique key
       * @returns {Boolean}
       */
      return key => {
        const item = state.cityItems.find(item => item.key == key)
        return item ? item.selected : false
      }
    }
  },
  actions: {

  }
})
