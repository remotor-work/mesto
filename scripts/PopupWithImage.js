import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open(text, link) {
    const image = this._popup.querySelector('.popup__picture-img')
    const caption = this._popup.querySelector('.popup__picture-subtitle')

    image.src = link
    caption.textContent = text

    super.open();
  }
} 