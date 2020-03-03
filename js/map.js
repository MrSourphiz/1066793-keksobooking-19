'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  var mapFilters = map.querySelector('.map__filters');
  var mapFiltersElement = mapFilters.querySelectorAll('.map__filter');

  var adForm = document.querySelector('.ad-form');
  var inputAddress = adForm.querySelector('#address');
  var adFormFieldsetList = adForm.querySelectorAll('fieldset');

  var mapPinMainClickCounter = 0;

  var dataArray = [];

  var inActiveState = function () {
    map.classList.remove('map--faded');
    window.backend.load(successHandler, errorHandler);
    inputAddress.setAttribute('readonly', 'readonly');
    enabledFilters(mapFiltersElement);
    enabledFilters(adFormFieldsetList);
    window.form.price();
    window.form.capacity();
    adForm.classList.remove('ad-form--disabled');
  };

  var resetPage = function () {
    map.classList.add('map--faded');
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    mapPinMain.style.left = '570px';
    mapPinMain.style.top = '375px';
    window.show.closeCard();
    window.pin.remove();
    disabledFilters(mapFiltersElement);
    disabledFilters(adFormFieldsetList);
    getCoords();
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
    dataArray = array.slice();
    getDataPin(dataArray);

    window.filter.change(window.debounce(function () {
      window.pin.remove();
      getDataPin(dataArray);
      window.show.closeCard();
    }));
  };

  var getDataPin = function (array) {
    var filteredArray = window.filter.byType(array);

    window.pin.post(filteredArray);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: black; border: 5px solid red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.color = 'red';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  disabledFilters(mapFiltersElement);
  disabledFilters(adFormFieldsetList);

  mapPinMain.addEventListener('mousedown', function () {
    if (mapPinMainClickCounter < 1) {
      inActiveState();
      getCoords();
    }
    mapPinMainClickCounter++;
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.constants.ENTER_KEY) {
      inActiveState();
      getCoords();
    }
  });

  window.map = {
    coords: getCoords,
    reset: resetPage
  };
})();
