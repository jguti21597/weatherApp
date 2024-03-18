// Enables strict usage of client-side imports ensuring Next.js optimizes for client-side only packages
"use client";

// React imports for managing state, effect, and references
import React, { useEffect, useMemo, useRef, useState } from "react";
// Google Maps components and hooks for creating maps and using map services
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  Autocomplete as GoogleMapsAutocomplete,
} from "@react-google-maps/api";

// TypeScript type for MapOptions for improved code readability and maintenance
type MapOptions = google.maps.MapOptions; // Allows importing mapId and other options

// Style object for the map container
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

// Default center coordinates for the map
const center = {
  lat: 51.5072,
  lng: 0.1276,
};

function Intro() {
  // State hooks for managing origin and destination inputs
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  // State hook for storing directions result from Google Maps Directions API
  const [directions, setDirections] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);

  // Ref for accessing the GoogleMap instance
  const mapRef = useRef<GoogleMap>(null);

  // Memo hook for Google Maps options, including custom map ID
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "62edfa1f0518c7bd",
    }),
    []
  ) as any;

  // State hooks for managing info window open state and current location
  const [open, setOpen] = useState(false);
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLng | null>(null);

  // Hook for loading the Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "", // Add your API key here
    libraries: ["places"],
  });

  // Effect hook for fetching directions when origin and destination are set
  useEffect(() => {
    if (origin && destination) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.BICYCLING,
        },
        (result, status) => {
          if (status === "OK" && result) {
            setDirections(result);
          }
        }
      );
    }
  }, [origin, destination]);

  // Effect hook for fetching the user's current geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation(
            new google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            )
          );
        },
        (error) => {
          console.log("Error getting location: ", error);
        }
      );
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  // Conditional rendering for loading states and errors
  if (loadError) return <div>Error loading Google Maps API</div>;
  if (!isLoaded) return <div>Loading...</div>;

  // Main component render function
  return (
    <div className="container">
      <div className="controls">
        <h1>Plan Route</h1>
        <div className="search">
          {/* Autocomplete inputs for origin and destination */}
          <GoogleMapsAutocomplete>
            <input
              type="text"
              placeholder="Origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </GoogleMapsAutocomplete>
          <GoogleMapsAutocomplete>
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </GoogleMapsAutocomplete>
        </div>
        <div className="button">
          {/* Button for clearing inputs and directions */}
          <button
            id="clear"
            onClick={() => {
              setOrigin("");
              setDestination("");
              setDirections(undefined);
            }}
          >
            Clear
          </button>
        </div>
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={9}
        center={currentLocation || center}
        options={options}
      >
        {/* Conditional rendering of directions */}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                zIndex: 50,
                strokeColor: "black",
                strokeWeight: 5,
              },
            }}
          />
        )}
        {/* Marker for current location or default center */}
        {isLoaded && (
          <Marker
            position={currentLocation || center}
            icon={{
              url: "https://img.icons8.com/material/24/cycling-track.png",
              scaledSize: new google.maps.Size(40, 40),
            }}
            onClick={() => setOpen(true)}
          />
        )}
        {/* InfoWindow for displaying current location information */}
        {open && (
          <InfoWindow
            position={currentLocation || center}
            onCloseClick={() => setOpen(false)}
          >
            <p>Your current location</p>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default Intro;
