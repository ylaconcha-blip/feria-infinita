import { CircleMarker, Popup } from 'react-leaflet';

export default function MiMarker({ item }) {

  const coords = Array.isArray(item.coordenadas)
    ? item.coordenadas
    : item.coordenadas.split(', ').map(Number);

  return (
    <CircleMarker
      center={[parseFloat(coords[0]), parseFloat(coords[1])]}
      radius={6}
      fillOpacity={1}
      fillColor="#C8F535"
      color="#0C0F08"
      weight={1.5}
      opacity={1}
    >
      <Popup minWidth={260} maxWidth={300}>
        <div style={{
          fontFamily: 'Space Mono, monospace',
          background: 'var(--panel)',
          color: 'var(--texto)',
          borderRadius: '3px',
          overflow: 'hidden',
          margin: '-14px -20px',
        }}>

          {item.foto_url && (
            <img
              src={item.foto_url}
              alt={item.nombre}
              style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
            />
          )}

          <div style={{ padding: '12px 14px' }}>
            <div style={{
              fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--acento)', marginBottom: '6px'
            }}>
              {item.escala}
            </div>

            <div style={{
              fontFamily: 'Bungee, sans-serif',
              fontSize: '16px', color: 'var(--texto)',
              lineHeight: 1.1, marginBottom: '4px'
            }}>
              {item.nombre}
            </div>

            <div style={{
              fontSize: '10px', color: 'var(--texto-muted)',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              marginBottom: '12px'
            }}>
              {item.ciudad} · {item.pais}
            </div>

            {item.audio_url && (
              <div style={{ marginBottom: '12px' }}>
                <div style={{
                  fontSize: '8px', letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: 'var(--texto-muted)', marginBottom: '6px'
                }}>
                  Audio de campo
                </div>
                <audio controls src={item.audio_url}
                  style={{ width: '100%', height: '28px' }}
                />
              </div>
            )}

            <div style={{
              height: '1px', background: 'var(--borde)',
              margin: '10px 0'
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                ['Días', Array.isArray(item.dias_funcionamiento)
                  ? item.dias_funcionamiento.join(', ')
                  : item.dias_funcionamiento],
                ['Instalación', item.tipo_instalacion],
                ['Sonido', item.categorias_sonido],
                ['Registros', item.total_registros],
              ].map(([label, value]) => value ? (
                <div key={label}>
                  <div style={{ fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--texto-muted)', marginBottom: '2px' }}>
                    {label}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--texto)' }}>
                    {value}
                  </div>
                </div>
              ) : null)}
            </div>

            {item.oferta_endemica && (
              <div style={{
                marginTop: '10px',
                background: 'var(--panel2)',
                border: '1px solid var(--borde)',
                borderRadius: '2px',
                padding: '8px 10px',
                fontSize: '10px',
                color: 'var(--acento)',
                fontStyle: 'italic',
                fontFamily: 'Fraunces, serif',
                lineHeight: 1.5
              }}>
                {item.oferta_endemica}
              </div>
            )}
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
}