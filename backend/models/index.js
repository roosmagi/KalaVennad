const UserModel = require('./user');
const FishModel = require('./fish');


const User = UserModel(sequelize);
const Fish = FishModel(sequelize);

User.hasMany(Fish, { foreignKey: 'user_id' });
Fish.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  User,
  Fish
};
