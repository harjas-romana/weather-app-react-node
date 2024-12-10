const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WeatherSearch = sequelize.define('WeatherSearch', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  temperature: {
    type: DataTypes.FLOAT
  },
  description: {
    type: DataTypes.STRING
  },
  humidity: {
    type: DataTypes.INTEGER
  },
  windSpeed: {
    type: DataTypes.FLOAT
  },
  searchedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = WeatherSearch; 