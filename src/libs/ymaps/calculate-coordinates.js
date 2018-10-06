/**
 * Gets location coordinates from its name through Yandex Geocode API.
 * Returns promise that resolves either in null or in [lat, lon] array.
 * @param {String} query location name
 * @returns {Promise}
 */
export async function calculateCoordinates (query) {
  query = encodeURIComponent(query)
  const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?geocode=${query}&results=1&format=json`, {
    mode: 'cors'
  })
  const data = await response.json()
  const geoObjects = data.response.GeoObjectCollection.featureMember
  if (!geoObjects.length) {
    return null
  }
  const position = geoObjects[0].GeoObject.Point.pos
  return position.split(' ').map(Number)
}
