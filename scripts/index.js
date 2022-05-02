// Переменные редактирования профиля
const popupProfile = document.querySelector('.popup_profile');
const popupCloseButton = popupProfile.querySelector('.popup__close');
const popupProfileForm = popupProfile.querySelector('.popup__form');


const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const openPopupButton = profile.querySelector('.profile__edit-button');
const profileOccupation = profile.querySelector('.profile__occupation');
const addPopupButton = profile.querySelector('.profile__add-button');

const popupMesto = document.querySelector('.popup-mesto');
const popupMestoCloseButton = document.querySelector('.popup-mesto__close');
const popupMestoForm = document.querySelector('.popup-mesto__form');
const popupMestoName = popupMestoForm.querySelector('.popup-mesto__name');
const popupMestolink = popupMestoForm.querySelector('.popup-mesto__link');

const cardsContainer = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#elements__card-template').content.querySelector('.elements__element');

const popupPicture = document.querySelector('.popup-picture');
const popupPictureImg = popupPicture.querySelector('.popup-picture__img');
const popupPictureName = popupPicture.querySelector('.popup-picture__subtitle');
const popupPictureClose = popupPicture.querySelector('.popup-picture__close');


const popupProfileName = popupProfile.querySelector('.popup__name');
const popupProfileJob = popupProfile.querySelector('.popup__job');

function popupOpenToggle() {
  popupProfileName.value = profileName.textContent;
  popupProfileJob.value = profileOccupation.textContent;
  popupProfile.classList.toggle('popup_opened');
}

  function handlerSubmitform(evt) {
  evt.preventDefault();
  profile.querySelector('.profile__name').textContent = popupProfile.querySelector('.popup__name').value;
  profile.querySelector('.profile__occupation').textContent = popupProfile.querySelector('.popup__job').value;
  popupProfile.classList.remove('popup_opened');
}

// Сейчас у вас много где дублируется добавление и удаление класса видимости для попапов. Чтобы этого избежать создайте две универсальные функции открытия и закрытия попапов. Они будут принимать через параметр нужный попап и добавлять или удалять класс видимости. Выглядеть они будут примерно так: 

function openPopupA (popup) {
  popup.classList.add('popup_opened');
}
function closePopupA (popup) {
  console.log(popup);
  popup.classList.remove('popup-mesto_opened');
}


//Функция открытия и закрытия фомы место
function popupMestoOpenToggle() {
  popupMesto.classList.toggle('popup-mesto_opened');
}

//Обрабочик submit mesto form
const handlerSubmitAddMestoForm = (evt) => {
  //
  const veriableA = evt.target.closest('.popup-mesto');
  //
  evt.preventDefault();
  renderCards(popupMestoName.value, popupMestolink.value)
  popupMestoName.value = '';
  popupMestolink.value = '';
  //
  closePopupA(veriableA);
  //
  // popupMestoOpenToggle();
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
popupProfileForm.addEventListener('submit', handlerSubmitform);
popupMestoForm.addEventListener('submit', handlerSubmitAddMestoForm);
addPopupButton.addEventListener('click', popupMestoOpenToggle);
popupMestoCloseButton.addEventListener('click', popupMestoOpenToggle);






