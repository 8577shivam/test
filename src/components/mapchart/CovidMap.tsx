// src/components/CovidMap.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useCovidCountriesData } from '../../hooks/useCovidCountriesData';

const CovidMap: React.FC = () => {
  const { data, isLoading, error } = useCovidCountriesData();

  if (isLoading) return <div className=' flex justify-center text-3xl font-bold text-white'>Loading Map...</div>;
  if (error) return <div>Error loading data</div>;

  const getMarkerIcon = (color: string) => {
    return L.divIcon({
      className: 'custom-icon',
      html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%;"></div>`,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-3 rounded-md bg-green-800">
      <h2 className="text-center text-2xl font-bold mb-4">COVID-19 Cases by Country</h2>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: '600px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {data?.map((country) => (
          <Marker
            key={country.countryInfo._id}
            position={[country.countryInfo.lat, country.countryInfo.long]}
            icon={getMarkerIcon('red')}
          >
            <Popup>
              <div>
                <h3>{country.country}</h3>
                <p>Active Cases: {country.active}</p>
                <p>Recovered Cases: {country.recovered}</p>
                <p>Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CovidMap;
