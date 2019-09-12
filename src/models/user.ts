const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
    });
    User.associate = models => {
      User.hasMany(models.Task, { onDelete: 'CASCADE' });
    };
    return User;
};

export default user;
