import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import { WbSunny, History, Search, Login, PersonAdd, Logout } from '@mui/icons-material';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95 
    }
  };

  return (
    <AppBar 
      position="static" 
      sx={{
        background: 'linear-gradient(to right, #000000, #1a1a1a)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ py: 1.5 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer' 
              }}
              onClick={() => navigate('/')}
            >
              <WbSunny 
                sx={{ 
                  mr: 2, 
                  fontSize: '2rem',
                  color: '#ffffff' 
                }} 
              />
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  flexGrow: 1,
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  color: '#ffffff',
                  letterSpacing: '0.05em'
                }}
              >
                Weather App
              </Typography>
            </Box>
          </motion.div>

          <Box sx={{ flexGrow: 1 }} />
          
          {user ? (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button 
                  color="inherit"
                  onClick={() => navigate('/weather')}
                  startIcon={<Search />}
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#f5f5dc',
                    fontSize: '1rem',
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      background: 'rgba(245, 245, 220, 0.1)'
                    }
                  }}
                >
                  Search
                </Button>
              </motion.div>

              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button 
                  color="inherit"
                  onClick={() => navigate('/history')}
                  startIcon={<History />}
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#f5f5dc',
                    fontSize: '1rem',
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      background: 'rgba(245, 245, 220, 0.1)'
                    }
                  }}
                >
                  History
                </Button>
              </motion.div>

              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button 
                  color="inherit"
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  startIcon={<Logout />}
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#f5f5dc',
                    fontSize: '1rem',
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      background: 'rgba(245, 245, 220, 0.1)'
                    }
                  }}
                >
                  Logout
                </Button>
              </motion.div>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button 
                  color="inherit"
                  onClick={() => navigate('/login')}
                  startIcon={<Login />}
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#f5f5dc',
                    fontSize: '1rem',
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      background: 'rgba(245, 245, 220, 0.1)'
                    }
                  }}
                >
                  Login
                </Button>
              </motion.div>

              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button 
                  color="inherit"
                  onClick={() => navigate('/register')}
                  startIcon={<PersonAdd />}
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#f5f5dc',
                    fontSize: '1rem',
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      background: 'rgba(245, 245, 220, 0.1)'
                    }
                  }}
                >
                  Register
                </Button>
              </motion.div>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
} 