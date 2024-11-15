const dropzone = document.getElementById('dropzone');
const elementsList = document.getElementById('elements-list');
const elementSettings = document.getElementById('element-settings');
const settingsContent = document.getElementById('settings-content');

document.querySelectorAll('.draggable').forEach(draggable => {
    draggable.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text', e.target.getAttribute('data-element'));
    });
});

dropzone.addEventListener('dragover', function(e) {
    e.preventDefault();
    dropzone.classList.add('over');
});

dropzone.addEventListener('dragleave', function(e) {
    dropzone.classList.remove('over');
});

dropzone.addEventListener('drop', function(e) {
    e.preventDefault();
    dropzone.classList.remove('over');
    const elementType = e.dataTransfer.getData('text');
    console.log(elementType);
    
    let element;

    if (elementType === 'Paragraph Field') {
        element = createParagraphField();
    } else if (elementType === 'Separator') {
        element = createSeparator();
    } else if (elementType === 'Spacer') {
        element = createSpacer();
    } else {
        element = createGenericElement(elementType);
    }

    dropzone.appendChild(element);
    
    // Add event listener for settings and deletion
    element.addEventListener('click', function() {
        showSettings(element);
    });
});

// Create a new Text Field with dynamic settings
function createTextField(label = 'Text Field', placeholder = 'Enter text...', required = false) {
    const element = document.createElement('div');
    element.className = 'form-element';
    element.setAttribute('data-type', 'TextField');
    element.innerHTML = `
        <label>${label}</label>
        <input type="text" placeholder="${placeholder}" ${required ? 'required' : ''}>
    `;
    addControlButtons(element);
    return element;
}

// Create a new Number Field with dynamic settings
function createNumberField(label = 'Number Field', placeholder = 'Enter number...', required = false) {
    const element = document.createElement('div');
    element.className = 'form-element';
    element.setAttribute('data-type', 'NumberField');
    element.innerHTML = `
        <label>${label}</label>
        <input type="number" placeholder="${placeholder}" ${required ? 'required' : ''}>
    `;
    addControlButtons(element);
    return element;
}

// Create a new Paragraph Field
function createParagraphField() {
    const element = document.createElement('div');
    element.className = 'form-element';
    element.setAttribute('data-type', 'ParagraphField');
    const paragraphText = 'Text here';
    element.innerHTML = `<p class="text-muted-foreground">${paragraphText}</p>`;
    addControlButtons(element);
    return element;
}

// Create a separator
function createSeparator() {
    const element = document.createElement('div');
    element.className = 'form-element separator'; // Add a class for styling
    element.setAttribute('data-type', 'Separator');
    element.innerHTML = '<hr>'; // HTML for a horizontal line
    addControlButtons(element);
    return element;
}

// Create a spacer
function createSpacer() {
    const element = document.createElement('div');
    element.className = 'form-element spacer'; // Add a class for styling
    element.setAttribute('data-type', 'Spacer');
    element.style.height = '20px'; // Set default height for the spacer
    element.innerHTML = ''; // Spacer has no content
    addControlButtons(element);
    return element;
}

// Create a generic element based on type
function createGenericElement(type) {
    const element = document.createElement('div');
    element.className = 'form-element';
    element.setAttribute('data-type', type);

    if (type === 'Title Field') {
        element.innerHTML = `<div class="form-container">
<form id="titleForm"  draggable="true">
  <div class="form-item">
    <span class="element-label">Title</span>
    <input type="text" id="title" name="title" value="${label.innerText}" onchange="updateField(this.value, '${element.dataset.type}')" />
  </div>
  <div class="action-buttons">
    <button type="button" class="titlebtn" id="saveButton" onclick="saveTitle('${type}')">Save</button>
  </div>
</form>
</div>`;
    } else if (type === 'SubTitle Field') {
        element.innerHTML = '<h2>SubTitle</h2>';
    } else if (type === 'Text Field') {
        element = createTextField(); // Create text field with default settings
    } else if (type === 'Number Field') {
        element = createNumberField(); // Create number field with default settings
    } else if (type === 'Text Area Field') {
        element.innerHTML = '<textarea placeholder="Text Area"></textarea>';
    } else {
        element.textContent = type;
    }

    addControlButtons(element);
    return element;
}

