'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsElement = map.querySelector('.map__pins');
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  var renderPlace = function (object) {
    var placeElement = templatePin.cloneNode(true);

    var startCoords = {
      x: object.location.x,
      y: object.location.y
    };
    var newCoords = window.movement.limit(startCoords);

    placeElement.style.left = newCoords.x + 'px';
    placeElement.style.top = newCoords.y + 'px';
    placeElement.querySelector('img').src = object.author.avatar;
    placeElement.querySelector('img').alt = object.offer.title;

    return placeElement;
  };

  var postOnMap = function (array) {
    var pinList = [];
    for (var i = 0; i < array.length; i++) {
      var currentPin = renderPlace(array[i]);
      fragment.appendChild(currentPin);

      pinList.push(currentPin);
    }
    mapPinsElement.appendChild(fragment);

    for (var j = 0; j < pinList.length; j++) {
      var pinListElement = pinList[j];

      pinListElement.addEventListener('click', function (evt) {
        window.show.card(evt, array);
      });

      pinListElement.addEventListener('keydown', function (evt) {
        if (evt.key === window.constants.ENTER_KEY) {
          window.show.card(evt, array);
        }
      });
    }
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
