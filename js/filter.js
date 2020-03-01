'use strict';

(function () {
  var map = document.querySelector('.map');

  var mapFilters = map.querySelector('.map__filters');

  var type = mapFilters.querySelector('#housing-type');

  var filter = function (dataArray) {
    if (dataArray.length > window.constants.PIN_QUANTITY) {
      dataArray.length = window.constants.PIN_QUANTITY;
    }
    var result = dataArray.filter(function (data) {
      return filteredByType(type.value, data);
    });
    return result;
  };

  var filteredByType = function (value, dataArray) {
    return value === 'any' || dataArray.offer.type === value;
  };

  window.filter = {
    byType: filter
  };

})();
