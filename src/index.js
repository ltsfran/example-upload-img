import './index.css';

const dropZoneQuery = '.js-drop-zone';
const inputQuery = '.js-input';
const buttonQuery = '.js-button';
const uploadPhotosQuery = '.js-upload-photos';
const uploadPhotosIconQuery = '.js-upload-photos-icon';
const uploadPhotosItemQuery = '.js-upload-photos-item';

const dropZoneOverClass = 'c-drop-zone--over';
const uploadPhotosEmptyClass = 'upload-photos__list--empty';

const dropZoneElement = document.querySelector(dropZoneQuery);
const inputElement = document.querySelector(inputQuery);
const buttonElement = document.querySelector(buttonQuery);

const uploadPhotosByElementsAndFile = (elements, file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  elements.forEach(element => {
    reader.onload = () => {
      element.style.backgroundImage = `url('${reader.result}')`;
    };
  });
};

const updateThumbnailImageByInputFilesAndDropZoneElement = (inputFiles, dropZoneElement) => {
  const files = Object.values(inputFiles);
  const uploadPhotosElement = dropZoneElement.querySelector(uploadPhotosQuery);
  const uploadPhotosIconElement = dropZoneElement.querySelector(uploadPhotosIconQuery);

  uploadPhotosElement.classList.remove(uploadPhotosEmptyClass);

  files.map(file => {
    uploadPhotosIconElement.insertAdjacentHTML('beforebegin', `
      <div class="upload-photos__item js-upload-photos-item"></div>
    `);

    if (file.type.startsWith('image/')) {
      const uploadPhotosElement = dropZoneElement.querySelectorAll(uploadPhotosItemQuery);
      uploadPhotosByElementsAndFile(uploadPhotosElement, file);
    }
  })
};

const handleDragOverDropZoneElement = e => {
  e.preventDefault();
  dropZoneElement.classList.add(dropZoneOverClass);
};

const handleDragLeaveEndDropZoneElement = () => {
  dropZoneElement.classList.remove(dropZoneOverClass);
};

const handleDropZoneElement = e => {
  e.preventDefault();

  if (e.dataTransfer.files.length) {
    inputElement.files = e.dataTransfer.files;
    updateThumbnailImageByInputFilesAndDropZoneElement(inputElement.files, dropZoneElement);
  }

  dropZoneElement.classList.remove(dropZoneOverClass);
};

const handleClickButtonElement = () => {
  inputElement.click();
};

const handleChangeInputElement = () => {
  if (inputElement.files.length) {
    updateThumbnailImageByInputFilesAndDropZoneElement(inputElement.files, dropZoneElement);
  }
};

dropZoneElement.addEventListener('dragover', handleDragOverDropZoneElement);

['dragleave', 'dragend'].map(type => {
  dropZoneElement.addEventListener(type, handleDragLeaveEndDropZoneElement);
});

dropZoneElement.addEventListener('drop', handleDropZoneElement);

buttonElement.addEventListener('click', handleClickButtonElement);

inputElement.addEventListener('change', handleChangeInputElement);
