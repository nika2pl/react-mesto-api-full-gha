import useEscClose from "../hooks/useEscClose.js";


function ImagePopup({ isOpen, card, onClose }) {
  useEscClose(isOpen, onClose);

  return (
    <section className={`popup popup_zoom ${isOpen ? "popup_opened" : ''}`}>
      <div className="popup__zoom-container">
        <button aria-label="Закрыть попап" type="button"
          className="popup__close-button popup__close-zoom-picture-button" onClick={onClose}></button>
        <img src={card.link} className="popup__image" alt={card.name} />
        <p className="popup__description">{card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;