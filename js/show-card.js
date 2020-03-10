'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsElement = map.querySelector('.map__pins');

  var closeCard = function () {
    var mapCard = map.querySelector('.map__card');
    if (map.contains(mapCard)) {
      map.removeChild(mapCard);
    }
  };

  var getClose = function () {
    var closeButton = map.querySelector('.popup__close');
    closeButton.addEventListener('mouseup', closeCard);
    closeButton.addEventListener('keydown', function (pressEvt) {
      if (pressEvt.key === window.constants.ENTER_KEY) {
        closeCard();
      }
    });
  };

  var showCard = function (evt, placeArr) {
    var target = evt.target;
    var targetClass = target.getAttribute('class');
    var targetTag = target.tagName;
    var targetParent = target.parentNode.getAttribute('class');

    var mapPinActive = mapPinsElement.querySelector('.map__pin--active');

    if (targetClass !== 'map__pin map__pin--main' && (targetClass === 'map__pin' || (targetTag === 'IMG' && targetParent !== 'map__pin map__pin--main'))) {
      if (target.tagName === 'IMG') {
        target = target.parentNode;
      }

      closeCard();

      if (mapPinActive) {
        mapPinActive.classList.remove('map__pin--active');
      }

      target.classList.add('map__pin--active');
      findDesiredPin(placeArr);
      getClose();

      document.addEventListener('keydown', function (pressEvt) {
        if (pressEvt.key === window.constants.ESC_KEY) {
          closeCard();
        }
      });
    }
  };

  var findDesiredPin = function (placeArr) {
    var fragment = document.createDocumentFragment();
    var mapPinsElementList = mapPinsElement.querySelectorAll('.map__pin');
    var desiredPinIndex;
    for (var i = 1; i <= placeArr.length; i++) {
      if (mapPinsElementList[i].getAttribute('class') === 'map__pin map__pin--active') {
        desiredPinIndex = i - 1;
      }
    }

    fragment.appendChild(window.card.get(placeArr[desiredPinIndex]));
    map.appendChild(fragment);
  };

  window.showCard = {
    use: showCard,
    close: closeCard
  };
})();
