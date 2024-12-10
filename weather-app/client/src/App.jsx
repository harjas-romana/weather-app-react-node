import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/Navigation/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import WeatherSearch from './components/Weather/WeatherSearch';
import WeatherHistory from './components/Weather/WeatherHistory';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return null;
  }
  
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/weather" 
              element={
                <PrivateRoute>
                  <WeatherSearch />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/history" 
              element={
                <PrivateRoute>
                  <WeatherHistory />
                </PrivateRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/weather" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App; 