import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

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

// Настройки валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
// Создание экземпляра класса валидации форм
const profileValidator = new FormValidator(validationConfig, popupProfileForm);
const cardValidator = new FormValidator(validationConfig, popupMestoForm);

// Вызов метода валидации форм
profileValidator.enableValidation();
cardValidator.enableValidation();


// ------------- Функции обработчики -------------



function addEscapeListener(evt) {
  if (evt.key == 'Escape') {
    const popupCurrent = document.querySelector(".popup_opened");
    closePopup(popupCurrent);
  }
}

// Универсальная функция открытия попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', addEscapeListener); // Cлушатель escape
}

// Универсальная функция закрытия попап
function closePopup(popup) {
  document.removeEventListener('keydown', addEscapeListener); // удаляет слушатель escape 
  popup.classList.remove('popup_opened');
}

// Обработчик submit редактирования профиля +
function handlerSubmitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileOccupation.textContent = popupProfileJob.value;
  closePopup(popupProfile);
}

// Генерируем карточку из полученых данных
function createCard(item) {
  const card = new Card(item, '#elements__card-template', handlerClickPicture);
  return card.generateCard();
}

//Обрабочик submit добавление место (+)
const handlerSubmitAddMestoForm = (evt) => {
  evt.preventDefault();
  const cardElement = createCard(popupMestoName.value, popupMestolink.value);
  renderCard(cardElement);
  popupMestoName.value = '';
  popupMestolink.value = '';
  closePopup(popupMesto);
};


// обработчик клика по картинки для раскрытия картинки
const handlerClickPicture = (name, link) => {
  popupPictureName.textContent = name;
  popupPictureImg.src = link;
  popupPictureImg.alt = name;
  openPopup(popupPicture);
};

// Отрисовка карточек 
function renderCard(cardElement) {
  cardsContainer.prepend(cardElement)
}


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
    closePopup(evt.target);
  }
}

//Слушатели клика по оверлею попапа
popupProfile.addEventListener('click', popupOverlayClickHandler);
popupMesto.addEventListener('click', popupOverlayClickHandler);
popupPicture.addEventListener('click', popupOverlayClickHandler);

// Слушатель кнопки submit редактирования профиля
popupProfileForm.addEventListener('submit', handlerSubmitProfileForm);

//Слушатель кнопки добавления места
// Найдем элементы для валидатора
//const inputList = Array.from(popupMestoForm.querySelectorAll(validationConfig.inputSelector));
//const buttonElement = popupMestoForm.querySelector(validationConfig.submitButtonSelector);

// Установим слушатель открытия формы новой карточки
profileAddPopupButton.addEventListener('click', () => {
  //addCardValidator.toggleButtonState();
  cardValidator.disableSubmitButton();

  openPopup(popupMesto)
});

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








//Перебор значений массива карточек   
initialCards.forEach((item) => {
  const cardElement = createCard(item);
  renderCard(cardElement)
});

