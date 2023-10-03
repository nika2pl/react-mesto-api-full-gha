import React from "react";
import useEscClose from "../hooks/useEscClose.js";

function PopupWithForm({ isOpen, onClose, onSubmit, name, title, submitText, children, isLoadingDeleteCard, loadingText }) {
  useEscClose(isOpen, onClose);

  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className={`popup__container`}>

        <button aria-label="Закрыть попап" type="button" className="popup__close-button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>

        <form className="popup__form" name={`popup__${name}-form`} onSubmit={onSubmit} >
          {children}
          <button type="submit" className="popup__button">{isLoadingDeleteCard ? loadingText : submitText}</button>
        </form>

      </div>
    </div>
  );
}

export default PopupWithForm;