// Add control buttons (correction icon and delete button)
function addControlButtons(element) {
    const correctionIcon = document.createElement('span');
    correctionIcon.className = 'correction-icon';
    correctionIcon.innerHTML = '&#9998;';
    element.appendChild(correctionIcon);

    const deleteButton = document.createElement('span');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = '&#10060;';
    element.appendChild(deleteButton);

    // Event listeners for correction and delete actions
    correctionIcon.addEventListener('click', function() {
        showSettings(element);
    });

    deleteButton.addEventListener('click', function() {
        element.remove();
    });
}

function showSettings(element) {
    clearSelection();
    element.classList.add('selected-element');
    elementsList.style.display = 'none';
    elementSettings.style.display = 'block';
    const elementType = element.getAttribute('data-type');
    settingsContent.innerHTML = `<h4>Settings for ${elementType}</h4>`;

    // Configure settings based on the type of the element
    if (elementType === 'Title Field') {
        
        
// Create a style block for the form and page styles
const style = document.createElement('style');
style.innerHTML = `
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 20px;
    }

    .form-container {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      width: 400px;
      margin: auto;
    }

    .form-item {
      margin-bottom: 15px;
    }

    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }

    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    button {
      background-color: #007bff;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    }

    button:hover {
      background-color: #0056b3;
    }

    .title-display {
      margin-top: 20px;
      font-size: 24px;
      text-align: center;
      color: #333;
    }
`;
document.head.appendChild(style);

// Insert the form HTML into settingsContent
settingsContent.innerHTML += `
  <div class="form-container">
    <form id="titleForm">
      <div class="form-item">
        <label    for="title">Title</label>
        <input type="text" id="title" name="title" />
        <p class="error-message" style="color:red; display:none;">Title must be between 2 and 50 characters.</p>
      </div>
      <button type="button" id="saveButton">Save</button>
    </form>
    <div class="title-display" >Your title will appear here.</div>
  </div>
  <div class="preview-container">
    <h3>Live Preview:</h3>
    <div id="formPreview"></div>
</div>
`;

// Functionality to save input value
document.getElementById('saveButton').addEventListener('click', function() {
  // Get the value from the input field
  const titleValue = document.getElementById('title').value;
  
  // Validate input (e.g., between 2 and 50 characters)
  if (titleValue.length < 2 || titleValue.length > 50) {
    // Show error message if validation fails
    document.querySelector('.error-message').style.display = 'block';
  } else {
    // Hide error message if validation passes
    document.querySelector('.error-message').style.display = 'none';
    
    // Set the title display with the input value
    document.getElementById('titleDisplay').textContent = titleValue;
    localStorage.setItem('title', titleValue);
    // Clear the input field after saving
    // document.getElementsByClassName('titlefield').textContent= 'asasd';
  }
});


} if (elementType === 'SubTitle Field') {
    // Add CSS styles dynamically using innerHTML
    const style = document.createElement('style');
    style.innerHTML = `
        .form-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 400px;
            margin: auto;
        }

        .form-item {
            margin-bottom: 15px;
        }

        label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }

        input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        button {
            background-color: #007bff;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
        }

        button:hover {
            background-color: #0056b3;
        }

        .subtitle-display {
            margin-top: 20px;
            font-size: 20px;
            text-align: center;
            color: #333;
        }

        .error-message {
            color: red;
            display: none;
        }

        .subtitle-heading {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 15px;
        }
    `;
    document.head.appendChild(style);

    // Add the HTML structure using innerHTML
    settingsContent.innerHTML += `
        <div class="form-container">
            <h3 class="subtitle-heading" id="subtitleHeading">Subtitle Form</h3>
            <form id="subtitleForm">
                <div class="form-item">
                    <label for="subtitle">Subtitle</label>
                    <input type="text" id="subtitle" name="subtitle" />
                    <p class="error-message" id="subtitle-error-message">Subtitle must be between 2 and 50 characters.</p>
                </div>
                <button type="button" id="saveSubtitleButton">Save</button>
            </form>
            <div class="subtitle-display" id="subtitleDisplay">Your subtitle will appear here.</div>
        </div>
    `;

    // Load saved subtitle from local storage if it exists
    const savedSubtitle = localStorage.getItem('subtitle');
    if (savedSubtitle) {
        document.getElementById('subtitleDisplay').textContent = savedSubtitle;
        document.getElementById('subtitle').value = savedSubtitle; // Populate input field with saved subtitle
    }

    // JavaScript to handle subtitle form submission, validation, and dynamic heading changes
    const subtitleInput = document.getElementById("subtitle");
    const subtitleDisplay = document.getElementById("subtitleDisplay");
    const subtitleErrorMessage = document.getElementById("subtitle-error-message");
    const subtitleHeading = document.getElementById("subtitleHeading");

    // Function to update the subtitle everywhere (heading, display, input)
    function updateSubtitle(subtitle) {
        subtitleDisplay.textContent = subtitle;
        subtitleHeading.textContent = subtitle ? `Subtitle: ${subtitle}` : 'Subtitle Form';
        subtitleInput.value = subtitle; // Keep the subtitle in the input field
    }

    // Function to validate the subtitle input
    function validateSubtitle(subtitle) {
        if (subtitle.length < 2 || subtitle.length > 50) {
            subtitleErrorMessage.style.display = "block"; // Show error for invalid subtitle
            return false;
        } else {
            subtitleErrorMessage.style.display = "none"; // Hide error
            return true;
        }
    }

    // Handle "Save" button click for subtitle
    document.getElementById("saveSubtitleButton").addEventListener("click", function () {
        const subtitle = subtitleInput.value.trim();
        
        // Validate and update the subtitle if valid
        if (validateSubtitle(subtitle)) {
            updateSubtitle(subtitle);
            localStorage.setItem('subtitle', subtitle); // Save to local storage
            subtitleInput.value = ''; // Clear the input field after saving
        }
    });
}
 else if (elementType === 'TextField') {
        configureTextFieldSettings(element);
    } else if (elementType === 'NumberField') {
        configureNumberFieldSettings(element);
    } else if (elementType === 'ParagraphField') {
        settingsContent.innerHTML += `
        <div class="form-container">
          <form id="paragraphForm">
            <div class="form-item">
              <label for="paragraph">Paragraph</label>
              <textarea id="paragraph" name="paragraph" rows="5"></textarea>
              <p class="error-message" id="error-message">Text must be between 2 and 500 characters.</p>
            </div>
            <button type="button" id="saveButton">Save</button>
          </form>
          <div class="paragraph-display" id="paragraphDisplay">
            Your text will appear here.
          </div>
        </div>
        <style>
          /* Basic styles */
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            padding: 20px;
          }
    
          .form-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 500px;
            margin: auto;
          }
    
          .form-item {
            margin-bottom: 15px;
          }
    
          label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
          }
    
          textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
          }
    
          button {
            background-color: #007bff;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
    
          button:hover {
            background-color: #0056b3;
          }
    
          .paragraph-display {
            margin-top: 20px;
            font-size: 18px;
            color: #555;
          }
    
          .error-message {
            color: red;
            display: none;
          }
        </style>
        <script>
          // JavaScript to handle form submission and validation
    
          const paragraphInput = document.getElementById("paragraph");
          const paragraphDisplay = document.getElementById("paragraphDisplay");
          const errorMessage = document.getElementById("error-message");
    
          document.getElementById("saveButton").addEventListener("click", function () {
            const paragraphText = paragraphInput.value.trim();
    
            // Validate input length
            if (paragraphText.length < 2 || paragraphText.length > 500) {
              errorMessage.style.display = "block"; // Show error message
              return;
            }
    
            errorMessage.style.display = "none"; // Hide error message
    
            // Update the displayed paragraph text
            paragraphDisplay.textContent = paragraphText;
          });
    
          // Optional: Auto-apply changes on blur
          paragraphInput.addEventListener("blur", function () {
            const paragraphText = paragraphInput.value.trim();
    
            // Validate input length
            if (paragraphText.length >= 2 && paragraphText.length <= 500) {
              paragraphDisplay.textContent = paragraphText;
              errorMessage.style.display = "none"; // Hide error message
            } else {
              errorMessage.style.display = "block"; // Show error message
            }
          });
        </script>`;
    }
    else if (elementType === 'TextAreaField') {
      configureTextAreaFieldSettings(element);  // Added settings for Text Area
  } else if(elementType === ''){
    
  }
}


