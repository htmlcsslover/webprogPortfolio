// script.js

const toggleButton = document.querySelector('.toggleLight');
const body = document.body;
const toggleIcon = toggleButton ? toggleButton.querySelector('i') : null;

const editJobBtn = document.querySelector('#editJobBtn');
const jobTitleElement = document.querySelector('#jobTitle');

const contactForm = document.querySelector('#contactForm');
const nameField = document.querySelector('#nameField');
const emailField = document.querySelector('#emailField');
const msgBox = document.querySelector('#msgBox');
const counterSpan = document.querySelector('#counter');

const submitBtn = document.querySelector('#submitBtn');

const MAX_CHARS = msgBox ? parseInt(msgBox.getAttribute('maxlength')) : 200;

function setInitialMode() {
    if (!body || !toggleIcon) return;
    const savedMode = localStorage.getItem('theme');

    if (savedMode === 'light') {
        body.classList.add('light-mode');
        toggleIcon.className = 'fa-regular fa-moon';
    } else {
        body.classList.remove('light-mode');
        toggleIcon.className = 'fa-regular fa-sun';
    }
}

function toggleMode() {
    if (!body || !toggleIcon) return;
    body.classList.toggle('light-mode');
    const isLightMode = body.classList.contains('light-mode');

    if (isLightMode) {
        toggleIcon.className = 'fa-regular fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        toggleIcon.className = 'fa-regular fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}

if (toggleButton) {
    toggleButton.addEventListener('click', toggleMode);
}

function editJobTitle() {
    if (!jobTitleElement) return;
    const currentTitle = jobTitleElement.textContent.trim();
    const newTitle = prompt('Enter your new job title:', currentTitle);

    if (newTitle !== null && newTitle.trim() !== '') {
        jobTitleElement.textContent = newTitle.trim();
        alert('Job title updated successfully!');
    } else if (newTitle !== null) {
        alert('Update cancelled: The new job title cannot be empty.');
    } else {
        alert('Update cancelled.');
    }
}

if (editJobBtn) {
    editJobBtn.addEventListener('click', editJobTitle);
}

function updateCharCounter() {
    if (!msgBox || !counterSpan) return;

    const max = isNaN(MAX_CHARS) ? 200 : MAX_CHARS;
    const currentLength = msgBox.value.length;
    const remainingChars = max - currentLength;

    counterSpan.textContent = remainingChars;

    if (remainingChars <= 10) {
        counterSpan.style.color = 'red';
    } else {
        counterSpan.style.color = 'inherit';
    }
}

if (msgBox) {
    msgBox.addEventListener('keyup', updateCharCounter);
}

function validateForm(event) {
    event.preventDefault();

    let isValid = true;
    let errors = [];

    if (!nameField || !emailField || !contactForm) {
        alert('Error: Form elements not found for validation.');
        return false;
    }

    nameField.style.border = 'none';
    emailField.style.border = 'none';

    if (nameField.value.trim() === '') {
        errors.push('Your Name is required.');
        nameField.style.border = '2px solid red';
        isValid = false;
    }

    if (emailField.value.trim() === '') {
        errors.push('Your Email is required.');
        emailField.style.border = '2px solid red';
        isValid = false;
    }

    if (!isValid) {
        alert('Validation Errors:\n\n' + errors.join('\n'));
        return false;
    } else {
        alert('Success! Form submitted. Thank you, ' + nameField.value.trim() + '!');
        contactForm.reset();
        updateCharCounter();
        return true;
    }
}

if (submitBtn) {
    submitBtn.addEventListener('click', validateForm);
}

const dateDisplay = document.querySelector('#dateDisplay');

function displayCurrentDate() {
    if (!dateDisplay) return;

    const today = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const formattedDate = today.toLocaleDateString('en-US', options);
    dateDisplay.textContent = 'Today is ' + formattedDate;
}

document.addEventListener('DOMContentLoaded', () => {
    setInitialMode();
    updateCharCounter();
    displayCurrentDate();
});

const greetingMessage = document.querySelector('#greetingMessage');

function setTimeBasedGreeting() {
    if (!greetingMessage) return;

    const date = new Date();
    const hour = date.getHours();
    let greeting;

    if (hour >= 5 && hour < 12) {
        greeting = '☀️ Good Morning!';
    } else if (hour >= 12 && hour < 18) {
        greeting = '😎 Good Afternoon!';
    } else {
        greeting = '🌙 Good Evening!';
    }

    greetingMessage.textContent = greeting;
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeBasedGreeting();
});
