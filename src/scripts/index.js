import '../pages/index.css'; // добавьте импорт главного файла стилей !!!!for webpack
import { initialCards } from "../utils/cards.js";

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import {
  popupProfileForm,
  popupProfileName,
  popupProfileJob,
  popupMestoForm,
  profileEditButton,
  profileAddPopupButton,
  cardsContainer,
  validationConfig
} from "../utils/constants.js"

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

  popupEditCard.close();
}

// Обрабочик submit добавление место (+)
const handlerSubmitAddMestoForm = (data) => {
  const cardElement = createCard({
    name: data["mesto-name"],
    link: data.link,
  });

  section.addItem(cardElement);
  popupAddCard.close();
};

// Отрисовка карточек
const renderCard = (cards) => {
  const cardElement = createCard(cards);

//Используйте, пожалуйста, метод addItem() класса Section для вставки карточки в контейнер
  section.addItem(cardElement);
  //cardsContainer.prepend(cardElement);
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

  popupEditCard.open();
});

// Установим слушатель открытия формы новой карточки
profileAddPopupButton.addEventListener("click", () => {
  cardValidator.disableSubmitButton();

  popupAddCard.open();
});

const section = new Section(
  { items: initialCards, renderer: renderCard },
  ".elements__list"
);

const imagePopup = new PopupWithImage(".popup_picture");
imagePopup.setEventListeners();

const popupAddCard = new PopupWithForm(
  ".popup_mesto",
  handlerSubmitAddMestoForm
);

const popupEditCard = new PopupWithForm(
  ".popup_profile",
  handlerSubmitProfileForm
);

popupAddCard.setEventListeners();


popupEditCard.setEventListeners();

section.renderItems();

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__occupation",
});