'use strict';

var PLACE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var PLACE_TIME = ['12:00', '13:00', '14:00'];
var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PLACE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');

var mapPinsElement = map.querySelector('.map__pins');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

var generateRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
};

var getUniqueArrayItems = function (arr) {
  var uniqueArr = [];
  var isUnique;
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      if (i !== j && arr[i] === arr[j]) {
        isUnique = false;
        break;
      } else {
        isUnique = true;
      }
    }
    if (isUnique) {
      uniqueArr.push(arr[i]);
      arr.splice(i, 1);
      i--;
    }
  }

  return uniqueArr;
};

var generateRandomArr = function (length, arr) {
  var minLength = 1;
  var maxLength = arr.length;
  var newArrLength = minLength;
  var newArr = arr.splice(generateRandomNumber(0, maxLength - 1), newArrLength);

  if (length !== minLength) {
    newArrLength = generateRandomNumber(minLength, maxLength);
    newArr = arr.splice(0, newArrLength);
  }

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
        addres: locationX + ', ' + locationY,
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
        x: locationX,
        y: locationY
      }
    };
    placeArr.push(place);
  }
  return placeArr;
};

map.classList.remove('map--faded');

var renderPlace = function (object) {
  var placeElement = templatePin.cloneNode(true);
  placeElement.style.left = (object.location.x + 40) + 'px';
  placeElement.style.top = (object.location.y + 40) + 'px';
  placeElement.querySelector('img').src = object.author.avatar;
  placeElement.querySelector('img').alt = object.offer.title;

  return placeElement;
};

var fragment = document.createDocumentFragment();
var placeArr = generatePlaceArr(8);
for (var i = 0; i < placeArr.length; i++) {
  fragment.appendChild(renderPlace(placeArr[i]));
}

mapPinsElement.appendChild(fragment);
