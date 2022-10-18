import { initialCards } from '../js/components.js';
import { Card } from '../js/Card.js';
import { enableValidation, FormValidator } from '../js/validate.js';

const popupEdit = document.querySelector('#edit');
const profilButton = document.querySelector('.profile__edit');
const editButton = document.querySelector('.profile__button');

// Функция открытия и закрытия форм
profilButton.addEventListener('click', showCloseForm);
editButton.addEventListener('click', showCloseForm);
const exitButton = document.querySelectorAll('.popup__exit');
exitButton[0].addEventListener('click', showCloseForm);
exitButton[1].addEventListener('click', showCloseForm);

// Закрытие формы по нажатиню на Esc
window.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		showCloseForm(event);
	}
});

// Закрытие формы по нажатию мыши вне формы
document.addEventListener( 'click', (e) => {
	const Popup = document.getElementById(`${e.target.id}`);
	const whereClick = e.composedPath().includes(Popup);
	if (whereClick) {
		document.getElementById(`${e.target.id}`).classList.remove('popup_opened');	
	} 
})

function showCloseForm(ev) {
	if (ev.target.classList.contains('profile__edit-button')) {
		document.querySelector('#profilePopup').classList.toggle('popup_opened');
		const newValidation = new FormValidator(enableValidation, `#profile`);
		const validation = newValidation.enableValidation();
	} else if (ev.target.classList.contains('profile__button-img')) { 
		document.querySelector('#editPopup').classList.toggle('popup_opened');
		const newValidation = new FormValidator(enableValidation, `#edit`);
		const validation = newValidation.enableValidation();
	} else {
		document.querySelectorAll('.popup')[0].classList.remove('popup_opened');
		document.querySelectorAll('.popup')[1].classList.remove('popup_opened');
	}
}

// Редактирование информации в профиле
const formProfile = document.querySelector('.profile__info');
const nameInput = formProfile.querySelector('.profile__name');
const infoInput = formProfile.querySelector('.profile__about');
const popupProfile = document.querySelector('#profile');
const popupInput = popupProfile.querySelectorAll('.popup__text');
popupInput[0].setAttribute('value', nameInput.textContent);
popupInput[1].setAttribute('value', infoInput.textContent);

function formSubmitHandler(evt) {
    evt.preventDefault();
    	nameInput.textContent = popupInput[0].value;
    	infoInput.textContent = popupInput[1].value;
    	showCloseForm(evt);
}
popupProfile.addEventListener('submit', formSubmitHandler); 

// Забираем из текстовых полей значения названия и ссылку на картинку
popupEdit.addEventListener('submit', formSubmitEdit);
function formSubmitEdit(evt) {
	evt.preventDefault();
	const popupInputEdit = popupEdit.querySelectorAll('.popup__text');
	initialCards.push({'name': popupInputEdit[0].value, 'link': popupInputEdit[1].value});
	makeNewPost();
	showCloseForm(event);
}

initialCards.forEach((item) => {
	const newCard = new Card(item)
	const cardElement = newCard.generate();
	document.querySelector('.elements').append(cardElement);
  });

/*document.querySelectorAll('.popup').forEach((formElement) => {
	console.log(formElement)
	const newValidation = new FormValidator(enableValidation, formElement.id);
	const validation = newValidation.enableValidation();
});*/