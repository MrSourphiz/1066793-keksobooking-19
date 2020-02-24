'use strict';
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';

var PIN_X = 31;
var PIN_Y = 84;

var MIN_TITLE_LENGTH = 30;

var PLACE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var PLACE_TIME = ['12:00', '13:00', '14:00'];
var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PLACE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var capcityRatio = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

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

var translation = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var map = document.querySelector('.map');
var mapFilters = map.querySelector('.map__filters');
var mapPinMain = map.querySelector('.map__pin--main');
var mapPinsElement = document.querySelector('.map__pins');


var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var templateCard = document.querySelector('#card').content.querySelector('.map__card');

var adForm = document.querySelector('.ad-form');
var inputTitle = adForm.querySelector('#title');
var inputAddress = adForm.querySelector('#address');
var adFormFieldsetList = adForm.querySelectorAll('fieldset');

var selectType = adForm.querySelector('#type');
var selectPrice = adForm.querySelector('#price');
var selectTimeIn = adForm.querySelector('#timein');
var selectTimeOut = adForm.querySelector('#timeout');
var selectRoomNumber = adForm.querySelector('#room_number');
var selectCapacity = adForm.querySelector('#capacity');
var capacityOptions = selectCapacity.querySelectorAll('option');

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

var syncCapacity = function () {
  var selectRoom = capcityRatio[selectRoomNumber.value];
  if (selectRoomNumber.value === '100') {
    selectCapacity.value = '0';
  } else {
    selectCapacity.value = selectRoomNumber.value;
  }
  for (var i = 0; i < capacityOptions.length; i++) {
    var option = capacityOptions[i];
    option.disabled = true;

    if (selectRoom.indexOf(option.value) !== -1) {
      option.disabled = false;
    }
  }
};

var showCard = function (evt, array) {
  var target = evt.target;
  var targetClass = target.getAttribute('class');
  var targetTag = target.tagName;
  var targetParent = target.parentNode.getAttribute('class');

  var mapPinActive = mapPinsElement.querySelector('.map__pin--active');

  if (targetClass !== 'map__pin map__pin--main' && (targetClass === 'map__pin' || (targetTag === 'IMG' && targetParent !== 'map__pin map__pin--main'))) {
    if (target.tagName === 'IMG') {
      target = target.parentNode;
    }

    closeCard();

    if (mapPinActive) {
      mapPinActive.classList.remove('map__pin--active');
    }

    target.classList.add('map__pin--active');
    findDesiredPin(array);
    getClose();
  }
};

var closeCard = function () {
  var mapCard = map.querySelector('.map__card');
  if (map.contains(mapCard)) {
    map.removeChild(mapCard);
  }
};

var getClose = function () {
  var closeButton = map.querySelector('.popup__close');
  closeButton.addEventListener('mouseup', closeCard);
  closeButton.addEventListener('keydown', function (pressEvt) {
    if (pressEvt.key === ENTER_KEY) {
      closeCard();
    }
  });
};

var findDesiredPin = function (array) {
  var mapPinsElementList = mapPinsElement.querySelectorAll('.map__pin');
  var desiredPinIndex;
  for (var i = 1; i <= array.length; i++) {
    if (mapPinsElementList[i].getAttribute('class') === 'map__pin map__pin--active') {
      desiredPinIndex = i - 1;
    }
  }

  fragment.appendChild(renderCard(array[desiredPinIndex]));
  map.appendChild(fragment);
};

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

var getTranslate = function (object) {
  var sourceString = object.offer.type.toString();
  var translate = translation[sourceString];
  return translate;
};

var featuresTextToIcon = function (features, cardElement) {
  var fragmentFeature = document.createDocumentFragment();
  var cardFeatures = cardElement.querySelector('.popup__features');
  cardFeatures.innerHTML = '';
  if (features.length === 0) {
    cardFeatures.style.display = 'none';
  } else {
    for (var i = 0; i < features.length; i++) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + features[i]);

      fragmentFeature.appendChild(feature);
    }
  }
  return cardFeatures.appendChild(fragmentFeature);
};

var renderPhotos = function (photos, cardElement) {
  var fragmentPhoto = document.createDocumentFragment();
  var cardPhotos = cardElement.querySelector('.popup__photos');
  var cardPhotosElement = cardElement.querySelector('.popup__photo').cloneNode(true);
  cardPhotos.innerHTML = '';
  if (photos.length === 0) {
    cardPhotos.style.display = 'none';
  } else {
    for (var i = 0; i < photos.length; i++) {
      var photo = cardPhotosElement.cloneNode(true);
      photo.src = photos[i];
      fragmentPhoto.appendChild(photo);
    }
  }
  return cardPhotos.appendChild(fragmentPhoto);
};

var renderCard = function (object) {
  var cardElement = templateCard.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = object.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = object.offer.addres;
  cardElement.querySelector('.popup__text--price').textContent = object.offer.price + '₽/за ночь';
  cardElement.querySelector('.popup__type').textContent = getTranslate(object);
  cardElement.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
  featuresTextToIcon(object.offer.features, cardElement);
  cardElement.querySelector('.popup__description').textContent = object.offer.descriprion;
  cardElement.querySelector('.popup__avatar').setAttribute('src', object.author.avatar);
  renderPhotos(object.offer.photos, cardElement);

  return cardElement;
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

getMinPrice();
syncCapacity();

selectType.addEventListener('change', getMinPrice);
selectTimeIn.addEventListener('change', function () {
  syncTime(selectTimeIn, selectTimeOut);
});
selectTimeOut.addEventListener('change', function () {
  syncTime(selectTimeOut, selectTimeIn);
});

selectRoomNumber.addEventListener('change', syncCapacity);

mapPinsElement.addEventListener('mouseup', function (evt) {
  showCard(evt, placeArr);
});

mapPinsElement.addEventListener('keydown', function (pressEvt, evt) {
  if (pressEvt.key === ENTER_KEY) {
    showCard(evt, placeArr);
  }
});

document.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_KEY) {
    closeCard();
  }
});
