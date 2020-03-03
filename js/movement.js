'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  var MIN_MAP_WIDTH = 0;
  var MAX_MAP_WIDTH = map.offsetWidth;
  var MIN_MAP_HEIGHT = 200;
  var MAX_MAP_HEIGHT = 690;

  var minX = MIN_MAP_WIDTH - window.constants.PIN_X;
  var maxX = MAX_MAP_WIDTH - window.constants.PIN_X;
  var minY = MIN_MAP_HEIGHT - window.constants.PIN_Y;
  var maxY = MAX_MAP_HEIGHT - window.constants.PIN_Y;

  var limitCoords = function (coords) {
    if (coords.x < minX) {
      coords.x = minX;
    } else if (coords.x > maxX) {
      coords.x = maxX;
    }
    if (coords.y < minY) {
      coords.y = minY;
    } else if (coords.y > maxY) {
      coords.y = maxY;
    }
    return coords;
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      newCoords = limitCoords(newCoords);

      mapPinMain.style.left = newCoords.x + 'px';
      mapPinMain.style.top = newCoords.y + 'px';

      window.map.coords();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.movement = {
    limit: limitCoords
  };
})();
