// ------------- Элементы dome -------------

// Элементы попап редактирования профиля
const popupProfile = document.querySelector('.popup_profile');
const popupCloseButton = popupProfile.querySelector('.popup__close');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupProfileName = popupProfile.querySelector('.popup__name');
const popupProfileJob = popupProfile.querySelector('.popup__job');

// Элементы попап добовления мест
const popupMesto = document.querySelector('.popup_mesto');
const popupMestoCloseButton = popupMesto.querySelector('.popup__close');
const popupMestoForm = popupMesto.querySelector('.popup__form');
const popupMestoName = popupMesto.querySelector('.popup__name');
const popupMestolink = popupMesto.querySelector('.popup__link');

// Элементы профайла со страницы
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileOccupation = profile.querySelector('.profile__occupation');
const profileEditButton = profile.querySelector('.profile__edit-button');

const profileAddPopupButton = profile.querySelector('.profile__add-button');

// Элементы карточек мест со страницы
const cardsContainer = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#elements__card-template').content.querySelector('.elements__element');

// Элементы попап раскрытие картинки места
const popupPicture = document.querySelector('.popup-picture');
const popupPictureImg = popupPicture.querySelector('.popup-picture__img');
const popupPictureName = popupPicture.querySelector('.popup-picture__subtitle');
const popupPictureClose = popupPicture.querySelector('.popup-picture__close');

// ------------- Функции обработчики -------------

// Универсальная функция открытия попап
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

// Универсальная функция закрытия попап
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

// Обработчик submit редактирования профиля
function handlerSubmitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfile.querySelector('.popup__name').value;
  profileOccupation.textContent = popupProfile.querySelector('.popup__job').value;
  closePopup(popupProfile);
}

//Обрабочик submit добавление место
const handlerSubmitAddMestoForm = (evt) => {
  evt.preventDefault();
  renderCards(popupMestoName.value, popupMestolink.value)
  popupMestoName.value = '';
  popupMestolink.value = '';
  closePopup(popupMesto);
};

// Обработчик кнопки удалить картачку
const handlerDeletMestoCard = (evt) => {
  evt.target.closest('.elements__element').remove();
};

// обработчик лайка
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

// --------------- обработчик массива с картачками ---------------

// Генерация карточки
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

// Отрисовка карточек 
function renderCards(name, link) {
  cardsContainer.prepend(generateMestoCard(name, link))
}

// Перебор значений массива карточек
initialCards.forEach((card) => {
  let name = card.name;
  let link = card.link;
  renderCards(name, link);
});

// --------------- Слушатели ---------------

// Слушатель кнопки редактирования профиля
profileEditButton.addEventListener('click', function() {
    popupProfileName.value = profileName.textContent;
    popupProfileJob.value = profileOccupation.textContent;
  openPopup(popupProfile);
});

// Слушатель кнопки закрытия попап редактирования профиля
popupCloseButton.addEventListener('click', function() {
  closePopup(popupProfile);
});

// Слушатель кнопки submit редактирования профиля
popupProfileForm.addEventListener('submit', handlerSubmitProfileForm);

// Слушатель кнопки добавления места
profileAddPopupButton.addEventListener('click', function() {
  openPopup(popupMesto);
});

// Слушатель кнопки submit добавления места
popupMestoForm.addEventListener('submit', handlerSubmitAddMestoForm);

// Слушатель кнопки закрытия попап добавления места
popupMestoCloseButton.addEventListener('click', function() {
  popupMestoName.value = '';
  popupMestolink.value = '';
  closePopup(popupMesto);
});

// Слушатель кнопки закрытия попап большой картинки
popupPictureClose.addEventListener('click', function(){
  popupPicture.classList.toggle('popup-picture_opened');
});




