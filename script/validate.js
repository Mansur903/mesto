const object = {
  formSelector: '.modal__container',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__submit',
  activeButtonClass: 'modal__submit_enabled',
  inactiveButtonClass: 'modal__submit_disabled',
  inputValidClass: '.modal__input_type_valid',
  inputErrorClass: '.modal__input_type_error',
  errorClass: 'modal__error_visible'
};


function enableValidation({formSelector, inputSelector, submitButtonSelector, activeButtonClass, inactiveButtonClass, inputValidClass, //Запустить валидацию всех форм
inputErrorClass, errorClass}) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  //console.log(forms);
  forms.forEach((formElement) => {
    const inputs = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonSubmit = formElement.querySelector(submitButtonSelector);
    reset_default_action(formElement);
    inputs.forEach((inputElement) => {
      event_handler(inputElement, formElement, inputErrorClass, inputValidClass, errorClass, 
      inputs, buttonSubmit, activeButtonClass, inactiveButtonClass);
    })   
  })  
}
enableValidation(object);

function reset_default_action(element) {        //Сбросить дефолтное поведение
  element.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
}

function event_handler(inputElement, formElement, inputErrorClass, inputValidClass, errorClass, //Обработчик событий
inputs, buttonSubmit, activeButtonClass, inactiveButtonClass) {
  inputElement.addEventListener('input', () => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`)
    if (inputElement.validity.valid) {
      add_valid_status(inputErrorClass, inputValidClass, errorClass, inputElement, errorElement);
    }
    else {
      add_invalid_status(inputErrorClass, inputValidClass, errorClass, inputElement, errorElement);
    }
    const isFormValid = inputs.some((inputElement) => !inputElement.validity.valid);
    button_validation(isFormValid, buttonSubmit, activeButtonClass, inactiveButtonClass);
  })
}

function add_valid_status(inputErrorClass, inputValidClass, errorClass, inputElement, errorElement) {  //Валидный статус инпута
  inputElement.classList.remove(inputErrorClass);
  inputElement.classList.add(inputValidClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

function add_invalid_status(inputErrorClass, inputValidClass, errorClass, inputElement, errorElement) {  //Невалидный статус инпута
  inputElement.classList.add(inputErrorClass);
  inputElement.classList.remove(inputValidClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

function button_validation(isFormValid, buttonSubmit, activeButtonClass, inactiveButtonClass) {   //Проверка валидности для кнопки
  if (!isFormValid) {
    buttonSubmit.classList.add(activeButtonClass);
    buttonSubmit.classList.remove(inactiveButtonClass);
    buttonSubmit.disabled = false;
  }
  else {
    buttonSubmit.classList.add(inactiveButtonClass);
    buttonSubmit.classList.remove(activeButtonClass);
    buttonSubmit.disabled = true;
  }
}
