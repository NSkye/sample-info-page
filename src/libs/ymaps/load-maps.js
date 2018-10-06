/**
 * Загружает внешний скрипт Яндекс.Карт
 * Возвращает промис, который резолвится в объект API Яндекс.Карт, либо реджектится с ошибкой.
 * @param {String} src URL API карт, пример: https://api-maps.yandex.ru/2.1/?lang=en_US
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
