import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

export default function QuestScreen() {
  const [location, setLocation] = useState(null);
  const [targetLocation] = useState({
    latitude: 52.358417,
    longitude: 4.881089, // Example: Van Gogh Museum location
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  const checkProximity = () => {
    if (location) {
      const distance = Math.sqrt(
        Math.pow(location.latitude - targetLocation.latitude, 2) +
        Math.pow(location.longitude - targetLocation.longitude, 2)
      );
      if (distance < 0.001) { // Approximately 100 meters
        alert('Bingo! You found the location!');
        // Proceed to the next challenge or end quest
      } else {
        alert('Not quite there, keep looking!');
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={location || targetLocation}
      >
        {location && <Marker coordinate={location} title="You are here" />}
        <Marker coordinate={targetLocation} title="Van Gogh Museum" />
      </MapView>
      <Button title="Check Location" onPress={checkProximity} />
    </View>
  );
}
