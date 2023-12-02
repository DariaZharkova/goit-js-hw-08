import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const LS_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(evt) {
  const formData = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem(LS_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if (!email.value || !message.value) {
    alert('Please, fill in all fields!');
  } else {
    console.log(JSON.parse(localStorage.getItem(LS_KEY)));
    localStorage.removeItem(LS_KEY);
    evt.currentTarget.reset();
  }
}

function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

const storageData = load(LS_KEY);
if (storageData) {
  email.value = storageData.email;
  message.value = storageData.message;
}
