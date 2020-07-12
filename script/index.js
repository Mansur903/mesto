const openModalButton = document.querySelector('.profile__edit-button');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.modal__close-button');
const modalName = document.querySelector('.modal__input_object_name');
const modalProfession = document.querySelector('.modal__input_object_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const form = document.querySelector('.modal__container');

function modalOpen(event) {
  modal.classList.add('modal_is-open');
  modalName.value = profileName.textContent;
  modalProfession.value = profileProfession.textContent;
}

function modalClose(event) {
  modal.classList.remove('modal_is-open');
}

function modalSave(event) {
  profileName.textContent = modalName.value;
  profileProfession.textContent = modalProfession.value;
  modalClose(event);
  event.preventDefault();
}

openModalButton.addEventListener('click', modalOpen)

closeModalButton.addEventListener('click', modalClose)

form.addEventListener('submit', modalSave)