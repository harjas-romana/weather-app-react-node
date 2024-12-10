import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getSearchHistory } from '../services/api';

const SearchHistory = () => {
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const response = await getSearchHistory();
        setSearches(response.data);
      } catch (error) {
        alert('Failed to fetch search history');
      }
    };

    fetchSearchHistory();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Search History
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Temperature</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Search Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searches.map((search) => (
                <TableRow key={search.id}>
                  <TableCell>{search.username}</TableCell>
                  <TableCell>{search.city}</TableCell>
                  <TableCell>{search.temperature}°C</TableCell>
                  <TableCell>{search.description}</TableCell>
                  <TableCell>{new Date(search.search_time).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default SearchHistory;