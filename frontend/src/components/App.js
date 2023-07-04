import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { addCard, setAvatar, sendUserInfo, setLike, deleteCard, getInitialCards, getUserInfo } from '../utils/api';

import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';

import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import imgSuccess from '../images/success.svg';
import imgFail from '../images/fail.svg';

function App () {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState({});
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  const [status, setStatus] = useState({ img: '', text: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);
  const [authUserEmail, setAuthUserEmail] = useState('');
  const navigate = useNavigate();

  function setErrorStatus (err) {
    setStatus({
      img: imgFail,
      text: 'Что-то пошло не так! Попробуйте еще раз.'
    })
    setIsToolTipOpen(true)
    console.error(err)
  }
  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick (card) {
    setSelectedCard(card);
    //console.log(card)
  };

  function handleDeleteClick (card) {
    setIsDeleteCardPopupOpen(true)
    setCardToDelete(card);
  };

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(null);
    setIsToolTipOpen(false);
  };

  function handleCardLike (card, value) {
    setLike(card._id, value)
      .then((newCard) => {
        setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
      })
      .catch((err) => {
        setErrorStatus(err);
      })
  }

  function handleCardDelete (card) {
    deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        setErrorStatus(err)
      })
  }

  function handleUpdateUser ({ name, about }) {
    setIsRequesting(true)
    sendUserInfo({ name, about })
      .then(({ name, about, avatar, _id }) => {
        setCurrentUser({ name, about, avatar, _id })
        closeAllPopups();
      })
      .catch((err) => {
        setErrorStatus(err)
      })
      .finally(() => setIsRequesting(false))
  }

  function handleUpdateAvatar ({ avatar }) {
    setIsRequesting(true)
    setAvatar({ avatar })
      .then(({ avatar }) => {
        setCurrentUser({ ...currentUser, avatar });
        closeAllPopups();
      })
      .catch((err) => {
        setErrorStatus(err)
      })
      .finally(() => setIsRequesting(false))
  }

  function handleAddPlaceSubmit ({ name, link }) {
    setIsRequesting(true)
    addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        setErrorStatus(err)
      })
      .finally(() => setIsRequesting(false))
  }

  useEffect(() => {
    loggedIn &&
      Promise.all([getUserInfo(), getInitialCards()])
        .then(([{ name, about, avatar, _id }, cardsData = []]) => {
          setCurrentUser({ name, about, avatar, _id });
          setCards(cardsData.reverse()) /*console.log(cardsData)*/
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => setIsLoading(false))

  }, [loggedIn]);

  function handleRegister (email, password) {
    auth.register(email, password)
      .then((res) => {
        setStatus({
          img: imgSuccess,
          text: 'Вы успешно зарегистрировались!'
        })
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setStatus({
          img: imgFail,
          text: 'Что-то пошло не так! Попробуйте еще раз.'
        })
        console.log(err);
      })
      .finally(() => {
        setIsToolTipOpen(true)
      })
  }

  function handleLogin (email, password) {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          setAuthUserEmail(email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setStatus({
          img: imgFail,
          text: 'Что-то пошло не так! Попробуйте еще раз.'
        })
        setIsToolTipOpen(true)
        console.log(err)
      })
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then(({ email }) => {
          setAuthUserEmail(email);
          setLoggedIn(true);
          navigate("/", { replace: true })
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, []);

  function signOut () {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }
  if (isLoading) return (<InfoToolTip
    isOpen={true}
    text="загружаем карточки и данные пользователя :)"
    img={imgSuccess}
  />)
  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/"
            element={<ProtectedRoute
              element={Main}
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
              loggedIn={loggedIn}
              email={authUserEmail}
              signOut={signOut}
            />}
          />
          <Route path="/sign-in"
            element={<Login handleLoginSubmit={handleLogin} />} />
          <Route path="/sign-up"
            element={<Register handleRegisterSubmit={handleRegister} />} />
        </Routes>
        <Footer />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          runOnFirstLaunch={false}
          isRequesting={isRequesting}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          runOnFirstLaunch={true}
          isRequesting={isRequesting}

        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          runOnFirstLaunch={true}
          isRequesting={isRequesting}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          card={cardToDelete}
          onCardDelete={handleCardDelete}
          runOnFirstLaunch={false}
          isRequesting={isRequesting}
        />

        <InfoToolTip
          isOpen={isToolTipOpen}
          onClose={closeAllPopups}
          text={status.text}
          img={status.img}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