function configureTextAreaFieldSettings(element) {
  const textAreaField = element.querySelector('textarea');
  settingsContent.innerHTML += `
      <label for="textAreaLabel">Label: <input id="textAreaLabel" value="${textAreaField.previousElementSibling.textContent}"></label>
      <label for="textAreaPlaceholder">Placeholder: <input id="textAreaPlaceholder" value="${textAreaField.placeholder}"></label>
      <label for="textAreaRequired">Required: <input type="checkbox" id="textAreaRequired" ${textAreaField.required ? 'checked' : ''}></label>
  `;
}
// Clear previous selections
function clearSelection() {
    document.querySelectorAll('.form-element').forEach(element => {
        element.classList.remove('selected-element');
    });
}

// Configure text field settings
function configureTextFieldSettings(element) {
    const inputField = element.querySelector('input[type="text"]');
    settingsContent.innerHTML += `
        <label for="textLabel">Label: <input id="textLabel" value="${inputField.previousElementSibling.textContent}"></label>
        <label for="textPlaceholder">Placeholder: <input id="textPlaceholder" value="${inputField.placeholder}"></label>
        <label for="textRequired">Required: <input type="checkbox" id="textRequired" ${inputField.required ? 'checked' : ''}></label>
    `;
}

// Configure number field settings
function configureNumberFieldSettings(element) {
    const inputField = element.querySelector('input[type="number"]');
    settingsContent.innerHTML += `
        <label for="numberLabel">Label: <input id="numberLabel" value="${inputField.previousElementSibling.textContent}"></label>
        <label for="numberPlaceholder">Placeholder: <input id="numberPlaceholder" value="${inputField.placeholder}"></label>
        <label for="numberRequired">Required: <input type="checkbox" id="numberRequired" ${inputField.required ? 'checked' : ''}></label>
    `;
}document.getElementById('saveForm').addEventListener('click', function() {
    const formElements = document.querySelectorAll('.form-element');

    // Create a structure to store form data while excluding specific icons
    const formData = Array.from(formElements).map(el => {
        // Remove the correction icon and delete button if they exist
        el.querySelector('.correction-icon')?.remove();  // Use optional chaining to avoid errors if the icon is not found
        el.querySelector('.delete-button')?.remove();    // Use optional chaining to avoid errors if the button is not found

        return {
            type: el.getAttribute('data-type'), // Example: input, button, etc.
            content: el.innerHTML,               // The inner content of the form element (without icons)
            attributes: Array.from(el.attributes).map(attr => ({ // Storing attributes like id, class, etc.
                name: attr.name,
                value: attr.value
            }))
        };
    });

    // Save the form structure in localStorage
    localStorage.setItem('savedForm', JSON.stringify(formData));
    // renderPreview();

    alert('Form saved! Check the console.');
    console.log('Form Data:', formData);
});
   

