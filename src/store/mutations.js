/**
 * Adds city item to global state, which always contains 2 values: item's unique key and whether or not item should be selected right now.
 * Situationally can contain another 2 values: lat, lon as result of other mutations.
 * @param {Object} state Vuex state
 * @param {Object} itemData
 * @param {Number} itemData.key city list item's unique key
 * @param {Boolean} itemData.selected city list item's initial selection status
 */
export function addCityItem (state, { key, selected }) {
  state.cityItems.push({ key, selected })
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
  state.cityItems.map(item => {
    item.key == key && (item.lat = lat) && (item.lon = lon)
    item.selected && (state.mapFocus = [ item.lat, item.lon ])
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
    if (item.key == key) {
      item.selected = true
      item.lat && item.lon && (state.mapFocus = [ item.lat, item.lon ])
    } else {
      item.selected = false
    }
  })
}
