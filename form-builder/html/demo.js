const formCanvas = document.getElementById('formCanvas');
let toolbar = document.querySelector('.toolbar');
const drophint = document.querySelector('.drop-hint');

// const previewBtn = document.getElementById('preview-btn');
const previewModal = document.getElementById('preview-modal');
const previewContent = document.getElementById('preview-content');

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log("id", id);
// const closePreviewBtn = document.getElementById('close-preview-btn');
let draggedElement;
let dropTarget;

// Enable drag-and-drop functionality
const draggables = document.querySelectorAll('.draggable');

window.addEventListener('DOMContentLoaded', function () {
  let forms = localStorage.getItem("forms");

  forms = JSON.parse(forms);
  forms.forEach((form) => {
    if (form.id === id) {
      if (form.formCanvas) formCanvas.innerHTML = form.formCanvas;
    }
  })
})


draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('form-element')) {
      draggedElement = e.target;
      setTimeout(() => e.target.classList.add('invisible'), 0); // Hide the element while dragging
      console.log('start')
    }
    draggedElement = e.target.id;
    console.log('start')
  });
});

formCanvas.addEventListener('dragend', (e) => {
  if (draggedElement) {
    draggedElement.classList.remove('invisible');
    console.log("end")
  }
});

formCanvas.addEventListener('dragover', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('draggable') && e.target !== draggedElement) {
    dropTarget = e.target;
    dropTarget.classList.add('drag-over');
    console.log('over')
  }
  console.log('over')
});

formCanvas.addEventListener('dragleave', (e) => {
  if (e.target.classList.contains('draggable')) {
    e.target.classList.remove('drag-over');
    console.log('leave')
  }
});

formCanvas.addEventListener('drop', (e) => {
  e.preventDefault();
  if (dropTarget && draggedElement !== dropTarget) {
    dropTarget.classList.remove('drag-over');

    // Insert the dragged element before or after the drop target
    const bounding = dropTarget.getBoundingClientRect();
    const offset = e.clientY - bounding.top;
    const position = offset > bounding.height / 2 ? 'after' : 'before';
    console.log('drop')
    if (position === 'after') {
      formCanvas.insertBefore(draggedElement, dropTarget.nextSibling);
      console.log('position after')
    } else {
      formCanvas.insertBefore(draggedElement, dropTarget);
    }

  }
  document.querySelector('.drop-hint').style.display = 'none';
  console.log('drop')
  addField(draggedElement);
});

// closePreviewBtn.addEventListener('click', () => {
//   previewModal.classList.add('hidden');
// });

let elementIdCounter = 0;

function addField(type) {
  const div = document.createElement('div');
  div.classList.add('form-element');
  div.dataset.type = type;

  const uniqueId = 'element-' + Math.floor(Math.random() * Date.now()).toString(8);
  div.dataset.uniqueId = uniqueId;
  console.log("uniqueId in addfeild", uniqueId);
  switch (type) {

    case 'titleField':
      div.innerHTML = '<div class="element-label" id="${uniqueId}" draggable="true">Title</div>' +
        '<div class="action-buttons">' +
        '<button class="edit-button" onclick="editField(this)">Edit</button>' +
        '<button class="delete-button" onclick="deleteField(this)">Delete</button>' +
        '</div>';
      break;
    case 'subtitleField':
      div.innerHTML = '<span class="element-label" id="${uniqueId}" draggable="true">Subtitle</span>' +
        '<div class="action-buttons">' +
        '<button class="edit-button" onclick="editField(this)">Edit</button>' +
        '<button class="delete-button" onclick="deleteField(this)">Delete</button>' +
        '</div>';
      break;
    case 'paragraphField':
      div.innerHTML = '<span class="element-label" id="${uniqueId}">Paragraph</span>' +
        '<div class="action-buttons">' +
        '<button class="edit-button" onclick="editField(this)">Edit</button>' +
        '<button class="delete-button" onclick="deleteField(this)">Delete</button>' +
        '</div>';
      break;
    case 'separatorField':
      div.innerHTML = '<span class="element-label" id="${uniqueId}">Separator</span>' +
        '<div class="action-buttons">' +
        '<button class="edit-button" onclick="editField(this)">Edit</button>' +
        '<button class="delete-button" onclick="deleteField(this)">Delete</button>' +
        '</div>';
      break;
    case 'spacerField':
      div.innerHTML = '<span class="element-label" id="${uniqueId}">Spacer</span>' +
        '<div class="action-buttons">' +
        '<button class="edit-button" onclick="editField(this)">Edit</button>' +
        '<button class="delete-button" onclick="deleteField(this)">Delete</button>' +
        '</div>';
      break;
    case 'textField':
      div.innerHTML = '<span class="element-label" id="${uniqueId}">Text Field</span>' +
        '<div class="action-buttons">' +
        '<button class="edit-button" onclick="editField(this)">Edit</button>' +
        '<button class="delete-button" onclick="deleteField(this)">Delete</button>' +
        '</div>';
      break;
    case 'numberField':
      div.innerHTML = '<span class="element-label" id="${uniqueId}">Number Field</span>' +
        '<div class="action-buttons">' +
        '<button class="edit-button" onclick="editField(this)">Edit</button>' +
        '<button class="delete-button" onclick="deleteField(this)">Delete</button>' +
        '</div>';
      break;
    case 'textAreaField':
      div.innerHTML = '<span class="element-label" id="${uniqueId}">Text Area</span>' +
        '<div class="action-buttons">' +
        '<button class="edit-button" onclick="editField(this)">Edit</button>' +
        '<button class="delete-button" onclick="deleteField(this)">Delete</button>' +
        '</div>';
      break;
    // case 'dateField':
    //     div.innerHTML = '<span class="element-label">Date Field</span>' +
    //         '<div class="action-buttons">' +
    //         '<button class="edit-button" onclick="editField(this)">Edit</button>' +
    //         '<button class="delete-button" onclick="deleteField(this)">Delete</button>' +
    //         '</div>';
    //     break;
    case 'selectField':
      div.innerHTML = '<span class="element-label" id="${uniqueId}">Select Field</span>' +
        '<div class="action-buttons">' +
        '<button class="edit-button" onclick="editField(this)">Edit</button>' +
        '<button class="delete-button" onclick="deleteField(this)">Delete</button>' +
        '</div>';
      break;
    case 'checkboxField':
      div.innerHTML = '<span class="element-label" id="${uniqueId}">Checkbox</span>' +
        '<div class="action-buttons">' +
        '<button class="edit-button" onclick="editField(this)">Edit</button>' +
        '<button class="delete-button" onclick="deleteField(this)">Delete</button>' +
        '</div>';
      break;
    case 'buttonField':
      div.innerHTML = '<span class="element-label" id="${uniqueId}">Button</span>' +
        '<div class="action-buttons">' +
        '<button class="edit-button" onclick="editField(this)">Edit</button>' +
        '<button class="delete-button" onclick="deleteField(this)">Delete</button>' +
        '</div>';
      break;
    // case 'tableField':
    //   div.innerHTML = '<span class="element-label" id="${uniqueId}">Table</span>' +
    //     '<div class="action-buttons">' +
    //     '<button class="edit-button" onclick="editField(this)">Edit</button>' +
    //     '<button class="delete-button" onclick="deleteField(this)">Delete</button>' +
    //     '</div>';
    //   break;
    default:
      break;
  }
  formCanvas.appendChild(div);
  console.log(div.dataset.type);
}

let optionCount = 0;

