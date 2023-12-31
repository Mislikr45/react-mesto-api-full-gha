const Card = require('../models/card');

// 400
const BadRequestError = require('../errors/BadRequestError');
// 404
const NotFoundError = require('../errors/NotFoundError');
// 403
const AcessError = require('../errors/AcessError');

module.exports.getCards = (req, res, next) => {
  Card.find({}).then((cards) => res.send(cards)).catch((error) => next(error));
};

module.exports.createCard = (req, res, next) => {
  const id = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: id })
    .then((card) => res.status(201).send(card)) // ОК
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(
          new BadRequestError(
            'Переданы некорректные данные при создании карточки',
          ),
        );
      }
      return next(error);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError(
          ' Карточка с указанным _id не найдена',
        ));
      } return card;
    }).then((card) => {
      const id = req.user._id;
      if (String(card.owner) !== String(id)) {
        next(new AcessError(
          ' Нет прав для удаления карточки',
        ));
      } else {
        Card.findByIdAndRemove(cardId).then((cards) => { res.send({ data: cards }); })
          .catch((err) => { next(err); });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.addLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const id = req.user._id;
  return Card.findByIdAndUpdate(cardId, { $addToSet: { likes: id } }, {
    new: true,
    runValidators: true,
  })
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(
          'Передан несуществующий _id карточки',
        ));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const id = req.user._id;
  return Card.findByIdAndUpdate(cardId, { $pull: { likes: id } }, {
    new: true,
    runValidators: true,
  })
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(
          'Передан несуществующий _id карточки',
        ));
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданны некоректные данные по карточке'));
      } else {
        next(err);
      }
    });
};
