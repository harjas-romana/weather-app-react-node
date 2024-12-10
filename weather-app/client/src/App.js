import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Weather from './components/Weather/WeatherSearch';
import SearchHistory from './components/Weather/WeatherHistory';
import Navigation from './components/Navigation/Navbar';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/weather"
            element={
              <PrivateRoute>
                <Weather />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <SearchHistory />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/weather" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
