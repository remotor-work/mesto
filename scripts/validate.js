// Выбираем элемент ошибки на основе уникального класса (ищим span ошибки нужного поля берм калсс и добовляем в конце -error)
const popupProfileFormError = popupProfileForm.querySelector(`.${popupProfileName.id}-error`);
// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);  // Находим элемент ошибки внутри самой функции
    inputElement.classList.add('popup__input_type_error'); //
    errorElement.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.classList.add('popup__error_visible'); // Активирует сообщение об ошибке
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible'); // Скрываем сообщение об ошибке
    errorElement.textContent = ''; // Очистим ошибку
};

// Функция, которая проверяет валидность поля
// formElement — html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме.
// inputElement — проверяемое поле ввода.
const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        // showInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        // Если проходит, скроем
        // hideInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        hideInputError(formElement, inputElement);
    }
};

// Вызовем функцию isValid на каждый ввод символа
// popupProfileName.addEventListener('input', isValid); 
// Пусть слушатель событий добавится всем полям ввода внутри формы. Для этого создадим функцию setEventListener, которая примет параметром элемент формы и добавит её полям нужные обработчики:
const setEventListeners = (formElement) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector('.popup__button');

    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    toggleButtonState(inputList, buttonElement);

    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
            // Внутри колбэка вызовем isValid,
            // передав ей форму и проверяемый элемент
            isValid(formElement, inputElement);

            // Вызовем toggleButtonState и передадим ей массив полей и кнопку
            toggleButtonState(inputList, buttonElement);
        });
    });
};


// Теперь нужно найти все формы в DOM и вызвать для них функцию setEventListeners.
//  Для единообразия поступим с формами аналогично полям внутри них.
//   Объявим функцию enableValidation, которая найдёт и переберёт все формы на странице:
const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM popup__form,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        // formElement.addEventListener('submit', (evt) => {
        //   // У каждой формы отменим стандартное поведение
        //   evt.preventDefault();
        // });
        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        setEventListeners(formElement);
    });
};

// Сейчас функция isValid валидирует только один input. Но нужно проверить все поля, чтобы настроить статус кнопки. Если все поля валидны — активировать кнопку, если хотя бы одно нет — заблокировать. создадим функцию hasInvalidInput. Она принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно, и false, если все валидны.
// Функция принимает массив полей
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
const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.classList.add('popup__button_disabled');
        buttonElement.setAttribute('disabled', true);
    } else {
        // иначе сделай кнопку активной
        buttonElement.classList.remove('popup__button_disabled');
        buttonElement.removeAttribute('disabled');

    }
};

// Вызовем функцию
enableValidation(); 