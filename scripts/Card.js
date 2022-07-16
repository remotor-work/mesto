export class Card {
  constructor(data, cardTemplateSelector, handlerClickPicture) {
    //  создаем поля генерируемого обьекта
    this._cardTemplate = document
      .querySelector(cardTemplateSelector)
      .content.querySelector(".elements__element"); // cardTemplateSelector = '#elements__card-template'
    this._handlerClickPicture = handlerClickPicture;
    this._text = data.name; // создаем поле со значением названия места
    this._image = data.link; // создаем поле со значением ссылки на картунку
  }

  _getTemplate() {
    // Метод молучает шаблон со стараницы и кланирует и возвращает его
    const cardElement = this._cardTemplate.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    // Метод получает шаблон из метода  _getTemplate(), наполняет его данными, обращается к методу _setEventListeners() для установки слушателей
    this._element = this._getTemplate(); // Получает шаблон из метода _getTemplate() записывает в внутреннее свойство _element
    this._setEventListeners(); // Обращаеться к методу _setEventListeners() для установки слушателей
    this._element.querySelector(".elements__picture").src = this._image; // Записывает в экземляр карточки значения ссылки на фото
    this._element.querySelector(".elements__picture").alt = this._text;
    this._element.querySelector(".elements__name").textContent = this._text; // Записывает в экземляр карточки значения для названия

    return this._element; // Возвращает экземплыр карточки с заполнеными данными
  }

  _setEventListeners() {
    // Метод устанавливает слушатели на картачки
    this._element
      .querySelector(".elements__picture")
      .addEventListener("click", () =>
        this._handlerClickPicture(this._text, this._image)
      ); // Слушатель по картинки карточки чтобы раскрыть миниатюру на попап ('.elements__picture');
    this._element
      .querySelector(".elements__delete")
      .addEventListener("click", () => this._handlerDeletMestoCard()); // Слушатель по урне для удаления карточки ('.elements__picture')
    this._element
      .querySelector(".elements__like")
      .addEventListener("click", () => this._handlerLikeMestoCard()); // Слушатель по лайку querySelector('.elements__like');
  }

  _handlerDeletMestoCard = () => {
    // Обработчик кнопки удалить картачку
    this._element.remove();
  };

  _handlerLikeMestoCard = () => {
    // обработчик лайка
    this._element
      .querySelector(".elements__like")
      .classList.toggle("elements__like_active");
  };
}
