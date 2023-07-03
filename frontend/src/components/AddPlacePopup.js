import React from 'react';
import { useState, useEffect } from 'react';

import PopupWithForm from './PopupWithForm';

function AddPlacePopup ({ isOpen, onClose, onAddPlace, isRequesting }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  function handleChangeTitle (evt) {
    setTitle(evt.target.value)
  }

  function handleChangeLink (evt) {
    setLink(evt.target.value)
  }

  function handleSubmit (evt) {
    evt.preventDefault();
    onAddPlace({ name: title, link })
  }

  useEffect(() => {
    if (isOpen) {
      setTitle("")
      setLink("")
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      isOpen={isOpen}
      onClose={onClose}
      title="Новое место"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isRequesting={isRequesting}
    >
      <input
        type="text"
        id="img-name"
        name="name"
        className="popup__input popup__input_type_img-name"
        placeholder="Название места"
        required
        minLength="2"
        maxLength="30"
        value={title || ""}
        onChange={handleChangeTitle}
      />
      <span id="img-name-error" className="popup__input-error"></span>
      <input
        type="url"
        id="img-link"
        name="link"
        className="popup__input popup__input_type_img-link"
        placeholder="Ссылка на изображение"
        required
        value={link || ""}
        onChange={handleChangeLink}
      />
      <span id="img-link-error" className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
