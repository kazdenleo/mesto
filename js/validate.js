export const enableValidation = {
    formSelector: '.popup__container',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_error',
    inputErrorClass: 'popup__error',
    errorClass: 'popup__error_active'
} ;

export class FormValidator {
    constructor(enableValidation, templateForm) {
        this._validateOptions = enableValidation;
        this._template = templateForm;
    }

    _setEventListeners(profileForm) {
        const inputList = profileForm.querySelectorAll(this._validateOptions.inputSelector);
        
        this._handleFormInput(profileForm, this._validateOptions);
        profileForm.addEventListener('input', evt => {
                this._handleFormInput(profileForm, this._validateOptions);
        })
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', event => {
               this._isvalid(profileForm, inputElement, inputElement.validationMessage);
            })
        })
    }

    _isvalid(profileForm, inputElement) {
        const errorInput = profileForm.querySelector(`.popup__error_${inputElement.id}`);
        if (!inputElement.validity.valid) {
            this._showInputError(profileForm, errorInput, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement, errorInput);
        }
    };

    _showInputError(profileForm, errorInput, inputElement, errorMessage) {
        errorInput.classList.add(this._validateOptions.errorClass);
        errorInput.textContent = errorMessage;
        console.log(this._validateOptions.inputErrorClass)
        inputElement.classList.remove(this._validateOptions.inputErrorClass);
    }

    _hideInputError(inputElement, errorInput) {
        errorInput.classList.remove(this._validateOptions.errorClass);
    }

    enableValidation() {
        const profileForm = document.querySelector(`${this._template}`);
        profileForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners(profileForm);
    }

    _handleFormInput(profileForm, validateOptions) {
        const hasErrors = !profileForm.checkValidity();
        const buttonForm = profileForm.querySelector(validateOptions.submitButtonSelector);
        buttonForm.disabled = hasErrors;
        buttonForm.classList.toggle(validateOptions.inactiveButtonClass, hasErrors);
    }
}