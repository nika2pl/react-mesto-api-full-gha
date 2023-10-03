import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [buttonText, setButtonText] = React.useState("Сохранить");

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');

    const currentUser = React.useContext(CurrentUserContext);

    function handleChangeName(e) { setName(e.target.value) }
    function handleChangeAbout(e) { setAbout(e.target.value) }

    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        setButtonText("Сохранение...");

        props.onUpdateUser({ name: name, about: about }, function () {
            setButtonText("Сохранить");
        });
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name="edit-profile"
            title="Редактировать профиль"
            submitText={buttonText}
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <label htmlFor="name" className="popup__label">
                <input type="text" value={name} onChange={handleChangeName} id="name" name="profile__name" className="popup__input popup__input_data_name" minLength="2"
                    maxLength="40" placeholder="Имя" required />
                <span className="popup__input-error name-error"></span>

            </label>

            <label htmlFor="position" className="popup__label">
                <input type="text" value={about} onChange={handleChangeAbout} id="position" name="profile__position" className="popup__input popup__input_data_position"
                    minLength="2" maxLength="200" placeholder="О себе" required />
                <span className="popup__input-error position-error"></span>

            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
