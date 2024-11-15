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
    const element = document.createElement('div');
    element.className = 'form-element';
    element.setAttribute('data-type', elementType);
    element.textContent = elementType;

    // Add the correction icon
    const correctionIcon = document.createElement('span');
    correctionIcon.className = 'correction-icon';
    correctionIcon.innerHTML = '&#9998;'; // Pencil icon for editing
    element.appendChild(correctionIcon);

    // Add the delete button
    const deleteButton = document.createElement('span');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = '&#10060;'; // Cross icon for deletion
    element.appendChild(deleteButton);

    dropzone.appendChild(element);

    // Event listeners for correction and delete actions
    correctionIcon.addEventListener('click', function() {
        showSettings(element);
    });

    deleteButton.addEventListener('click', function() {
        element.remove();
    });

    element.addEventListener('click', function() {
        showSettings(element);
    });
});

function showSettings(element) {
    clearSelection();
    element.classList.add('selected-element');
    elementsList.style.display = 'none';
    elementSettings.style.display = 'block';
    const elementType = element.getAttribute('data-type');
    settingsContent.innerHTML = `<h4>Settings for ${elementType}</h4>`;

    if (elementType === 'Text Field') {
        settingsContent.innerHTML += `
            <label>Label:</label>
            <input type="text" id="label" value="${element.textContent}">
            <label>Placeholder:</label>
            <input type="text" id="placeholder" value="">
        `;
    } else if (elementType === 'Number Field') {
        settingsContent.innerHTML += `
            <label>Label:</label>
            <input type="text" id="label" value="${element.textContent}">
        `;
    }
    // Add more settings based on element type
    // Listen to input changes to update element settings
    document.getElementById('label').addEventListener('input', function() {
        element.textContent = this.value;
    });
}

function clearSelection() {
    document.querySelectorAll('.form-element').forEach(el => {
        el.classList.remove('selected-element');
    });
    elementSettings.style.display = 'none';
    elementsList.style.display = 'block';
}

// document.getElementById('saveForm').addEventListener('click', function() {
//     // Save form logic
// });

// document.getElementById('previewForm').addEventListener('click', function() {
//     // Preview form logic
// });

// document.getElementById('exportXML').addEventListener('click', function() {
//     // Export form to XML
// });

// document.getElementById('importXML').addEventListener('change', function(e) {
//     // Import form from XML
// });



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
//     const element = document.createElement('div');
//     element.className = 'form-element';
//     element.setAttribute('data-type', elementType);
//     element.textContent = elementType;
//     dropzone.appendChild(element);

//     element.addEventListener('click', function() {
//         showSettings(element);
//     });
// });

// function showSettings(element) {
//     clearSelection();
//     element.classList.add('selected-element');
//     elementsList.style.display = 'none';
//     elementSettings.style.display = 'block';
//     const elementType = element.getAttribute('data-type');
//     settingsContent.innerHTML = `<h4>Settings for ${elementType}</h4>`;

//     if (elementType === 'Text Field') {
//         settingsContent.innerHTML += `
//             <label>Label:</label>
//             <input type="text" placeholder="Enter label text" value="${element.textContent}" onchange="updateElement(this, '${elementType}')"/>
//             <label>Placeholder:</label>
//             <input type="text" placeholder="Enter placeholder text" />
//         `;
//     }

//     // Add more settings for other elements as needed
// }

// function updateElement(input, elementType) {
//     const selectedElement = dropzone.querySelector('.selected-element');
//     if (selectedElement) {
//         selectedElement.textContent = input.value;
//     }
// }

// function clearSelection() {
//     const elements = dropzone.querySelectorAll('.form-element');
//     elements.forEach(el => {
//         el.classList.remove('selected-element');
//     });
// }

// function clearSelection() {
//     document.querySelectorAll('.form-element').forEach(el => {
//         el.classList.remove('selected-element');
//     });
//     elementSettings.style.display = 'none';
//     elementsList.style.display = 'block';
// }

document.getElementById('saveForm').addEventListener('click', function() {
    alert('Form saved successfully!');
});

document.getElementById('previewForm').addEventListener('click', function() {
    const previewWindow = window.open('', 'Preview', 'width=600,height=400');
    previewWindow.document.write('<html><head><title>Form Preview</title></head><body>');
    previewWindow.document.write(dropzone.innerHTML);
    previewWindow.document.write('</body></html>');
});

document.getElementById('exportXML').addEventListener('click', function() {
    const elements = dropzone.querySelectorAll('.form-element');
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n<form>\n';
    
    elements.forEach(el => {
        const type = el.getAttribute('data-type');
        xmlContent += `\t<element type="${type}">${el.textContent}</element>\n`;
    });

    xmlContent += '</form>';
    const blob = new Blob([xmlContent], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form.xml';
    a.click();
});

document.getElementById('importXML').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const xml = event.target.result;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, 'text/xml');
        const elements = xmlDoc.getElementsByTagName('element');
        
        dropzone.innerHTML = '';
        for (let i = 0; i < elements.length; i++) {
            const type = elements[i].getAttribute('type');
            const text = elements[i].textContent;
            const div = document.createElement('div');
            div.className = 'form-element';
            div.setAttribute('data-type', type);
            div.textContent = text;
            dropzone.appendChild(div);
            
            div.addEventListener('click', function() {
                showSettings(div);
            });
        }
    };
    reader.readAsText(file);
});

// document.addEventListener('DOMContentLoaded', () => {
//     const draggableElement = document.querySelector('.draggable[data-element="Title Field"]');
//     const sidebar = document.getElementById('sidebar');
//     const closeSidebar = document.getElementById('closeSidebar');
//     const titleInput = document.getElementById('titleInput');
//     const titlePreview = document.getElementById('titlePreview');

//     // Show the sidebar when the title field element is clicked
//     draggableElement.addEventListener('click', () => {
//         sidebar.classList.add('show');
//         sidebar.classList.remove('hidden');
//     });

//     // Hide the sidebar when the close button is clicked
//     closeSidebar.addEventListener('click', () => {
//         sidebar.classList.remove('show');
//         sidebar.classList.add('hidden');
//     });

//     // Update the title preview when the input value changes
//     titleInput.addEventListener('input', (event) => {
//         titlePreview.textContent = event.target.value;
//     });
// });

