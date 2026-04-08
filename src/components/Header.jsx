import { useState } from 'react';
import { NavLink } from 'react-router';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1100,
      height: '52px',
      background: 'var(--fondo)',
      borderBottom: '1px solid var(--borde-hover)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px',
    }}>
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <div style={{
          fontFamily: 'Bungee, sans-serif',
          fontSize: '15px', letterSpacing: '0.08em',
          color: 'var(--texto)',
        }}>
          LA <span style={{ color: 'var(--acento)' }}>FERIA</span> INFINITA
        </div>
      </NavLink>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--texto-muted)',
        }}>
          Mapa Sonoro · Abya Yala
        </div>

        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <div style={{
            fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--texto-muted)', padding: '5px 10px', cursor: 'pointer',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--texto)'}
            onMouseLeave={e => e.target.style.color = 'var(--texto-muted)'}
          >
            Mapa
          </div>
        </NavLink>

        <NavLink to="/proyecto" style={{ textDecoration: 'none' }}>
          <div style={{
            fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--texto-muted)', padding: '5px 10px', cursor: 'pointer',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--texto)'}
            onMouseLeave={e => e.target.style.color = 'var(--texto-muted)'}
          >
            El proyecto
          </div>
        </NavLink>

 <NavLink to="/contribuir" style={{ textDecoration: 'none' }}>
  <div style={{
    fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase',
    color: 'var(--acento)',
    border: '1px solid rgba(200,245,53,0.4)',
    padding: '5px 12px', cursor: 'pointer',
    transition: 'background 0.2s',
  }}
    onMouseEnter={e => {
      e.currentTarget.style.background = 'var(--acento)';
      e.currentTarget.style.color = 'var(--fondo)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'transparent';
      e.currentTarget.style.color = 'var(--acento)';
    }}
  >
    + Contribuir
  </div>
</NavLink>
      </div>
    </div>
  );
}

export default Header;