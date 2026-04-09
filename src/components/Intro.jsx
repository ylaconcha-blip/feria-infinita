import { useEffect, useState } from 'react';

export default function Intro({ onDismiss }) {
  const [visible, setVisible] = useState(true);

  const dismiss = () => {
    setVisible(false);
    setTimeout(onDismiss, 600);
  };

  useEffect(() => {
    const timer = setTimeout(dismiss, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      onClick={dismiss}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: '#0C0F08',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      <style>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes blink-b {
          0%,100% { border-color: #C8F535; color: #C8F535; }
          50% { border-color: rgba(200,245,53,0.2); color: rgba(200,245,53,0.3); }
        }
      `}</style>

      <svg
        style={{ position: 'absolute', opacity: 0.06, width: '55vmin', height: '55vmin', animation: 'spin-slow 45s linear infinite' }}
        viewBox="0 0 200 200" fill="none"
      >
        <path d="M100,100 m0,-80 a80,80 0 1,1 -0.001,0 m0,16 a64,64 0 1,1 -0.001,0 m0,16 a48,48 0 1,1 -0.001,0 m0,16 a32,32 0 1,1 -0.001,0 m0,16 a16,16 0 1,1 -0.001,0" stroke="#C8F535" strokeWidth="1.5"/>
      </svg>

      <div style={{
        fontFamily: 'Bungee, sans-serif',
        fontSize: 'clamp(44px, 9vw, 88px)',
        color: '#EEF5D8',
        lineHeight: 0.88,
        textAlign: 'center',
        position: 'relative',
      }}>
        <span style={{ fontSize: '0.48em', display: 'block', color: '#C8F535' }}>LA</span>
        FERIA
        <span style={{ color: '#C8F535', display: 'block' }}>INFINITA</span>
      </div>

      <p style={{
        fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase',
        color: 'rgba(238,245,216,0.32)', marginTop: '22px', position: 'relative',
      }}>
        Mapa Sonoro · Abya Yala · Ferias Libres
      </p>

      <div style={{
        marginTop: '44px', position: 'relative',
        fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase',
        color: '#C8F535', border: '1px solid #C8F535',
        padding: '10px 28px',
        animation: 'blink-b 2s ease-in-out infinite',
        fontFamily: 'Space Mono, monospace',
      }}>
        Click para explorar
      </div>
    </div>
  );
}