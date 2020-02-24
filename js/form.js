'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var inputTitle = adForm.querySelector('#title');

  var selectType = adForm.querySelector('#type');
  var selectPrice = adForm.querySelector('#price');
  var selectTimeIn = adForm.querySelector('#timein');
  var selectTimeOut = adForm.querySelector('#timeout');
  var selectRoomNumber = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');
  var capacityOptions = selectCapacity.querySelectorAll('option');

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

  inputTitle.addEventListener('invalid', function (evt) {
    evt.preventDefault();
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
    if (target.value.length < window.constants.MIN_TITLE_LENGTH) {
      target.setCustomValidity('Заголовок объявления должен состоять минимум из ' + window.constants.MIN_TITLE_LENGTH + '-ти символов');
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
})();
