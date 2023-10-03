import React from "react";
import Popup from "./Popup";

function InfoTooltip({ infoTooltipText, isOpen, onClose, isSuccess, picture}) {
    return (
        <Popup
            namePopup='tooltip'
            isOpen={isOpen}
            onClose={onClose}
        >
            <figure className="infoTooltip__figure">
                <img className="infoTooltip__img" src={picture} alt="Статус регистрации" />
                <figcaption className="infoTooltip__caption">
                    {infoTooltipText}
                </figcaption>
            </figure>
        </Popup>
    );
}

export default InfoTooltip;