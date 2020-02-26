'use strict';

(function () {
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
      var locationX = generateRandomNumber(100, 1000);
      var locationY = generateRandomNumber(230, 550);
      var place = {
        author: {
          avatar: 'img/avatars/user0' + generateRandomNumber(1, 8) + '.png'
        },
        offer: {
          title: 'заголовок предложения',
          address: locationX + ', ' + locationY,
          price: generateRandomNumber(500, 3200),
          type: getRandomElement(window.constants.PLACE_TYPE),
          rooms: generateRandomNumber(1, 4),
          guests: generateRandomNumber(1, 4),
          checkin: getRandomElement(window.constants.PLACE_TIME),
          checkout: getRandomElement(window.constants.PLACE_TIME),
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
