import { useState } from 'react';
import Intro from './Intro';
import Mapa from './Mapa';
import Proyecto from './Proyecto';
import { Routes, Route, useLocation } from 'react-router';
import Header from './Header';

export default function Inicio() {
  const location = useLocation();
  const isMapRoute = location.pathname === '/' || location.pathname === '/feria-infinita/';
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>

      {showIntro && <Intro onDismiss={() => setShowIntro(false)} />}

      <Header />

      <main style={{
        flex: 1,
        position: 'relative',
        overflow: isMapRoute ? 'hidden' : 'auto',
        height: isMapRoute ? 'calc(100vh - 52px - 64px)' : 'auto',
      }}>
        <Routes>
          <Route path="/" element={<Mapa />} />
          <Route path="/proyecto" element={<Proyecto />} />
        </Routes>
      </main>

      {isMapRoute && (
        <footer style={{
          width: '100%',
          height: '64px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          background: 'white',
          borderTop: '1px solid rgba(0,0,0,0.1)',
          flexShrink: 0,
        }}>
          <img src="/feria-infinita/logo_outro.png" alt="Logo Outro"
            style={{ height: '36px', objectFit: 'contain' }} />
          <img src="/feria-infinita/logo_lab.png" alt="Logo Lab"
            style={{ height: '36px', objectFit: 'contain' }} />
        </footer>
      )}
    </div>
  );
}