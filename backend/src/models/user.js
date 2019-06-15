const UserModel = (sequelize, type) => {
  return sequelize.define('user', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: type.STRING,
      unique: true,
    },
    hash: {
      type: type.STRING,
    },
  });
};

export default UserModel;
