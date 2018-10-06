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
