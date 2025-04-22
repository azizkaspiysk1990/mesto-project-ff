import { createCardLike, unlikeCard, removeCard } from "./api";

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки

const createCard = (element, deleteCard, likeCard, openImage, userId) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  cardImage.addEventListener("click", () => openImage(element));

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (element.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () =>
      deleteCard(element._id, cardElement)
    );
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".card__like-count");
  const isLiked = element.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardLikeCount.textContent = element.likes.length;
  likeButton.addEventListener("click", () =>
    likeCard(likeButton, element._id, cardLikeCount)
  );

  return cardElement;
};

// @todo: Функция удаления карточки
const deleteCard = (cardId, cardElement) => {
  removeCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log("Ошибка при удалении карточки:", err);
    });
};

// @todo: Функция обрабатывающая события лайка

function likeCard(likeButton, cardId, cardLikeCount) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const toggleLikeRequest = isLiked ? unlikeCard : createCardLike;
  toggleLikeRequest(cardId)
    .then((data) => {
      likeButton.classList.toggle("card__like-button_is-active");
      cardLikeCount.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log("Ошибка при лайке/дизлайке карточки:", err);
    });
}

export { createCard, deleteCard, likeCard };
