import React, { useState, useContext } from "react";
import { UserLocationContext } from "@context/UserLocationContext";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

const GoogleMapsView = () => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState(null);

  const containerStyle = {
    width: "100%",
    height: "70vh",
  };

  const handlePincodeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search?format=json&postalcode=${pincode}&country=IN"
      );
      if (response.data && response.data.length > 0) {
        setUserLocation({
          lat: parseFloat(response.data[0].lat),
          lng: parseFloat(response.data[0].lon),
        });
        setError(null);
      } else {
        setError("Location not found for the provided pincode.");
      }
    } catch (error) {
      setError("Error fetching location. Please try again later.");
    }
  };

  return (
    <div>
      <form onSubmit={handlePincodeSubmit}>
        <input
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        mapIds={["37a8b8b8bc0b1934"]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          options={{ mapId: "37a8b8b8bc0b1934" }}
          zoom={12}
        >
          {userLocation && <Marker position={userLocation} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapsView;
