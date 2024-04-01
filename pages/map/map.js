import { useEffect } from 'react';

const locations = [
    {
        coords: { lat: 6.9271, lng: 79.8612 }, // Colombo
        location: "Colombo",
        humidity: 75,
        temperature: 28,
        airpressure: 1010,
        content: 'Misty',
      },
      {
        coords: { lat: 7.8731, lng: 80.7718 }, // Kandy
        location: "Kandy",
        humidity: 80,
        temperature: 25,
        airpressure: 1012,
        content: 'Cloudy',
      },
      {
        coords: { lat: 6.0535, lng: 80.2210 }, // Galle
        location: "Galle",
        humidity: 70,
        temperature: 29,
        airpressure: 1011,
        content: 'Sunny',
      },
      {
        coords: { lat: 8.3114, lng: 80.4037 }, // Anuradhapura
        location: "Anuradhapura",
        humidity: 65,
        temperature: 30,
        airpressure: 1010,
        content: 'Rainy',
      },
  // Add more locations here
];

const Map = () => {
  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById('google-map'), {
        zoom: 7.5,
        center: { lat: 7.87708, lng: 80.69791 }, // Roughly the center of Australia
      });

      // Create markers and info windows for each location
      locations.forEach((location) => {
        const marker = new window.google.maps.Marker({
          position: location.coords,
          map: map,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="color:black"><h3>${location.location} </h3><p>${location.content}</p><p>Humidity: ${location.humidity}
          </p><p>Temperature: ${location.temperature}</p><p>Air Pressure: ${location.airpressure}</p></div>`,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    };

    // Load the Google Maps script
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC-jY4wwj2ymaqTUy-D_ofRblmX0ihVfiI&callback=initMap`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    window.initMap = initMap; // Make initMap globally available
    document.head.appendChild(googleMapsScript);
  }, []);

  return <div id="google-map" style={{ height: '100vh', width: '100%' }} />;
};

export default Map;
