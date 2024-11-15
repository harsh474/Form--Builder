const logo = document.querySelector('.logo');
const navbar = document.querySelector('.navbar');

const body = document.querySelector('body');
const themeButton = document.querySelector('.theme-switcher button');
const tabsList = document.querySelector('.tabs-list');
const tabsTriggers = document.querySelectorAll('.tabs-trigger');
const lightModeButton = document.querySelector('.light-mode-btn');
const darkModeButton = document.querySelector('.dark-mode-btn');

logo.addEventListener('mouseover', () => {
  logo.style.color = '#fff'; // Change text color on hover
});

logo.addEventListener('mouseout', () => {
  logo.style.color = '#333'; // Restore original text color
});

function enableLightMode() {
    navbar.classList.remove('dark');
    body.classList.remove('dark');
  }

  function enableDarkMode() {
    navbar.classList.add('dark');
    body.classList.add('dark');
  }

lightModeButton.addEventListener('click', enableLightMode);
darkModeButton.addEventListener('click', enableDarkMode);


tabsTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    tabsList.querySelectorAll('.active').forEach(active => active.classList.remove('active'));
    trigger.classList.add('active');
  });
});


// 
// 
// 

document.querySelector('.signin-btn').addEventListener('click', () => {
    const signinContent = document.getElementById('signin-content');
    if (signinContent.innerHTML === '') {
        fetch('./html/signin.html')
            .then(response => response.text())
            .then(data => {
                signinContent.innerHTML = data;
                signinContent.style.display = 'block';
            });
    } else {
        signinContent.style.display = signinContent.style.display === 'none' ? 'block' : 'none';
    }
});