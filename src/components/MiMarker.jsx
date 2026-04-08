import { CircleMarker, Popup } from 'react-leaflet';
const base = import.meta.env.BASE_URL;


export default function MiMarker({ item }) {




    const coords = Array.isArray(item.coordenadas)
  ? item.coordenadas
  : item.coordenadas.split(', ').map(Number);

    return (
        <>
            <CircleMarker
                center={[parseFloat(coords[0]), parseFloat(coords[1])]}
                radius={5}
                fillOpacity={1}
                color="#512876"
                weight={1}
                opacity={1}
            >
                <Popup>
                    <img
                        src={`${base}/assets/img/${item.fotografia}`}
                        alt={`Fotografía de ${item.nombre_feria}`}
                        style={{ width: '100%', borderRadius: '8px', marginTop: '12px' }}
                    />

                    <div style={{ marginTop: '12px' }}>
                        <audio controls src={`${base}/assets/audio/${item.audio}`} style={{ width: '100%' }}>
                            Tu navegador no soporta el elemento de audio.
                        </audio>
                    </div>
                    <p><b>Nombre de la feria</b>: {item.nombre_feria}</p>
                    <p><b>Escala</b>: {item.escala}</p>
                    <p><b>Dias de funcionamiento</b>: {item.dias_funcionamiento}</p>
                    <p><b>Tip de instalación</b>: {item.tipo_instalacion}</p>
                    <p><b>Fecha</b>: {item.fecha}</p>
                    <p><b>Hora del día</b>: {item.hora}</p>
                    <p><b>Ciudad</b>: {item.ciudad}</p>
                    <p><b>País</b>: {item.pais}</p>
                    <p><b>Categorías de sonido</b>: {item.categorias_sonido}</p>
                    <p><b>Oferta endémica</b>: {item.oferta_endemica}</p>

                </Popup>
            </CircleMarker>

        </>
    );
}