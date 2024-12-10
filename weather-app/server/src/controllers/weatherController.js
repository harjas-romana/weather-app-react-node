const WeatherSearch = require('../models/WeatherSearch');
const axios = require('axios');

exports.getWeather = async (req, res) => {
  try {
    const { city } = req.params;
    
    if (!city) {
      return res.status(400).json({
        message: 'City parameter is required'
      });
    }

    console.log('Attempting to fetch weather for:', city);
    console.log('Using API key:', process.env.OPENWEATHER_API_KEY);

    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric'
      }
    });

    console.log('OpenWeather API Response:', response.data);

    if (response.data.cod !== 200) {
      throw new Error(response.data.message || 'Weather API error');
    }

    // Save search to database
    const searchRecord = await WeatherSearch.create({
      userId: req.user.id,
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed
    });

    console.log('Search saved to database:', searchRecord);

    res.json(response.data);
  } catch (error) {
    console.error('Weather fetch error:', error.response?.data || error.message);
    
    if (error.response?.data?.message) {
      return res.status(error.response.status).json({
        message: error.response.data.message
      });
    }

    res.status(500).json({
      message: 'Failed to fetch weather data',
      error: error.message
    });
  }
};

exports.getSearchHistory = async (req, res) => {
  try {
    console.log('Fetching search history for user:', req.user.id);
    
    const searches = await WeatherSearch.findAll({
      where: { userId: req.user.id },
      order: [['searchedAt', 'DESC']]
    });

    console.log('Found searches:', searches.length);
    res.json(searches);
  } catch (error) {
    console.error('Search history error:', error);
    res.status(500).json({
      message: 'Failed to fetch search history',
      error: error.message
    });
  }
};