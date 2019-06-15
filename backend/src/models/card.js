const CardModel = (sequelize, type) => {
  return sequelize.define('card', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: type.STRING,
    },
    text: {
      type: type.STRING,
    },
  });
};

export default CardModel;
