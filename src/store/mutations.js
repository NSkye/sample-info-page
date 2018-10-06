import Vue from 'vue'

/**
 * Добавляет итем списка адресов в глобальное состояние, оно всегда содержит 2 значения: уникальный ключ итема и выбран ли этот элемент прямо сейчас
 * В зависимости от ситуации может содержать ещё 2 значения: широту и долготу, но они появляются в результате других мутаций
 * @param {Object} state Vuex state
 * @param {Object} itemData
 * @param {Number} itemData.key уникальный ключ итема списка адресов
 * @param {Boolean} itemData.selected выбран итем сейчас или нет
 */
export function addCityItem (state, { key, selected, icon }) {
  state.cityItems.push({ key, icon, selected: !!selected })
}
/**
 * Добавляет координаты итему в глобальном состоянии.
 * Если итем в момент добавления выбран, то карта на нем сразу же сфокусируется
 * @param {Object} state Vuex state
 * @param {Object} itemData
 * @param {Number} itemData.key уникальный ключ итема списка адресов
 * @param {Number} itemData.lat широта
 * @param {Number} itemData.lon долгота
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
