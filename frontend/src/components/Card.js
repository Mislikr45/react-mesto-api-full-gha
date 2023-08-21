import React from "react";

function Card({
  card,
  onCardClick,
  currentUser,
  onCardLike,
  onCardDelete,
  like
}) {
  const isOwn = card.owner === currentUser._id;
  // const isLiked = card.likes.some(i => i === currentUser._id);
  // console.log(isLiked, currentUser._id)
  const cardLikeButtonClassName = `card-item__like ${
    like ? "card-item__like_selected" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteCard() {
    onCardDelete(card);
  }

  return (
    <div className="card-item">
      {isOwn && (
        <button className="card-item__trash" onClick={handleDeleteCard} />
      )}
      <img
        alt={card.about}
        src={card.link}
        className="card-item__image"
        onClick={handleClick}
      />
      <div className="card-item__data">
        <h2 className="card-item__title">{card.name}</h2>
        <div className="card-item__like-container">
          <button
            className={cardLikeButtonClassName} 
            type="button"
            aria-label="Лайк"
            onClick={handleLikeClick}
          ></button>
          <p className="card-item__like-amount">{`${card.likes.length}`}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
