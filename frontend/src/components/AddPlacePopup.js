import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [buttonText, setButtonText] = React.useState("Сохранить");
    const name = React.useRef();
    const link = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        setButtonText("Сохранение...");

        props.onAddPlace({ name: name.current.value, link: link.current.value }, function () {
            name.current.value = '';
            link.current.value = '';

            setButtonText("Сохранить");
        });
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name="new-place"
            title="Новое место"
            submitText={buttonText}
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <label htmlFor="place_name" className="popup__label">
                <input type="text" ref={name} id="place_name" name="place_name" className="popup__input" minLength="2"
                    maxLength="40" placeholder="Название" required />
                <span className="popup__input-error name-error"></span>
            </label>

            <label htmlFor="place_link" className="popup__label">
                <input type="text" ref={link} id="place_link" name="place_link" className="popup__input"
                    minLength="2" maxLength="200" placeholder="Ссылка на изображение" required />
                <span className="popup__input-error position-error"></span>
            </label>

        </PopupWithForm>
    )
}

export default AddPlacePopup;