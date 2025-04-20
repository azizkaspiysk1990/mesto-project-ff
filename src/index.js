import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card";
import { openPopup, closePopup } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import { getUserInfo, getInitialCards, editUserProfile, addNewCard, updateAvatar } from "./components/api";

//Валидация

let userId;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

const profileImage = document.querySelector(".profile__image");
const addCardButton = document.querySelector(".profile__add-button");
const addCardForm = document.forms["new-place"];
const addCardPopup = document.querySelector(".popup_type_new-card");
const cardNameInput = addCardForm.elements["place-name"];
const cardLinkInput = addCardForm.elements["link"];
const imageTypePopup = document.querySelector(".popup_type_image");
const popupImage = imageTypePopup.querySelector(".popup__image");
const popupCaption = imageTypePopup.querySelector(".popup__caption");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileForm = document.forms["edit-profile"];
const profileJobInput = editProfileForm.elements["description"];
const profileNameInput = editProfileForm.elements["name"];
const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(".profile__description");
const editAvatarPopup = document.querySelector(".popup_type_edit_avatar");
const avatarInput = editAvatarPopup.querySelector(".popup__input_type_url");
const editAvatarForm = document.forms["avatar"];

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

//Загрузка профиля и карточек

Promise.all([
  getInitialCards(),
  getUserInfo()
])
.then(([cards, userData]) => {
  profileTitleElement.textContent = userData.name;
  profileDescriptionElement.textContent = userData.about;
  userId = userData._id;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;

  cards.forEach((element) => {
    const newCard = createCard(element, deleteCard, likeCard, openImage, userId);
    placesList.append(newCard) 
  });
}).catch((err) => {
  console.log("Ошибка при загрузке данных:", err);
});


// @todo: Открыть картинку

function openImage(element) {
  popupImage.src = element.link;
  popupImage.alt = element.name;
  popupCaption.textContent = element.name;
  openPopup(imageTypePopup);
}

//todo: Профиль и редактирование профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitleElement.textContent = profileNameInput.value;
  profileDescriptionElement.textContent = profileJobInput.value;

  closePopup(editProfilePopup);
  clearValidation(editProfileForm, validationConfig)
}

editProfileButton.addEventListener("click", () => {
  profileNameInput.value = profileTitleElement.textContent;
  profileJobInput.value = profileDescriptionElement.textContent;
  openPopup(editProfilePopup);
});

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

//todo: Добавление новой карточки

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

//todo: Редактирование аватара

function handleFormSubmitEditAvatar(evt) {
  evt.preventDefault();
   updateAvatar(avatarInput.value)
   .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(editAvatarPopup);
   })
   .catch((err) => {
    console.log("Ошибка при обновлении аватара:", err);
   })
   .finally(() => {
    clearValidation(editAvatarForm, validationConfig);
   })
}

function changeAvatar() {
  avatarInput.value = profileImage.style.backgroundImage;
  openPopup(editAvatarPopup);
  clearValidation(editAvatarForm, validationConfig)
};

profileImage.addEventListener("click", changeAvatar);
editAvatarForm.addEventListener("submit", handleFormSubmitEditAvatar);

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



