import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Phone, Clock, Car, Star, Navigation } from 'lucide-react';

const branches = [
  {
    id: 1,
    name: "Gold's Gym Centro",
    address: "Av. Reforma 123, Col. Centro, Ciudad de México",
    phone: "+52 55 1234 5678",
    hours: "Lun-Dom: 5:00 AM - 11:00 PM",
    rating: 4.8,
    reviews: 324,
    amenities: ["Piscina", "Sauna", "Clases Grupales", "Estacionamiento", "Nutricionista"],
    coordinates: { lat: 19.4326, lng: -99.1332 },
    distance: "2.3 km"
  },
  {
    id: 2,
    name: "Gold's Gym Norte",
    address: "Blvd. Norte 456, Col. Lindavista, Ciudad de México",
    phone: "+52 55 2345 6789",
    hours: "Lun-Dom: 6:00 AM - 10:00 PM",
    rating: 4.6,
    reviews: 189,
    amenities: ["Crossfit", "Spinning", "Estacionamiento", "Cafetería"],
    coordinates: { lat: 19.4969, lng: -99.1271 },
    distance: "5.1 km"
  },
  {
    id: 3,
    name: "Gold's Gym Sur",
    address: "Av. Universidad 789, Col. Del Valle, Ciudad de México",
    phone: "+52 55 3456 7890",
    hours: "Lun-Dom: 5:30 AM - 10:30 PM",
    rating: 4.9,
    reviews: 412,
    amenities: ["Piscina", "Spa", "Entrenador Personal", "Guardería", "Tienda"],
    coordinates: { lat: 19.3895, lng: -99.1582 },
    distance: "3.7 km"
  },
  {
    id: 4,
    name: "Gold's Gym Poniente",
    address: "Av. Santa Fe 321, Col. Santa Fe, Ciudad de México",
    phone: "+52 55 4567 8901",
    hours: "Lun-Dom: 6:00 AM - 11:00 PM",
    rating: 4.7,
    reviews: 267,
    amenities: ["Clases Grupales", "Yoga", "Pilates", "Estacionamiento", "Wifi"],
    coordinates: { lat: 19.3594, lng: -99.2673 },
    distance: "8.2 km"
  },
  {
    id: 5,
    name: "Gold's Gym Oriente",
    address: "Calz. Ignacio Zaragoza 654, Col. Jardín Balbuena, Ciudad de México",
    phone: "+52 55 5678 9012",
    hours: "Lun-Dom: 5:00 AM - 10:00 PM",
    rating: 4.5,
    reviews: 156,
    amenities: ["Funcional", "TRX", "Spinning", "Estacionamiento"],
    coordinates: { lat: 19.4242, lng: -99.0722 },
    distance: "6.8 km"
  },
  {
    id: 6,
    name: "Gold's Gym Satélite",
    address: "Blvd. Manuel Ávila Camacho 987, Naucalpan, Estado de México",
    phone: "+52 55 6789 0123",
    hours: "Lun-Dom: 6:00 AM - 10:30 PM",
    rating: 4.8,
    reviews: 298,
    amenities: ["Piscina", "Sauna", "Vapor", "Masajes", "Estacionamiento"],
    coordinates: { lat: 19.5057, lng: -99.2341 },
    distance: "12.4 km"
  }
]

