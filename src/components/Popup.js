export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this)
    this._buttonClosePopup = this._popup.querySelector('.popup__close')
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose); // Cлушатель escape
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose); // удаляет слушатель escape 
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key == 'Escape') {
        this.close(); 
      }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget || evt.target === this._buttonClosePopup) {
          this.close()
        }
    })
  }
}
