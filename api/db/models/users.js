const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      emailAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true },

      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
    },
    { sequelize },
  );

  User.associate = (models) => {
    // TODO Add associations.
    User.hasMany(models.Course, {
      as: 'creator', // alias
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };

  return User;
};
