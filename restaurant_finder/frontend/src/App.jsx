import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [pastLocations, setPastLocations] = useState([]);

  useEffect(() => {
    // Fetch user's current location (latitude and longitude) using the browser's Geolocation API
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await fetchRestaurants(latitude, longitude);
        updatePastLocations(latitude, longitude);
      },
      (error) => console.error(error)
    );
    // setRestaurants([
    //   { name: "Restaurant 1", latitude: 37.774572, longitude: -122.430797 },
    //   { name: "Restaurant 2", latitude: 37.774972, longitude: -122.432197 },
    //   { name: "Restaurant 3", latitude: 37.775272, longitude: -122.431097 },
    // ]);
  }, []);

  const fetchRestaurants = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/restaurants/${latitude}/${longitude}`
      );
      console.log("ccc", response);
      setRestaurants(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePastLocations = (latitude, longitude) => {
    // Update the pastLocations array with the user's current location
    // We can use browser's local storage to store past locations, but for simplicity, I'm just storing in state here
    const newPastLocations = pastLocations.slice(0, 9); // Keep only the last 9 locations
    newPastLocations.unshift({ latitude, longitude });
    setPastLocations(newPastLocations);
  };

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyDfCLQ-sdDBIc18sDDzwCY5uambUULEU0Y",
        }}
        defaultCenter={{ lat: 37.773972, lng: -122.431297 }}
        defaultZoom={12}
      >
        {/* Marker for the user's current location */}
        <div
          lat={pastLocations[0]?.latitude}
          lng={pastLocations[0]?.longitude}
          style={{
            backgroundColor: "lightpink",
            width: "50px",
            height: "50px",
          }}
        >
          User
        </div>

        {/* Markers for the restaurants */}
        {/* {restaurants.map((restaurant, index) => (
          <div
            key={index}
            lat={restaurant.latitude + 0.0002} // Add an offset to latitude
            lng={restaurant.longitude + 0.0002}
            style={{ backgroundColor: "red" }}
          >
            {restaurant.name}
          </div>
        ))} */}
      </GoogleMapReact>

      {/* List of past locations */}
      <ul>
        {pastLocations.map((location, index) => (
          <li key={index}>
            {`Location ${index + 1}: Latitude ${location.latitude}, Longitude ${
              location.longitude
            }`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
