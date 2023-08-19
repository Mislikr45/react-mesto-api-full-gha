import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onUpdateCard, isLoading }) {
  const [card, setCard] = useState({});

  function handleChange(evt) {
    setCard({ ...card, [evt.target.name]: evt.target.value });
  }

  useEffect(() => {
    card.name = "";
    card.link = "";
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateCard(card);
  }

  return (
    <PopupWithForm
      name="card-form"
      title="Новое место"
      textButton={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_type_place"
        id="place"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={handleChange}
        value={card.name ?? ""}
      />
      <span className="place-error popup__input-error"></span>

      <input
        type="url"
        className="popup__input popup__input_type_link"
        id="link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChange}
        value={card.link ?? ""}
      />
      <span className="link-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
