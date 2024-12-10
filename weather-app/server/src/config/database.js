const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
  dialect: 'postgres',
  logging: console.log
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connection established successfully');
    console.log('Connection string:', process.env.DB_CONNECTION_STRING);
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
  });

module.exports = sequelize; 