function addOptionField(uniqueId) {
  const optionsContainer = document.getElementById('options-container');

  // Create a new div for the option
  const optionDiv = document.createElement('div');
  optionDiv.classList.add('form-group');
  optionDiv.id = `option-${optionCount}`;

  // Create an input field for the option
  const optionInput = document.createElement('input');
  optionInput.type = 'text';
  optionInput.placeholder = 'Option value';
  optionInput.id = `option-value-${optionCount}`;
  optionInput.onchange = function () {
    updateField(this.value, 'selectField', uniqueId, 'select'); // Optional, if you want to update live
  };

  // Append the input field to the div
  optionDiv.appendChild(optionInput);

  // Optionally, add a delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.type = 'button';
  deleteButton.onclick = function () {
    removeOptionField(optionCount, uniqueId);
  };

  // Append delete button
  optionDiv.appendChild(deleteButton);

  // Append the new option to the options container
  optionsContainer.appendChild(optionDiv);

  optionCount++;
}

// Function to handle editing field properties
function editField(button) {
  const element = button.closest('.form-element');
  console.log(element);
  console.log(formCanvas);

  const uniqueId = element.dataset.uniqueId; // Get the unique ID of the element being edited
  const fieldType = element.dataset.type;
  console.log("uniqueId", uniqueId);
  const label = element.querySelector('.element-label');
  forms = localStorage.getItem("forms");
  forms = JSON.parse(forms);
  forms.forEach((form) => {
    if (form.id === id) {
      // console.log("forms after adding form structure", forms.formStructure.html);
      if (form.formStructure) {
        let temp = form.formStructure.html;
        // Parse the HTML string into a Document object
        const parser = new DOMParser();
        const doc = parser.parseFromString(temp, 'text/html');
        const element = doc.querySelector(`[id="${uniqueId}"]`);

        // Check if the element is found and log it
        if (element) {
          console.log('Element found:', element);
        } else {
          console.log('Element not found', temp);
          console.log('Element not found because', doc);
        }
      }
    }
  })

  toolbar.innerHTML = ''; // Clear the previous toolbar content
  document.head.querySelectorAll('style[data-edit-style]').forEach(style => style.remove()); // Remove previous styles


  toolbar.innerHTML = `<h3>Edit ${fieldType.replace('Field', '')}</h3>`;

  const style = document.createElement('style');
  style.setAttribute('data-edit-style', ''); // Mark this style to identify it for future removal

  console.log(style)
  // Add specific input fields for editing based on type
  document.head.appendChild(style);

  switch (fieldType) {
    case 'titleField':
      style.innerHTML = `    .form-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: auto;
  margin: auto;
  align-items:center;
}

.form-item {
  margin-bottom: 15px;
  text-align:left;
}

span{
margin-top:10px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
margin-top:10px;
  width: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.titlebtn {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.titlebtn:hover {
  background-color: #0056b3;
}

.title-display {
  margin-top: 20px;
  font-size: 24px;
  text-align: center;
  color: #333;
}`;
      document.head.appendChild(style); // Append the styles

      toolbar.innerHTML += ` 
   <div class="form-container">
<form id="titleForm"  draggable="true">
  <div class="form-item">
    <span class="element-label">Title</span>
    <input type="text" id="title" name="title" value="${label.innerText}"  onchange="updateField(this.value, '${uniqueId}', '${fieldType}') />
  </div>
  <div class="action-buttons">
    <button type="button" class="titlebtn" id="saveButton" onclick="saveTitle('${fieldType}', '${uniqueId}')">Save</button>
  </div>
</form>
</div>`;
      break;
    case 'subtitleField':
      style.innerHTML = `    .form-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: auto;
  margin: auto;
}

.form-item {
text-align:center;
  margin-bottom: 15px;
}

label {
text-align:left;
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 350px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.subtitlebtn {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.subtitlebtn:hover {
  background-color: #0056b3;
}

.subtitle-display {
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
  color: #333;
}`
      toolbar.innerHTML += `
      <form id="subtitleForm">
  <div class="form-item" draggable="true">
    <label for="subtitle">Subtitle</label>
    <input type="text" id="subtitle" name="subtitle" value="${label.innerText}" onchange="updateField(this.value, '${uniqueId}', '${fieldType}')"/>
  </div>
  <button type="button" id="saveButton" class="subtitlebtn" onclick="saveTitle('${fieldType}', '${uniqueId}')">Save</button>
</form>`
      break;
    case 'paragraphField':
      style.innerHTML = `    .form-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: auto;
  margin: auto;
}

.form-item {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  text-align:left;
}

textarea {
  width: 350px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.paraBtn {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.paraBtn:hover {
  background-color: #0056b3;
}

.paragraph-display {
  margin-top: 20px;
  font-size: 18px;
  color: #555;
}`
      toolbar.innerHTML += `
       <form id="paragraphForm">
  <div class="form-item">
    <label for="paragraph">Paragraph</label>
    <textarea id="paragraph" name="paragraph" rows="5" onchange="updateField(this.value, '${uniqueId}', '${fieldType}')"></textarea>
  </div>
  <button type="button" class="paraBtn" id="saveButton" onclick="saveTitle('${fieldType}', '${uniqueId}')">Save</button>
</form>`;
      break;
    case 'separatorField':
      style.innerHTML = `.form-container {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      width: auto;
      margin: auto;
    }

    .form-item {
      margin-bottom: 20px;
    }

    label {
     text-align:center;
      display: block;
      font-weight: bold;
      margin-bottom: 10px;
    }
      .separabtn{
      background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
      }
  .separabtn:hover {
  background-color: #0056b3;
}

   `
      toolbar.innerHTML += ` <div class="form-container">
    <div class="form-item">
      <label>Separator Field</label>
      <hr id="separator" data-value="Separator Value" />
        <button class="separabtn" onclick=" var hrElement = this.previousElementSibling;
        var separatorValue = hrElement.getAttribute('data-value'); updateField(separatorValue,'${fieldType}', '${uniqueId}', 'hr'); saveTitle('${fieldType}', '${uniqueId}')">Save</button>
    </div>
  </div>`
      break;
    case 'spacerField':
      style.innerHTML = ` .container-form {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      width: auto;
      margin: auto;
    }

    label {
      display: block;
      font-size: 16px;
      margin-bottom: 10px;
      text-align:left;
    }

    .spacer {
      background-color: #eaeaea;
      width: 100%;
    }

    .slider-container {
      margin-top: 20px;
    }

    input[type="range"] {
      width: 100%;
    }

    #saveSpacerBtn{
      background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
      }

  #saveSpacerBtn:hover {
  background-color: #0056b3;
}

    .spacer-display {
      text-align: center;
      margin-top: 10px;
    }`
      toolbar.innerHTML += `<div class="container-form">
       <label>Spacer Field: <span id="heightValue">20</span>px</label>
       <div class="spacer" id="spacer" style="height: 20px;"></div>

       <div class="slider-container">
      <label for="heightRange">Adjust Spacer Height (5px to 200px):</label>
      <input
        type="range"
        id="heightRange"
        min="5"
        max="200"
        value="20"
        step="1"
         onchange="updateField(this.value, '${uniqueId}', '${fieldType}')"/>
        </div>
         <button class="save-button" id="saveSpacerBtn" onclick="saveTitle('${fieldType}', '${uniqueId}')">Save</button>
       </div>`
      break;
    case 'textField':
      style.innerHTML = `.form-item {
      text-align:center;
margin-bottom: 20px;
width:auto;
}

label {
display: block;
font-weight: bold;
margin-bottom: 5px;
text-align:left;
}

input[type="text"], input[type="checkbox"] {
padding: 5px;
width: 350px;
}

select{
padding: 5px;
width: 350px;
}

.description {
font-size: 0.9em;
color: #666;
}

.textfdbtn {
padding: 10px 15px;
background-color: #007BFF;
color: white;
border: none;
cursor: pointer;
}

.textfdbtn:hover {
background-color: #0056b3;
}

#output {
margin-top: 30px;
}

#outputLabel {
font-weight: bold;
}
`
      toolbar.innerHTML += `
       <form id="textFieldForm">
  <div class="form-item">
    <label for="label">Label</label>
    <input type="text" id="label" name="label" placeholder="Label" onchange="updateField(this.value, '${uniqueId}', '${fieldType}','label')" >
  </div>
  <div class="form-item">
    <label for="placeholder">Placeholder</label>
    <input type="text" id="placeholder" name="placeholder" placeholder="Placeholder" onchange="updateField(this.value, '${uniqueId}', '${fieldType}','placeholder')">
  </div>
  <div class="form-item">
      <label for="inputType">Input Type</label>
      <select id="inputType" name="inputType" onchange="updateField(this.value, '${uniqueId}', '${fieldType}', 'inputType')">
        <option value="text">Text</option>
        <option value="email">Email</option>
        <option value="tel">Phone</option>
        <option value="number">Number</option>
        <option value="password">Password</option>
      </select> 
    </div>
  <button type="button" class="textfdbtn" onclick="saveTitle('${fieldType}', '${uniqueId}')">Save</button>
</form>`;
      break;
    case 'numberField':
      style.innerHTML = `.form-container {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: auto;
    margin: auto;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

#numberFieldLabel{
text-align:center;
}

input[type="text"],
input[type="number"] {
    width: 300px;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #ddd;
}

input[type="checkbox"] {
    margin-left: 10px;
}

.NUMfdbtn {
padding: 10px 15px;
background-color: #007BFF;
color: white;
border: none;
cursor: pointer;
}

.NUMfdbtn:hover {
background-color: #0056b3;
}

.form-group {
text-align:left;
    margin-bottom: 20px;
}

#helperText {
    font-size: 0.8rem;
    color: #666;
}

.error {
    border-color: red;
}

.error-text {
    color: red;
}`
      toolbar.innerHTML += `
             <div class="form-container">
        <label id="numberFieldLabel" for="numberFieldInput">Number field</label>
        <div class="form-group">
            <label for="labelInput">Label</label>
            <input type="text" id="labelInput" placeholder="Enter Label" onchange="updateField(this.value, '${uniqueId}', '${fieldType}','label')" />
        </div>
        <div class="form-group">
            <label for="placeHolderInput">PlaceHolder</label>
            <input type="text" id="placeHolderInput" placeholder="Enter Placeholder" onchange="updateField(this.value, '${uniqueId}', '${fieldType}','placeholder')"/>
        </div>
         
  <button type="button" class="NUMfdbtn" onclick="saveTitle('${fieldType}', '${uniqueId}')">Save</button>
    </div>`;
      break;
    case 'textAreaField':
      style.innerHTML = `.form-container {
    max-width: auto;
    margin: 0 auto;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-field {
    margin-bottom: 20px;
  }
  
  label {
  margin-top:20px;
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
    text-align:left;
  }
  
  input,
  textarea {
    width: 300px;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  input[type="checkbox"] {
    width: auto;
    margin-left: 5px;
  }
  
  textarea {
    resize: none;
  }
  
  
  .textbtn {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .textbtn:hover {
    background-color: #0056b3;
  }
  
  .hidden {
    display: none;
  }
  
  .preview-section {
    margin-top: 30px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  `
      toolbar.innerHTML = ` <div class="container">
    <form id="textFieldForm">
      <div class="form-item">
        <label for="label">Label</label>
        <input type="text" id="label" name="label" placeholder="Label" onchange="updateField(this.value, '${fieldType}', '${uniqueId}','label')">
      </div>
      <div class="form-item">
        <label for="placeholder">Placeholder</label>
        <input type="text" id="placeholder" name="placeholder" placeholder="Placeholder" onchange="updateField(this.value, '${fieldType}' ,'${uniqueId}', 'placeholder')">
      </div>
       <div class="form-field">
        <label for="rows">Rows <span id="rowValue">3</span></label>
        <input type="range" id="rows" min="1" max="10" value="3" step="1" onchange="updateField(this.value, '${fieldType}','${uniqueId}','label')"/>
      </div>
      <button type="button" class="textbtn" onclick="saveTitle('${fieldType}', '${uniqueId}')">Save</button>
    </form>
  </div>`
      break;
    case 'selectField':
      style.innerHTML = ` .container-from {
    max-width: auto;
    margin: 0 auto;
  }

  #field-label{
  text-align:center;
  }
  
  label {
    font-weight: bold;
    display: block;
    text-align:left;
    margin-bottom:10px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input[type="text"], select {
    width: 350px;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  .selectbtn {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .selectbtn:disabled {
    background-color: #ccc;
  }
  
  .selectbtn[type="button"] {
    background-color: #28a745;
  }
  
  #options-container {
    display: flex;
    flex-direction: column;
  }
  
  #options-container .option {
    display: flex;
    align-items: center;
  }
  
  #options-container input {
    margin-right: 10px;
    flex-grow: 1;
  }
  
`
      toolbar.innerHTML = ` 
  <div class="container-form">
    <label id="field-label" for="select-field">Select field</label>
    <form id="properties-form">
      <div class="form-group">
        <label for="label">Label</label>
        <input type="text" id="label" value="Select field" 
               onchange="updateField(this.value, '${fieldType}', '${uniqueId}', 'label')"/>
      </div>

      <div class="form-group">
        <label for="placeholder">Placeholder</label>
        <input type="text" id="placeholder" placeholder="Enter placeholder" 
               onchange="updateField(this.value, '${fieldType}', '${uniqueId}', 'placeholder')"/>
      </div>

      <div class="form-group">
        <label>Options</label>
        <div id="options-container">
          <button type="button" id="add-option"  
                  onclick="addOptionField('${uniqueId}')">Add Option</button>
        </div>
      </div>

      <button type="submit" class="selectbtn" 
              onclick="saveTitle('${fieldType}', '${uniqueId}')">Save</button>
    </form>
  </div>
`;
      break;
    //       toolbar.innerHTML = ` <div class="container-from">
    //     <label id="field-label" for="select-field">Select field</label>
    //     <form id="properties-form">
    //       <div class="form-group">
    //         <label for="label">Label</label>
    //         <input type="text" id="label" value="Select field" onchange="updateField(this.value, '${fieldType}','${uniqueId}','label')"/>
    //       </div>

    //       <div class="form-group">
    //         <label>Options</label>
    //         <div id="options-container">
    //         <button type="button" id="add-option"  onclick="addOptionField('${uniqueId}')" onchange="updateField(this.value, '${fieldType}','${uniqueId}','select')">Add Option</button>
    //         </div>
    //       </div>

    //       <button type="submit" class="selectbtn" onclick="saveTitle('${fieldType}', '${uniqueId}')">Save</button>
    //     </form>
    //   </div>
    // `
    //       break;
    case 'checkboxField':
      style.innerHTML = `
  .container-form {
    max-width: auto;
    margin: 0 auto;
  }

  #field-label{
    text-align: center;
  }
  
  label {
    font-weight: bold;
    display: block;
    text-align: left;
    margin-bottom: 10px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input[type="text"], input[type="checkbox"] {
    width: 350px;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  .checkbtn {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .checkbtn:disabled {
    background-color: #ccc;
  }
  
  .checkbtn[type="button"] {
    background-color: #28a745;
  }
  
  #checkbox-container {
    display: flex;
    flex-direction: column;
  }
  
  #checkbox-container .option {
    display: flex;
    align-items: center;
  }
  
  #checkbox-container input {
    margin-right: 10px;
    flex-grow: 1;
  }
  `;

      toolbar.innerHTML = `
  <div class="container-form">
    <label id="field-label" for="checkbox-field">Checkbox Field</label>
    <form id="properties-form">
      <div class="form-group">
        <label for="label">Label</label>
        <input type="text" id="label" value="Checkbox Field" onchange="updateField(this.value, '${uniqueId}', '${fieldType}')"/>
      </div>

      <div class="form-group">
        <label>Options</label>
        <div id="checkbox-container">
        <button type="button" id="add-checkbox"  onclick="addCheckboxField('${uniqueId}')" onchange="updateField(this.value, '${uniqueId}', '${fieldType}')">Add Checkbox</button>
        </div>
      </div>

      <button type="submit" class="checkbtn" onclick="saveTitle('${fieldType}', '${uniqueId}')">Save</button>
    </form>
  </div>
  `;
      break;

    //     case 'checkboxField':
    //       style.innerHTML = `  
    //       .form-element {
    //     max-width: auto;
    //     margin: 0 auto;
    //   }

    //   .checkbox-container,
    //   .form-container {
    //     display: flex;
    //     align-items: flex-start;
    //     margin-bottom: 20px;
    //     align-items:center;
    //   }

    //   .checkbox-input {
    //     margin-right: 10px;
    //   }

    //   .label-container {
    //   text-align:center;
    //     display: flex;
    //     flex-direction: column;
    //   }

    //  .checkbtn {
    //     padding: 10px;
    //     background-color: #007bff;
    //     color: white;
    //     border: none;
    //     border-radius: 4px;
    //     cursor: pointer;
    //   }

    //   .checkbtn:disabled {
    //     background-color: #ccc;
    //   }

    //   .checkbtn[type="button"] {
    //     background-color: #28a745;
    //   }

    //   .checkbox-label {
    //     font-weight: bold;
    //     text-align:center;
    //   }


    //   .form-item {
    //     margin-bottom: 15px;
    //   }

    //   .form-input {
    //     width: 100%;
    //     padding: 8px;
    //     border: 1px solid #ccc;
    //     border-radius: 5px;
    //   }

    //   .form-description {
    //     font-size: 0.8rem;
    //     color: #666;
    //     margin-top: 5px;
    //   }

    //   .required-item {
    //     display: flex;
    //     justify-content: space-between;
    //     align-items: center;
    //     padding: 10px;
    //     border: 1px solid #ccc;
    //     border-radius: 5px;
    //   }

    //   .enter{
    //   text-align:center;
    //   }

    //   .switch {
    //     width: 40px;
    //     height: 20px;
    //     position: relative;
    //     /* -webkit-appearance: none; */
    //     background: #ccc;
    //     outline: none;
    //     border-radius: 20px;
    //     cursor: pointer;
    //   }

    //   .switch:checked {
    //     background: #4caf50;
    //   }
    //   `
    //       toolbar.innerHTML = `  <div class="form-element">
    //     <!-- Checkbox Field Designer -->
    //     <div class="checkbox-container">
    //     <!-- Form Component -->
    //     <div class="form-container">
    //       <div class="label-container">
    //         <label for="checkbox-form" class="checkbox-label">Checkbox Label </label>
    //       </div>
    //     </div>

    //     <!-- Properties Component -->
    //     <form class="properties-form">
    //       <div class="form-item">
    //         <label for="label-input" class="enter">Label</label>
    //         <input type="text" id="label-input" class="form-input" placeholder="Enter label" onchange="updateField(this.value,'${fieldType}', '${uniqueId}', 'label')">
    //       </div>

    //       <button type="submit" class="checkbtn" onclick="saveTitle('${fieldType}', '${uniqueId}')">Save</button>
    //     </form>
    //   </div>
    //   </div>`
    //       break;
    case 'buttonField':
      style.innerHTML = `
      .form-container {
            margin: 20px;
        }

        label {
            font-size: 14px;
            margin-bottom: 8px;
            display: inline-block;
            text-align:left;
        }

        input[type="text"], input[type="color"] {
            width: 300px;
            padding: 8px;
            margin-bottom: 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        .button-preview {
            margin-top: 20px;
        }

        .custom-button {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
        }`
      toolbar.innerHTML = `  <div class="form-container">
        <form id="properties-form">
            <label for="buttonText">Button Text</label>
            <input type="text" id="buttonText" name="buttonText" value="Click Me" onchange="updateField(this.value, '${fieldType}','${uniqueId}', 'label')">

            <label for="buttonColor">Button Color</label>
            <input type="color" id="buttonColor" name="buttonColor" value="#000000" onchange="updateField(this.value,'${fieldType}', '${uniqueId}', 'label')">

            <label for="fontColor">Font Color</label>
            <input type="color" id="fontColor" name="fontColor" value="#FFFFFF" onchange="updateField(this.value,  '${fieldType}','${uniqueId}', 'label')">
        </form>

        <div class="button-preview">
            <button id="dynamicButton" class="custom-button" style="background-color: #0056b3; color: white;" onclick="saveTitle('${fieldType}', '${uniqueId}')">
                Save
            </button>
        </div>
    </div>`
      break;
    case 'tableField':
      style.innerHTML = ` .container-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input, select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
  }
  
  button {
    padding: 10px 15px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-right: 10px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  `
      toolbar.innerHTML = `<div class="container-form">
    <form id="properties-form">
      <div class="form-group">
        <label for="label">Label</label>
        <input type="text" id="label" name="label" />
      </div>

      <div id="columns-container">
      </div>
      <button type="button" id="add-column">Add Column</button>

      <div id="rows-container">
      </div>
      <button type="button" id="add-row">Add Row</button>

      <button type="submit">Save</button>
    </form>
  </div>`;
      break;

    default:
      const newValue = prompt("Enter new value:", label.innerText);
      if (newValue) {
        document.getElementById(uniqueId).innerText = newValue;
      }
      break;
  }
  console.log("form canvas after changing feild", formCanvas.innerHTML)

}
console.log("form canvas after changing feild", formCanvas.innerHTML)


