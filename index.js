const openModalButton = document.querySelector('.profile__edit-button');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.modal__close-button');
const modalName = document.querySelector('.modal__name');
const modalProfession = document.querySelector('.modal__profession');
const modalsubmit = document.querySelector('.modal__submit');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

openModalButton.addEventListener('click', () => {
  modal.classList.add('modal_is-open');
  modalName.value = profileName.textContent;
  modalProfession.value = profileProfession.textContent;
})

closeModalButton.addEventListener('click', () => {
  modal.classList.remove('modal_is-open'); 
})

modalsubmit.addEventListener('click', () => {
  profileName.textContent = modalName.value;
  profileProfession.textContent = modalProfession.value;
  modal.classList.remove('modal_is-open');
})