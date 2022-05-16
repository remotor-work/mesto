// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);  // Находим элемент ошибки внутри самой функции
    inputElement.classList.add(settings.inputErrorClass); 
    errorElement.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.classList.add(settings.errorClass); // Активирует сообщение об ошибке
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass); // Скрываем сообщение об ошибке
    errorElement.textContent = ''; // Очистим ошибку
};

// Функция, которая проверяет валидность поля
// formElement — html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме.
// inputElement — проверяемое поле ввода.
const isValid = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        // showInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        // Если проходит, скроем
        // hideInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        hideInputError(formElement, inputElement, settings);
    }
};

// Пусть слушатель событий добавится всем полям ввода внутри формы. Для этого создадим функцию setEventListener, которая примет параметром элемент формы и добавит её полям нужные обработчики:
const setEventListeners = (formElement, settings) => {

    // Находим все поля внутри формы, сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));

    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    toggleButtonState(inputList, buttonElement, settings);

    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {

        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {

            // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
            isValid(formElement, inputElement, settings);

            // Вызовем toggleButtonState и передадим ей массив полей и кнопку
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
};


const enableValidation = (settings) => {

    // Найдём все формы с указанным классом в DOM popup__form,сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    // Переберём полученную коллекцию
    formList.forEach((formElement) => {

        // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
        setEventListeners(formElement, settings);
    });
};

// Сейчас функция isValid валидирует только один input. Но нужно проверить все поля, чтобы настроить статус кнопки. Если все поля валидны — активировать кнопку, если хотя бы одно нет — заблокировать. создадим функцию hasInvalidInput. Она принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно, и false, если все валидны.
const hasInvalidInput = (inputList) => {

    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {

        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true
        return !inputElement.validity.valid;
    })
};

// Для стилизации нужна функция toggleButtonState. Именно она отключает и включает кнопку. Для этого функция hasInvalidInput проверяет валидность полей и возвращает true или false. На их основе toggleButtonState меняет состояние кнопки:
// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, settings) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        // иначе сделай кнопку активной
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
  const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  } 
  enableValidation(validationConfig); 