function updateField(value, type, uniqueId = null, fieldType = null) {
  console.log(value);
  console.log(type);
  console.log(uniqueId);

  const formvalue = formCanvas.querySelector(`[data-type="${type}"] .element-label`);
  formvalue.innerText = value;

  // If a uniqueId is provided, find the specific element by its unique ID
  if (uniqueId) {
    const element = document.querySelector(`[data-unique-id='${uniqueId}']`);
    if (element) {
      if (fieldType === 'label') {
        const label = element.querySelector('.element-label');
        if (label) {
          label.innerText = value;
        }
      } else if (fieldType === 'placeholder') {
        const input = element.querySelector('input[type="text"], textarea');
        if (input) {
          input.placeholder = value;
        }
      } else if (fieldType === 'select') {
        const selectElement = element.querySelector('select');
        if (selectElement) {
          // Fetch all current option values from the input fields
          const allOptions = document.querySelectorAll(`#options-container input[type="text"]`);
          selectElement.innerHTML = ''; // Clear current options

          // Re-add placeholder, if applicable
          const placeholderInput = document.getElementById('placeholder');
          if (placeholderInput && placeholderInput.value.trim()) {
            const placeholderOption = document.createElement('option');
            placeholderOption.textContent = placeholderInput.value.trim();
            placeholderOption.value = '';
            placeholderOption.disabled = true;
            placeholderOption.selected = true;
            selectElement.appendChild(placeholderOption);
          }

          // Add each new option to the select element
          allOptions.forEach((optionInput) => {
            if (optionInput.value.trim()) {
              const option = document.createElement('option');
              option.value = optionInput.value.trim();
              option.textContent = optionInput.value.trim();
              selectElement.appendChild(option); // Append option to select element
            }
          });
        }
        // const selectElement = document.querySelector(`[data-unique-id='${uniqueId}'] select`);
        // if (selectElement) {
        //   // Fetch all current option values from the input fields
        //   const allOptions = document.querySelectorAll(`#options-container input[type="text"]`);
        //   selectElement.innerHTML = ''; // Clear current options

        //   allOptions.forEach((optionInput) => {
        //     const option = document.createElement('option');
        //     option.value = optionInput.value.trim();
        //     option.textContent = optionInput.value.trim();
        //     selectElement.appendChild(option); // Append each option to the select
        //   });
        // }
      }
      // else if (fieldType === 'select') {
      //   const selectElement = element.querySelector('select');
      //   if (selectElement) {
      //     // Clear existing options
      //     selectElement.innerHTML = '';

      //     // Split the value by commas and add each as a new option
      //     const options = value.split(','); // Assuming comma-separated values
      //     options.forEach(optionValue => {
      //       const option = document.createElement('option');
      //       option.value = optionValue.trim();
      //       option.textContent = optionValue.trim();
      //       selectElement.appendChild(option);
      //     });
      //   }
      // } 
      else if (fieldType === 'rows') {
        const textarea = element.querySelector('textarea');
        if (textarea) {
          textarea.rows = value;
        }
        document.querySelector(`#rowValue-${uniqueId}`).innerText = value;
      } else if (fieldType === 'required') {
        // Handle the required checkbox
        const input = element.querySelector('input[type="text"], textarea, select');
        if (input) {
          input.required = value;  // 'value' will be true if the checkbox is checked, false otherwise
        }
      } else if (fieldType === "hr") {
        const hr = element.querySelector('hr');
        if (hr) {
          // Set a data attribute or style if needed
          hr.setAttribute('data-value', value);  // Update with the new value
          hr.style.border = "2px solid #007bff"; // Example of changing style
        }
      }
      else {
        console.error(`No element found with unique ID: ${uniqueId}`);
      }
    }
  } else {
    // If no uniqueId is provided, update all elements of the given type
    const elements = document.querySelectorAll(`.form-element[data-type='${type}'] .element-label`);
    elements.forEach(element => {
      element.textContent = value; // Update all labels with the new value
    });
  }
}

