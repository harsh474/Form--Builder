let id = 0;

document.getElementById('createFormButton').addEventListener('click', function () {
    document.getElementById('popupFormOverlay').style.display = 'flex';
});

document.getElementById('closeButton').addEventListener('click', function () {
    document.getElementById('popupFormOverlay').style.display = 'none';
});

// Close the form when clicking outside of it
document.getElementById('popupFormOverlay').addEventListener('click', function (event) {
    if (event.target === this) {
        document.getElementById('popupFormOverlay').style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const createFormButton = document.getElementById('createFormButton');
    const popupFormOverlay = document.getElementById('popupFormOverlay');
    const closeButton = document.getElementById('closeButton');
    const form = document.getElementById('form');
    const editor = document.getElementById('editor');
    const formList = document.querySelector('.form-list');

    // Show the popup form when the create button is clicked
    createFormButton.addEventListener('click', () => {
        popupFormOverlay.style.display = 'flex';
    });

    // Hide the popup form when the close button is clicked
    closeButton.addEventListener('click', () => {
        popupFormOverlay.style.display = 'none';
    });

    // Initialize by hiding the editor if there are no cards
    if (formList.children.length === 0) {
        editor.classList.add('hidden');
    }
});

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formName = document.getElementById('name').value;
    const formDescription = document.getElementById('description').value;



    // this part is of storing data into localstorage
    let forms = localStorage.getItem("forms");
    forms = forms ? JSON.parse(forms) : [];
    const form_id = "form" + forms.length;
    const formdetails = {
        "form_id": form_id,
        "formName": formName,
        "formDescription": formDescription,
    }
    let form_temp = {
        id: form_id,
        detaiils: formdetails
    }
    forms.push(form_temp);
    localStorage.setItem("forms", JSON.stringify(forms));
    console.log(forms);



  


    form.reset();
    document.getElementById('popupFormOverlay').style.display = 'none';
    document.getElementById('editor').classList.remove('hidden');
    location.reload();
    // Add event listener for the Edit button
    // const editButton = formItem.querySelector('.edit-button');
    // editButton.addEventListener('click', function() {
    //     // Redirect to the Form Builder page
    //     window.location.href = 'demo.html'; // Replace with the correct path to your form builder page
    // });

    // Optionally add functionality to delete the form
    
});

  // displaying all form dnyamically created by user in the form-list div 
document.addEventListener("DOMContentLoaded", function () {
    // Get the 'forms' from localStorage and parse it into an array
    let forms = localStorage.getItem("forms");
    forms = forms ? JSON.parse(forms) : [];
    console.log("accessing forms in forms.js",forms);
    // Reference the .form-list container in the HTML
    const formListContainer = document.querySelector(".form-list");

    // Clear the container to avoid duplication
    formListContainer.innerHTML = "";

    forms.forEach(element => {
        const formItem = document.createElement('div');
        formItem.classList.add('form-item');
        formItem.innerHTML = `
                        <h5>${element.detaiils.formName}</h5>
                        <p>${element.detaiils.formDescription}</p>
                        
                        <button onclick="window.location.href='demo.html?id=${element.id}'">Edit Me</button>
                        <button onclick = f(123)> cliclme </button>
                        <button onclick="deleteform('${element.id}')">Delete</button>`; /// assign html to div element formItem 
        formItem.id = element.id; // assign id to div form we have creaed and will display in ui
        document.querySelector('.form-list').appendChild(formItem); // inserting child div into main div form-list 
    });
});


const deleteform = (id)=>{ 
    console.log("deleteform is called",id);
    let forms = localStorage.getItem("forms");
    forms = forms ? JSON.parse(forms) : [];
    console.log("accessing forms in forms.js",forms); 
    forms = forms.filter(function name(params) {
        return id !== params.id ;
    });
    localStorage.setItem("forms", JSON.stringify(forms));
    console.log("forms after deleting form with id : ",id) ;
    location.reload();
}
