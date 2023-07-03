import React from 'react';

function ImagePopup ({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card ? "popup_is-opened" : ""}`}>
      <div className="popup__img-container">
        <button className="popup__close-btn" type="button" onClick={onClose}></button>
        <figure className="popup__figure-container">
          <img src={card?.link} alt={card?.name} className="popup__big-img" />
          <figcaption className="popup__caption">{card?.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;