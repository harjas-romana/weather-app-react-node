const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const weatherRoutes = require('./routes/weather');

// Load environment variables
dotenv.config();

// Debug log to verify environment variables are loaded
console.log('Environment check:', {
  port: process.env.PORT,
  hasApiKey: !!process.env.OPENWEATHER_API_KEY
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Add a root route for API health check
app.get('/', (req, res) => {
  res.json({ message: 'Weather API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Define port
const PORT = process.env.PORT || 8000;

// Sync database and start server
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Failed to sync database:', err));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
}); 