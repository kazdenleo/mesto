import { initialCards } from '../js/components.js';
export class Card {
	constructor(item) {
		this._title = item.name;
		this._image = item.link;
	}

	_getElement() {
		const cardElement = document
		.querySelector('#template')
		.content
		.querySelector('.elements__item')
		.cloneNode(true);
		
	  return cardElement;
	}

	_openPopup() {
        const popupImg = document.querySelector('.elements__popup-bg');
		popupImg.querySelector('.elements__popup-img').src = this._image;
		popupImg.querySelector('.elements__popup-img').alt = this._title;
		popupImg.querySelector('.elements__popup-title').textContent = this._title;
		popupImg.classList.add('elements__popup-bg_active')
	}

	_setEventListeners() {
		this._element.querySelector('.elements__img').addEventListener('click', () => {
			this._openPopup();
		})
		this._element.querySelectorAll('.elements__delete').forEach(function (item, index) {
			item.addEventListener('click', event => {
			initialCards.splice(index, 1);
			item.parentNode.remove()
			})
		});	
		const exitButton = document.querySelector('.elements__popup-exit');
		exitButton.addEventListener('click', event => {
            this._closePopup();
		});
		this._element.querySelector('.elements__like-img').addEventListener('click', event => {
			this._setLike();
		})
	};

    _closePopup() {
        document.querySelector('.elements__popup-bg').classList.remove('elements__popup-bg_active')
    }

    _setLike() {
        this._element.querySelector('.elements__like-img').classList.toggle('elements__like-img_active')
    };

	generate() {
		this._element = this._getElement();
		this._setEventListeners();
		this._element.querySelector('.elements__img').src = this._image;
		this._element.querySelector('.elements__img').alt = this._title;
		this._element.querySelector('.elements__title').textContent = this._title;
	
		  return this._element;
	}
}