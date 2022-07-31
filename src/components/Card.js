export class Card {
  constructor(
    data,
    cardTemplateSelector,
    handlerClickPicture,
    handlerlDeleteClick,
    handlerLikeClick
  ) {
    //  создаем поля генерируемого обьекта
    this._cardTemplate = document
      .querySelector(cardTemplateSelector)
      .content.querySelector(".elements__element"); // cardTemplateSelector = '#elements__card-template'
    this._handlerClickPicture = handlerClickPicture;
    this._text = data.name; // создаем поле со значением названия места
    this._image = data.link; // создаем поле со значением ссылки на картунку
    this._likes = data.likes;
    this._handlerlDeleteClick = handlerlDeleteClick;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._handlerLikeClick = handlerLikeClick;
  }

  _getTemplate() {
    // Метод молучает шаблон со стараницы и кланирует и возвращает его
    const cardElement = this._cardTemplate.cloneNode(true);
    return cardElement;
  }

  isLiked() {
    const userHasLikedCard = this._likes.find(
      (user) => user._id === this._userId
    );

    return userHasLikedCard;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    const likeCountElement = this._element.querySelector(".card__like-count");
    likeCountElement.textContent = this._likes.length;

    if(this.isLiked()) {
      this._fillLike();
    } else {
      this._clearLike();
    }
  }

  _fillLike = () => {
    this._element
      .querySelector(".elements__like")
      .classList.add("elements__like_active");
  };

  _clearLike = () => {
    this._element
      .querySelector(".elements__like")
      .classList.remove("elements__like_active");
  };

  generateCard() {
    // Метод получает шаблон из метода  _getTemplate(), наполняет его данными, обращается к методу _setEventListeners() для установки слушателей
    this._element = this._getTemplate(); // Получает шаблон из метода _getTemplate() записывает в внутреннее свойство _element
    this._setEventListeners(); // Обращаеться к методу _setEventListeners() для установки слушателей
    this._element.querySelector(".elements__picture").src = this._image; // Записывает в экземляр карточки значения ссылки на фото
    this._element.querySelector(".elements__picture").alt = this._text;
    this._element.querySelector(".elements__name").textContent = this._text; // Записывает в экземляр карточки значения для названия

    this.setLikes(this._likes);

    if (this._userId !== this._ownerId) {
      this._element.querySelector(".elements__delete").style.display = "none";
    }

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
      .addEventListener("click", () => this._handlerlDeleteClick(this._id)); // Слушатель по урне для удаления карточки ('.elements__picture')
    this._element
      .querySelector(".elements__like")
      .addEventListener("click", () => this._handlerLikeClick(this._id)); // Слушатель по лайку querySelector('.elements__like');
  }

  // _handlerDeleteMestoCard = () => {
  //   // Обработчик кнопки удалить картачку
  //   this._element.remove();
  //   this._element = null;
  // };

  deleteCard = () => {
    // Обработчик кнопки удалить картачку
    this._element.remove();
    this._element = null;
  };
}
