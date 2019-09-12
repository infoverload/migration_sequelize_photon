const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://user:password@localhost:5432/database');

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
