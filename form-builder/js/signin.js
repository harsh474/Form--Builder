const dragArea = document.getElementById('drag-area');
const dropArea = document.getElementById('drop-area');
const previewBtn = document.getElementById('preview-btn');
const previewModal = document.getElementById('preview-modal');
const previewContent = document.getElementById('preview-content');
const closePreviewBtn = document.getElementById('close-preview-btn');
const downloadBtn = document.getElementById('download-btn');

let draggedElement;

// Drag and Drop Logic
dragArea.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('draggable')) {
        draggedElement = e.target;
    }
});

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    if (draggedElement) {
        const clonedElement = draggedElement.cloneNode(true);
        clonedElement.removeAttribute('draggable'); // Prevent further dragging
        dropArea.appendChild(clonedElement);
    }
});

// Preview Logic
previewBtn.addEventListener('click', () => {
    const formElements = dropArea.children;
    previewContent.innerHTML = ''; // Clear previous content

    for (let element of formElements) {
        const elementClone = element.cloneNode(true);
        previewContent.appendChild(elementClone);
    }

    previewModal.classList.remove('hidden');
});

// Close Preview Modal
closePreviewBtn.addEventListener('click', () => {
    previewModal.classList.add('hidden');
});


downloadBtn.addEventListener('click', () => {
    const formHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Form Preview</title>
        </head>
        <body>
            <h3>Your Form Preview</h3>
            <div>${dropArea.innerHTML}</div>
        </body>
        </html>
    `;

    const blob = new Blob([formHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form_preview.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
