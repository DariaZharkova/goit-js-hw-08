import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const formData = {};
const LS_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(LS_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if (!form.email.value || !form.message.value) {
    alert('Please, fill in all fields!');
  } else {
    console.log(JSON.parse(localStorage.getItem(LS_KEY)));
    localStorage.removeItem(LS_KEY);
    evt.currentTarget.reset();
  }
}
// function PopulateForm() {
//   const currentInfo = JSON.parse(localStorage.getItem(LS_KEY));
//   if (currentInfo) {
//     form.email.value = currentInfo.email;
//     form.message.value = currentInfo.message;
//   }
// }
// PopulateForm();

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
  form.email.value = storageData.email;
  form.message.value = storageData.message;
}
