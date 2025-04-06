// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
const createCard = (element, deleteCard, likeCard, openImage) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  deleteButton.addEventListener("click", () => deleteCard(cardElement));
  likeButton.addEventListener("click", likeCard);
  cardImage.addEventListener("click", () => openImage(element));

  return cardElement;
};

// @todo: Функция удаления карточки
const deleteCard = (cardItem) => {
  if (cardItem) {
    cardItem.remove();
  }
};

// @todo: Функция обрабатывающая события лайка

function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export { createCard, deleteCard, likeCard };
