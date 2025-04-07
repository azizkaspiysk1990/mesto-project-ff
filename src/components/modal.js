export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

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