document.getElementById('previewForm').addEventListener('click', function() {
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write('<html><head><title>Form Preview</title></head><body>');
    const formElements = dropzone.querySelectorAll('.form-element');
    formElements.forEach(el => {
        previewWindow.document.write(el.innerHTML);
        previewWindow.document.write('<br>');
    });
    previewWindow.document.write('</body></html>');
    previewWindow.document.close();
});

document.getElementById('exportXML').addEventListener('click', function() {
    const formElements = dropzone.querySelectorAll('.form-element');
    let xml = '<form>';
    formElements.forEach(el => {
        xml += `<element type="${el.getAttribute('data-type')}">${el.innerHTML}</element>`;
    });
    xml += '</form>';
    downloadXML(xml, 'form.xml');
});

// Function to generate XML from form elements
function generateXML(elements) {
    let xml = '<form>\n';
    elements.forEach(element => {
        const type = element.getAttribute('data-type');
        const content = element.innerHTML.replace(/<\/?[^>]+(>|$)/g, ""); // Clean up HTML
        xml += `  <element type="${type}">${content}</element>\n`;
    });
    xml += '</form>';
    return xml;
}

// Function to download XML
function downloadXML(content, filename) {
    const blob = new Blob([content], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// Event listener for import XML
document.getElementById('importXML').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const xml = event.target.result;
        loadXML(xml);
    };
    reader.readAsText(file);
});

