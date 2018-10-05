/**
 * Provides function with which we can access selection status of specific city list item
 * @param {Object} state Vuex state
 * @returns {Function}
 */
export function getCityItemState (state) {
  /**
   * @param {Number} key city list item's unique key
   * @returns {Boolean}
   */
  return key => {
    const item = state.cityItems.find(item => item.key == key)
    return item ? item.selected : false
  }
}
/**
 * Provides latitude and longitude on which map should be focused right now
 * @param {Object} state Vuex state
 */
export function getMapFocus (state) {
  return state.mapFocus
}

/**
 * Returns icon and coordinates for balloon that should be displayed right now
 * @param {Object} state Vuex state
 */
export function getDisplayedBalloon (state) {
  const item = state.cityItems.find(i => i.selected)
  if (!item) {
    return null
  }
  const { lat, lon, icon } = item
  return { icon, coordinates: [ lat, lon ] }
}
