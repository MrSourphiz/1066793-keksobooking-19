'use strict';

(function () {
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');

  var translation = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
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

  window.card = {
    get: renderCard
  };
})();
