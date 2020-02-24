'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var PIN_X = 31;
  var PIN_Y = 84;

  var MIN_TITLE_LENGTH = 30;

  var PLACE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var PLACE_TIME = ['12:00', '13:00', '14:00'];
  var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PLACE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


  window.constants = {
    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY,
    PIN_X: PIN_X,
    PIN_Y: PIN_Y,
    MIN_TITLE_LENGTH: MIN_TITLE_LENGTH,
    PLACE_TYPE: PLACE_TYPE,
    PLACE_TIME: PLACE_TIME,
    PLACE_FEATURES: PLACE_FEATURES,
    PLACE_PHOTOS: PLACE_PHOTOS
  };
})();