let updatedFormHTML = '';
// let elementIdCounter = 0;
function saveTitle(type, existingId = null) {
  console.log(type, existingId)

  const uniqueId = existingId || `element-${elementIdCounter++}`;

  console.log(type, uniqueId);
  switch (type) {
    case 'titleField':

      const titleValue = document.getElementById('title').value;
      let titleElement = document.getElementById(uniqueId);
      if (titleElement) {
        titleElement.innerText = titleValue;
      }
      else if (!titleElement) {
        titleElement = document.createElement('h1');
        titleElement.id = uniqueId; // Assign a unique ID
        titleElement.innerText = titleValue; // Set the text of the new title
        previewContent.appendChild(titleElement); // Append the title to your form canvas or container
      }
      console.log(`Title updated/created: ${uniqueId}`);
      break;

    case 'subtitleField':
      const subtitleValue = document.getElementById('subtitle').value;
      let subtitleElement = document.getElementById(uniqueId);

      if (subtitleElement) {
        subtitleElement.innerText = subtitleValue;
      }
      else if (!subtitleElement) {
        subtitleElement = document.createElement('h2');
        subtitleElement.id = uniqueId; // Assign unique ID
        subtitleElement.innerText = subtitleValue;
        previewContent.appendChild(subtitleElement);
      }
      console.log(uniqueId);
      break;

    case 'paragraphField':
      const paraValue = document.getElementById('paragraph').value;
      let paraElement = document.getElementById(uniqueId);

      if (paraElement) {
        paraElement.innerText = paraValue;
      } else if (!paraElement) {
        paraElement = document.createElement('p');
        paraElement.id = uniqueId; // Assign unique ID
        paraElement.innerText = paraValue;
        previewContent.appendChild(paraElement);
      }
      break;
    case 'separatorField':
      // Get the separator value from the data-value attribute of the <hr> element
      const separatorElement = document.getElementById('separator');
      const separatorValue = separatorElement.getAttribute('data-value');

      // Check if the <hr> element already exists in the form canvas
      let previewSeparatorElement = document.getElementById(uniqueId);

      if (previewSeparatorElement) {
        // If it exists, update its data-value (for any internal use) and optionally add text
        previewSeparatorElement.setAttribute('data-value', separatorValue);
      } else if (!previewSeparatorElement) {
        // If it doesn't exist, create a new <hr> element
        previewSeparatorElement = document.createElement('hr');
        previewSeparatorElement.id = uniqueId; // Assign a unique ID
        previewSeparatorElement.setAttribute('data-value', separatorValue); // Set the data-value
        previewSeparatorElement.innerText = separatorValue; // Optionally, if you want to display the value

        // Append the new <hr> element to the previewContent (form canvas)
        previewContent.appendChild(previewSeparatorElement);
      }
      break;
    case 'spacerField':
      const spacerHeight = document.getElementById("heightRange").value;
      let spacerElement = document.getElementById(uniqueId);

      if (!spacerElement) {
        spacerElement = document.createElement('div');
        spacerElement.id = uniqueId;
        previewContent.appendChild(spacerElement);
      }

      spacerElement.style.height = `${spacerHeight}px`;
      spacerElement.style.backgroundColor = '#eaeaea';  // Optional styling for better visibility
      break;
    case 'textField':
      const textFieldLabel = document.getElementById('label').value;
      const textFieldPlaceholder = document.getElementById('placeholder').value;
      console.log(textFieldLabel);
      const inputFieldType = document.getElementById('inputType').value;
      let textFieldElement = document.getElementById(uniqueId);

      if (textFieldElement) {
        // Update existing text field
        textFieldElement.querySelector('label').innerText = textFieldLabel;
        let inputElement = textFieldElement.querySelector('input');
        inputElement.type = inputFieldType;
        inputElement.placeholder = textFieldPlaceholder;

        inputElement.addEventListener('input', function () {
          validateInput(inputElement);
        });

        inputElement.addEventListener('blur', function () {
          validateInput(inputElement);
        });
      } else if (!textFieldElement) {
        // Create new text field element
        textFieldElement = document.createElement('div');
        textFieldElement.id = uniqueId;

        const labelElement = document.createElement('label');
        labelElement.innerText = textFieldLabel;


        const inputElement = document.createElement('input');
        inputElement.type = inputFieldType;
        inputElement.placeholder = textFieldPlaceholder;

        // Adding styling to the input element
        inputElement.style.padding = '10px';
        inputElement.style.borderRadius = '4px';
        inputElement.style.border = '1px solid #ccc';
        inputElement.style.width = '100%';
        inputElement.style.marginTop = '5px';
        inputElement.style.boxSizing = 'border-box';


        inputElement.addEventListener('input', function () {
          validateInput(inputElement);
        });

        inputElement.addEventListener('blur', function () {
          validateInput(inputElement);
        });

        textFieldElement.appendChild(labelElement);
        textFieldElement.appendChild(inputElement);

        previewContent.appendChild(textFieldElement);
      }
      break;

    case 'numberField': // Handling number field
      const numberFieldLabel = document.getElementById('labelInput').value;
      const numberFieldPlaceholder = document.getElementById('placeHolderInput').value;
      // const helperTextValue = document.getElementById('helperTextInput').value || 'Helper text';
      // const numberFieldRequired = document.getElementById('requiredSwitch').checked;

      let numberFieldElement = document.getElementById(uniqueId);
      if (!numberFieldElement) {
        // Create a new container for the number field
        numberFieldElement = document.createElement('div');
        numberFieldElement.id = uniqueId;

        // Create label
        const labelElement = document.createElement('label');
        labelElement.textContent = numberFieldLabel;
        labelElement.setAttribute('for', `numberInput-${uniqueId}`);

        // Create input
        const inputElement = document.createElement('input');
        inputElement.type = 'number';
        inputElement.id = `numberInput-${uniqueId}`;
        inputElement.placeholder = numberFieldPlaceholder;
        // inputElement.required = numberFieldRequired;
        inputElement.style.padding = '10px';
        inputElement.style.borderRadius = '5px';
        inputElement.style.border = '1px solid #ddd';
        inputElement.style.width = '100%';
        inputElement.style.marginTop = '5px';
        numberFieldElement.appendChild(labelElement);
        numberFieldElement.appendChild(inputElement);

        // Append to previewModal or your container
        previewContent.appendChild(numberFieldElement);
      } else {
        // If number field already exists, update its values
        const labelElement = numberFieldElement.querySelector('label');
        const inputElement = numberFieldElement.querySelector('input');

        labelElement.textContent = numberFieldLabel;
        inputElement.placeholder = numberFieldPlaceholder;

      }
      break;
    case 'textAreaField': // Handling text area field
      const textAreaLabel = document.getElementById('label').value;
      const textAreaPlaceholder = document.getElementById('placeholder').value;
      const textAreaRows = document.getElementById('rows').value; // Number of rows for textarea

      let textAreaElement = document.getElementById(uniqueId);

      if (textAreaElement) {
        // Update existing text area
        const labelElement = textAreaElement.querySelector('label');
        const textareaElement = textAreaElement.querySelector('textarea');

        labelElement.textContent = textAreaLabel; // Update label text
        textareaElement.placeholder = textAreaPlaceholder; // Update placeholder
        textareaElement.rows = textAreaRows; // Update the number of rows

      } else if (!textAreaElement) {
        // Create a new container for the text area
        textAreaElement = document.createElement('div');
        textAreaElement.id = uniqueId;

        // Create label
        const labelElement = document.createElement('label');
        labelElement.textContent = textAreaLabel;
        labelElement.setAttribute('for', `textArea-${uniqueId}`);

        // Create textarea
        const textareaElement = document.createElement('textarea');
        textareaElement.id = `textArea-${uniqueId}`;
        textareaElement.placeholder = textAreaPlaceholder;
        textareaElement.rows = textAreaRows;
        // textareaElement.required = textAreaRequired; // Handle required field if needed

        // Apply some basic styles to the textarea
        textareaElement.style.width = '100%';
        textareaElement.style.padding = '10px';
        textareaElement.style.marginTop = '5px';
        textareaElement.style.borderRadius = '5px';
        textareaElement.style.border = '1px solid #ddd';

        // Append label and textarea to the container
        textAreaElement.appendChild(labelElement);
        textAreaElement.appendChild(textareaElement);

        // Append the new text area to the preview or form container
        previewContent.appendChild(textAreaElement);
      }
      break;
    case 'selectField':
      const selectFieldLabel = document.getElementById('label').value;
      const selectFieldPlaceholder = document.getElementById('placeholder').value;


      let options = [];
      document.querySelectorAll('#options-container input[type="text"]').forEach(optionInput => {
        if (optionInput.value.trim() !== '') {
          options.push(optionInput.value.trim());
        }
      });
      let selectFieldElement = document.getElementById(uniqueId);

      if (!selectFieldElement) {
        // Create a container for the select field
        selectFieldElement = document.createElement('div');
        selectFieldElement.id = uniqueId;

        // Create and configure the label element
        const labelElement = document.createElement('label');
        labelElement.innerText = selectFieldLabel;

        // Create the select input element
        const selectElement = document.createElement('select');
        selectElement.setAttribute('multiple', 'multiple');

        // Adding styling to the select element
        selectElement.style.padding = '10px';
        selectElement.style.borderRadius = '4px';
        selectElement.style.border = '1px solid #ccc';
        selectElement.style.width = '100%';
        selectElement.style.marginTop = '5px';
        selectElement.style.boxSizing = 'border-box';

        // Create and add placeholder option (disabled by default)
        // const placeholderOption = document.createElement('option');
        // placeholderOption.textContent = selectFieldPlaceholder;
        // placeholderOption.value = '';
        // placeholderOption.disabled = true;
        // placeholderOption.selected = true;
        // selectElement.appendChild(placeholderOption);

        // Append the label and the select element to the container
        selectFieldElement.appendChild(labelElement);
        selectFieldElement.appendChild(selectElement);
        previewContent.appendChild(selectFieldElement);
      } else {
        // Update existing select field
        selectFieldElement.querySelector('label').innerText = selectFieldLabel;
        let selectElement = selectFieldElement.querySelector('select');
        selectElement.innerHTML = ''; //
        // selectElement.placeholder = selectFieldPlaceholder;
        // selectElement.required = selectFieldRequired;

        // selectElement.setAttribute('multiple', 'multiple');
      }
      if (selectFieldPlaceholder) {
        const placeholderOption = document.createElement('option');
        placeholderOption.textContent = selectFieldPlaceholder;
        placeholderOption.value = '';
        placeholderOption.disabled = true;  // Disabled so that it's not selectable
        placeholderOption.selected = true;  // Selected as the default option
        selectFieldElement.querySelector('select').appendChild(placeholderOption);
      }
      //   const placeholderOption = document.createElement('option');
      //   placeholderOption.textContent = selectFieldPlaceholder;
      //   placeholderOption.value = '';
      //   placeholderOption.disabled = true;
      //   placeholderOption.selected = true;
      //   selectElement.appendChild(placeholderOption);
      // }

      // Add options to the select element
      options.forEach(optionText => {
        const optionElement = document.createElement('option');
        optionElement.textContent = optionText;
        optionElement.value = optionText;
        selectFieldElement.querySelector('select').appendChild(optionElement);
      });

      break;
    case 'checkboxField':
      const checkboxFieldLabel = document.getElementById('label-input').value;

      let checkboxFieldElement = document.getElementById(uniqueId);

      if (checkboxFieldElement) {
        // Update existing checkbox field
        const labelElement = checkboxFieldElement.querySelector('label');
        labelElement.innerText = checkboxFieldLabel;

        // If other updates are required (like changing the checkbox state), you can handle them here
      } else {
        // Create a container for the checkbox field
        checkboxFieldElement = document.createElement('div');
        checkboxFieldElement.id = uniqueId;

        // Create label
        const labelElement = document.createElement('label');
        labelElement.innerText = checkboxFieldLabel;

        // Create checkbox input
        const checkboxInputElement = document.createElement('input');
        checkboxInputElement.type = 'checkbox';
        checkboxInputElement.id = `checkbox-${uniqueId}`;

        // Add styles if needed
        checkboxInputElement.style.marginRight = '10px'; // Space between checkbox and label

        // Append label and checkbox to the container
        checkboxFieldElement.appendChild(checkboxInputElement);
        checkboxFieldElement.appendChild(labelElement);

        // Append the new checkbox field to the preview or form container
        previewContent.appendChild(checkboxFieldElement);
      }
      break;

    case 'buttonField':
      const buttonLabel = document.getElementById('buttonText').value; // Get the button label
      const buttonColor = document.getElementById('buttonColor').value; // Get the button color
      const fontColor = document.getElementById('fontColor').value; // Get the font color
      const buttonId = uniqueId; // Unique ID for the button

      let buttonElement = document.getElementById(buttonId);

      if (buttonElement) {
        // Update existing button element
        buttonElement.innerText = buttonLabel; // Update button label
        buttonElement.style.backgroundColor = buttonColor; // Update button background color
        buttonElement.style.color = fontColor; // Update font color

        // You can update additional button styles here if needed
      } else if (!buttonElement) {
        // Create a new button element
        buttonElement = document.createElement('button');
        buttonElement.id = buttonId;
        buttonElement.innerText = buttonLabel; // Set the button label

        // Optional styling for new button
        buttonElement.style.padding = '10px 20px';
        buttonElement.style.borderRadius = '4px';
        buttonElement.style.border = 'none';
        buttonElement.style.backgroundColor = buttonColor; // Set button background color
        buttonElement.style.color = fontColor; // Set font color
        buttonElement.style.cursor = 'pointer';
        buttonElement.style.marginTop = '10px';

        // Add click event listener if needed
        buttonElement.addEventListener('click', function () {
          alert(`Button ${buttonLabel} clicked!`); // Example action
        });

        previewContent.appendChild(buttonElement); // Append the button to the preview
      }
      break;

    // case 'tableField':
    //   const tableFieldData = document.getElementById('tableData').value; // Get the table data
    //   let tableElement = document.getElementById(uniqueId);

    //   if (!tableElement) {
    //     tableElement = document.createElement('table');
    //     tableElement.id = uniqueId;

    //     // Set table styling
    //     tableElement.style.width = '100%';
    //     tableElement.style.borderCollapse = 'collapse';

    //     // Create the header
    //     const thead = document.createElement('thead');
    //     const headerRow = document.createElement('tr');

    //     // Assuming tableFieldData contains comma-separated values for headers
    //     const headers = tableFieldData.split(',');
    //     headers.forEach(headerText => {
    //       const th = document.createElement('th');
    //       th.innerText = headerText.trim();
    //       th.style.border = '1px solid #ccc';
    //       th.style.padding = '10px';
    //       headerRow.appendChild(th);
    //     });

    //     thead.appendChild(headerRow);
    //     tableElement.appendChild(thead);
    //     const tbody = document.createElement('tbody');
    //     tableElement.appendChild(tbody);
    //     previewContent.appendChild(tableElement);
    //   } else {
    //     // If table already exists, update its content
    //     const tbody = tableElement.querySelector('tbody');
    //     tbody.innerHTML = ''; // Clear existing rows

    //     // Add rows as needed (example: adding a single row with placeholder data)
    //     // You can expand this part as needed
    //     const row = document.createElement('tr');
    //     headers.forEach(headerText => {
    //       const td = document.createElement('td');
    //       td.innerText = 'Placeholder'; // Or you can get this from another input
    //       td.style.border = '1px solid #ccc';
    //       td.style.padding = '10px';
    //       row.appendChild(td);
    //     });
    //     tbody.appendChild(row);
    //   }
    //   break;

    default:
      console.error('Unknown field type:', type);

  }

  updatedFormHTML = previewContent.innerHTML;

  displayAvailableElements(); // Call to display available form elements again


}

