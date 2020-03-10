'use strict';

(function () {
  var EXAMPLE_AD_MIN_PRICE = 0;
  var EXAMPLE_AD_MAX_PRICE = 15000;

  var EXAMPLE_AD_AVATAR_MIN_NUMBER = 1;
  var EXAMPLE_AD_AVATAR_MAX_NUMBER = 8;

  var EXAMPLE_AD_ROOMS_MIN_QUANTITY = 1;
  var EXAMPLE_AD_ROOMS_MAX_QUANTITY = 4;
  var EXAMPLE_AD_GUESTS_MIN_QUANTITY = 1;
  var EXAMPLE_AD_GUESTS_MAX_QUANTITY = 4;

  var map = document.querySelector('.map');

  var generateRandomNumber = function (min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber;
  };

  var getUniqueArrayItems = function (arr) {
    var uniqueArr = [];

    arr.forEach(function (item, i, currentArr) {
      var copyArr = currentArr.slice();
      copyArr.splice(i, 1);

      if (copyArr.indexOf(item) === -1) {
        uniqueArr.push(item);
      }
    });

    return uniqueArr;
  };

  var getRandomElement = function (arr) {
    var randomIndex = generateRandomNumber(0, arr.length - 1);

    return arr[randomIndex];
  };

  var generateRandomArr = function (arr) {
    var minLength = 1;
    var maxLength = arr.length;
    var newArrLength = generateRandomNumber(minLength, maxLength);

    var copyArr = arr.slice();
    var newArr = copyArr.splice(0, newArrLength);

    var uniqueArr = getUniqueArrayItems(newArr);

    return uniqueArr;
  };

  var generatePlaceArr = function (length) {
    var maxLength = length;
    var placeArr = [];

    while (placeArr.length < maxLength) {
      var locationX = generateRandomNumber(window.constants.MIN_MAP_WIDTH, map.offsetWidth);
      var locationY = generateRandomNumber(window.constants.MIN_MAP_HEIGHT, window.constants.MAX_MAP_HEIGHT);
      var place = {
        author: {
          avatar: 'img/avatars/user0' + generateRandomNumber(EXAMPLE_AD_AVATAR_MIN_NUMBER, EXAMPLE_AD_AVATAR_MAX_NUMBER) + '.png'
        },
        offer: {
          title: 'заголовок предложения',
          address: locationX + ', ' + locationY,
          price: generateRandomNumber(EXAMPLE_AD_MIN_PRICE, EXAMPLE_AD_MAX_PRICE),
          type: getRandomElement(window.constants.PLACE_TYPES),
          rooms: generateRandomNumber(EXAMPLE_AD_ROOMS_MIN_QUANTITY, EXAMPLE_AD_ROOMS_MAX_QUANTITY),
          guests: generateRandomNumber(EXAMPLE_AD_GUESTS_MIN_QUANTITY, EXAMPLE_AD_GUESTS_MAX_QUANTITY),
          checkin: getRandomElement(window.constants.PLACE_TIMES),
          checkout: getRandomElement(window.constants.PLACE_TIMES),
          features: generateRandomArr(window.constants.PLACE_FEATURES),
          description: 'строка с описанием',
          photos: generateRandomArr(window.constants.PLACE_PHOTOS)
        },
        location: {
          x: locationX,
          y: locationY
        }
      };
      placeArr.push(place);
    }
    return placeArr;
  };

  window.data = {
    number: generateRandomNumber,
    element: getRandomElement,
    array: generateRandomArr,
    placeArray: generatePlaceArr
  };
})();
