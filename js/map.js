'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPinsElement = map.querySelector('.map__pins');

  var mapFilters = map.querySelector('.map__filters');
  var mapFiltersElement = mapFilters.querySelectorAll('.map__filter');

  var adForm = document.querySelector('.ad-form');
  var inputAddress = adForm.querySelector('#address');
  var adFormFieldsetList = adForm.querySelectorAll('fieldset');

  var inActiveState = function () {
    map.classList.remove('map--faded');
    window.backend.load(successHandler, errorHandler);
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

  var successHandler = function (array) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.pin.create(array[i]));
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

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: black; border: 5px solid red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

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

  window.map = {
    coords: getCoords
  };
})();
