'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsElement = map.querySelector('.map__pins');
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPlace = function (object) {
    var placeElement = templatePin.cloneNode(true);
    placeElement.style.left = (object.location.x + 40) + 'px';
    placeElement.style.top = (object.location.y + 40) + 'px';
    placeElement.querySelector('img').src = object.author.avatar;
    placeElement.querySelector('img').alt = object.offer.title;

    return placeElement;
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      mapPinsElement.removeChild(pins[i]);
    }
  };

  window.pin = {
    create: renderPlace,
    remove: removePins
  };
})();
