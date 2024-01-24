import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../../hooks/useCities.ts";
import { LatLngTuple } from "leaflet";
import { useGeolocation } from "../../hooks/useGeolocation.ts";
import { Button } from "../Button-component/Button.tsx";
import { useUrlPosition } from "../../hooks/useUrlPosition.ts";

export default function Map() {
  const [mapPosition, setMapPosition] = useState<LatLngTuple>([40, 0]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingGeoLocationPosition,
    position: geoLocationPosition,
    getPosition: getGeoLocationPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLng && mapLat) setMapPosition([Number(mapLat), Number(mapLng)]);
  }, [mapLng, mapLat]);

  useEffect(() => {
    if (geoLocationPosition)
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getGeoLocationPosition}>
          {isLoadingGeoLocationPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities?.map((city) => (
          <Marker
            position={[Number(city.position.lat), Number(city.position.lng)]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <DetectClick />
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}

interface ChangeCenterProps {
  position: LatLngTuple;
}

function ChangeCenter({ position }: ChangeCenterProps) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
