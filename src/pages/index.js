import "./index.css"; // добавьте импорт главного файла стилей !!!!for webpack

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
  popupProfileSaveButton,
  popupMestoSaveButton,
  popupMestoForm,
  popupAvatarSaveButton,
  popupPictureLink,
  profileEditButton,
  profileAddPopupButton,
  validationConfig,
  profileEditAvatar,
} from "../utils/constants.js";

import { api } from "../components/Api.js";

//-----------get/put profile info---------------//
let userId;
api
  .getProfile()
  .then((res) => {
    userId = res._id;
    userInfo.setUserInfo(res.name, res.about, res.avatar);
  })
  .catch(console.log);

//-----------get/put cards on page---------------//
api
  .getInitialCards()
  .then((cardList) => {
    //--------making reverse
    for (let i = cardList.length - 1; i >= 0; i--) {
      const cardElement = createCard({
        name: cardList[i].name,
        link: cardList[i].link,
        likes: cardList[i].likes,
        id: cardList[i]._id,
        userId: userId,
        ownerId: cardList[i].owner._id,
      });
      section.addItem(cardElement);
    }
  })
  .catch(console.log);

//-----------редактирования профиля START---------------//

const profileValidator = new FormValidator(validationConfig, popupProfileForm); // Cоздание экземпляра класса валидации форм

profileValidator.enableValidation(); // Вызов метода валидации форм

// Обработчик submit редактирования профиля +
function handlerSubmitProfileForm(data) {
  popupProfileSaveButton.textContent = "Сохранение...";
  const { name, job } = data;
  api
    .editProfile(name, job)
    .then(() => {
      userInfo.setUserInfo(name, job);
      popupEditCard.close();
    })
    .catch(console.log)
    .finally(() => popupProfileSaveButton.textContent = "Сохранить");
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

//-----------добавление место START---------------//

//Cоздание экземпляра класса валидации форм
const cardValidator = new FormValidator(validationConfig, popupMestoForm);

// Вызов метода валидации форм
cardValidator.enableValidation();

// Обрабочик submit добавление место (+)
const handlerSubmitAddMestoForm = (data) => {
    popupMestoSaveButton.textContent = "Сохранение...";
  api
    .addCard(data["mesto-name"], data.link)
    .then((res) => {
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
    })
    .catch(console.log)
    .finally(() => popupMestoSaveButton.textContent = "Создать");
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
        api
          .deleteCard(id)
          .then((res) => {
            card.deleteCard();
            popupDeleteConfirm.close();
          })
          .catch(console.log);
      });
    },
    (id) => {
      if (card.isLiked()) {
        api
          .deleteLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch(console.log);
      } else {
        api
          .addLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch(console.log);
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
const popupEditAvatarForm = document
  .querySelector(".popup_avatar")
  .querySelector(".popup__form");
const avatarValidator = new FormValidator(
  validationConfig,
  popupEditAvatarForm
);

// Вызов метода валидации форм
avatarValidator.enableValidation();

const popupAvatar = new PopupWithForm(".popup_avatar", handlerSubmitAvatarForm);

profileEditAvatar.addEventListener("click", function () {
  //Слушатель кнопки редактирования avatar
  const { name, job, avatar } = userInfo.getUserInfo();


  const popupProfileAvatar = popupPictureLink;
  popupProfileAvatar.value = avatar;

  popupAvatar.open();
});

function handlerSubmitAvatarForm(data) {
  // Обработчик submit
  const avatar = data["picture-link"];
  popupAvatarSaveButton.textContent = "Сохранение...";
  api
    .updateAvatar(avatar)
    .then((res) => {
      userInfo.setUserInfo("", "", avatar);
      popupAvatar.close();
    })
    .catch(console.log)
    .finally(() => popupAvatarSaveButton.textContent = "Сохранить");
}

popupAvatar.setEventListeners();

//-------------- Popup avatar end----------------//

section.renderItems();

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__occupation",
  profileAvatarSelector: ".profile__avatar",
});
