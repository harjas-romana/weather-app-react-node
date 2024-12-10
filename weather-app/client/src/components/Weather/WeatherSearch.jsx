import { useState } from 'react';
import { weatherService } from '../../services/api';
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Alert,
} from '@mui/material';

export default function WeatherSearch() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await weatherService.getWeather(city);
      setWeather(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{ mt: 4, mb: 4 }}
      >
        <TextField
          fullWidth
          label="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ mb: 2 }}
        />
        
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search Weather'}
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {weather && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {weather.location.name}, {weather.location.country}
            </Typography>
            
            <Typography variant="h3" sx={{ mb: 2 }}>
              {weather.current.temperature}°C
            </Typography>
            
            <Typography variant="body1" gutterBottom>
              {weather.current.weather_descriptions[0]}
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              <Typography>Humidity: {weather.current.humidity}%</Typography>
              <Typography>Wind: {weather.current.wind_speed} km/h</Typography>
              <Typography>
                Feels like: {weather.current.feelslike}°C
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}