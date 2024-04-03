import { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Initialize the socket connection
const socket = io('http://localhost:3001');

const Map = ({ signOut, user }) => {
  const [locations, setLocations] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Initialize Google Map
  const initMap = () => {
    const googleMap = new window.google.maps.Map(document.getElementById('google-map'), {
      zoom: 7.5,
      center: { lat: 7.87708, lng: 80.69791 }, // Center of Sri Lanka
    });
    setMap(googleMap);
  };

  // Update markers based on locations
  const updateMarkers = (locations) => {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    // Add new markers
    const newMarkers = locations.map(location => {
      const marker = new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lon },
        map,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="color:black"><h3>${location.location}</h3><p>${location.content}</p><p>Humidity: ${location.humidity}</p><p>Temperature: ${location.temperature}</p><p>Air Pressure: ${location.airpressure}</p></div>`,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      return marker;
    });

    setMarkers(newMarkers);
  };

  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GMAPS_API_KEY}&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
      window.initMap = initMap;
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initMap();
    }

    // Setup WebSocket listener
    socket.on('weather data', (data) => {
      console.log('Received weather data:', data);
      setLocations(data);
    });

    return () => {
      socket.off('weather data');
      window.initMap = null; // Cleanup global function reference
    };
  }, []);

  useEffect(() => {
    if (map) {
      updateMarkers(locations);
    }
  }, [locations, map]); // Ensure markers are updated when locations or map state changes

  return (
    <>
      <div className='navbar-title'>
        <h1>Sri Lankan Realtime Weather Map</h1>
        <div className='button'>
          <button onClick={signOut}>Sign Out</button>
        </div>
      </div>
      <div id="google-map" style={{ height: 'calc(100vh - 110px)', width: '100%' }}></div>
    </>
  );
};

export default Map;
