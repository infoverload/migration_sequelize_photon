import Sequelize from 'sequelize';

const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
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
