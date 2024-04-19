import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

const MapComponent = ({ address, onClose }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2hlbHRvbmJpbGdhdGVzIiwiYSI6ImNsdjZqcmhjbzAxZm4yanM3N3FybTFkMGwifQ.dlEsdn_F936DLRdYvZRWgA'; 
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [80.2707, 13.0827], 
      zoom: 12
    });

    const geocodeAddress = async (address) => {
      try {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}`);
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          const { center } = data.features[0];
          map.setCenter(center);
        } else {
          console.error('Location not found');
        }
      } catch (error) {
        console.error('Error geocoding address:', error);
      }
    };

 
    if (address) {
      geocodeAddress(address);
    }

    return () => {
      map.remove();
    };
  }, [address]);

  return (
    <div className="w-full h-64 border border-gray-300 rounded-md relative">
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
      <button onClick={onClose} className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded">
        Close
      </button>
    </div>
  );
};

export default MapComponent;
