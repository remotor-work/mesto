import "./index.css"; // добавьте импорт главного файла стилей !!!!for webpack
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
  validationConfig,
} from "../utils/constants.js";

import { api } from "../components/Api.js";

let userId;

api.getProfile().then((res) => {
  console.log("answer", res);
  console.log("res.avatar", res.avatar);
  userInfo.setUserInfo(res.name, res.about, res.avatar);// avatar added  res.avatar
  userId = res._id;
});

api.getInitialCards().then((cardList) => {
  console.log("cardList", cardList);
  cardList.forEach((data) => {
    const cardElement = createCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      id: data._id,
      userId: userId,
      ownerId: data.owner._id
    });
    section.addItem(cardElement);
  });
});

// Создание экземпляра класса валидации форм
const profileValidator = new FormValidator(validationConfig, popupProfileForm);
const cardValidator = new FormValidator(validationConfig, popupMestoForm);

// Вызов метода валидации форм
profileValidator.enableValidation();
cardValidator.enableValidation();

// Обработчик submit редактирования профиля +
function handlerSubmitProfileForm(data) {
  const { name, job } = data;
  api.editProfile(name, job).then(() => {
    userInfo.setUserInfo(name, job);
    popupEditCard.close();
  });
}

// Обрабочик submit добавление место (+)
const handlerSubmitAddMestoForm = (data) => {
  console.log("data", data);
  console.log('data["mesto-name"]', data["mesto-name"]);
  console.log("data.link", data.link);
  // const cardElement = createCard({
  //   name: data["mesto-name"],
  //   link: data.link,
  // });
  api.addCard(data["mesto-name"], data.link).then((res) => {
    const cardElement = createCard({
      name: res.name,
      link: res.link,
      likes: res.likes, //not sure
      id: res._id,
      userId: userId,
      ownerId: res.owner._id
      
    });
    section.addItem(cardElement);
    popupAddCard.close();
  });

  // section.addItem(cardElement);
  // popupAddCard.close();
};

// Отрисовка карточек
const renderCard = (cards) => {
  const cardElement = createCard(cards);

  //метод addItem() класса Section для вставки карточки в контейнер
  section.addItem(cardElement);
};

//Генерируем карточку из полученых данных
function createCard(data) {
  const card = new Card(data, "#elements__card-template", () => {
    imagePopup.open(data.name, data.link);
  },
  (id) => { 
    popupDeleteConfirm.open();
    popupDeleteConfirm.changeSubmitHandler(() => {
      api.deleteCard(id)
        .then(res =>{
          card.deleteCard()
          popupDeleteConfirm.close()
        } )
    });
  },
  (id) => {
    if(card.isLiked()) {
      api.deleteLike(id)
      .then(res => {
        card.setLikes(res.likes)
      })
    } else {
      api.addLike(id)
      .then(res => {
        card.setLikes(res.likes)
      })
    }  
    }
  );
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

//it was
// const section = new Section(
//   { items: initialCards, renderer: renderCard },
//   ".elements__list"
// );

const section = new Section(
  { items: [], renderer: renderCard },
  ".elements__list"
);

const imagePopup = new PopupWithImage(".popup_picture");

const popupAddCard = new PopupWithForm(
  ".popup_mesto",
  handlerSubmitAddMestoForm
);

const popupEditCard = new PopupWithForm(
  ".popup_profile",
  handlerSubmitProfileForm
);

const popupDeleteConfirm = new PopupWithForm(".popup_delete-confirm");

//const popupAvatar = new PopupWithForm(".popup_type_avatar, () = > {
//  api.updateAvatar()
//    .then(res => {
//    userInfo.setUserInfo(res.name, res.about, res.avatar)
//    popupAvatar.close()
//})
//} "); //!@!@!@! add popup avatar FUNCT CREAT SIPARETE


imagePopup.setEventListeners();
popupAddCard.setEventListeners();
popupEditCard.setEventListeners();
popupDeleteConfirm.setEventListeners();

//-------------- Popup avatar ----------------//

// profileAddPopupButton.addEventListener("click", function () { //Слушатель кнопки редактирования avatar
//   const { name, job, avatar } = userInfo.getUserInfo();
//   popupProfileName.value = name;
//   popupProfileJob.value = job;

//   popupEditCard.open();
// });

// function handlerSubmitAvatarForm(data) { // Обработчик submit 
//   api.updateAvatar()
//   .then(() => {
//     userInfo.setUserInfo(res.name, res.about, res.avatar);
//     popupEditCard.close();
//   });
// }

// const popupAvatar = new PopupWithForm(
//   ".popup_avatar",
//   handlerSubmitAvatarForm
// );

// popupAvatar.setEventListeners();

//-------------- Popup avatar ----------------//

section.renderItems();

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__occupation",
  profileAvatarSelector: '.profile__avatar' //!@!@!@! Popup avatar 
});
