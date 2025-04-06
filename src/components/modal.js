export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
    if(evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup)
    }
}

//todo: Закрыть попапы через крестик и overlay
document.addEventListener('click', (evt) => {
        
    if (evt.target.closest('.popup__close')) {
        const popup = evt.target.closest('.popup');
        if (popup) closePopup(popup);
    }
    
    
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
});


