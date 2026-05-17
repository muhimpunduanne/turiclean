import { MapContainer, Marker, Polyline, Popup, TileLayer, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { Truck, WasteReport } from '@/types';
import { reportTypeLabel } from '@/components/data/status';

const kigaliRoutePoints = [
  { lat: -1.9403, lng: 29.8739 }, { lat: -1.9440, lng: 29.8700 },
  { lat: -1.9480, lng: 29.8650 }, { lat: -1.9520, lng: 29.8590 },
  { lat: -1.9536, lng: 29.8468 }, { lat: -1.9500, lng: 29.8520 },
  { lat: -1.9456, lng: 29.8623 }, { lat: -1.9401, lng: 29.8512 },
  { lat: -1.9348, lng: 29.8701 }, { lat: -1.9380, lng: 29.8780 },
  { lat: -1.9578, lng: 29.8562 }, { lat: -1.9612, lng: 29.8478 },
  { lat: -1.9683, lng: 29.8345 }, { lat: -1.9720, lng: 29.8890 },
];

const truckIcon = L.divIcon({
  className: 'truck-marker',
  html: '<div class="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-emerald-500 text-white shadow-lg">T</div>',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

interface SmartMapProps {
  trucks?: Truck[];
  reports?: WasteReport[];
  showRoute?: boolean;
  height?: string;
}

export default function SmartMap({ trucks = [], reports = [], showRoute = false, height = '420px' }: SmartMapProps) {
  const center: [number, number] = [-1.9506, 29.8619];
  const route = kigaliRoutePoints.map((point) => [point.lat, point.lng] as [number, number]);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10" style={{ height }}>
      <MapContainer center={center} zoom={13} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showRoute && <Polyline positions={route} pathOptions={{ color: '#10b981', weight: 5, opacity: 0.75 }} />}
        {trucks.map((truck) => (
          truck.latitude && truck.longitude ? (
            <Marker key={truck.id} position={[truck.latitude, truck.longitude]} icon={truckIcon}>
              <Popup>
                <strong>{truck.licensePlate}</strong><br />
                {truck.currentRoute}<br />
                Driver: {truck.driverName}<br />
                ETA: 8-18 minutes
              </Popup>
            </Marker>
          ) : null
        ))}
        {reports.map((report) => (
          report.latitude && report.longitude ? (
            <CircleMarker
              key={report.id}
              center={[report.latitude, report.longitude]}
              radius={9}
              pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.7 }}
            >
              <Popup>
                <strong>{reportTypeLabel(report.type)}</strong><br />
                {report.address}<br />
                {report.description}
              </Popup>
            </CircleMarker>
          ) : null
        ))}
      </MapContainer>
    </div>
  );
}
