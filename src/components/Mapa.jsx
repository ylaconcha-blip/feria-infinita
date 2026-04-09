import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import MiMarker from './MiMarker';
import SpiralLines from './SpiralLines';
import CitySelector from './CitySelector';
import FormularioFeria from './FormularioFeria';
import './Mapa.css';
import L from 'leaflet';

const southAmericaBounds = L.latLngBounds(
  L.latLng(-66.0, -92.0),
  L.latLng(23.0, -24.0)
);

export default function Mapa() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    supabase.from('mapa_ferias').select('*')
      .then(({ data: ferias, error }) => {
        if (error) console.error(error);
        else setData(ferias);
      });
  }, []);

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <FormularioFeria onToggle={setIsFormOpen} />
      <MapContainer
        center={[-8.700, -72.082]}
        zoom={5} minZoom={3} maxZoom={17}
        maxBounds={southAmericaBounds}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
<TileLayer
  url="https://api.maptiler.com/maps/darkmatter/{z}/{x}/{y}.png?key=lmlk6XPIfLVg4GXasvel"
  attribution='© MapTiler © OpenStreetMap'
/>

        <SpiralLines />
        <CitySelector isFormOpen={isFormOpen} />
        {data.map((item, index) => (
          <MiMarker key={index} item={item} />
        ))}
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
}