// Function to load XML into the form
function loadXML(xmlContent) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, 'application/html');
    const elements = xmlDoc.getElementsByTagName('element');

    for (let i = 0; i < elements.length; i++) {
        const type = elements[i].getAttribute('type');
        let element;
        
        switch (type) {
            case 'Title Field':
                element = createGenericElement('Title Field');
                break;
            case 'SubTitle Field':
                element = createGenericElement('SubTitle Field');
                break;
            case 'TextField':
                element = createTextField();
                break;
            case 'NumberField':
                element = createNumberField();
                break;
            case 'ParagraphField':
                element = createParagraphField();
                break;
            case 'Separator':
                element = createSeparator();
                break;
            case 'Spacer':
                element = createSpacer();
                break;
            default:
                element = createGenericElement(type);
        }
        
        dropzone.appendChild(element);
    }
}

// const dropzone = document.getElementById('dropzone');
// const elementsList = document.getElementById('elements-list');
// const elementSettings = document.getElementById('element-settings');
// const settingsContent = document.getElementById('settings-content');

// document.querySelectorAll('.draggable').forEach(draggable => {
//     draggable.addEventListener('dragstart', function(e) {
//         e.dataTransfer.setData('text', e.target.getAttribute('data-element'));
//     });
// });

// dropzone.addEventListener('dragover', function(e) {
//     e.preventDefault();
//     dropzone.classList.add('over');
// });

// dropzone.addEventListener('dragleave', function(e) {
//     dropzone.classList.remove('over');
// });

// dropzone.addEventListener('drop', function(e) {
//     e.preventDefault();
//     dropzone.classList.remove('over');
//     const elementType = e.dataTransfer.getData('text');
//     let element;

//     if (elementType === 'Paragraph Field') {
//         element = createParagraphField();
//     } else if (elementType === 'Separator') {
//         element = createSeparator();
//     } else if (elementType === 'Spacer') {
//         element = createSpacer();
//     } else {
//         element = createGenericElement(elementType);
//     }

//     dropzone.appendChild(element);
    
//     // Add event listener for settings and deletion
//     element.addEventListener('click', function() {
//         showSettings(element);
//     });
// });

// // Create a new Text Field with dynamic settings
// function createTextField(label = 'Text Field', placeholder = 'Enter text...', required = false) {
//     const element = document.createElement('div');
//     element.className = 'form-element';
//     element.setAttribute('data-type', 'TextField');
//     element.innerHTML = `
//         <label>${label}</label>
//         <input type="text" placeholder="${placeholder}" ${required ? 'required' : ''}>
//     `;
//     addControlButtons(element);
//     return element;
// }

// // Create a new Number Field with dynamic settings
// function createNumberField(label = 'Number Field', placeholder = 'Enter number...', required = false) {
//     const element = document.createElement('div');
//     element.className = 'form-element';
//     element.setAttribute('data-type', 'NumberField');
//     element.innerHTML = `
//         <label>${label}</label>
//         <input type="number" placeholder="${placeholder}" ${required ? 'required' : ''}>
//     `;
//     addControlButtons(element);
//     return element;
// }

// function createTitleField() {
//     const element = document.createElement('div');
//     element.setAttribute('data-type', 'TitleField');
//     element.className = 'form-item';
//     element.innerHTML = `
//         <label for="title">Title</label>
//         <input type="text" id="title" name="title" />
//         <p class="error-message" style="color:red; display:none;">Title must be between 2 and 50 characters.</p>
//         <button type="button" class="save-button">Save</button>
//     `;

