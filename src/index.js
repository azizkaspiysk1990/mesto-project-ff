import "./pages/index.css";
import { initialCards } from "./components/cards";
import { createCard, deleteCard, likeCard } from "./components/card";
import { openPopup, closePopup } from "./components/modal";

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу

initialCards.forEach((element) => {
  const cardElement = createCard(element, deleteCard, likeCard, openImage);
  placesList.append(cardElement);
});

// @todo: Открыть картинку

const imageTypePopup = document.querySelector(".popup_type_image");
const popupImage = imageTypePopup.querySelector(".popup__image");
const popupCaption = imageTypePopup.querySelector(".popup__caption");

function openImage(element) {
  popupImage.src = element.link;
  popupImage.alt = element.name;
  popupCaption.textContent = element.name;
  openPopup(imageTypePopup);
}

//todo: Профиль и редактирование профиля

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileForm = document.forms["edit-profile"];
const profileJobInput = editProfileForm.elements["description"];
const profileNameInput = editProfileForm.elements["name"];
const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitleElement.textContent = profileNameInput.value;
  profileDescriptionElement.textContent = profileJobInput.value;

  closePopup(editProfilePopup);
}

editProfileButton.addEventListener("click", () => {
  profileNameInput.value = profileTitleElement.textContent;
  profileJobInput.value = profileDescriptionElement.textContent;
  openPopup(editProfilePopup);
});

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

//todo: Добавление новой карточки

const addCardButton = document.querySelector(".profile__add-button");
const addCardForm = document.forms["new-place"];
const addCardPopup = document.querySelector(".popup_type_new-card");
const cardNameInput = addCardForm.elements["place-name"];
const cardLinkInput = addCardForm.elements["link"];

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCard = { name: cardNameInput.value, link: cardLinkInput.value };
  placesList.prepend(createCard(newCard, deleteCard, likeCard, openImage));
  addCardForm.reset();
  closePopup(addCardPopup);
}

addCardForm.addEventListener("submit", handleAddCardSubmit);
addCardButton.addEventListener("click", () => {
  openPopup(addCardPopup);
});

//todo: Закрыть попапы через крестик и overlay, подключить анимацию

const popups = document.querySelectorAll(".popup");

function initAnimatedPopups() {
  popups.forEach((popup) => {
    popup.classList.add("popup_is-animated");
  });
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }

    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

document.addEventListener("DOMContentLoaded", initAnimatedPopups);
