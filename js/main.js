'use strict';
var ENTER_KEY = 'Enter';

var PIN_X = 31;
var PIN_Y = 84;

var MIN_TITLE_LENGTH = 30;

var PLACE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var PLACE_TIME = ['12:00', '13:00', '14:00'];
var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PLACE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var time = {
  '12:00': '12:00',
  '13:00': '13:00',
  '14:00': '14:00'
};

var minPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalo: 0
};

var map = document.querySelector('.map');
var mapFilters = map.querySelector('.map__filters');
var mapPinMain = map.querySelector('.map__pin--main');

var mapPinsElement = map.querySelector('.map__pins');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

var adForm = document.querySelector('.ad-form');
var inputTitle = adForm.querySelector('#title');
var inputAddress = adForm.querySelector('#address');
var adFormFieldsetList = adForm.querySelectorAll('fieldset');

var selectType = adForm.querySelector('#type');
var selectPrice = adForm.querySelector('#price');
var selectTimeIn = adForm.querySelector('#timein');
var selectTimeOut = adForm.querySelector('#timeout');

var disabledFilters = function () {
  mapFilters.setAttribute('disabled', 'disabled');

  for (var i = 0; i < adFormFieldsetList.length; i++) {
    var fieldsetElement = adFormFieldsetList[i];
    fieldsetElement.setAttribute('disabled', 'disabled');
  }
};

var inActiveState = function () {
  mapPinsElement.appendChild(fragment);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFilters.removeAttribute('disabled');
  inputAddress.setAttribute('readonly', 'readonly');
  for (var i = 0; i < adFormFieldsetList.length; i++) {
    var fieldsetElement = adFormFieldsetList[i];
    fieldsetElement.removeAttribute('disabled');
  }
};

var getCoords = function () {
  var coordX = mapPinMain.offsetLeft + PIN_X;
  var coordY = mapPinMain.offsetTop + PIN_Y;
  inputAddress.value = 'X: ' + coordX + ', ' + 'Y: ' + coordY;
};

var getMinPrice = function () {
  var price = minPrice[selectType.value];
  selectPrice.min = price;
  selectPrice.placeholder = price;
};

var syncTime = function (object1, object2) {
  var sync = time[object1.value];
  object2.value = sync;
};

disabledFilters();

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
  if (evt.key === ENTER_KEY) {
    inActiveState();
  }
});

inputTitle.addEventListener('invalid', function () {
  if (inputTitle.validity.tooShort) {
    inputTitle.setCustomValidity('Заголовок объявления должен состоять минимум из 30-ти символов');
  } else if (inputTitle.validity.tooLong) {
    inputTitle.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
  } else if (inputTitle.validity.valueMissing) {
    inputTitle.setCustomValidity('Обязательное поле');
  } else {
    inputTitle.setCustomValidity('');
  }
});

inputTitle.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_TITLE_LENGTH) {
    target.setCustomValidity('Заголовок объявления должен состоять минимум из ' + MIN_TITLE_LENGTH + '-ти символов');
  } else {
    target.setCustomValidity('');
  }
});

selectType.addEventListener('change', getMinPrice);
selectTimeIn.addEventListener('change', function () {
  syncTime(selectTimeIn, selectTimeOut);
});
selectTimeOut.addEventListener('change', function () {
  syncTime(selectTimeOut, selectTimeIn);
});

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
        addres: locationX + ', ' + locationY,
        price: generateRandomNumber(500, 3200),
        type: getRandomElement(PLACE_TYPE),
        rooms: generateRandomNumber(1, 4),
        guests: generateRandomNumber(1, 4),
        checkin: getRandomElement(PLACE_TIME),
        checkout: getRandomElement(PLACE_TIME),
        features: generateRandomArr(PLACE_FEATURES),
        descriprion: 'строка с описанием',
        photos: generateRandomArr(PLACE_PHOTOS)
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

placeArr.forEach(function (item, index) {
  fragment.appendChild(renderPlace(placeArr[index]));
});
