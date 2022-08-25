let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup');
let formExit = document.querySelector('.popup__exit');

function showForm() {
	formElement.classList.add('popup_opened');
}

function closeForm() {
	formElement.classList.remove('popup_opened');
}
editButton.addEventListener('click', showForm);
formExit.addEventListener('click', closeForm);

// Постановка и удаление Like на пост
document.querySelectorAll('.elements__like-img').forEach(item => {
	item.addEventListener('click', event => {
		item.classList.toggle('elements__like-img_active')
	})
})

let formProfile = document.querySelector('.profile__info');
let nameInput = formProfile.querySelector('.profile__name');
let infoInput = formProfile.querySelector('.profile__about');
let popupInput = document.querySelectorAll('.popup__text');

popupInput[0].setAttribute('value', nameInput.textContent);
popupInput[1].setAttribute('value', infoInput.textContent);

function formSubmitHandler (evt) {
    evt.preventDefault();
    	nameInput.textContent = popupInput[0].value;
    	infoInput.textContent = popupInput[1].value;
    	closeForm()
}
formElement.addEventListener('submit', formSubmitHandler); 