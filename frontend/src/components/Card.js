import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({key, card, onCardClick, onCardLike, onDeleteCard}) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const isOwn = card.owner === currentUser._id;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onDeleteCard(card._id);
  }

  const isLiked = card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = (`gallery__like-button ${isLiked ? 'gallery__like_button_active' : ""}`)

  return (
    <>
      {isOwn && (<button aria-label="Удалить" type="button" className="gallery__delete-button" onClick={handleDeleteClick}></button>)}

      
      <img src={card.link} alt={card.name} className="gallery__image" onClick={handleClick} />
      <div className="gallery__wrapper">
        <h2 className="gallery__title">{card.name}</h2>
        <div className="gallery__like-area">
          <button aria-label="Мне нравится" type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="gallery__like-count">{card.likes.length}</span>
        </div>
      </div>
      </>
  )
}

export default Card;