//     const titleInput = element.querySelector("input");
//     const titleDisplay = document.createElement("div");
//     titleDisplay.className = "title-display";
//     titleDisplay.textContent = "Your title will appear here.";
    
//     element.appendChild(titleDisplay); // Append title display to the element
//     addControlButtons(element); // Add control buttons for each element

//     element.querySelector('.save-button').onclick = function () {
//         const title = titleInput.value.trim();

//         // Validate input length
//         if (title.length < 2 || title.length > 50) {
//             element.querySelector(".error-message").style.display = "block"; // Show error message
//             return;
//         }

//         element.querySelector(".error-message").style.display = "none"; // Hide error message
//         titleDisplay.textContent = title; // Update the displayed title
//     };

//     return element;
// }

// // Create a new Paragraph Field
// function createParagraphField() {
//     const element = document.createElement('div');
//     element.className = 'form-element';
//     element.setAttribute('data-type', 'ParagraphField');
//     const paragraphText = 'Text here';
//     element.innerHTML = `<p class="text-muted-foreground">${paragraphText}</p>`;
//     addControlButtons(element);
//     return element;
// }

// // Create a separator
// function createSeparator() {
//     const element = document.createElement('div');
//     element.className = 'form-element separator'; // Add a class for styling
//     element.setAttribute('data-type', 'Separator');
//     element.innerHTML = '<hr>'; // HTML for a horizontal line
//     addControlButtons(element);
//     return element;
// }

// // Create a spacer
// function createSpacer() {
//     const element = document.createElement('div');
//     element.className = 'form-element spacer'; // Add a class for styling
//     element.setAttribute('data-type', 'Spacer');
//     element.style.height = '20px'; // Set default height for the spacer
//     element.innerHTML = ''; // Spacer has no content
//     addControlButtons(element);
//     return element;
// }

// // Create a generic element based on type
// function createGenericElement(type) {
//     const element = document.createElement('div');
//     element.className = 'form-element';
//     element.setAttribute('data-type', type);

//     if (type === 'Title Field') {
//         element.innerHTML = '<h1>Title</h1>';
//     } else if (type === 'SubTitle Field') {
//         element.innerHTML = '<h2>SubTitle</h2>';
//     } else if (type === 'Text Field') {
//         element = createTextField(); // Create text field with default settings
//     } else if (type === 'Number Field') {
//         element = createNumberField(); // Create number field with default settings
//     } else if (type === 'Text Area Field') {
//         element.innerHTML = `
//             <label>Text Area</label>
//             <textarea placeholder="Enter text..."></textarea>
//         `;
//     } else if (type === 'Date Field') {
//         element.innerHTML = `
//             <label>Date Field</label>
//             <input type="date">
//         `;
//     } else if (type === 'Select Field') {
//         element.innerHTML = `
//             <label>Select Field</label>
//             <select>
//                 <option value="">Select...</option>
//                 <option value="option1">Option 1</option>
//                 <option value="option2">Option 2</option>
//             </select>
//         `;
//     } else if (type === 'Checkbox Field') {
//         element.innerHTML = `
//             <label><input type="checkbox"> Checkbox Field</label>
//         `;
//     } else if (type === 'Button Field') {
//         element.innerHTML = `
//             <button>Submit</button>
//         `;
//     } else if (type === 'Table Field') {
//         element.innerHTML = `
//             <label>Table Field</label>
//             <table>
//                 <tr>
//                     <th>Header 1</th>
//                     <th>Header 2</th>
//                 </tr>
//                 <tr>
//                     <td>Data 1</td>
//                     <td>Data 2</td>
//                 </tr>
//             </table>
//         `;
//     }

//     addControlButtons(element); // Add control buttons for each element
//     return element;
// }

// // Add control buttons for settings and deletion
// function addControlButtons(element) {
//     const editButton = document.createElement('span');
//     editButton.textContent = '✎'; // Edit icon
//     editButton.className = 'correction-icon';
//     const deleteButton = document.createElement('span');
//     deleteButton.textContent = '🗑️'; // Delete icon
//     deleteButton.className = 'delete-button';

