'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsElement = map.querySelector('.map__pins');
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  var renderPlace = function (object) {
    var placeElement = templatePin.cloneNode(true);
    placeElement.style.left = (object.location.x + 40) + 'px';
    placeElement.style.top = (object.location.y + 40) + 'px';
    placeElement.querySelector('img').src = object.author.avatar;
    placeElement.querySelector('img').alt = object.offer.title;

    return placeElement;
  };

  var postOnMap = function (array) {
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderPlace(array[i]));
    }
    mapPinsElement.appendChild(fragment);

    mapPinsElement.addEventListener('mousedown', function (evt) {
      window.show.card(evt, array);
    });

    mapPinsElement.addEventListener('keydown', function (evt) {
      if (evt.key === window.constants.ENTER_KEY) {
        window.show.card(evt, array);
      }
    });
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      mapPinsElement.removeChild(pins[i]);
    }
  };

  window.pin = {
    create: renderPlace,
    post: postOnMap,
    remove: removePins
  };
})();
