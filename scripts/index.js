import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

// ------------- Элементы dome -------------

// Элементы попап редактирования профиля
const popupProfile = document.querySelector(".popup_profile");

const popupProfileForm = popupProfile.querySelector(".popup__form");
const popupProfileName = popupProfile.querySelector("#popup__profile-name");
const popupProfileJob = popupProfile.querySelector(".popup__job");

// Элементы попап добовления мест
const popupMesto = document.querySelector(".popup_mesto");

const popupMestoForm = popupMesto.querySelector(".popup__form");

// Элементы профайла со страницы
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddPopupButton = profile.querySelector(".profile__add-button");

// Элементы карточек мест со страницы
const cardsContainer = document.querySelector(".elements__list");

// Элементы попап раскрытие картинки места
const popupPicture = document.querySelector(".popup_picture");

// Настройки валидации форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
// Создание экземпляра класса валидации форм
const profileValidator = new FormValidator(validationConfig, popupProfileForm);
const cardValidator = new FormValidator(validationConfig, popupMestoForm);

// Вызов метода валидации форм
profileValidator.enableValidation();
cardValidator.enableValidation();

// Обработчик submit редактирования профиля +
function handlerSubmitProfileForm(data) {
  const { name, job } = data;
  userInfo.setUserInfo(name, job);

  editProfilePopup.close();
}

// Обрабочик submit добавление место (+)
const handlerSubmitAddMestoForm = (data) => {
  const cardElement = createCard({
    name: data["mesto-name"],
    link: data.link,
  });

  section.addItem(cardElement);
  addCardPopup.close();
};

// Отрисовка карточек
const renderCard = (cardElements) => {
  const cardElement = createCard(cardElements);
  cardsContainer.prepend(cardElement);
};

//Генерируем карточку из полученых данных
function createCard(item) {
  const card = new Card(item, "#elements__card-template", () => {
    imagePopup.open(item.name, item.link);
  });
  return card.generateCard();
}

//Слушатель кнопки редактирования профиля
profileEditButton.addEventListener("click", function () {
  const { name, job } = userInfo.getUserInfo();
  popupProfileName.value = name;
  popupProfileJob.value = job;

  editProfilePopup.open();
});

// Установим слушатель открытия формы новой карточки
profileAddPopupButton.addEventListener("click", () => {
  cardValidator.disableSubmitButton();

  addCardPopup.open();
});

const section = new Section(
  { items: initialCards, renderer: renderCard },
  ".elements__list"
);

const imagePopup = new PopupWithImage(".popup_picture");
imagePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  ".popup_mesto",
  handlerSubmitAddMestoForm
);

const editProfilePopup = new PopupWithForm(
  ".popup_profile",
  handlerSubmitProfileForm
);

addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();

section.renderItems();

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__occupation",
});