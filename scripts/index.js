// ------------- Элементы dome -------------

// Элементы попап редактирования профиля
const popupProfile = document.querySelector('.popup_profile');
const popupCloseButton = popupProfile.querySelector('.popup__close');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupProfileName = popupProfile.querySelector('#popup__profile-name');
const popupProfileJob = popupProfile.querySelector('.popup__job');

// Элементы попап добовления мест
const popupMesto = document.querySelector('.popup_mesto');
const popupMestoCloseButton = popupMesto.querySelector('.popup__close');
const popupMestoForm = popupMesto.querySelector('.popup__form');
const popupMestoName = popupMesto.querySelector('#popup__mesto-name');
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
const popupPicture = document.querySelector('.popup_picture');
const popupPictureImg = popupPicture.querySelector('.popup__picture-img');
const popupPictureName = popupPicture.querySelector('.popup__picture-subtitle');
const popupPictureClose = popupPicture.querySelector('.popup__close');

// ------------- Функции обработчики -------------


// Универсальная функция открытия попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  //Cлушатель escape (ОДНОРАЗОВЫЙ)
  document.addEventListener('keydown', function (evt) {
    if (evt.key == 'Escape') {
      console.log('Был нажат escape');
      closePopup(popup);
    }
  }, { once: true });
}


// Универсальная функция закрытия попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Обработчик submit редактирования профиля
function handlerSubmitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileOccupation.textContent = popupProfileJob.value;
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
const handlerDeletMestoCard = (card) => {
  card.remove();
};

// обработчик лайка
const handlerLikeMestoCard = (likeButton) => {
  likeButton.classList.toggle('elements__like_active');
};

// обработчик клика по картинки для раскрытия картинки
const handlerClickPicture = (name, link) => {
  popupPictureName.textContent = name;
  popupPictureImg.src = link;
  popupPictureImg.alt = name;
  openPopup(popupPicture);
};

// --------------- обработчик массива с картачками ---------------

// Функция генерации карточки
const generateMestoCard = (name, link) => {
  const newMestoCard = cardTemplate.cloneNode(true);
  const newCardName = newMestoCard.querySelector('.elements__name');
  const newCardLink = newMestoCard.querySelector('.elements__picture');
  const deleteButton = newMestoCard.querySelector('.elements__delete');
  const likeButton = newMestoCard.querySelector('.elements__like');

  newCardName.textContent = name;
  newCardLink.src = link;
  newCardLink.alt = name;

  // Слушатель по картинки карточки чтобы раскрыть миниатюру на попап
  newCardLink.addEventListener('click', () => handlerClickPicture(name, link));

  // Слушатель по урне для удаления карточки
  deleteButton.addEventListener('click', () => handlerDeletMestoCard(newMestoCard));

  // Слушатель по лайку
  likeButton.addEventListener('click', () => handlerLikeMestoCard(likeButton));
  return newMestoCard;
}

// Отрисовка карточек 
function renderCards(name, link) {
  cardsContainer.prepend(generateMestoCard(name, link))
}

// Перебор значений массива карточек
initialCards.forEach((card) => {
  const name = card.name;
  const link = card.link;
  renderCards(name, link);
});

// --------------- Слушатели ---------------

// Слушатель кнопки редактирования профиля
profileEditButton.addEventListener('click', function () {
  popupProfileName.value = profileName.textContent;
  popupProfileJob.value = profileOccupation.textContent;
  openPopup(popupProfile);
});

// Слушатель кнопки закрытия попап редактирования профиля
popupCloseButton.addEventListener('click', function () {
  closePopup(popupProfile);
});

//Функция закрытия попапа по клику на оверлее
function popupOverlayClickHandler(evt) {
  if (evt.target === evt.currentTarget) {
    console.log('Был кник по оверлею');
    closePopup(evt.target.closest('.popup'));
  }
}
//Слушатели клика по оверлею попапа
popupProfile.addEventListener('click', popupOverlayClickHandler);
popupMesto.addEventListener('click', popupOverlayClickHandler);
popupPicture.addEventListener('click', popupOverlayClickHandler);


// Слушатель кнопки submit редактирования профиля
popupProfileForm.addEventListener('submit', handlerSubmitProfileForm);

// Слушатель кнопки добавления места
profileAddPopupButton.addEventListener('click', () => openPopup(popupMesto));

// Слушатель кнопки submit добавления места
popupMestoForm.addEventListener('submit', handlerSubmitAddMestoForm);

// Слушатель кнопки закрытия попап добавления места
popupMestoCloseButton.addEventListener('click', function () {
  popupMestoName.value = '';
  popupMestolink.value = '';
  closePopup(popupMesto);
});

// Слушатель кнопки закрытия попап большой картинки
popupPictureClose.addEventListener('click', () => closePopup(popupPicture));


