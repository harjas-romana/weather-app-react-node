const express = require('express');
const router = express.Router();
const axios = require('axios');
const pool = require('../config/db');
const authenticateToken = require('../middleware/auth');

// Get weather for a city
router.get('/:city', authenticateToken, async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_API_KEY}`
    );

    const weatherData = {
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
    };

    // Save search to database
    await pool.query(
      'INSERT INTO weather_searches (user_id, city, temperature, description) VALUES (?, ?, ?, ?)',
      [req.user.userId, city, weatherData.temperature, weatherData.description]
    );

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get search history
router.get('/history/all', authenticateToken, async (req, res) => {
  try {
    const [searches] = await pool.query(
      `SELECT ws.*, u.username 
       FROM weather_searches ws 
       JOIN users u ON ws.user_id = u.id 
       ORDER BY ws.search_time DESC`
    );
    res.json(searches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 