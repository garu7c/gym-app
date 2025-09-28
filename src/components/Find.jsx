import React, { useMemo, useState } from 'react';
import { MapPin, Phone, Clock, Truck } from 'lucide-react';
/*import ImageWithFallback from './figma/ImageWithFallback';*/

const BRANCHES = [
  {
    id: 1,
    name: 'Jaguar Fitness Guatuso',
    address: 'A 600 metros de puente Rio Frio',
    phone: '+506 6454 0051',
    hours: '24/7',
    services: ['Pesas', 'Cardio', 'Clases Grupales', 'Spa'],
    lat: 10.678972,
    lng:  -84.819361,
  },
  {
    id: 2,
    name: 'Jaguar Fitness Rio Cuarto',
    address: 'Barrio Central, Rio Cuarto',
    phone: '+506 6345 5502',
    hours: '5:00 AM - 11:00 PM',
    services: ['Pesas', 'Cardio', 'CrossFit', 'Piscina'],
    lat: 10.340407,
    lng: -84.216899,
  },
  {
    id: 3,
    name: 'Jaguar Fitness Cariari',
    address: 'La Rivera, Cariari',
    phone: '+506 8450 7906',
    hours: '5:00 AM - 11:00 PM',
    services: ['Pesas', 'Cardio', 'Boxing'],
    lat: 10.344598,
    lng: -83.716023,
  },
  {
    id: 4,
    name: 'Jaguar Fitness San Jose',
    address: 'Av2, San Jose',
    phone: '+506 5011 0452',
    hours: '5:00 AM - 11:00 PM',
    services: ['Pesas', 'Cardio', 'Boxing'],
    lat: 9.933542,
    lng: -84.081019,
  },
];

function openMaps(address) {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  window.open(url, '_blank');
}

export default function Find() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [mapCenter, setMapCenter] = useState({ lat: BRANCHES[0].lat, lng: BRANCHES[0].lng, zoom: 10 });

  const services = useMemo(() => {
    const s = new Set();
    BRANCHES.forEach(b => b.services.forEach(x => s.add(x)));
    return Array.from(s);
  }, []);

  const filtered = BRANCHES.filter(b => {
    if (filter !== 'all' && !b.services.includes(filter)) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return b.name.toLowerCase().includes(q) || b.address.toLowerCase().includes(q) || b.services.join(' ').toLowerCase().includes(q);
  });

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${mapCenter.lng - 0.5}%2C${mapCenter.lat - 0.5}%2C${mapCenter.lng + 0.5}%2C${mapCenter.lat + 0.5}&layer=mapnik&marker=${mapCenter.lat}%2C${mapCenter.lng}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Nuestras Sucursales</h1>
          <p className="text-sm text-muted-foreground mt-2">Sucursales estratégicamente ubicadas para que siempre tengas un Jaguar Gym cerca.</p>
        </div>
        <div>
          <button 
          className="px-4 py-2 bg-yellow-500 dark:bg-red-800 dark:hover:bg-red-800/80 hover:bg-yellow-600 dark:text-gray-100 text-black rounded-lg"
          onClick={() => {
            const nearestBranch = filtered[0];
            if (nearestBranch) {
              setMapCenter({ lat: nearestBranch.lat, lng: nearestBranch.lng, zoom: 14 });
            }
          }}>
          Encontrar la más cercana
          </button>
        </div>
      </div>

      {/* Mapa embebido (OpenStreetMap) - sin dependencias */}
      <div className="bg-white dark:bg-slate-900 rounded-lg p-6 mb-8 border border-gray-200 dark:border-slate-700">
        <h2 className="font-semibold mb-3 text-slate-900 dark:text-white">Mapa de Sucursales</h2>
        <div className="rounded-md h-64 overflow-hidden border">
          {/* usamos un iframe de OpenStreetMap; actualizamos src para centrar en una sucursal */}
          <iframe
            title="mapa-sucursales"
            src={mapSrc}
            style={{ width: '100%', height: '100%', border: 0 }}
            loading="lazy"
          />
        </div>
        <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">Haz clic en "Ver en mapa" en una sucursal para centrar el mapa en ella. El botón "Cómo llegar" abrirá Google Maps con indicaciones.</div>
      </div>

      {/* Controles de búsqueda y filtros */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar sucursal, dirección o servicio..."
            className="w-full rounded border px-3 py-2 text-slate-900 dark:text-white bg-white dark:bg-slate-800"
          />
        </div>

        <div className="flex items-center gap-3">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 rounded border text-slate-900 dark:text-white bg-white dark:bg-slate-800">
            <option value="all">Todos los servicios</option>
            {services.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Grid de sucursales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(branch => (
          <div key={branch.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg p-6 border border-gray-200 dark:border-slate-700">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{branch.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{branch.address}</p>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">#{branch.id}</div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <MapPin className="w-4 h-4" /> {branch.address}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Phone className="w-4 h-4" /> {branch.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Clock className="w-4 h-4" /> {branch.hours}
              </div>

              <div>
                <div className="text-sm mb-2">Servicios disponibles:</div>
                <div className="flex gap-2 flex-wrap">
                  {branch.services.map(s => (
                    <span key={s} className="text-xs bg-gray-100 dark:bg-black/40 text-slate-700 dark:text-slate-200 px-2 py-1 rounded">{s}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setMapCenter({ lat: branch.lat, lng: branch.lng, zoom: 13 }); }} className="flex-1 mt-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2">
                  Ver en mapa
                </button>
                <button onClick={() => openMaps(branch.address)} className="flex-1 mt-2 bg-yellow-600 dark:bg-red-800 dark:text-gray-100 dark:hover-red-800/80 hover:bg-yellow-700 text-black px-4 py-2 rounded flex items-center justify-center gap-2">
                  <Truck className="w-4 h-4" /> Cómo llegar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer className="py-10">
        <div className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
          &copy; {new Date().getFullYear()} Jaguar Fitness. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}