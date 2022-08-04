// ------------- Элементы dome -------------

// Элементы попап редактирования профиля
export const popupProfile = document.querySelector(".popup_profile");

export const popupProfileForm = popupProfile.querySelector(".popup__form");
export const popupProfileName = popupProfile.querySelector("#popup__profile-name");
export const popupProfileJob = popupProfile.querySelector(".popup__job");
export const popupProfileSaveButton = document.querySelector("#popup_profile__save-button");
export const popupMestoSaveButton = document.querySelector("#popup__mesto-save-button");

// Элементы попап добовления мест
export const popupMesto = document.querySelector(".popup_mesto");
export const popupMestoForm = popupMesto.querySelector(".popup__form");

// Элементы профайла со страницы
export const profile = document.querySelector(".profile");
export const profileEditButton = profile.querySelector(".profile__edit-button");
export const profileAddPopupButton = profile.querySelector(".profile__add-button");


export const profileEditAvatar = profile.querySelector(".profile__edit-avatar"); //avatar

// Элементы карточек мест со страницы
export const cardsContainer = document.querySelector(".elements__list");

// Элементы попап раскрытие картинки места
export const popupPicture = document.querySelector(".popup_picture");

// Настройки валидации форм
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};