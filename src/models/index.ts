const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://prisma:prisma@localhost:5432/prisma');

const models = {
  User: sequelize.import('./user'),
  Task: sequelize.import('./task'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;
