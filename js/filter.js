'use strict';

(function () {
  var map = document.querySelector('.map');

  var mapFilters = map.querySelector('.map__filters');

  var selectedFiltersList = mapFilters.querySelectorAll('[selected]');


  var type = mapFilters.querySelector('#housing-type');
  var rooms = mapFilters.querySelector('#housing-rooms');
  var guests = mapFilters.querySelector('#housing-guests');
  var price = mapFilters.querySelector('#housing-price');
  var features = mapFilters.querySelector('#housing-features');


  var filter = function (dataArray) {
    var result = dataArray.filter(function (data) {
      return filteredByType(type.value, data) && filteredByPrice(price.value, data) && filteredByRooms(rooms.value, data) && filteredByGuests(guests.value, data) && filteredByFeatures(data);
    });

    if (result.length > window.constants.PIN_QUANTITY) {
      result = filteredByPinQuantity(result);
    }

    return result;
  };

  var changeFilter = function (getDataPin) {
    mapFilters.addEventListener('change', function () {
      getDataPin();
    });
  };

  var filteredByType = function (value, dataArray) {
    return value === 'any' || dataArray.offer.type === value;
  };

  var filteredByRooms = function (value, dataArray) {
    return value === 'any' || dataArray.offer.rooms.toString() === value;
  };

  var filteredByGuests = function (value, dataArray) {
    return value === 'any' || dataArray.offer.guests.toString() === value;
  };

  var filteredByPrice = function (value, dataArray) {
    switch (value) {
      case 'low':
        return dataArray.offer.price < window.constants.PRICE_LOW_LIMIT;
      case 'middle':
        return dataArray.offer.price >= window.constants.PRICE_LOW_LIMIT && dataArray.offer.price < window.constants.PRICE_HIGH_LIMIT;
      case 'high':
        return dataArray.offer.price >= window.constants.PRICE_HIGH_LIMIT;
      default:
        return dataArray;
    }
  };

  var filteredByFeatures = function (dataArray) {
    var checkedFeatures = features.querySelectorAll('input[type=checkbox]:checked');
    var arrayOfCheckedFeatures = Array.from(checkedFeatures);
    var checkedValue = arrayOfCheckedFeatures.map(function (feature) {
      return feature.value;
    });

    return checkedValue.every(function (feature) {
      return dataArray.offer.features.includes(feature);
    });
  };

  var filteredByPinQuantity = function (dataArray) {
    var filteredArray = dataArray.slice(0, window.constants.PIN_QUANTITY);
    return filteredArray;
  };

  var clearFilter = function () {
    var mapFiltersList = mapFilters.querySelectorAll('.map__filter');
    var arrayOfMapFiletrsList = Array.from(mapFiltersList);

    var checkedFeatures = features.querySelectorAll('input[type=checkbox]:checked');

    arrayOfMapFiletrsList.forEach(function (elem, index) {
      selectedFiltersList[index].selected = true;
    });

    checkedFeatures.forEach(function (elem, index) {
      checkedFeatures[index].checked = false;
    });
  };

  window.filter = {
    use: filter,
    change: changeFilter,
    clear: clearFilter
  };

})();
