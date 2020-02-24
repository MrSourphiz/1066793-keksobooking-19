'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapFilters = map.querySelector('.map__filters');
  var mapFiltersElement = mapFilters.querySelectorAll('.map__filter');

  var mapPinsElement = map.querySelector('.map__pins');
  var mapPin = mapPinsElement.querySelector('.map__pin');

  var adForm = document.querySelector('.ad-form');
  var inputAddress = adForm.querySelector('#address');
  var adFormFieldsetList = adForm.querySelectorAll('fieldset');

  var inActiveState = function () {
    mapPinsElement.appendChild(fragment);
    map.classList.remove('map--faded');
    inputAddress.setAttribute('readonly', 'readonly');
    enabledFilters(mapFiltersElement);
    enabledFilters(adFormFieldsetList);
    adForm.classList.remove('ad-form--disabled');
  };

  var getCoords = function () {
    var coordX = mapPinMain.offsetLeft + window.constants.PIN_X;
    var coordY = mapPinMain.offsetTop + window.constants.PIN_Y;
    inputAddress.value = 'X: ' + coordX + ', ' + 'Y: ' + coordY;
  };

  var disabledFilters = function (filters) {
    for (var i = 0; i < filters.length; i++) {
      var filtersElement = filters[i];
      filtersElement.setAttribute('disabled', 'disabled');
    }
  };

  var enabledFilters = function (filters) {
    for (var i = 0; i < filters.length; i++) {
      var filtersElement = filters[i];
      filtersElement.removeAttribute('disabled');
    }
  };

  var showCard = function (evt, array) {
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
      findDesiredPin(array);
      getClose();
    }
  };

  var closeCard = function () {
    var mapCard = map.querySelector('.map__card');
    if (map.contains(mapCard)) {
      map.removeChild(mapCard);
    }
  };

  var findDesiredPin = function (array) {
    var mapPinsElementList = mapPinsElement.querySelectorAll('.map__pin');
    var desiredPinIndex;
    for (var i = 1; i <= array.length; i++) {
      if (mapPinsElementList[i].getAttribute('class') === 'map__pin map__pin--active') {
        desiredPinIndex = i - 1;
      }
    }

    fragment.appendChild(window.card.get(array[desiredPinIndex]));
    map.appendChild(fragment);
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

  var fragment = document.createDocumentFragment();
  var placeArr = window.data.placeArray(8);

  placeArr.forEach(function (item, index) {
    fragment.appendChild(window.pin.create(placeArr[index]));
  });

  disabledFilters(mapFiltersElement);
  disabledFilters(adFormFieldsetList);

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (typeof evt === 'object') {
      switch (evt.button) {
        case 0:
          inActiveState();
          getCoords();
          break;
      }
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.constants.ENTER_KEY) {
      inActiveState();
    }
  });

  mapPinsElement.addEventListener('mousedown', function (evt) {
    showCard(evt, placeArr);
  });

  mapPin.addEventListener('keydown', function (evt) {
    if (evt.key === window.constants.ENTER_KEY) {
      showCard(evt, placeArr);
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === window.constants.ESC_KEY) {
      closeCard();
    }
  });

  window.map = {
    coords: getCoords
  };
})();