function displayAvailableElements() {
  toolbar.innerHTML = `<h3>Form Elements</h3>`;
  draggables.forEach(draggable => {
    // Repopulate the draggable buttons
    const button = document.createElement('button');
    button.classList.add('draggable');
    button.id = draggable.id;
    button.draggable = true;
    button.innerText = draggable.innerText;
    toolbar.appendChild(button);

    // Re-enable drag functionality for the buttons
    button.addEventListener('dragstart', (e) => {
      draggedElement = e.target.id;
    });
  });
}

// Delete the form element
function deleteField(button) {
  const element = button.closest('.form-element');
  console.log(element); 
  let idofelement = element.getAttribute('data-unique-id');
  console.log("in deletefunc idofelemet is :",idofelement);
  element.remove();
 console.log("element we are getting inittially after on click delete button",element)
  const remainingElements = formCanvas.querySelectorAll('.form-element');

  // If no elements are left in the form, display a message or handle empty form state
  if (remainingElements.length === 0) {
    displayAvailableElements();
    localStorage.removeItem('formStructure');
  }

  forms = localStorage.getItem("forms");
  console.log(forms);
  forms = JSON.parse(forms);
  console.log("forms: ", forms);
  console.log("id",id,forms[0].id);
  forms.forEach((form) => {
    if (form.id === id) {
      console.log("formstructure",form.formStructure);
      // console.log("forms after adding form structure", forms.formStructure.html);
      if (form.formStructure) {
        let storedHtml = form.formStructure.html;
        // Parse the HTML string into a DOM element
        let storedDom = new DOMParser().parseFromString(storedHtml, "text/html").body;
        console.log("storedDom in delfun",storedDom);
        // Select the element to delete using its ID
        let elementToDelete = storedDom.querySelector(`[id=${idofelement}]`)
        // If element found, remove it from the DOM
      console.log(elementToDelete);
        if (elementToDelete) {
          console.log("element is deleted")
           elementToDelete.remove();
           console.log(storedDom);
           console.log(storedDom.innerHTML);
          //  console.log(storedDom.body.innerHTML);
           

           form.formStructure.html = storedDom.innerHTML ;
          //  console.log("element is deleted",form.forsmStructure.html)
        }
      }
      
      form.formCanvas = formCanvas.innerHTML;
      console.log("formcanvas.innerHTML", formCanvas.innerHTML);
    }
  })

  console.log("forms after adding form structure", forms);
  localStorage.setItem("forms", JSON.stringify(forms))
}

