'use strict';

(function () {
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPlace = function (object) {
    var placeElement = templatePin.cloneNode(true);
    placeElement.style.left = (object.location.x + 40) + 'px';
    placeElement.style.top = (object.location.y + 40) + 'px';
    placeElement.querySelector('img').src = object.author.avatar;
    placeElement.querySelector('img').alt = object.offer.title;

    return placeElement;
  };

  window.pin = {
    create: renderPlace
  };
})();
