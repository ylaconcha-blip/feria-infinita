import { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';

const CITIES = {
  'Todas':       { center: [-17.5, -68.5], zoom: 5 },
  'El Alto':     { center: [-16.495, -68.169], zoom: 10 },
  'Cochabamba':  { center: [-17.404, -66.153], zoom: 10 },
  'Arica':       { center: [-18.460, -70.287], zoom: 10 }
};

export default function CitySelector({ isFormOpen = false }) {
  const [selectedCity, setSelectedCity] = useState('Todas');
  const [isMobile, setIsMobile] = useState(false);
  const map = useMap();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    if (CITIES[city] && map) {
      map.flyTo(CITIES[city].center, CITIES[city].zoom, {
        duration: 1.5, easeLinearity: 0.15, noMoveStart: true
      });
    }
  };

  if (isMobile && isFormOpen) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 20, right: 20,
      zIndex: 999,
      background: 'var(--panel)',
      border: '1px solid var(--borde-hover)',
      borderRadius: '3px',
      padding: '12px 14px',
      minWidth: '180px',
    }}>
      <div style={{
        fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--acento)', marginBottom: '10px',
      }}>
        Seleccionar ciudad
      </div>
      <select
        value={selectedCity}
        onChange={handleCityChange}
        style={{
          width: '100%',
          background: 'var(--panel2)',
          border: '1px solid var(--borde-hover)',
          color: 'var(--texto)',
          fontFamily: 'Space Mono, monospace',
          fontSize: '11px',
          padding: '7px 10px',
          borderRadius: '2px',
          cursor: 'pointer',
          outline: 'none',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7'%3E%3Cpath d='M0 0l5 7 5-7z' fill='%23C8F535'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 10px center',
          paddingRight: '28px',
        }}
      >
        {Object.keys(CITIES).map(city => (
          <option key={city} value={city} style={{ background: '#1C2114' }}>
            {city === 'Todas' ? 'Todas las ciudades' : city}
          </option>
        ))}
      </select>
    </div>
  );
}