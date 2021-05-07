import './index.css';

const dropZoneQuery = '.c-drop-zone';
const inputQuery = '.c-drop-zone___options-input';
const dropZoneOverClass = 'c-drop-zone--over';

const dropZoneElement = document.querySelector(dropZoneQuery);
const inputElement = document.querySelector(inputQuery);

const updateThumbnailImageByInputFilesAndDropZoneElement = (inputFiles, dropZoneElement) => {
  console.log(inputFiles, 'inputFiles');
  console.log(dropZoneElement, 'dropZoneElement');
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

dropZoneElement.addEventListener('dragover', handleDragOverDropZoneElement);

['dragleave', 'dragend'].map(type => {
  dropZoneElement.addEventListener(type, handleDragLeaveEndDropZoneElement);
});

dropZoneElement.addEventListener('drop', handleDropZoneElement);
