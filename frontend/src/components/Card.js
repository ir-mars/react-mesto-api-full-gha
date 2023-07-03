import React from 'react';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card ({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((item) => item._id === currentUser._id);

  function handleClick () {
    onCardClick(card);
  }

  function handleDeleteClick () {
    onCardDelete(card);
  }

  function handleLikeClick () {
    onCardLike(card, isLiked);
  }

  return (
    <article className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {isOwn && <button className="card__delete-button" type="button" onClick={handleDeleteClick} />}
      <div className="card__container">
        <h2 className="card__title">{card.name} </h2>
        <div className="card__like-container">
          <button
            className={`card__like-button ${isLiked ? "card__like-button_active" : ""}`}
            type="button"
            onClick={handleLikeClick}
          />
          <p className="card__like-counter">{card.likes.length} </p>
        </div>
      </div>
    </article>
  )
}

export default Card;