//     editButton.onclick = () => {
//         showSettings(element);
//     };

//     deleteButton.onclick = () => {
//         dropzone.removeChild(element);
//     };

//     element.appendChild(editButton);
//     element.appendChild(deleteButton);
// }

// // Show settings for selected element
// function showSettings(element) {
//     settingsContent.innerHTML = '';
//     const elementType = element.getAttribute('data-type');

//     if (elementType === 'TextField') {
//         settingsContent.innerHTML = `
//             <label for="textLabel">Label:</label>
//             <input type="text" id="textLabel" value="${element.querySelector('label').textContent}">
//             <label for="textPlaceholder">Placeholder:</label>
//             <input type="text" id="textPlaceholder" value="${element.querySelector('input').placeholder}">
//             <label for="textRequired">Required:</label>
//             <input type="checkbox" id="textRequired" ${element.querySelector('input').required ? 'checked' : ''}>
//             <button id="saveTextSettings">Save</button>
//         `;
//         document.getElementById('saveTextSettings').onclick = function() {
//             saveElementSettings(element);
//         };
//     }

//     // Repeat for other element types...
//     elementSettings.style.display = 'block'; // Show settings
// }

// // Save settings for the element
// function saveElementSettings(element) {
//     const elementType = element.getAttribute('data-type');
//     if (elementType === 'TextField') {
//         const label = document.getElementById('textLabel').value;
//         const placeholder = document.getElementById('textPlaceholder').value;
//         const required = document.getElementById('textRequired').checked;

//         element.querySelector('label').textContent = label;
//         const inputField = element.querySelector('input[type="text"]');
//         inputField.placeholder = placeholder;
//         inputField.required = required;  // Update the required attribute
//     }
//     // Repeat for other element types...

//     // Hide settings after saving
//     elementSettings.style.display = 'none';
// }

// // Function to export form data to XML
// document.getElementById('exportXML').onclick = function() {
//     const xmlData = generateXML();
//     downloadXML(xmlData);
// };

// // Generate XML string from form elements
// function generateXML() {
//     const formElements = dropzone.children;
//     let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<form>\n';

//     for (let element of formElements) {
//         const type = element.getAttribute('data-type');
//         const label = element.querySelector('label') ? element.querySelector('label').textContent : '';
//         const placeholder = element.querySelector('input') ? element.querySelector('input').placeholder : '';
//         const required = element.querySelector('input') ? element.querySelector('input').required : false;

//         xml += `  <element type="${type}">\n`;
//         xml += `    <label>${label}</label>\n`;
//         xml += `    <placeholder>${placeholder}</placeholder>\n`;
//         xml += `    <required>${required}</required>\n`;
//         xml += `  </element>\n`;
//     }

//     xml += '</form>';
//     return xml;
// }

// // Download XML data
// function downloadXML(xmlData) {
//     const blob = new Blob([xmlData], { type: 'application/xml' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'form.xml';
//     link.click();
// }

// // Import XML data
// document.getElementById('importXML').addEventListener('change', function(event) {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = function(e) {
//         const xmlContent = e.target.result;
//         loadXML(xmlContent);
//     };
//     reader.readAsText(file);
// });

// // Load XML data to form
// function loadXML(xmlContent) {
//     const parser = new DOMParser();
//     const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
//     const formElements = xmlDoc.getElementsByTagName('element');

//     for (let formElement of formElements) {
//         const type = formElement.getAttribute('type');
//         const label = formElement.getElementsByTagName('label')[0].textContent;
//         const placeholder = formElement.getElementsByTagName('placeholder')[0].textContent;
//         const required = formElement.getElementsByTagName('required')[0].textContent === 'true';

//         let element;
//         if (type === 'TextField') {
//             element = createTextField(label, placeholder, required);
//         } else if (type === 'NumberField') {
//             element = createNumberField(label, placeholder, required);
//         } else {
//             element = createGenericElement(type);
//         }

//         dropzone.appendChild(element);
//     }
// }

