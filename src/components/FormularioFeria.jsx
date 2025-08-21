import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Slide,
  Paper
} from '@mui/material';
import { Close as CloseIcon, Add as AddIcon } from '@mui/icons-material';

export default function FormularioFeria({ onToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    diasFuncionamiento: '',
    ciudad: '',
    pais: 'Bolivia',
    descripcion: ''
  });

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = () => {
    console.log('Datos del formulario:', formData);
    // Aquí iría la lógica para agregar al mapa
    setIsOpen(false);
    if (onToggle) {
      onToggle(false);
    }
  };

  const toggleForm = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <>
      {/* Botón Toggle */}
      <IconButton
        onClick={toggleForm}
        className="formulario-toggle-btn"
        sx={{
          position: 'fixed',
          left: { xs: 'unset', md: isOpen ? '420px' : '20px' },
          right: { xs: '20px', md: 'unset' },
          top: { xs: '20px', md: '50%' },
          transform: { xs: 'none', md: 'translateY(-50%)' },
          zIndex: 1001,
          backgroundColor: '#512876',
          color: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          '&:hover': {
            backgroundColor: '#6B4C93',
            transform: { xs: 'scale(1.1)', md: 'translateY(-50%) scale(1.1)' },
          },
          transition: 'all 0.3s ease',
          width: { xs: 48, md: 56 },
          height: { xs: 48, md: 56 }
        }}
      >
        {isOpen ? <CloseIcon /> : <AddIcon />}
      </IconButton>

      {/* Panel del Formulario */}
      <Slide direction="right" in={isOpen} mountOnEnter unmountOnExit>
        <Paper
          className="formulario-feria"
          sx={{
            position: 'fixed',
            left: 0,
            top: 0,
            height: '100vh',
            width: { xs: '100%', md: '400px' },
            maxWidth: { xs: '100vw', md: '400px' },
            zIndex: 1000,
            backgroundColor: 'white',
            boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}
        >

          {/* Formulario */}
          <Box sx={{ padding: 3, flexGrow: 1 }}>
            <Typography variant="h6" sx={{ marginBottom: 3, color: '#512876', fontWeight: 'bold' }}>
              Ingresa datos de la feria
            </Typography>

            {/* Nombre */}
            <Box sx={{ marginBottom: 3 }}>
              <Typography variant="subtitle1" sx={{ marginBottom: 1, fontWeight: 'medium' }}>
                Nombre
              </Typography>
              <TextField
                fullWidth
                placeholder="16 de Julio"
                value={formData.nombre}
                onChange={handleInputChange('nombre')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#E0E0E0' },
                    '&:hover fieldset': { borderColor: '#512876' },
                    '&.Mui-focused fieldset': { borderColor: '#4A90E2' },
                  },
                }}
              />
            </Box>

            {/* Días de funcionamiento */}
            <Box sx={{ marginBottom: 3 }}>
              <Typography variant="subtitle1" sx={{ marginBottom: 1, fontWeight: 'medium' }}>
                Días de funcionamiento
              </Typography>
              <TextField
                fullWidth
                placeholder="Jueves y sábado"
                value={formData.diasFuncionamiento}
                onChange={handleInputChange('diasFuncionamiento')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#E0E0E0' },
                    '&:hover fieldset': { borderColor: '#512876' },
                    '&.Mui-focused fieldset': { borderColor: '#4A90E2' },
                  },
                }}
              />
            </Box>

            {/* Ciudad o localidad */}
            <Box sx={{ marginBottom: 3 }}>
              <Typography variant="subtitle1" sx={{ marginBottom: 1, fontWeight: 'medium' }}>
                Ciudad o localidad
              </Typography>
              <TextField
                fullWidth
                placeholder="El Alto"
                value={formData.ciudad}
                onChange={handleInputChange('ciudad')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#E0E0E0' },
                    '&:hover fieldset': { borderColor: '#512876' },
                    '&.Mui-focused fieldset': { borderColor: '#4A90E2' },
                  },
                }}
              />
            </Box>

            {/* Selecciona un país */}
            <Box sx={{ marginBottom: 3 }}>
              <Typography variant="subtitle1" sx={{ marginBottom: 1, fontWeight: 'medium' }}>
                Selecciona un país
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.pais}
                  onChange={handleInputChange('pais')}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E0E0E0' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#512876' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4A90E2' },
                  }}
                >
                  <MenuItem value="Bolivia">Bolivia</MenuItem>
                  <MenuItem value="Chile">Chile</MenuItem>
                  <MenuItem value="Perú">Perú</MenuItem>
                  <MenuItem value="Argentina">Argentina</MenuItem>
                  <MenuItem value="Colombia">Colombia</MenuItem>
                  <MenuItem value="Ecuador">Ecuador</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Descripción */}
            <Box sx={{ marginBottom: 4 }}>
              <Typography variant="subtitle1" sx={{ marginBottom: 1, fontWeight: 'medium' }}>
                Descripción
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="La feria 16 de julio se caracteriza..."
                value={formData.descripcion}
                onChange={handleInputChange('descripcion')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#E0E0E0' },
                    '&:hover fieldset': { borderColor: '#512876' },
                    '&.Mui-focused fieldset': { borderColor: '#4A90E2' },
                  },
                }}
              />
            </Box>

            {/* Botón Agregar */}
            <Button
              fullWidth
              onClick={handleSubmit}
              sx={{
                backgroundColor: '#512876',
                color: 'white',
                py: 1.5,
                borderRadius: 1,
                fontSize: '1rem',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#6B4C93',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(81, 40, 118, 0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Agregar al mapa →
            </Button>
          </Box>
        </Paper>
      </Slide>
    </>
  );
}