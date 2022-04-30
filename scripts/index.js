const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
const popupForm = popup.querySelector('.popup__form');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const openPopupButton = profile.querySelector('.profile__edit-button');
const profileOccupation = profile.querySelector('.profile__occupation');
const addPopupButton = profile.querySelector('.profile__add-button');

const popupMesto = document.querySelector('.popup-mesto');
const PopupMestoCloseButton = document.querySelector('.popup-mesto__close');
const popupMestoForm = document.querySelector('.popup-mesto__form');
const popupMestoName = popupMestoForm.querySelector('.popup-mesto__name');
const popupMestolink = popupMestoForm.querySelector('.popup-mesto__link');

const cardsContainer = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#elements__card-template').content.querySelector('.elements__element');

const popupPicture = document.querySelector('.popup-picture');
const popupPictureImg = popupPicture.querySelector('.popup-picture__img');
const popupPictureName = popupPicture.querySelector('.popup-picture__subtitle');
const popupPictureClose = popupPicture.querySelector('.popup-picture__close');

const initialCards = [{
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

function popupOpenToggle() {
  popup.classList.toggle('popup_opened');
  popup.querySelector('.popup__name').value = profileName.textContent;
  popup.querySelector('.popup__job').value = profileOccupation.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profile.querySelector('.profile__name').textContent = popup.querySelector('.popup__name').value;
  profile.querySelector('.profile__occupation').textContent = popup.querySelector('.popup__job').value;
  popup.classList.remove('popup_opened');
}

//Функция открытия и закрытия фомы место
function popupMestoOpenToggle() {
  popupMesto.classList.toggle('popup-mesto_opened');
}

//Обрабочик submit mesto form
const handlerSubmitAddMestoForm = (evt) => {
  evt.preventDefault();
  renderCards(popupMestoName.value, popupMestolink.value)
  popupMestoName.value = '';
  popupMestolink.value = '';
  popupMestoOpenToggle();
};

//Обработчик кнопки удалить картачку
const handlerDeletMestoCard = (evt) => {
  evt.target.closest('.elements__element').remove();
};
//обработчик лайка
const handlerLikeMestoCard = (evt) => {
  evt.target.classList.toggle('elements__like_active');
};

// обработчки открытие попап картинки
const HandlerOpenMestoCard = (evt) => {
  popupPictureName.textContent = evt.target.closest('.elements__element').querySelector('.elements__name').textContent;
  popupPictureImg.src = evt.target.src;
  popupPictureImg.alt = evt.target.alt;
  popupPicture.classList.toggle('popup-picture_opened');
};

popupPictureClose.addEventListener('click', function(){
  popupPicture.classList.toggle('popup-picture_opened');
});

//Генерация карточки
const generateMestoCard = (name, link) => {
  const newMestoCard = cardTemplate.cloneNode(true);
  const newCardName = newMestoCard.querySelector('.elements__name');
  const newCardLink = newMestoCard.querySelector('.elements__picture');
  const deleteButton = newMestoCard.querySelector('.elements__delete');
  const likeButton = newMestoCard.querySelector('.elements__like');
  newCardLink.addEventListener('click', HandlerOpenMestoCard);
  newCardName.textContent = name;
  newCardLink.src = link;
  newCardLink.alt = name;
  deleteButton.addEventListener('click', handlerDeletMestoCard);
  likeButton.addEventListener('click', handlerLikeMestoCard);
  return newMestoCard; 
}

//Отрисовка карточек 
function renderCards(name, link) {
  cardsContainer.prepend(generateMestoCard(name, link))
}

//обработчик массива
initialCards.forEach((card) => {
  let name = card.name;
  let link = card.link;
  renderCards(name, link);
});

openPopupButton.addEventListener('click', popupOpenToggle);
popupCloseButton.addEventListener('click', popupOpenToggle);
popupForm.addEventListener('submit', formSubmitHandler);
popupMestoForm.addEventListener('submit', handlerSubmitAddMestoForm);
addPopupButton.addEventListener('click', popupMestoOpenToggle);
PopupMestoCloseButton.addEventListener('click', popupMestoOpenToggle);
