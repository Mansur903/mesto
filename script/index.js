//Модалки
const modalEditProfile = document.querySelector('.modal__type_edit-profile');
const modalAddCard = document.querySelector('.modal__type_add-card');
const modalImage = document.querySelector('.modal__type_image'); //Модалка для картинки

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

//Элементы страницы
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
//----------------------------------------------------------------------------------
//Открытие первой модалки
function modalEditCardOpen(event) {
  modalEditProfile.classList.add('modal_is-open');
  modalName.value = profileName.textContent;
  modalProfession.value = profileProfession.textContent;
}

//Закрытие первой модалки
function modalClose(event) {
  modalEditProfile.classList.remove('modal_is-open');
}
modalEditProfileCloseButton.addEventListener('click', modalClose)
//----------------------------------------------------------------------------------
//Открытие второй модалки
function modalAddCardOpen() {
  modalAddCard.classList.add('modal_is-open');
}

const openAddCardModalButton = document.querySelector('.profile__add-button');
openAddCardModalButton.addEventListener('click', () => {
  modalAddCardOpen();
})

//Закрытие второй модалки
function modalAddCardClose () {
  modalAddCard.classList.remove('modal_is-open');
}

//Сохранить инфу первой модалки
function modalSave(event) {
  event.preventDefault();
  profileName.textContent = modalName.value;
  profileProfession.textContent = modalProfession.value;
  modalClose(event);
}

//Добавить карту второй модалкой
function addCardSubmitHandler(event) {
  event.preventDefault();
  console.log (placeInput.value, urlInput.value);
  renderCard({name: placeInput.value, link: urlInput.value});
  modalAddCardClose(event);
}
//----------------------------------------------------------------------------------

openModalButton.addEventListener('click', modalEditCardOpen)

modalAddCardCloseButton.addEventListener('click', modalAddCardClose)

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


  function handleLikeClick() {
    cardLikeButton.classList.toggle('card__like_activated')
  }

  cardLikeButton.addEventListener('click', () => {
    handleLikeClick();
  })

  cardDeleteButton.addEventListener('click', () => {
    const removeCard = cardDeleteButton.closest('.card');
    removeCard.remove();
  })

  //Открытие 3 модалки
  cardImage.addEventListener('click', () => {
    console.log('222');
    handleImageClick(data.link, data.name);
  })

  function handleImageClick(src, textcontent) {
    modalImage.classList.add('modal_is-open');
    imageModalImg.src = src;
    imageModalTitle.textContent = textcontent;
  }
  //-----------------------------------------------------------
  //Закрытие 3 модалки
  function modalImageClose() {
    modalImage.classList.remove('modal_is-open');
  }
  modalImageCloseButton.addEventListener('click', modalImageClose)
  //-----------------------------------------------------------

  cardTitle.textContent = data.name;
  cardImage.style.backgroundImage = `url(${data.link})`;

  return cardElement;
}

function renderCard (data) {
  list.prepend(createCard (data));
}

initialCards.forEach((data) => {
  renderCard(data);
});
