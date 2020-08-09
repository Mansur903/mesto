const validationConfig = {
  formSelector: '.modal__container',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__submit',
  activeButtonClass: 'modal__submit_enabled',
  inactiveButtonClass: 'modal__submit_disabled',
  inputValidClass: '.modal__input_type_valid',
  inputErrorClass: '.modal__input_type_error',
  errorClass: 'modal__error_visible'
};

function resetDefaultAction(element) {        //Сбросить дефолтное поведение
  element.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
}

function addValidStatus(inputErrorClass, inputValidClass, errorClass, inputElement, errorElement) {  //Валидный статус инпута
  inputElement.classList.remove(inputErrorClass);
  inputElement.classList.add(inputValidClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

function addInvalidStatus(inputErrorClass, inputValidClass, errorClass, inputElement, errorElement) {  //Невалидный статус инпута
  inputElement.classList.add(inputErrorClass);
  inputElement.classList.remove(inputValidClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

function eventHandler(inputElement, formElement, inputErrorClass, inputValidClass, errorClass, //Обработчик событий
inputs, buttonSubmit, activeButtonClass, inactiveButtonClass) {
  inputElement.addEventListener('input', () => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`)
    if (inputElement.validity.valid) {
      addValidStatus(inputErrorClass, inputValidClass, errorClass, inputElement, errorElement);
    }
    else {
      addInvalidStatus(inputErrorClass, inputValidClass, errorClass, inputElement, errorElement);
    }
    const isFormValid = inputs.some((inputElement) => !inputElement.validity.valid);
    buttonValidation(isFormValid, buttonSubmit, activeButtonClass, inactiveButtonClass);
  })
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, activeButtonClass, inactiveButtonClass, inputValidClass, //Запустить валидацию всех форм
inputErrorClass, errorClass}) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((formElement) => {
    const inputs = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonSubmit = formElement.querySelector(submitButtonSelector);
    resetDefaultAction(formElement);
    inputs.forEach((inputElement) => {
      eventHandler(inputElement, formElement, inputErrorClass, inputValidClass, errorClass, 
      inputs, buttonSubmit, activeButtonClass, inactiveButtonClass);
    })   
  })  
}

enableValidation(validationConfig);

function buttonValidation(isFormValid, buttonSubmit, activeButtonClass, inactiveButtonClass) {   //Проверка валидности для кнопки
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

