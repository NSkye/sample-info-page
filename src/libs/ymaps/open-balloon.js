/**
 * Открывает балун на нажных координатах на карте
 * @param {Object} mapInstance Инстанс Яндекс Карт
 * @param {Array} coordinates координаты ([lat, lon])
 * @param {String} contents содержимое балуна
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
