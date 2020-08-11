const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  }
];

//Модалки
const modalEditProfile = document.querySelector('.modal_type_edit-profile');
const modalAddCard = document.querySelector('.modal_type_add-card');
const modalImage = document.querySelector('.modal_type_image'); //Модалка для картинки

//Кнопки
const openModalButton = document.querySelector('.profile__edit-button');
const modalAddCardCloseButton = modalAddCard.querySelector('.modal__close-button');
const modalEditProfileCloseButton = modalEditProfile.querySelector('.modal__close-button');
const modalImageCloseButton = modalImage.querySelector('.modal__close-button');

//Формы
const modalName = document.querySelector('.modal__input_object_name');
const modalProfession = document.querySelector('.modal__input_object_profession');
const editForm = modalEditProfile.querySelector('.modal__container');
const addCardForm = modalAddCard.querySelector('.modal__container');

const placeInput = modalAddCard.querySelector('.modal__input_object_place');
const urlInput = modalAddCard.querySelector('.modal__input_object_url');

const imageModalImg = modalImage.querySelector('.modal__image');
const imageModalTitle = modalImage.querySelector('.modal__image-title');

//Элементы страницы
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

function resetInputsAddCard() {
  const buttonSubmit = document.querySelector('.modal__submit_type_create');
  buttonSubmit.classList.add('modal__submit_disabled');
  placeInput.value = '';
  urlInput.value = '';
}

function enableButtonEdit() {
  const buttonSubmitEdit = document.querySelector('.modal__submit_type_edit');
  buttonSubmitEdit.classList.remove('modal__submit_disabled');
  buttonSubmitEdit.classList.add('modal__submit_enabled');
  buttonSubmitEdit.disabled = false;
}

//Функция открытия модалки
function openModal(openingModal) {
  openingModal.classList.add('modal_is-open');
  setCloseByOverlayEventListener();
  setEscCloseEventListener();
}

//Функция закрытия модалки
function closeModal(closingModal) {
  closingModal.classList.remove('modal_is-open');
  removeCloseByOverlayEventListener();
  removeEscCloseEventListener();
}

//Установка слушателя для открытия первой модалки
function editProfileOpenAddEventListener() {
  openModalButton.addEventListener('click', openFirstModal);
}
editProfileOpenAddEventListener();

//Установка слушателя для закрытия первой модалки
function editProfileCloseAddEventListener() {
  modalEditProfileCloseButton.addEventListener('click', closeAndResetErrEditProfile);
}

//Удаление слушателя для закрытия первой модалки
function editProfileCloseRemoveEventListener() {
  modalEditProfileCloseButton.removeEventListener('click', closeAndResetErrEditProfile);
}

function openFirstModal() {
  openModal(modalEditProfile);
  modalName.value = profileName.textContent;
  modalProfession.value = profileProfession.textContent;
  enableButtonEdit();
  editProfileCloseAddEventListener();
}

function closeAndResetErrEditProfile() {
  closeModal(modalEditProfile);
  resetErrors();
  editProfileCloseRemoveEventListener();
}

//Открытие второй модалки
function openSecondModal() {
  openModal(modalAddCard);
  resetInputsAddCard();
  addCardCloseAddEventListener();
}

const openAddCardModalButton = document.querySelector('.profile__add-button');

//Установка слушателя открытия второй модалки
openAddCardModalButton.addEventListener('click', () => {
  openSecondModal();
});

//Закрытие второй модалки
function closeSecondModal () {
  closeModal(modalAddCard);
  resetInputsAddCard();
  resetErrors(); 
  addCardCloseRemoveEventListener();
}

//Установка слушателя закрытия второй модалки
function addCardCloseAddEventListener() {
  modalAddCardCloseButton.addEventListener('click', closeSecondModal)
}

//Удаление слушателя закрытия второй модалки
function addCardCloseRemoveEventListener() {
  modalAddCardCloseButton.removeEventListener('click', closeSecondModal)
}

//Сохранить информацию из первой модалки
function modalEditSave(event) {
  event.preventDefault();
  profileName.textContent = modalName.value;
  profileProfession.textContent = modalProfession.value;
  closeModal(modalEditProfile);
}

//Добавить карту второй модалкой
function addCardSubmitHandler(event) {
  event.preventDefault();
  renderCard({name: placeInput.value, link: urlInput.value});
  closeModal(modalAddCard);
}

editForm.addEventListener('submit', modalEditSave);
addCardForm.addEventListener('submit', addCardSubmitHandler);

const cards = document.querySelector('.cards');

function handleLikeClick(element) {
  element.classList.toggle('card__like_activated');
}

function createCard (data) {
  const cardTemplate = document.querySelector('.template-card').content.querySelector('.card');
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__img');
  const cardTitle = cardElement.querySelector('.card__text'); 
  const cardLikeButton = cardElement.querySelector('.card__like');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardLikeButton.addEventListener('click', () => {
    handleLikeClick(cardLikeButton);
  })

  cardDeleteButton.addEventListener('click', () => {
    const cardToRemove = cardDeleteButton.closest('.card');
    cardToRemove.remove();
  })

  //Установка слушателя открытия третьей модалки
  cardImage.addEventListener('click', function () {
    openModal(modalImage);
    imageModalImg.src = data.link;
    imageModalTitle.textContent = data.name;
    openImgCloseAddEventListener();
  })
  cardTitle.textContent = data.name;
  cardImage.style.backgroundImage = `url(${data.link})`;
  cardImage.alt = data.name;
  return cardElement;
}

function closeThirdModal() {
  closeModal(modalImage);
  openImgCloseRemoveEventListener();
}

//Установка слушателя закрытия третьей модалки
function openImgCloseAddEventListener() {
  modalImageCloseButton.addEventListener('click', closeThirdModal);
}


//Удаление слушателя закрытия третьей модалки
function openImgCloseRemoveEventListener() {
  modalImageCloseButton.removeEventListener('click', closeThirdModal);
}

function renderCard (data) {
  cards.prepend(createCard (data));
}

initialCards.forEach((data) => {
  renderCard(data);
});

//Закрытие модалки кликом по тёмному фону
function removeOpeningClassByOverlayClick(evt) {
  if(evt.target.classList.contains('modal_is-open')) {
    evt.target.classList.remove('modal_is-open');
    resetErrors();
  }
}

//Закрытие модалки нажатием на Esc
function removeOpeningClassByEscClick(evt) {
  if (evt.key === 'Escape') {
    const overlayEsc = document.querySelector('.modal_is-open');
    overlayEsc.classList.remove('modal_is-open');
    resetErrors()
  }
}

const overlay = Array.from(document.querySelectorAll('.modal'));

//Установка слушателя для закрытия модалки кликом по тёмному фону
function setCloseByOverlayEventListener() {
  for (let i = 0; i < overlay.length; i++) {
    overlay[i].addEventListener('mousedown', removeOpeningClassByOverlayClick);
  }
}

//Удаление слушателя для закрытия модалки кликом по тёмному фону
function removeCloseByOverlayEventListener() {
  for (let i = 0; i < overlay.length; i++) {
    overlay[i].removeEventListener('mousedown', removeOpeningClassByOverlayClick);
  }
}

//Установка слушателя для закрытия модалки нажатием на Esc
function setEscCloseEventListener () {
  document.addEventListener('keydown', removeOpeningClassByEscClick);
}

//Удаление слушателя для закрытия модалки нажатием на Esc
function removeEscCloseEventListener () {
  document.removeEventListener('keydown', removeOpeningClassByEscClick);
}
