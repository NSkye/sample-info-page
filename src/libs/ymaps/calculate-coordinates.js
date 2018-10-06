/**
 * Определяет координаты места по его названию через Yandex Geocode API.
 * Возвращает промис, который резолвится либо в null, либо в массив широты-долготы [lat, lon].
 * @param {String} query название места
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
