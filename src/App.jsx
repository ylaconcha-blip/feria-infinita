import './App.css';
import Inicio from './components/Inicio';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#C8F535' },
      secondary: { main: '#1E90FF' },
      background: {
        default: '#0C0F08',
        paper: '#161A10',
      },
      text: {
        primary: '#EEF5D8',
        secondary: 'rgba(238,245,216,0.5)',
      },
    },
    typography: {
      fontFamily: ['Space Mono', 'monospace'].join(','),
      fontSize: 14,
      h1: { fontFamily: 'Bungee, sans-serif' },
      h2: { fontFamily: 'Bungee, sans-serif' },
      h6: { fontFamily: 'Bungee, sans-serif' },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Inicio />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;