document.getElementById('saveForm').addEventListener('click', () => {

  let formHTML = "";
  if (previewModal.innerHTML) {
    formHTML = previewModal.innerHTML; // Get the form HTML
  } else {
    formHTML = updatedFormHTML;
  }


  const validationScript = `
  <script>
    function validateInputField(inputElement) {
      const inputType = inputElement.type;
      const inputValue = inputElement.value.trim();
      let isValid = true;
      let errorMessage = '';

      switch (inputType) {
        case 'text':
          if (inputValue === '') {
            isValid = false;
            errorMessage = 'This field cannot be empty.';
          }
          break;

        case 'email':
          enforceEmailFormat(inputElement);
          const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
          if (!emailRegex.test(inputValue)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
          }
          break;

        case 'number':
          if (isNaN(inputValue) || inputValue === '') {
            isValid = false;
            errorMessage = 'Please enter a valid number.';
          }
          break;

        case 'tel':
          const phoneRegex = /^[0-9]{10}$/;
          if (!phoneRegex.test(inputValue)) {
            isValid = false;
            errorMessage = 'Please enter a valid 10-digit phone number.';
          }
          break;

          case 'password':
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(inputValue)) {
        isValid = false;
        errorMessage = 'Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.';
      }
      break;
        default:
          if (inputValue === '') {
            isValid = false;
            errorMessage = 'This field cannot be empty.';
          }
      }

      if (!isValid) {
        inputElement.style.borderColor = 'red';
        displayErrorMessage(inputElement, errorMessage);
      } else {
        inputElement.style.borderColor = 'green';
        clearErrorMessage(inputElement);
      }

      return isValid;
    }

    function enforceEmailFormat(inputElement) {
      const emailValue = inputElement.value;
      const emailRegex = /^[a-zA-Z0-9@._-]*$/;
      if (!emailRegex.test(emailValue)) {
        inputElement.value = emailValue.replace(/[^a-zA-Z0-9@._-]/g, '');
      }
    }

    function displayErrorMessage(inputElement, message) {
      let errorElement = inputElement.nextElementSibling;
      if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('span');
        errorElement.classList.add('error-message');
        errorElement.style.color = 'red';
        inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
      }
      errorElement.innerText = message;
    }

    function clearErrorMessage(inputElement) {
      let errorElement = inputElement.nextElementSibling;
      if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
      }
    }

    document.addEventListener('DOMContentLoaded', function() {
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => {
        input.addEventListener('input', function () {
          validateInputField(input);
        });
        input.addEventListener('blur', function () {
          validateInputField(input);
        });
        input.addEventListener('focus', function () {
          input.style.borderColor = '';
        });
      });
    });
  </script>`;

  // formHTML += validationScript;

  // const formData = {
  //   html: formHTML,
  //   // css: formCSS
  // };
  let formData = {
    "html": formHTML,
    "validationScript": validationScript,
  };
  console.log(formData);

  // localStorage.setItem('formStructure', JSON.stringify(formData));
  forms = localStorage.getItem("forms");
  forms = JSON.parse(forms);
  forms.forEach((form) => {
    if (form.id === id) {
      // console.log("forms after adding form structure", forms.formStructure.html);
      if (form.formStructure) {
        // let temp = form.formStructure.html;
        // temp += formHTML;
        // formData = {
        //   "html": temp,
        //   "validationScript": validationScript,
        // };
        // console.log(temp);
        form.formStructure = formData;
      }
      else {
        form.formStructure = formData;
      }
      form.formCanvas = formCanvas.innerHTML;
      console.log("formcanvas.innerHTML", formCanvas.innerHTML);
    }
  })

  console.log("forms after adding form structure", forms);
  localStorage.setItem("forms", JSON.stringify(forms))

  alert('Form structure saved successfully!');
  // updatePreviewModal(); // Update preview modal
});


