const popupEdit = document.querySelector('#edit');
const profilButton = document.querySelector('.profile__edit');
const editButton = document.querySelector('.profile__button');

// Функция открытия и закрытия форм
profilButton.addEventListener('click', showCloseForm);
editButton.addEventListener('click', showCloseForm);
const exitButton = document.querySelectorAll('.popup__exit');
exitButton[0].addEventListener('click', showCloseForm);
exitButton[1].addEventListener('click', showCloseForm);

window.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		showCloseForm(event);
	}
});

document.addEventListener( 'click', (e) => {
	const Popup = document.getElementById(`${e.target.id}`);
	const whereClick = e.composedPath().includes(Popup);
	if (whereClick) {
		document.getElementById(`${e.target.id}`).classList.remove('popup_opened');	
	} 
})

function showCloseForm(ev) {
	if (ev.target.classList.contains('profile__edit-button')) {
		document.querySelector('#profile').classList.toggle('popup_opened');
	} else if (ev.target.classList.contains('profile__button-img')) { 
		document.querySelector('#edit').classList.toggle('popup_opened');
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

const initialCards = [
	{
	  name: 'Архыз',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
	  name: 'Челябинская область',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
	  name: 'Иваново',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
	  name: 'Камчатка',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
	  name: 'Холмогорский район',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
	  name: 'Байкал',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
  ];

// Выгрузка карточек на страинцу
const list = document.querySelector('.elements');
const template = document.querySelector('#template');
for (i=0; i < initialCards.length; i++) {
	makeNewPost();
}

function makeNewPost() {
	const item = template.content.cloneNode(true);
	item.querySelector('.elements__img').setAttribute('src', initialCards[i]['link'])
	item.querySelector('.elements__img').setAttribute('alt', initialCards[i]['name'])
	item.querySelector('.elements__title').textContent = initialCards[i]['name'];
	list.append(item)
}

// Постановка и удаление Like на пост
likePost();
function likePost() {
	document.querySelectorAll('.elements__like-img').forEach(item => {
		item.addEventListener('click', event => {
			item.classList.toggle('elements__like-img_active')
		})
	})
}

// Забираем из текстовых полей значения названия и ссылку на картинку
popupEdit.addEventListener('submit', formSubmitEdit);
function formSubmitEdit(evt) {
	evt.preventDefault();
	const popupInputEdit = popupEdit.querySelectorAll('.popup__text');
	initialCards.push({'name': popupInputEdit[0].value, 'link': popupInputEdit[1].value});
	makeNewPost();
	showCloseForm(event);
	likePost()
	deletePost()
}

// Удаление поста
deletePost()
function deletePost() {
	document.querySelectorAll('.elements__delete').forEach(function (item, index) {
		item.addEventListener('click', event => {
		initialCards.splice(index, 1);
		item.parentNode.remove()
		})
	})
}

// Открытие popup с увеличенной картинкой поста
const popup = document.querySelector('.elements__popup-bg');
const townName = document.querySelectorAll('.elements__title');
document.querySelectorAll('.elements__img').forEach(function (item, index) {
	item.addEventListener('click', event => {
		popup.querySelector('.elements__popup-img').src = item.src;
		popup.querySelector('.elements__popup-img').alt = item.alt;
		popup.querySelector('.elements__popup-title').textContent = townName[index].textContent;
		popup.classList.add('elements__popup-bg_active')
	})
})

// Закрытие popup с увеличенной картинкой поста
document.querySelector('.elements__popup-exit').addEventListener('click', function() {
	popup.classList.remove('elements__popup-bg_active')
});