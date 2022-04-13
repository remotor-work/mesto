const openPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');

const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name').textContent;
const profileOccupation = profileInfo.querySelector('.profile__occupation').textContent;

const popupContainer = popup.querySelector('.popup__container');

function popupOpenToggle() {
    popup.classList.toggle('popup_is-opened');

    popup.querySelector('.popup__name').setAttribute('value', profileName);
    popup.querySelector('.popup__job').setAttribute('value', profileOccupation);
}

function popupOverlayClickHandler(evt) {
    if (evt.target === evt.currentTarget) {
        popupOpenToggle();   
    }
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profileInfo.querySelector('.profile__name').textContent = popup.querySelector('.popup__name').value;
    profileInfo.querySelector('.profile__occupation').textContent = popup.querySelector('.popup__job').value;
}

openPopupButton.addEventListener('click', popupOpenToggle);
popupCloseButton.addEventListener('click', popupOpenToggle);
popup.addEventListener('click', popupOverlayClickHandler);
popupContainer.addEventListener('submit', formSubmitHandler); 