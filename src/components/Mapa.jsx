import { MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import MiMarker from './MiMarker';
import SpiralLines from './SpiralLines';
import CitySelector from './CitySelector';
import FormularioFeria from './FormularioFeria';
import './Mapa.css';
import L from 'leaflet';


var southAmericaBounds = L.latLngBounds(
    L.latLng(-66.0, -92.0), // suroeste (10 menos lat, 10 menos lon)
    L.latLng(23.0, -24.0)   // noreste (10 más lat, 10 más lon)
);

export default function Mapa() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [data, setData] = useState([]);

useEffect(() => {
  supabase
    .from('mapa_ferias')
    .select('*')
    .then(({ data: ferias, error }) => {
      if (error) console.error(error);
      else setData(ferias);
    });
}, []);

    return (
        <div style={{
            position: 'relative',
            height: '100%',
            width: '100%'
        }} className="map-container">
            {/* Formulario lateral */}
            <FormularioFeria onToggle={setIsFormOpen} />

            <MapContainer
                center={[-8.700, -72.082]}
                zoom={5}
                minZoom={3}
                maxZoom={17}
                maxBounds={southAmericaBounds}
                maxBoundsViscosity={1.0}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
            >
                <TileLayer
  url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
  attribution='© Stadia Maps © OpenStreetMap'
/>

                {/* Spiral Lines Component */}
                <SpiralLines />

                {/* City Selector Component */}
                <CitySelector isFormOpen={isFormOpen} />

                {/* Original Markers */}
                {data.map((item, index) => {
                    return (
                        <MiMarker
                            key={index}
                            item={item}
                        />
                    );
                })}
                <ZoomControl position="bottomright" />
            </MapContainer>

        </div>
    );
}