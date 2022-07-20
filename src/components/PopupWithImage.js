import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector)


    this._image = this._popup.querySelector('.popup__picture-img')
    this._caption = this._popup.querySelector('.popup__picture-subtitle')

}
  
  open(text, link) {
    //const image = this._popup.querySelector('.popup__picture-img')
    //const caption = this._popup.querySelector('.popup__picture-subtitle')

    this._image.src = link
    this._image.alt = text; 
    this._caption.textContent = text

    super.open();
  }
} 