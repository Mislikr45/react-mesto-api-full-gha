import React from "react";

function ImagePopup({ card, onClose }) {
  const popupClass = `popup popup_type_img-zoom ${
    card.link ? "popup_opened" : ""
  }`;
  return (
    <div className={popupClass}>
      <div className="popup__img-zomm-container">
        <button
          className="popup__close popup__close_place_img-zoom"
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className="popup__img" />
        <p className="popup__tag">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
