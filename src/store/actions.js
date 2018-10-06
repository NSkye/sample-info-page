import { calculateCoordinates } from 'libs/ymaps'

/**
 * Добавляет в стейт адрес вместе с его координатами (если это возможно)
 * В глобальном стейте хранится только ключ элемента списка, выбран он или нет и адрес иконки, 
 * этого достаточно, чтоб компоненты карты и списка могли синхронизироваться.
 */
export async function provideCityItem ({ commit }, { key, selected, address, icon }) {
  commit('addCityItem', { key, selected, icon })
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
