export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonElement = this._form.querySelector(
      this._settings.submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    // Функция, которая добавляет класс с ошибкой
    const { inputErrorClass, errorClass } = this._settings;

    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.classList.add(this._settings.errorClass); // Активирует сообщение об ошибке
  }

  _hideInputError(inputElement) {
    // Функция, которая удаляет класс с ошибкой
    const { inputErrorClass, errorClass } = this._settings;

    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass); // Скрываем сообщение об ошибке
    errorElement.textContent = ""; // Очистим ошибку
  }

  _isValid(inputElement) {
    //checkInputValidity
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  disableSubmitButton() {
    //Диактивирует кнопку
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
