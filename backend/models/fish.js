const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const Fish = sequelize.define('Fish', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    place: {
      type: DataTypes.STRING,
      allowNull: true
    },
    c_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'fishes',
    timestamps: false
  });

module.exports = Fish;