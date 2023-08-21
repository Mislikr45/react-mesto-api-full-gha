import React from "react";
import { useEffect, useState } from "react"; 


function Card({
  card,
  onCardClick,
  currentUser,
  onCardLike,
  onCardDelete,
}) {
  const isLiked = card.likes.some(i => i === currentUser._id);
  const [isActive, setIsActive] = React.useState(isLiked);
  // useEffect(() => {
  //   cardLikeButtonClassName}, []);
   
  const isOwn = card.owner === currentUser._id;
 
  // const cardLikeButtonClassName = `card-item__like isLiked ? "card-item__like_selected" : ' '`;
  console.log(isLiked)
  let car;
  console.log(isLiked, currentUser._id)
 function zalupa(isLiked) { if (isLiked) { car="666"; return car} else {car="666"; return car}

 }
  const cardLikeButtonClassName = `${
    isActive ? "card-item__like card-item__like_selected" : 'card-item__like'
  }`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
    setIsActive(!isActive)
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
