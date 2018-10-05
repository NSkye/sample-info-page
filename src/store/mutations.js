import Vue from 'vue'

/**
 * Adds city item to global state, which always contains 2 values: item's unique key and whether or not item should be selected right now.
 * Situationally can contain another 2 values: lat, lon as result of other mutations.
 * @param {Object} state Vuex state
 * @param {Object} itemData
 * @param {Number} itemData.key city list item's unique key
 * @param {Boolean} itemData.selected city list item's initial selection status
 */
export function addCityItem (state, { key, selected, icon }) {
  state.cityItems.push({ key, icon, selected: !!selected })
}
/**
 * Adds provided coordinates to the specified item object.
 * If item object at this moment is selected either by user or by default, the map will focus on those coordinates.
 * @param {Object} state Vuex state
 * @param {Object} itemData
 * @param {Number} itemData.key city list item's unique key
 * @param {Number} itemData.lat latitude
 * @param {Number} itemData.lon longitude
 */
export function addCoordinatesToItem (state, { key, lat, lon }) {
  state.cityItems.map((item, index) => {
    if (item.key == key) {
      Vue.set(state.cityItems[index], 'lat', lat)
      Vue.set(state.cityItems[index], 'lon', lon)
    }
  })
}
/**
 * Applies selected status to the specified item and not selected status to rest of the items in city list.
 * Also focuses map on item's coordinates if it has any.
 * @param {Object} state Vuex state
 * @param {Number} key city list item's unique key
 */
export function selectCityItem (state, key) {
  state.cityItems.map(item => {
    const selected = item.key == key
    item.selected = selected
  })
}