export const Branches = ({ darkMode }) => {
const [selectedBranch, setSelectedBranch] = useState(null)
  const [userLocation, setUserLocation] = useState("")

  const findNearestBranch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setUserLocation("Ubicación detectada")
          alert("¡Funcionalidad de ubicación detectada! En una app real verías las sucursales más cercanas.")
        },
        () => {
          alert("No se pudo acceder a tu ubicación. Activa permisos de geolocalización.")
        }
      )
    } else {
      alert("Tu navegador no soporta geolocalización.")
    }
  }

  return (
    <div
      className={`space-y-8 p-6 transition-colors ${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Nuestras Sucursales</h1>
        <p
          className={`max-w-2xl mx-auto mb-6 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Encuentra la sucursal Gold&apos;s Gym más cercana a ti. Todas nuestras ubicaciones cuentan con equipos de última generación y staff profesional.
        </p>
        <Button
          onClick={findNearestBranch}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          <Navigation className="w-4 h-4 mr-2" />
          Encontrar sucursal más cercana
        </Button>
      </div>

      {/* Map Placeholder */}
      <Card
        className={`w-full transition-colors ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Mapa de Ubicaciones</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`h-64 rounded-lg flex items-center justify-center relative overflow-hidden ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            {/* Simulación de mapa */}
            <div
              className={`absolute inset-0 ${
                darkMode
                  ? "bg-gradient-to-br from-gray-700 to-gray-600"
                  : "bg-gradient-to-br from-blue-100 to-green-100"
              }`}
            >
              <div className="w-full h-full relative">
                {branches.map((branch, index) => (
                  <div
                    key={branch.id}
                    className="absolute w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg"
                    style={{
                      left: `${20 + index * 12}%`,
                      top: `${30 + (index % 3) * 20}%`,
                    }}
                    onClick={() => setSelectedBranch(branch)}
                  >
                    <MapPin className="w-4 h-4 text-black" />
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`text-center z-10 p-4 rounded-lg ${
                darkMode ? "bg-gray-800/90 text-white" : "bg-white/90 text-black"
              }`}
            >
              <MapPin className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
              <p className="font-semibold">Mapa Interactivo</p>
              <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Haz clic en los marcadores para ver los detalles de cada sucursal
              </p>
            </div>
          </div>
          {selectedBranch && (
            <div
              className={`mt-4 p-4 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-yellow-300"
                  : "bg-yellow-50 border-yellow-200 text-yellow-800"
              }`}
            >
              <h3 className="font-semibold">{selectedBranch.name}</h3>
              <p className="text-sm">{selectedBranch.address}</p>
              <p className="text-sm">Distancia: {selectedBranch.distance}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Branches List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map((branch) => (
          <Card
            key={branch.id}
            className={`hover:shadow-lg transition-shadow border ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center space-x-2">
                    <span>{branch.name}</span>
                    {branch.distance && (
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-200"
                        }`}
                      >
                        {branch.distance}
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription
                    className={`flex items-center space-x-1 mt-2 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{branch.address}</span>
                  </CardDescription>
                </div>

                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{branch.rating}</span>
                  <span
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    ({branch.reviews})
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-yellow-500" />
                  <span>{branch.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span>{branch.hours}</span>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="font-semibold mb-2">Servicios</h4>
                <div className="flex flex-wrap gap-1">
                  {branch.amenities.map((amenity, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={`text-xs border ${
                        darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"
                      }`}
                    >
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black"
                  onClick={() => setSelectedBranch(branch)}
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  Ver en mapa
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className={`flex-1 border ${
                    darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"
                  }`}
                  onClick={() => window.open(`tel:${branch.phone}`)}
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Llamar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className={`border ${
                    darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"
                  }`}
                  onClick={() => {
                    const address = encodeURIComponent(branch.address)
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${address}`,
                      "_blank"
                    )
                  }}
                >
                  <Navigation className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Section */}
      <section
        className={`p-8 rounded-lg ${
          darkMode ? "bg-gray-800" : "bg-gray-200/50"
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Todas nuestras sucursales incluyen
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="font-semibold mb-2">Estacionamiento</h3>
            <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
              Espacios amplios y seguros para tu vehículo
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="font-semibold mb-2">Horarios Amplios</h3>
            <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
              Abierto desde temprano hasta tarde todos los días
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="font-semibold mb-2">Equipos Premium</h3>
            <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
              Maquinaria de última generación en todas las sedes
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="font-semibold mb-2">Staff Profesional</h3>
            <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
              Entrenadores certificados listos para ayudarte
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`text-center p-8 rounded-lg ${
          darkMode ? "bg-yellow-600 text-black" : "bg-yellow-500 text-black"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">
          ¿Ya elegiste tu sucursal favorita?
        </h2>
        <p className="text-lg mb-6 opacity-90">
          Visítanos y conoce nuestras instalaciones. Tu primera clase es completamente gratis.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="bg-black text-yellow-500 hover:bg-gray-800"
        >
          Agendar visita gratuita
        </Button>
      </section>
    </div>
  )
}