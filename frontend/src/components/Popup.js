import React from "react";
import useEscClose from "../hooks/useEscClose.js";

function PopupWithForm({ namePopup, isOpen, onClose, children }) {
  useEscClose(isOpen, onClose);

  return (
    <div className={`popup popup_type_${namePopup} ${isOpen && "popup_opened"}`}>
      <div className={`popup__container`}>
        <button aria-label="Закрыть попап" type="button" className="popup__close-button" onClick={onClose}></button>
        {children}
      </div>
    </div>
  );
}

export default PopupWithForm;