import Vue from 'vue'
import Vuex from 'vuex'
import { calculateCoordinates } from 'libs/ymaps'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityItems: [],
    mapFocus: null
  },
  mutations: {
    /**
     * Adds city item to global state, which always contains 2 values: item's unique key and whether or not item should be selected right now.
     * Situationally can contain another 2 values: lat, lon as result of other mutations.
     * @param {Object} state Vuex state
     * @param {Object} itemData
     * @param {Number} itemData.key city list item's unique key
     * @param {Boolean} itemData.selected city list item's initial selection status
     */
    addCityItem (state, { key, selected }) {
      state.cityItems.push({ key, selected })
    },
    /**
     * Adds provided coordinates to the specified item object.
     * If item object at this moment is selected either by user or by default, the map will focus on those coordinates.
     * @param {Object} state Vuex state
     * @param {Object} itemData
     * @param {Number} itemData.key city list item's unique key
     * @param {Number} itemData.lat latitude
     * @param {Number} itemData.lon longitude
     */
    addCoordinatesToItem (state, { key, lat, lon }) {
      state.cityItems.map(item => {
        item.key == key && (item.lat = lat) && (item.lon = lon)
        item.selected && (state.mapFocus = [ item.lat, item.lon ])
      })
    },
    /**
     * Applies selected status to the specified item and not selected status to rest of the items in city list.
     * Also focuses map on item's coordinates if it has any.
     * @param {Object} state Vuex state
     * @param {Number} key city list item's unique key
     */
    selectCityItem (state, key) {
      state.cityItems.map(item => {
        if (item.key == key) {
          item.selected = true
          item.lat && item.lon && (state.mapFocus = [ item.lat, item.lon ])
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
    },
    /**
     * Provides latitude and longitude on which map should be focused right now
     * @param {Object} state Vuex state
     */
    getMapFocus (state) {
      return state.mapFocus
    }
  },
  actions: {
    /**
     * Adds city item to list with its coordinates if possible
     */
    async provideCityItem ({ commit }, { key, selected, address }) {
      commit('addCityItem', { key, selected })
      const query = `${address.city}, ${address.street}}`

      let coords = null
      try {
        coords = await calculateCoordinates(query)
      } catch (e) {
        console.log('error', e)
      }
      if (coords) {
        commit('addCoordinatesToItem', { key, lat: coords[1], lon: coords[0] })
        if (selected) commit('selectCityItem', key)
      }
    }
  }
})
