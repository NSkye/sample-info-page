/**
 * Loads external script for Yandex.Maps.
 * Returns promise that resolves with Yandex.Maps API object or rejects with specified error.
 * @param {String} src Yandex.Maps script URL, example: https://api-maps.yandex.ru/2.1/?lang=en_US
 * @returns {Promise}
 */
export function loadMaps (src) {
  return new Promise(function (resolve, reject) {
    const timeout = setTimeout(() => {
      reject(new Error('Exceeded timeout'))
    }, 10000)
    const mapsScript = document.createElement('script')
    mapsScript.onload = () => {
      if (!window.ymaps) {
        reject(new Error('Could not load script'))
      }
      window.ymaps.ready(() => {
        clearTimeout(timeout)
        resolve(window.ymaps)
      })
    }
    mapsScript.setAttribute('type', 'text/javascript')
    mapsScript.setAttribute('src', src)
    mapsScript.setAttribute('crossorigin', 'anonymous')
    document.head.appendChild(mapsScript)
  })
}

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

/**
 * Deployes balloon in specified location
 * @param {Object} mapInstance Yandex Maps map instance
 * @param {Array} coordinates coordinates ([lat, lon])
 * @param {String} contents contents of the balloon
 */
export function openBalloon (mapInstance, coordinates, contents) {
  const balloonImage = require('assets/b.svg')
  mapInstance.balloon.open(coordinates, contents, {
    closeButton: false,
    shadow: false,
    autoPan: false,
    panelMaxMapArea: 0,
    layout: 'default#imageWithContent',
    imageHref: balloonImage,
    imageSize: [185, 185],
    imageOffset: [-92.5, -185],
    minHeight: 185,
    minWidth: 100
  })
}
