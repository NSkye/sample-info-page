import { calculateCoordinates } from 'libs/ymaps'

/**
 * Adds city item to list with its coordinates if possible
 */
export async function provideCityItem ({ commit }, { key, selected, address }) {
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
