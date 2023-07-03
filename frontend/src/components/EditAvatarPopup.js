import React, { useEffect } from 'react';
import { useRef } from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar, isRequesting }) {
  const avatarRef = useRef();

  function handleSubmit (evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  useEffect(() => {
    avatarRef.current.value = ""
  }, [isOpen])

  return (
    <PopupWithForm
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      title="Обновить аватар"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isRequesting={isRequesting}
    >
      <input
        type="url"
        id="avatar-url"
        name="avatar"
        className="popup__input popup__input_type_url"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
      />
      <span id="avatar-url-error" className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
