import { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { FormControl, Select, MenuItem, Box, Typography } from '@mui/material';
import L from 'leaflet';

const CITIES = {
  'Todas': { center: [-17.5, -68.5], zoom: 5 },
  'El Alto': { center: [-16.495, -68.169], zoom: 10 },
  'Cochabamba': { center: [-17.404, -66.153], zoom: 10 },
  'Arica': { center: [-18.460, -70.287], zoom: 10 }
};

export default function CitySelector({ isFormOpen = false }) {
  const [selectedCity, setSelectedCity] = useState('Todas');
  const [isMobile, setIsMobile] = useState(false);
  const map = useMap();

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCityChange = (event) => {
    const cityName = event.target.value;
    setSelectedCity(cityName);

    if (CITIES[cityName] && map) {
      const { center, zoom } = CITIES[cityName];

      // Use native flyTo with optimized settings for smooth animation
      map.flyTo(center, zoom, {
        duration: 1.5,           // Faster animation
        easeLinearity: 0.15,     // Smoother easing
        noMoveStart: true        // Prevents interruptions
      });
    }
  };

  return (
    <Box
      className="city-selector-container"
      sx={{
        position: 'absolute',
        top: { xs: 20, md: 20 },
        bottom: { xs: 'unset', md: 'unset' },
        right: { xs: 20, md: 20 },
        left: { xs: 'unset', md: 'unset' },
        zIndex: 999,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 2,
        padding: { xs: 1, md: 2 },
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        minWidth: { xs: 160, md: 200 },
        display: isMobile && isFormOpen ? 'none' : 'block'
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          marginBottom: 1,
          color: '#512876',
          fontWeight: 'bold',
          fontSize: { xs: '0.75rem', md: '0.875rem' }
        }}
      >
        Seleccionar Ciudad
      </Typography>
      <FormControl fullWidth size={isMobile ? "small" : "small"}>
        <Select
          value={selectedCity}
          onChange={handleCityChange}
          sx={{
            fontSize: { xs: '0.75rem', md: '0.875rem' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#512876',
              },
              '&:hover fieldset': {
                borderColor: '#7ED321',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#4A90E2',
              },
            },
            '& .MuiSelect-select': {
              padding: { xs: '6px 8px', md: '8px 12px' }
            }
          }}
        >
          <MenuItem value="Todas" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
            🌍 Todas las ciudades
          </MenuItem>
          <MenuItem value="El Alto" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
            🏔️ El Alto (La Paz)
          </MenuItem>
          <MenuItem value="Cochabamba" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
            🌄 Cochabamba
          </MenuItem>
          <MenuItem value="Arica" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
            🌊 Arica (Chile)
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}