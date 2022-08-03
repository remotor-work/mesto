import "./index.css"; // добавьте импорт главного файла стилей !!!!for webpack
//import { initialCards } from "../utils/cards.js";

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
  validationConfig,
  profileEditAvatar,
} from "../utils/constants.js";

import { api } from "../components/Api.js";

//-----------get/put profile info---------------//
let userId;
api.getProfile()
.then((res) => {
  
  userId = res._id;
  userInfo.setUserInfo(res.name, res.about, res.avatar);
});

//-----------get/put cards on page---------------//
api.getInitialCards()
.then((cardList) => {
  cardList.forEach((data) => {
    const cardElement = createCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      id: data._id,
      userId: userId,
      ownerId: data.owner._id,
    });
    section.addItem(cardElement);
  });
});

//-----------редактирования профиля START---------------//

const profileValidator = new FormValidator(validationConfig, popupProfileForm); // Cоздание экземпляра класса валидации форм

profileValidator.enableValidation(); // Вызов метода валидации форм

// Обработчик submit редактирования профиля +
function handlerSubmitProfileForm(data) {
  document.querySelector('#popup_profile__save-button').textContent = 'Сохранение...';
  const { name, job } = data;
  api.editProfile(name, job).then(() => {
    userInfo.setUserInfo(name, job);
    popupEditCard.close();
    document.querySelector('#popup_profile__save-button').textContent = "Сохранить";
  });
}

const popupEditCard = new PopupWithForm(
  ".popup_profile",
  handlerSubmitProfileForm
);

//Слушатель кнопки редактирования профиля
profileEditButton.addEventListener("click", function () {
  const { name, job } = userInfo.getUserInfo();
  popupProfileName.value = name;
  popupProfileJob.value = job;

  popupEditCard.open();
});

popupEditCard.setEventListeners();

//-----------редактирования профиля END---------------//

//-----------добавление место START---------------//

//Cоздание экземпляра класса валидации форм
const cardValidator = new FormValidator(validationConfig, popupMestoForm);

// Вызов метода валидации форм
cardValidator.enableValidation();

// Обрабочик submit добавление место (+)
const handlerSubmitAddMestoForm = (data) => {
  document.querySelector('#popup__mesto-save-button').textContent = 'Сохранение...';
  api.addCard(data["mesto-name"], data.link).then((res) => {
    const cardElement = createCard({
      name: res.name,
      link: res.link,
      likes: res.likes,
      id: res._id,
      userId: userId,
      ownerId: res.owner._id,
    });
    section.addItem(cardElement);
    popupAddCard.close();
    document.querySelector('#popup__mesto-save-button').textContent = "Создать";
  });
};

// Отрисовка карточек
const renderCard = (cards) => {
  const cardElement = createCard(cards);

  //метод addItem() класса Section для вставки карточки в контейнер
  section.addItem(cardElement);
};

//Генерируем карточку из полученых данных
function createCard(data) {
  const card = new Card(
    data,
    "#elements__card-template",
    () => {
      imagePopup.open(data.name, data.link);
    },
    (id) => {
      popupDeleteConfirm.open();
      popupDeleteConfirm.changeSubmitHandler(() => {
        api.deleteCard(id).then((res) => {
          card.deleteCard();
          popupDeleteConfirm.close();
        });
      });
    },
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id).then((res) => {
          card.setLikes(res.likes);
        });
      } else {
        api.addLike(id).then((res) => {
          card.setLikes(res.likes);
        });
      }
    }
  );
  return card.generateCard();
}

// Установим слушатель открытия формы новой карточки
profileAddPopupButton.addEventListener("click", () => {
  cardValidator.disableSubmitButton();

  popupAddCard.open();
});

const section = new Section(
  { items: [], renderer: renderCard },
  ".elements__list"
);

const imagePopup = new PopupWithImage(".popup_picture");

const popupAddCard = new PopupWithForm(
  ".popup_mesto",
  handlerSubmitAddMestoForm
);

const popupDeleteConfirm = new PopupWithForm(".popup_delete-confirm");

imagePopup.setEventListeners();
popupAddCard.setEventListeners();

popupDeleteConfirm.setEventListeners();

//-------------- Popup avatar ----------------//

//Создание экземпляра класса валидации форм
const popupEditAvatarForm = document.querySelector(".popup_avatar").querySelector(".popup__form");
const avatarValidator = new FormValidator(validationConfig, popupEditAvatarForm)

// Вызов метода валидации форм
avatarValidator.enableValidation();

const popupAvatar = new PopupWithForm(".popup_avatar", handlerSubmitAvatarForm);

profileEditAvatar.addEventListener("click", function () {
  //Слушатель кнопки редактирования avatar
  const { name, job, avatar } = userInfo.getUserInfo();
  const popupProfileAvatar = document.querySelector(".popup__picture-link");
  popupProfileAvatar.value = avatar;

  popupAvatar.open();
});

function handlerSubmitAvatarForm(data) { // Обработчик submit
  const avatar = data['picture-link'];
  document.querySelector('#popup__avatar-save-button').textContent = 'Сохранение...';
  api.updateAvatar(avatar)
    .then((res) => {
    userInfo.setUserInfo('', '', avatar);
    popupAvatar.close();
    document.querySelector('#popup__avatar-save-button').textContent = "Сохранить";
  });
}

popupAvatar.setEventListeners();

//-------------- Popup avatar end----------------//

section.renderItems();

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__occupation",
  profileAvatarSelector: ".profile__avatar",
});