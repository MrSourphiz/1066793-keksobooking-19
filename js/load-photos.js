'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var avatarContainer = adForm.querySelector('.ad-form-header__upload');
  var photoContainer = adForm.querySelector('.ad-form__photo-container');

  var avatarChooser = avatarContainer.querySelector('input[type=file]');
  var photoChooser = photoContainer.querySelector('input[type=file]');

  var avatarPreview = avatarContainer.querySelector('img');
  var photoPreview = photoContainer.querySelector('.ad-form__photo');

  var onLoad = function (evt) {
    var fileChooser = evt.target;
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.constants.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        switch (fileChooser) {
          case avatarChooser:
            avatarPreview.src = reader.result;
            break;
          case photoChooser:
            var photoElement = document.createElement('img');
            photoElement.src = reader.result;
            photoElement.style.maxWidth = window.constants.FILE_WIDTH + 'px';
            photoElement.style.maxHeight = window.constants.FILE_HEIGHT + 'px';
            photoPreview.appendChild(photoElement);
            break;
        }
      });

      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', onLoad);
  photoChooser.addEventListener('change', onLoad);
})();
