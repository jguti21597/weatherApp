"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete as GoogleMapsAutocomplete,
} from "@react-google-maps/api";

type MapOptions = google.maps.MapOptions; //allows to import mapId/other options

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 51.5072,
  lng: 0.1276,
};

function Intro() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);

  const mapRef = useRef<GoogleMap>(null);

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "62edfa1f0518c7bd",
    }),
    []
  ) as any;

  const [open, setOpen] = useState(false);
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLng | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCeEkBOH3opYxGFCa43S9ZtBQ0OIm8LQr4",
    libraries: ["places"],
  });

  //use directions API
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

  //use geolocation API
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

  //If theres problems loading the map/API
  if (loadError) return <div>Error loading Google Maps API</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="controls">
        <h1>Plan Route</h1>
        <div className="search">
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
        {isLoaded && (
          <Marker
            position={currentLocation || center} // Places marker at current location
            icon={{
              // marker is a bicycle icon
              url: "https://img.icons8.com/material/24/cycling-track.png",
              scaledSize: new google.maps.Size(40, 40), // Use google.maps.Size
            }}
            onClick={() => setOpen(true)}
          />
        )}

        {open && ( //When click marker will display this message
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
