import React from "react";

import Card from "../components/Card.js";
import Footer from "../components/Footer";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onDeleteCard,
  onCardClick,
  currentUser,
  cards,
  onCardLike,
  onCardDelete,
}) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__data">
          <button
            className="profile__button-avatar"
            type="button"
            onClick={onEditAvatar}
          >
            <img
              className="profile__avatar"
              alt="фото"
              src={currentUser.avatar}
            />
          </button>
          <div className="profile__main">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edite"
              type="button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="button profile__add"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards">
        {cards.map((card) => {
          return (
            <Card
              card={card}
              key={card._id}
              deleteCard={onDeleteCard}
              onCardClick={onCardClick}
              currentUser={currentUser}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
      <Footer />
    </main>
  );
}

export default Main;
