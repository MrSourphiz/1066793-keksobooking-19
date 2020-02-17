'use strict';

var PLACE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var PLACE_TIME = ['12:00', '13:00', '14:00'];
var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PLACE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var translation = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var map = document.querySelector('.map');

var mapPinsElement = map.querySelector('.map__pins');
var mapCardElement = map.querySelector('.map__filters-container');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var templateCard = document.querySelector('#card').content.querySelector('.map__card');

var generateRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
};

var getUniqueArrayItems = function (arr) {
  var uniqueArr = [];

  for (var i = 0; i < arr.length; i++) {
    var isUnique = true;
    var copyArr = arr.slice();
    copyArr.splice(i, 1);
    var index = copyArr.indexOf(arr[i]);

    if (index !== -1) {
      isUnique = false;
    }

    if (isUnique) {
      uniqueArr.push(arr[i]);
    }
  }
  return uniqueArr;
};

var getRandomElement = function (arr) {
  var randomIndex = generateRandomNumber(0, arr.length - 1);
  var randomElement = arr[randomIndex];

  return randomElement;
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

var renderPlace = function (object) {
  var placeElement = templatePin.cloneNode(true);
  placeElement.style.left = (object.location.x + 40) + 'px';
  placeElement.style.top = (object.location.y + 40) + 'px';
  placeElement.querySelector('img').src = object.author.avatar;
  placeElement.querySelector('img').alt = object.offer.title;

  return placeElement;
};

var renderCard = function (object) {
  var cardElement = templateCard.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = object.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = object.offer.addres;
  cardElement.querySelector('.popup__text--price').textContent = object.offer.price + '₽/за ночь';
  cardElement.querySelector('.popup__type').textContent = getTranslate(object);
  cardElement.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = object.offer.features;
  cardElement.querySelector('.popup__description').textContent = object.offer.descriprion;
  cardElement.querySelector('.popup__avatar').setAttribute('src', object.author.avatar);
  renderPhotos(object.offer.photos, cardElement);

  return cardElement;
};

var fragment = document.createDocumentFragment();
var placeArr = generatePlaceArr(8);
for (var i = 0; i < placeArr.length; i++) {
  fragment.appendChild(renderPlace(placeArr[i]));
  fragment.appendChild(renderCard(placeArr[0]));
}

mapPinsElement.appendChild(fragment);
mapCardElement.appendChild(fragment);
map.classList.remove('map--faded');
