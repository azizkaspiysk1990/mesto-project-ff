// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
const createCard = (element, deleteCard) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    cardTitle.textContent = element.name;
    cardImage.src = element.link;
    cardImage.alt = element.name;
    
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    
    return cardElement;
}
// @todo: Функция удаления карточки
const deleteCard = (cardItem) => {
    if (cardItem) {
        cardItem.remove();
    }
}

// @todo: Вывести карточки на страницу

initialCards.forEach((element) => {
    const cardElement = createCard(element, deleteCard);
    placesList.append(cardElement)
});