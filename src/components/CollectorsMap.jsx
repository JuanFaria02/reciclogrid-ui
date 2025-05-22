import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { createRoot } from "react-dom/client";
import { useCollectors } from "../hooks/useCollectors";
import CollectorIcon from "./icons/CollectorIcon";

const CustomMarkerIcon = (collector) =>
  L.divIcon({
    html: `<div id="collector-icon-${collector.id}"></div>`,
    className: "custom-icon-wrapper",
    iconSize: [30, 30],
    popupAnchor: [0, -15],
  });

const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position);
    }
  }, [position, map]);
  return null;
};

const CollectorsMap = () => {
  const [allCollectors, setAllCollectors] = useState([]);
  const [page, setPage] = useState(0);
  const [loadingAll, setLoadingAll] = useState(true);

  const {
    collectors,
    totalPages,
    loading
  } = useCollectors({ page, size: 50 });

  useEffect(() => {
    if (collectors.length > 0) {
      setAllCollectors((prev) => {
        const ids = new Set(prev.map((c) => c.id));
        const unique = collectors.filter((c) => !ids.has(c.id));
        return [...prev, ...unique];
      });
    }

    if (!loading && page + 1 < totalPages) {
      setPage((prev) => prev + 1);
    } else if (!loading) {
      setLoadingAll(false);
    }
  }, [collectors, loading, totalPages, page]);

  const color = (p) => (p <= 25 ? "green" : p <= 85 ? "yellow" : "red");

  useEffect(() => {
    const timeout = setTimeout(() => {
      allCollectors.forEach((collector) => {
        const container = document.getElementById(`collector-icon-${collector.id}`);
        if (container && container.childNodes.length === 0) {
          const root = createRoot(container);
          root.render(<CollectorIcon color={color(collector.percentage)} collector={collector} />);
        }
      });
    }, 0); 

    return () => clearTimeout(timeout);
  }, [allCollectors]);

  const firstCollector = allCollectors[0];
  const initialCenter = [-22.9, -43.2];

  console.log(collectors)
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={initialCenter}
        zoom={12}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {firstCollector && (
          <RecenterMap
            position={[
              firstCollector.address.latitude,
              firstCollector.address.longitude
            ]}
          />
        )}

        {
        allCollectors.map((collector) => (
          <Marker
            key={collector.id}
            position={[collector.address.latitude, collector.address.longitude]}
            icon={CustomMarkerIcon(collector)}
          >
            <Popup>
              <strong>{collector.nome}</strong><br />
              Latitude: {collector.address.latitude}<br />
              Longitude: {collector.address.longitude}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {loadingAll && (
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Carregando coletores no mapa...
        </p>
      )}
    </div>
  );
};

export default CollectorsMap;
