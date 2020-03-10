'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;

  var URL = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    SAVE: 'https://js.dump.academy/keksobooking'
  };

  var StatusCode = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    ENTERNAL_ERROR: 500
  };

  var getXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.SUCCESS:
          onLoad(xhr.response);
          break;
        case StatusCode.BAD_REQUEST:
          onError('Статус ответа: ' + xhr.status + ' ' + 'Cервер не смог обработать запрос');
          break;
        case StatusCode.NOT_FOUND:
          onError('Статус ответа: ' + xhr.status + ' ' + 'Запрашиваемая страница не найдена');
          break;
        case StatusCode.ENTERNAL_ERROR:
          onError('Статус ответа: ' + xhr.status + ' ' + 'Внутренняя ошибка сервера');
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError(xhr.response);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = getXHR(onLoad, onError);

    xhr.open('GET', URL.LOAD);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = getXHR(onLoad, onError);

    xhr.open('POST', URL.SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
