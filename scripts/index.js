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

const imageModalImg = modalImage.querySelector('.modal__image');//!!!!!------------------!!!!!//
const imageModalTitle = modalImage.querySelector('.modal__image-title');//!!!!!------------------!!!!!//

//----------------------------------------------------------------------------------
//Элементы страницы
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

//Функция открытия модалки
function openModal(openingModal) {
  openingModal.classList.add('modal_is-open'); 
}
//Функция закрытия модалки
function closeModal(closingModal) {
  closingModal.classList.remove('modal_is-open');
  resetErrors() 
}
//----------------------------------------------------------------------------------
//Открытие первой модалки
function assignValueEditCard() {
  modalName.value = profileName.textContent;
  modalProfession.value = profileProfession.textContent;
}

function handlerEditCard() { 
  openModal(modalEditProfile);
  assignValueEditCard();
}
openModalButton.addEventListener('click', handlerEditCard);

//Закрытие первой модалки
function handlerEditCardClose() {
  closeModal(modalEditProfile)
}
modalEditProfileCloseButton.addEventListener('click', handlerEditCardClose)
//----------------------------------------------------------------------------------
//Открытие второй модалки
function handlerAddCard() {
  openModal(modalAddCard)
  resetInputsAddCard()
}

const openAddCardModalButton = document.querySelector('.profile__add-button');
openAddCardModalButton.addEventListener('click', () => {
  handlerAddCard();
})

//Закрытие второй модалки
function handlerAddCardClose () {
  closeModal(modalAddCard)
  resetInputsAddCard() 
}
modalAddCardCloseButton.addEventListener('click', handlerAddCardClose)

//Сохранить инфу первой модалки
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
//----------------------------------------------------------------------------------

editForm.addEventListener('submit', modalEditSave)
addCardForm.addEventListener('submit', addCardSubmitHandler)

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

const list = document.querySelector('.cards');

function createCard (data) {
  const cardTemplate = document.querySelector('.template-card').content.querySelector('.card');
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__img');
  const cardTitle = cardElement.querySelector('.card__text'); 
  const cardLikeButton = cardElement.querySelector('.card__like');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardLikeButton.addEventListener('click', () => {
    handleLikeClick();
  })
  function handleLikeClick() {
    cardLikeButton.classList.toggle('card__like_activated')
  }
  cardDeleteButton.addEventListener('click', () => {
    const removeCard = cardDeleteButton.closest('.card');
    removeCard.remove();
  })
  //Открытие 3 модалки
  cardImage.addEventListener('click', () => {
    handleImageClick(data.link, data.name, data.alt);
  })
  cardTitle.textContent = data.name;
  cardImage.style.backgroundImage = `url(${data.link})`;
  cardImage.alt = data.alt;
  return cardElement;
}

function assignValueImageCard(src, textcontent, alt) {
  imageModalImg.src = src;
  imageModalTitle.textContent = textcontent;
  imageModalImg.alt = alt;
}
function handleImageClick(src, textcontent, alt) {
  openModal(modalImage);
  assignValueImageCard(src, textcontent, alt);
}

//-----------------------------------------------------------  //Закрытие 3 модалки
function handlerImageClose() {
  closeModal(modalImage);
}
modalImageCloseButton.addEventListener('click', handlerImageClose)
//-----------------------------------------------------------

function renderCard (data) {
  list.prepend(createCard (data));
}

initialCards.forEach((data) => {
  renderCard(data);
});
//-----------------------------------------------------------  Закрытие модалки кликом по тёмному фону
function closeModalByOverlayClick() {
  const overlay = Array.from(document.querySelectorAll('.modal'));
  for (let i = 0; i < overlay.length; i++) {
    overlay[i].addEventListener('mousedown', (evt) => {
      if(evt.target.classList.contains('modal_is-open')) {
        evt.target.classList.remove('modal_is-open')
        resetErrors()
      }
    })
  }
}
closeModalByOverlayClick();
//-----------------------------------------------------------  Закрытие модалки кликом по Esc
function closeModalByEsc () {
  //const overlay = Array.from(document.querySelectorAll('.modal'));
  document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
      const overlay = document.querySelector('.modal_is-open');
      overlay.classList.remove('modal_is-open');
      resetErrors()
    }
  })
}
closeModalByEsc();

function resetErrors() {
  const spans = Array.from(document.querySelectorAll('.modal__error'));
  spans.forEach((spanElement) => {
    if (spanElement.classList.contains('modal__error_visible')) 
    {
      spanElement.classList.remove('modal__error_visible')
    }
    spanElement.textContent = '';
  })
  //console.log(spans); 
}

function resetInputsAddCard() {
  const placeName = document.querySelector('.modal__input_object_place');
  const placeUrl = document.querySelector('.modal__input_object_url');
  const buttonSubmit = document.querySelector('.modal__submit_type_create');
  buttonSubmit.classList.add('modal__submit_disabled')
  placeName.value = '';
  placeUrl.value = '';
}