import { useState, useEffect } from 'react';
import { weatherService } from '../../services/api';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
  Box
} from '@mui/material';
import { motion } from 'framer-motion';

export default function WeatherHistory() {
  const [searches, setSearches] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const styles = {
    headerContainer: {
      background: 'linear-gradient(to right, #000000, #1a1a1a)',
      padding: '2rem',
      borderRadius: '10px',
      marginBottom: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontFamily: 'Poppins, sans-serif',
      color: '#ffffff',
      fontSize: '2.5rem',
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
    },
    tableContainer: {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    },
    tableHeader: {
      background: '#000000',
      '& th': {
        color: '#ffffff',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
        fontSize: '1.1rem',
      },
    },
    tableRow: {
      '&:nth-of-type(odd)': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
      },
      '& td': {
        fontFamily: 'Lora, serif',
        color: '#ffffff',
      },
    },
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        console.log('Fetching search history...');
        const response = await weatherService.getSearchHistory();
        console.log('History response:', response.data);
        setSearches(response.data);
      } catch (err) {
        console.error('History error:', err);
        setError(
          err.response?.data?.message || 
          'Failed to fetch search history'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
          {process.env.NODE_ENV === 'development' && (
            <pre style={{ whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(error, null, 2)}
            </pre>
          )}
        </Alert>
      </Container>
    );
  }

  if (searches.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h6" textAlign="center">
          No search history found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }} style={{background:'#0000000'}}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={styles.headerContainer}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="h2" sx={styles.title}>
              Search History
            </Typography>
          </motion.div>
        </Box>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <TableContainer component={Paper} sx={styles.tableContainer}>
            <Table>
              <TableHead>
                <TableRow sx={styles.tableHeader}>
                  <TableCell>Location</TableCell>
                  <TableCell>Temperature</TableCell>
                  <TableCell>Conditions</TableCell>
                  <TableCell>Humidity</TableCell>
                  <TableCell>Wind Speed</TableCell>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Feels Like</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searches.map((search) => (
                  <motion.tr
                    key={search.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(26, 26, 26, 0.1)' }}
                    component={TableRow}
                    sx={styles.tableRow}
                  >
                    <TableCell>{search.city}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {search.temperature}°C
                      </Box>
                    </TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>{search.description}</TableCell>
                    <TableCell>{search.humidity}%</TableCell>
                    <TableCell>{search.windSpeed} m/s</TableCell>
                    <TableCell>
                      {new Date(search.searchedAt).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </TableCell>
                    <TableCell>{search.feelsLike}°C</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </motion.div>
      </motion.div>
    </Container>
  );
} 