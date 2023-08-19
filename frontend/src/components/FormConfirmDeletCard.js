import React from "react";
import PopupWithForm from "./PopupWithForm";

function FormConfirmDeletCard({ isOpen, onClose }) {
  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}

export default FormConfirmDeletCard;
