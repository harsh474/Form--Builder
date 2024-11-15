const fileInput = document.getElementById('file-upload');
const uploadButton = document.querySelector('.upload-button');
const uploadMessage = document.querySelector('.upload-message');

uploadButton.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      // Process the XML content here
      const xmlContent = reader.result;
      console.log(xmlContent);

      // Show the upload message
      uploadMessage.classList.add('visible');
    };

    reader.readAsText(file);
  }
});