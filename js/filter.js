'use strict';

(function () {
  var map = document.querySelector('.map');

  var mapFilters = map.querySelector('.map__filters');

  var type = mapFilters.querySelector('#housing-type');
  var rooms = mapFilters.querySelector('#housing-rooms');
  var guests = mapFilters.querySelector('#housing-guests');

  var filter = function (dataArray) {
    if (dataArray.length > window.constants.PIN_QUANTITY) {
      dataArray.length = window.constants.PIN_QUANTITY;
    }
    var result = dataArray.filter(function (data) {
      return filteredByType(type.value, data) && filteredByRooms(rooms.value, data) && filteredByGuests(guests.value, data);
    });

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

  window.filter = {
    byType: filter,
    change: changeFilter
  };

})();
