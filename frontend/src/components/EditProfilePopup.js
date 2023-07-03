import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';

function EditProfilePopup ({ isOpen, onClose, onUpdateUser, isRequesting }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  function handleChangeName (evt) {
    setName(evt.target.value);
  }

  function handleChangeAbout (evt) {
    setAbout(evt.target.value);
  }

  function handleSubmit (evt) {
    evt.preventDefault();
    onUpdateUser({ name, about })
  }

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isRequesting={isRequesting}
    >
      <input
        type="text"
        id="name"
        name="name"
        className="popup__input popup__input_type_name"
        placeholder="Ваше имя"
        required
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleChangeName}
      />
      <span id="name-error" className="popup__input-error"></span>
      <input
        type="text"
        id="description"
        name="about"
        className="popup__input popup__input_type_description"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={about || ""}
        onChange={handleChangeAbout}
      />
      <span id="description-error" className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
