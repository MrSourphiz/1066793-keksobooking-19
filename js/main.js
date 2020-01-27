'use strict';

var PLACE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var PLACE_TIME = ['12:00', '13:00', '14:00'];
var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PLACE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var generateRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min) + 1) + min;
  return randomNumber;
};

/* var elementInArr = function (arr, elementIndex, newArr) {
  var number;
  for (var i = 0; i < newArr.length; i++) {
    if (newArr[i] === arr[elementIndex]) {
      return true;
    }
  }
}; */

var generateRandomArr = function (length, arr) {
  var minLength = 1;
  var maxLength = arr.length;
  var newArr = [];

  if (length === 1) {
    var newArrLength = minLength;
  } else {
    newArrLength = generateRandomNumber(minLength, maxLength);
  }

  while (newArr.length < newArrLength) {
    var newArrElementIndex = generateRandomNumber(0, maxLength - 1);
    /* if (elementInArr(arr, newArrElementIndex, newArr)) {
      continue;
    } */
    newArr.push(arr[newArrElementIndex]);
  }

  return newArr;
};

var generatePlaceArr = function (place) {
  var placeArr = [];
  while (placeArr.length < 8) {
    placeArr.push(place);
  }
  return placeArr;
};

var place = {
  author: {
    avatar: 'img/avatars/user0' + generateRandomNumber(1, 8) + '.png'
  },
  offer: {
    title: 'заголовок предложения',
    addrres: '{{location.x}}, {{location.y}}',
    price: generateRandomNumber(500, 3200),
    type: generateRandomArr(1, PLACE_TYPE),
    rooms: generateRandomNumber(1, 4),
    guests: generateRandomNumber(1, 4),
    checkin: generateRandomArr(1, PLACE_TIME),
    checkout: generateRandomArr(1, PLACE_TIME),
    features: generateRandomArr(7, PLACE_FEATURES),
    descriprion: 'строка с описанием',
    photos: generateRandomArr(3, PLACE_PHOTOS)
  },
  location: {
    x: generateRandomNumber(50, 1150),
    y: generateRandomNumber(130, 630)
  }
};

generatePlaceArr(place);
