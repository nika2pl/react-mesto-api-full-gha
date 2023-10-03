import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatar = React.useRef();
    const [buttonText, setButtonText] = React.useState("Сохранить");

    function handleSubmit(e) {
        e.preventDefault();

        setButtonText("Сохранение...");

        props.onUpdateAvatar({ avatar: avatar.current.value }, function () {
            avatar.current.value = '';
            setButtonText("Сохранить");
        });
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name="edit-avatar"
            title="Обновить аватар"
            submitText={buttonText}
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <label htmlFor="avatar-url" className="popup__label">
                <input type="url" ref={avatar} id="avatar-url" name="link" className="popup__input" placeholder="Ссылка на картинку" required />
                <span className="popup__input-error avatar-url-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;