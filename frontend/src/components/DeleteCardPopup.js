import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup ({ isOpen, onClose, onCardDelete, card }) {
  function handleSubmit (evt) {
    evt.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name="confirm"
      isOpen={isOpen}
      onClose={onClose}
      title="Вы уверены?"
      buttonText="Да"
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  )
}

export default DeleteCardPopup;
