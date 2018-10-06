/**
 * Предоставляет функцию, через которую можно узнать выбран ли заданный итем в списке адресов
 * @param {Object} state Vuex state
 * @returns {Function}
 */
export function getCityItemState (state) {
  /**
   * @param {Number} key уникальный ключ итема списка
   * @returns {Boolean}
   */
  return key => {
    const item = state.cityItems.find(item => item.key == key)
    return item ? item.selected : false
  }
}

/**
 * Возвращает иконку и координаты балуна, который должен сейчас отображаться на карте
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
