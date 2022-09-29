/*enableValidation({
formSelector: '.popup__form',
inputSelector: '.popup__input',
submitButtonSelector: '.popup__button',
inactiveButtonClass: 'popup__button_disabled',
inputErrorClass: 'popup__input_type_error',
errorClass: 'popup__error_visible'
});*/

const enableVlidation = () => {
let formList = Array.from(document.querySelectorAll('.popup'))
formList.forEach((formElement) => {
formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
});
    setEventListeners(formElement);
});
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        isValid(formElement, inputElement);
      });
    });
};

const isValid = (formElement, inputElement) => {
if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
} else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
    }
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.popup__error_${inputElement.id}`);
    const buttonElement = formElement.querySelector(`.popup__submit`);
    inputElement.classList.add('popup__text_type_error');
    errorElement.classList.add(`popup__error_active`);
    errorElement.textContent = errorMessage;
    buttonElement.classList.add('popup__submit_error');
    buttonElement.setAttribute("disabled", "disabled");
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.popup__error_${inputElement.id}`);
    const buttonElement = formElement.querySelector(`.popup__submit`);
    inputElement.classList.remove('popup__text_type_error');
    errorElement.classList.remove(`popup__error_active`);
    errorElement.textContent = '';
    buttonElement.classList.remove('popup__submit_error');
    buttonElement.removeAttribute("disabled", "disabled");
};

enableVlidation();