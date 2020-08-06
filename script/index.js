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
function modalOpen(openingModal) {
  openingModal.classList.add('modal_is-open'); 
}
//Функция закрытия модалки
function modalClose(closingModal) {
  closingModal.classList.remove('modal_is-open'); 
}
//----------------------------------------------------------------------------------
//Открытие первой модалки
function assignValueEditCard() {
  modalName.value = profileName.textContent;
  modalProfession.value = profileProfession.textContent;
}

function handlerEditCard() { 
  modalOpen(modalEditProfile);
  assignValueEditCard();
}
openModalButton.addEventListener('click', handlerEditCard);

//Закрытие первой модалки
function handlerEditCardClose() {
  modalClose(modalEditProfile)
}
modalEditProfileCloseButton.addEventListener('click', handlerEditCardClose)
//----------------------------------------------------------------------------------
//Открытие второй модалки
function handlerAddCard() {
  modalOpen(modalAddCard)
}

const openAddCardModalButton = document.querySelector('.profile__add-button');
openAddCardModalButton.addEventListener('click', () => {
  handlerAddCard();
})

//Закрытие второй модалки
function handlerAddCardClose () {
  modalClose(modalAddCard)
}
modalAddCardCloseButton.addEventListener('click', handlerAddCardClose)

//Сохранить инфу первой модалки
function modalSave(event) {
  event.preventDefault();
  profileName.textContent = modalName.value;
  profileProfession.textContent = modalProfession.value;
  modalClose(modalEditProfile);
}

//Добавить карту второй модалкой
function addCardSubmitHandler(event) {
  event.preventDefault();
  renderCard({name: placeInput.value, link: urlInput.value});
  modalClose(modalAddCard);
}
//----------------------------------------------------------------------------------

editForm.addEventListener('submit', modalSave)
addCardForm.addEventListener('submit', addCardSubmitHandler)

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
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
    handleImageClick(data.link, data.name);
  })
  cardTitle.textContent = data.name;
  cardImage.style.backgroundImage = `url(${data.link})`;
  return cardElement;
}

function assignValueImageCard(src, textcontent) {
  imageModalImg.src = src;
  imageModalTitle.textContent = textcontent;
}
function handleImageClick(src, textcontent) {
  modalOpen(modalImage);
  assignValueImageCard(src, textcontent);
}

//-----------------------------------------------------------  //Закрытие 3 модалки
function modalImageClose() {
  modalImage.classList.remove('modal_is-open');
}
modalImageCloseButton.addEventListener('click', modalImageClose)
//-----------------------------------------------------------

function renderCard (data) {
  list.prepend(createCard (data));
}

initialCards.forEach((data) => {
  renderCard(data);
});
//-----------------------------------------------------------  Закрытие модалки кликом по тёмному фону
function close_modal_by_overlay_click() {
  const overlay = Array.from(document.querySelectorAll('.modal'));
  for (let i = 0; i < overlay.length; i++) {
    overlay[i].addEventListener('mousedown', (evt) => {
      if(evt.target.classList.contains('modal_is-open')) {
        handlerEditCardClose();
        handlerAddCardClose();
        modalImageClose();
      }
    })
  }
}
close_modal_by_overlay_click();
//-----------------------------------------------------------  Закрытие модалки кликом по Esc
function close_modal_by_esc () {
  document.addEventListener('keydown', function(evt) {
    console.log(evt.key);
    if (evt.key === 'Escape') {
      handlerEditCardClose();
      handlerAddCardClose();
      modalImageClose();
    }
  })
}
close_modal_by_esc ();