function getCSS() {
  const styleSheets = document.styleSheets;
  console.log(document.styleSheets);
  let styles = '';
  for (let i = 0; i < styleSheets.length; i++) {
    try {
      const rules = styleSheets[i].cssRules || styleSheets[i].rules; // Cross-browser support
      if (rules) {
        for (let j = 0; j < rules.length; j++) {
          styles += rules[j].cssText; // Get the CSS rules
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, ignore
      console.warn(`Couldn't access stylesheet: ${styleSheets[i]}`);
    }
  }

  return styles;
}

document.addEventListener('DOMContentLoaded', function () {
  // Load the form structure from localStorage
  const savedForm = localStorage.getItem('formStructure');
  if (savedForm) {
    const formData = JSON.parse(savedForm);
    previewModal.innerHTML = formData.html; // Render saved form HTML

    // const inputs = previewModal.querySelectorAll('input');
    // inputs.forEach(input => {
    //   attachValidation(input);  // Attach validation logic dynamically
    // });
  }
});



function resetInputStyle(inputElement) {
  inputElement.style.borderColor = ''; // Reset border color to default
}

document.getElementById('saveForm').addEventListener('click', function (event) {
  const inputs = document.querySelectorAll('input');
  let formIsValid = true;

  // Loop through each input field and validate
  inputs.forEach(input => {
    const isValid = validateInputField(input);
    if (!isValid) {
      formIsValid = false;
    }
  });

  // If form is not valid, prevent submission
  if (!formIsValid) {
    event.preventDefault();
    alert('Please correct the errors in the form.');
  } else {
    alert('Form submitted successfully!');
  }
});



// function updatePreviewModal() {
//   const savedData = JSON.parse(localStorage.getItem('formStructure'));
//   console.log(savedData);
//   if (savedData) {
//     const previewContainer = document.getElementById('preview-content');
//     previewContainer.innerHTML = savedData.html; // Load saved HTML

//     // const styleTag = document.createElement('style');
//     // styleTag.innerHTML = savedData.css; // Load saved CSS
//     // previewContainer.appendChild(styleTag);
//   } else {
//     console.warn('No form data found in localStorage');
//   }
// }


document.getElementById('previewBtn').addEventListener('click', () => {
  let savedFormData;
  let forms = localStorage.getItem("forms");

  forms = JSON.parse(forms);
  forms.forEach((form) => {
    if (form.id === id) {
      savedFormData = form.formStructure;
    }
  })

  console.log("savedformdata", savedFormData);

  if (savedFormData) {
    // const parsedFormData = JSON.parse(savedFormData);
    const { html, js } = savedFormData;
    console.log(html);
    previewWindow = window.open('', 'Form Preview', 'width=600,height=400');

    // Write the form's HTML and CSS into the new window
    previewWindow.document.write(`
            <html>
            <head>
            </head>
            <body>
                <div>${html}</div>
                <script>
                    document.getElementById('close-preview-btn').addEventListener('click', () => {
                        window.close();
                    });
                </script>
            </body>
            </html>
        `);

    previewWindow.document.close();
  } else {
    alert("No form structure saved!");
  }
});

// document.getElementById('close-preview-btn').addEventListener('click', () => {
//   // Hide the modal
//   document.getElementById('preview-modal').classList.add('hidden');
// });

window.addEventListener('load', () => {
  const savedFormData = JSON.parse(localStorage.getItem('formStructure')) || {};

  if (savedFormData.html && savedFormData.css) {
    formCanvas.innerHTML = savedFormData.html; // Restore form elements from localStorage
    const styleTag = document.createElement('style');
    styleTag.innerHTML = savedFormData.css; // Inject saved CSS into the page
    document.head.appendChild(styleTag);
  }
});


function downloadFormStructure() {
  const savedData = JSON.parse(localStorage.getItem('formStructure'));
  if (savedData) {
    const { html, css } = savedData;
    const fullHTML = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Form Structure</title>
          <style>${css}</style>
      </head>
      <body>
          <div>${html}</div>
      </body>
      </html>`;

    // Create a Blob with the full HTML
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'form_structure.html'; // Filename for download

    // Trigger download
    link.click();

    localStorage.removeItem('formStructure');
    console.log('Form structure removed from localStorage.');
    alert('Form structure downloaded and removed from localStorage!');
  } else {
    alert('No form structure saved in localStorage!');
  }
}

function convertHtmlToXml(htmlString) {
  // Create a new XML document
  const xmlDoc = document.implementation.createDocument('', '', null);

  // Create the root element for the XML
  const rootElement = xmlDoc.createElement('formStructure');

  // Convert the HTML string into a DOM structure
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Recursively convert each HTML element to an XML element
  function convertToXml(htmlNode, xmlParentNode) {
    const xmlElement = xmlDoc.createElement(htmlNode.tagName.toLowerCase());

    // Copy attributes from the HTML element to the XML element
    Array.from(htmlNode.attributes).forEach(attr => {
      xmlElement.setAttribute(attr.name, attr.value);
    });

    // If the element has children, recursively add them to the XML
    htmlNode.childNodes.forEach(childNode => {
      if (childNode.nodeType === 1) { // Element node
        convertToXml(childNode, xmlElement);
      } else if (childNode.nodeType === 3 && childNode.nodeValue.trim()) { // Text node
        xmlElement.appendChild(xmlDoc.createTextNode(childNode.nodeValue));
      }
    });

    xmlParentNode.appendChild(xmlElement);
  }

  // Start converting the body content of the HTML to XML
  Array.from(doc.body.children).forEach(htmlElement => {
    convertToXml(htmlElement, rootElement);
  });

  // Append the root element to the XML document
  xmlDoc.appendChild(rootElement);

  // Serialize the XML document to a string for download
  const serializer = new XMLSerializer();
  return serializer.serializeToString(xmlDoc);
}

function downloadFormStructureAsXML() {
  const savedData = JSON.parse(localStorage.getItem('formStructure'));
  if (savedData) {
    const { html, css } = savedData;

    // Convert the HTML structure to XML
    const xmlContent = convertHtmlToXml(html);

    // Create a Blob with the XML content
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'form_structure.xml'; // Filename for download

    // Trigger download
    link.click();

    // Optionally, remove the saved form structure from localStorage
    localStorage.removeItem('formStructure');
    console.log('Form structure removed from localStorage.');
    alert('Form structure downloaded as XML and removed from localStorage!');
  } else {
    alert('No form structure saved in localStorage!');
  }
}

document.getElementById('downloadFormBtn').addEventListener('click', downloadFormStructure);