import React from "react";
import Card from './Card';
import Footer from './Footer';

const Main = ({
  currentUser,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardLike,
  onCardClick,
  onDeleteCard
}) => {

  return (
    <main className="main">
      <section className="profile">
        <button className="profile__avatar-edit-button" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
        </button>

        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <section className="gallery">
        <ul className="gallery__list">
          {cards.map(card =>
          <li key={card._id} className="gallery__card">
            <Card
              card={card} 
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onDeleteCard={onDeleteCard}
            />
            </li>
          )}
        </ul>
      </section>
      <Footer />
    </main>
  );
}


export default Main;
