import { MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet';
import { useState } from 'react';
import MiMarker from './MiMarker';
import SpiralLines from './SpiralLines';
import CitySelector from './CitySelector';
import FormularioFeria from './FormularioFeria';
import data from '../data/datos.json';
import './Mapa.css';
import L from 'leaflet';


var southAmericaBounds = L.latLngBounds(
    L.latLng(-66.0, -92.0), // suroeste (10 menos lat, 10 menos lon)
    L.latLng(23.0, -24.0)   // noreste (10 más lat, 10 más lon)
);

export default function Mapa() {
    const [isFormOpen, setIsFormOpen] = useState(false);

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
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
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