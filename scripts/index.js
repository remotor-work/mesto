const openPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileOccupation = profile.querySelector('.profile__occupation');

const popupForm = popup.querySelector('.popup__form');

function popupOpenToggle() {
    popup.classList.toggle('popup_opened');

    popup.querySelector('.popup__name').value = profileName.textContent;
    popup.querySelector('.popup__job').value = profileOccupation.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profile.querySelector('.profile__name').textContent = popup.querySelector('.popup__name').value;
    profile.querySelector('.profile__occupation').textContent = popup.querySelector('.popup__job').value;
    popup.classList.remove('popup_opened');
}

openPopupButton.addEventListener('click', popupOpenToggle);

popupCloseButton.addEventListener('click', popupOpenToggle);

popupForm.addEventListener('submit', formSubmitHandler); 