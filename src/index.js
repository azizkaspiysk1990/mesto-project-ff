import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, deleteCard, likeCard} from './components/card';
import { openPopup, closePopup } from './components/modal';


// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу

initialCards.forEach((element) => {
    const cardElement = createCard(element, deleteCard, likeCard, openImage);
    placesList.append(cardElement)
});

// @todo: Открыть картинку

const imageTypePopup = document.querySelector('.popup_type_image');
const popupImage = imageTypePopup.querySelector('.popup__image');
const popupCaption = imageTypePopup.querySelector('.popup__caption');


function openImage(element) {
   popupImage.src = element.link;
   popupImage.alt = element.name;
   popupCaption.textContent = element.name;
   openPopup(imageTypePopup);
}

 //todo: Профиль и редактирование профиля

const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupFormEdit = document.forms['edit-profile'];
const jobInput = popupFormEdit.elements['description'];
const nameInput = popupFormEdit.elements['name'];
const profileTitle= document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopup(popupTypeEdit);
}

profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupTypeEdit);
})

popupFormEdit.addEventListener('submit', handleFormSubmit);

//todo: Добавление новой карточки

const newCardButton = document.querySelector('.profile__add-button');
const addCardForm = document.forms['new-place'];
const newCardPopup = document.querySelector('.popup_type_new-card');
const cardNameInput = addCardForm.elements['place-name'];
const cardLinkInput = addCardForm.elements['link'];


function handleAddNewCardSubmit(evt) {
    evt.preventDefault();

    const newCard = { name: cardNameInput.value, link: cardLinkInput.value};
    placesList.prepend(createCard(newCard, deleteCard, likeCard, openImage));
    addCardForm.reset();
    closePopup(newCardPopup);
};

   addCardForm.addEventListener('submit', handleAddNewCardSubmit);
   newCardButton.addEventListener('click', () => {
    openPopup(newCardPopup);
   });

//todo: Анимация модальных окон

function initAnimatedPopups() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        popup.classList.add('popup_is-animated')
    })
}
 
document.addEventListener('DOMContentLoaded', initAnimatedPopups);
