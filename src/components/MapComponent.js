import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@fortawesome/fontawesome-free/css/all.css';

// Create a custom icon using FontAwesome
const createCustomIcon = () => {
  return L.divIcon({
    html: '<i class="fa-solid fa-location-dot"></i>',
    className: 'map-marker',
    iconSize: [50, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -36],
  });
};

const MapComponent = () => {
  const position = [41.722597, 44.714332]; // Coordinates for the center of the map
  const customIcon = createCustomIcon();

  return (
    <MapContainer center={position} zoom={15} className="map-container" style={{ height: '60vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customIcon}>
        <Popup className='map-popup'>
          design-Lab <br /> office
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
