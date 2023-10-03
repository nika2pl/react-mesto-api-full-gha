import React from 'react'
import { useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import Header from "./Header.js";
import Main from "./Main.js";
import Login from './Login';
import Register from './Register';

import InfoTooltip from "./InfoTooltip";
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from "./ImagePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

import Api from '../utils/Api.js'
import ApiAuth from '../utils/ApiAuth.js'
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import successPic from "../images/auth-success.svg";
import errorPic from "../images/auth-error.svg";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-70',
  headers: {
    authorization: 'abd16267-99d7-4c32-91d5-36491ad6a75d',
    'Content-Type': 'application/json'
  }
});

const apiAuth = new ApiAuth({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpenClose] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpenClose] = React.useState(false);
  const [isAddCardPopupOpen, setAddCardPopupOpenClose] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isDeletePlacePopupOpen, setDeletePlacePopupOpen] = React.useState(false);
  const [isLoadingDeleteCard, setIsLoadingDeleteCard] = React.useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = React.useState(false);
  const [infoTooltipText, setinfoTooltipText] = React.useState(false);

  const [deleteCard, setDeleteCard] = React.useState('');
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({ _id: '', name: '', about: '', avatar: '' });

  const [userEmail, setUserEmail] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [cards, setCards] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()]).then(([cards, data]) => {
        setCurrentUser({ _id: data._id, name: data.name, about: data.about, avatar: data.avatar });
        setCards(cards);
      }).catch((err) => { console.log(`Ошибка: ${err}`) });
    }
  }, [isLoggedIn])

  function closeAllPopups() {
    setEditAvatarPopupOpenClose(false);
    setIsEditProfilePopupOpenClose(false);
    setAddCardPopupOpenClose(false);
    setImagePopupOpen(false);
    setDeletePlacePopupOpen(false);
    setDeleteCard('');
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateAvatar(data, cb) {
    api.changeAvatar(data).then((data) => {
      setCurrentUser({ _id: data._id, avatar: data.avatar, name: data.name, about: data.about });
      closeAllPopups();
    }).catch((err) => console.log(err)).finally(() => cb());
  }

  function handleUpdateUser(data, cb) {
    api.setUserInfo(data).then((data) => {
      setCurrentUser({ _id: data._id, avatar: data.avatar, name: data.name, about: data.about });
      closeAllPopups();
    }).catch((err) => console.log(err)).finally(() => cb());
  }

  function handleAddPlace(data, cb) {
    api.addCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => console.log(err)).finally(() => cb());
  }

  function handleImagePopupOpen(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) =>
        state.map((c) => c._id === card._id ? newCard : c)
      );
    }).catch((err) => console.log('Ошибка: ' + err))
  }

  function handleCardDeleteClick(cardId) {
    setDeleteCard(cardId);
    setDeletePlacePopupOpen(true);
  }

  function handleCardDelete(e) {
    setIsLoadingDeleteCard(true);

    api.deleteCard(deleteCard).then((newCard) => {
      setDeletePlacePopupOpen(false);

      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== deleteCard && currentCard)
      )
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setIsLoadingDeleteCard(false);
    });
  }

  function handleSignUp(email, password) {
    apiAuth.signUp({ password, email })
      .then((res) => {
        if (res) {
          setIsInfoTooltipOpen(true);
          setIsInfoTooltipSuccess(true);
          setinfoTooltipText('Регистрация прошла успешно.');

          navigate('/sign-in');
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsInfoTooltipSuccess(false);

        if (err === 400) {
          setinfoTooltipText('Некорректно заполнено одно из полей.')
        } else {
          setinfoTooltipText(`Что-то пошло не так!\nПопробуйте ещё раз..`);
        }
      });
  }

  function handleSignIn(email, password) {
    apiAuth.signIn({ email, password })
      .then((res) => {
        if (res.token) {
          console.log(res, email);
          setUserEmail(email);
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);

          navigate('/');
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsInfoTooltipSuccess(false);
        if (err === 401) {
          setinfoTooltipText('Неправильный email или пароль.')
        } {
          setinfoTooltipText(`Что-то пошло не так!\nПопробуйте ещё раз..`);
        }
      });
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setUserEmail('');

    navigate('/sign-in');
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      apiAuth.checkToken(jwt).then((res) => {
        if (res) {
          setUserEmail(res.data.email);
          setIsLoggedIn(true);

          navigate('/', { replace: true });
        }
      }).catch((err) => {
        console.log(err)
      });
    }
  }, []);


  function handleEditAvatarClick() {
    setEditAvatarPopupOpenClose(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpenClose(true);
  }

  function handleAddPlaceClick() {
    setAddCardPopupOpenClose(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Header
        email={userEmail}
        handleLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/sign-up"
          element={<Register onSubmit={handleSignUp} />}
        />
        <Route
          path="/sign-in"
          element={<Login onSubmit={handleSignIn} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={Main}
              isLoggedIn={isLoggedIn}
              cards={cards}
              currentUser={currentUser}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleImagePopupOpen}
              onCardLike={handleCardLike}
              onDeleteCard={handleCardDeleteClick}
            />
          }
        />
        <Route
          path="*"
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />
          }
        />
      </Routes>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddCardPopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />
      <ConfirmDeletePopup
        isOpen={isDeletePlacePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
        isLoadingDeleteCard={isLoadingDeleteCard}
      />
      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
      <InfoTooltip
        infoTooltipText={infoTooltipText}
        onClose={closeAllPopups}
        isOpen={isInfoTooltipOpen}
        isSuccess={isInfoTooltipSuccess}
        picture={isInfoTooltipSuccess ? successPic : errorPic}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
