import React from "react";

function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  textButton,
  children,
  onSubmit  
}) {
  const popupClass = `popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`;

  return (
    <div className={popupClass}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          name={`popup__form__${name}`}
          className={`popup__form popup__form__${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`button popup__save popup__save_place_${name}`}
            type="submit"
            aria-label="Сохранить"
          >
            {textButton}
          </button>
        </form>
        <button
          className={`popup__close popup__close_place_${name}`}
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
