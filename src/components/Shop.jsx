import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './ui/ImageWithFallback';
import { ShoppingCart, Star, Filter } from 'lucide-react';

/* =====================
   Datos de productos
   ===================== */
const products = [
  {
    id: 1, name: "Sudadera con capucha azul real vintage con cremallera y efecto lavado",
    price: 36600.00,
    images: 
    [
      "https://kontrolledinsanity.com/cdn/shop/files/5L9A6010.png?v=1757786412&width=1080",
      "https://kontrolledinsanity.com/cdn/shop/files/IMG_3216.jpg?v=1757786412&width=1080",
      "https://kontrolledinsanity.com/cdn/shop/files/5L9A5974.png?v=1757786412&width=1080",
      "https://kontrolledinsanity.com/cdn/shop/files/IMG_0161.jpg?v=1757718205&width=1800",
      "https://kontrolledinsanity.com/cdn/shop/files/IMG_0192.jpg?v=1757718205&width=1800"
    ],
    category: 'Sudaderas',
    tallas: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 156,
    description: "Calidad de archivo, legado moderno. Ponte una prenda que te hará sentir como en casa. Nuestra sudadera con cremallera Vintage Washed está confeccionada con un algodón rígido y pesado, meticulosamente teñido y lavado en prenda para lograr una sensación de comodidad y confort desde el primer uso. No es solo una sudadera con capucha; es un testimonio de durabilidad y estilo atemporal. El clásico parche 'conserje' en el pecho luce con orgullo el nombre de la época dorada, mientras que la espalda luce un bordado impecable de alta densidad del credo de la locura controlada, anclado para siempre en nuestro año de fundación, EST. 2023. Esta es una confección de nivel reliquia, hecha para el presente."
  },
  {
    id: 2,
    name: "Pantalón corto de sudadera negro vintage lavado (OG)",
    price: 23300.00,
    images: 
    [
      "https://kontrolledinsanity.com/cdn/shop/files/5L9A5992.png?v=1757720840&width=1800",
      "https://kontrolledinsanity.com/cdn/shop/files/MAT2285.jpg?v=1758736253&width=1800",
      "https://kontrolledinsanity.com/cdn/shop/files/MAT2286.jpg?v=1758736305&width=1800"
    ],
    category: 'Shorts',
    tallas: ['S', 'M', 'L', 'XL'], 
    rating: 4.9, 
    reviews: 203, 
    description: "El concepto de comodidad, reinventado. Disfruta de tu tiempo libre con los shorts de algodón Golden Era, donde el diseño minimalista se combina con una calidad excepcional. Fabricados con algodón de primera calidad y alto gramaje, estos shorts ofrecen una sensación de suavidad y confort incomparables, combinando resistencia y una increíble suavidad al tacto. Cada par se somete a un meticuloso proceso de lavado vintage, garantizando una suavidad y comodidad excepcionales desde el primer uso." +
                  "Su diseño, intencionalmente sencillo y versátil, sirve como lienzo perfecto para el logotipo Golden Era, bordado con precisión y sutileza en la pierna. Ropa casual de alta calidad, diseñada para una comodidad suprema sin renunciar a la elegancia."
  },
  { 
    id: 3, 
    name: "Camiseta de manga corta Golden Era Desert Cola", 
    price: 23300.00, 
    images: 
    [
      "https://kontrolledinsanity.com/cdn/shop/files/5L9A6016.png?v=1757786422&width=1800",
      "https://kontrolledinsanity.com/cdn/shop/files/IMG_1896.jpg?v=1757786422&width=1800"
    ],
    category: 'Camisetas', 
    tallas: ['M', 'L', 'XL', 'XXL'],
    rating: 4.7, 
    reviews: 89, 
    description: "Donde se forja la fuerza. La camiseta Golden Era Ringer está diseñada para quienes entienden que el legado se construye con esfuerzo, no se regala. Fabricada con algodón de alta calidad y grueso, que combina resistencia con una sensación de ligereza y transpirabilidad, es la prenda ideal para tus entrenamientos. El diseño no deja lugar a dudas: un culturista levanta el imponente logotipo de Controlled Insanity, una representación clara de la lucha diaria para superar los límites físicos y mentales. Con el lema «Solo los fuertes sobreviven» y el año de fundación (2023), esta camiseta no solo se usa, sino que representa un logro. Es la expresión de tu dedicación, plasmada en algodón y sudor." 
  },
  { 
    id: 4, 
    name: "Wrist Wraps", 
    price: 15000.00, 
    images: 
    [
      "https://www.youngla.com/cdn/shop/files/935_tan_001_01_30_floor.jpg?v=1705617536&width=1800",
      "https://www.youngla.com/cdn/shop/files/935_tan_002_01_30_floor.jpg?v=1705617537&width=1800",
      "https://www.youngla.com/cdn/shop/files/01_25_24_Dorian_Belts0869.jpg?v=1706639212&width=1800",
      "https://www.youngla.com/cdn/shop/files/935_black-and-tan_001_01_30_floor.jpg?v=1706643658&width=1800",
      "https://www.youngla.com/cdn/shop/files/01_25_24_Dorian_Belts0887.jpg?v=1706643568&width=1800",
      "https://www.youngla.com/cdn/shop/files/935_olive_002_01_30_floor.jpg?v=1706643568&width=1800",
      "https://www.youngla.com/cdn/shop/files/935_olive_001_01_30_floor.jpg?v=1706643568&width=1800"
    ],
    category: 'Accesorios', 
    rating: 4.6, 
    reviews: 312, 
    description: "Descubre el poder de nuestras muñequeras reforzadas: diseñadas para mejorar tu experiencia de entrenamiento con un soporte inigualable. Disponibles en dos tallas, mediana y grande, estas muñequeras están fabricadas con la máxima precisión para satisfacer tus necesidades específicas." 
  },
  { 
    id: 5, 
    name: "RDX Cinturón de levantamiento de pesas", 
    price: 15900.00, 
    images: 
    [
      "https://m.media-amazon.com/images/I/91+ELSOw-qL._AC_SX679_.jpg",
      "https://m.media-amazon.com/images/I/81lmXi+mcAL._AC_SX679_.jpg",
      "https://m.media-amazon.com/images/I/81lmXi+mcAL._AC_SX679_.jpg",
      "https://m.media-amazon.com/images/I/81eIT4IFkhL._AC_SX679_.jpg",
      "https://m.media-amazon.com/images/I/81XZNXxawbL._AC_SX679_.jpg",

    ],
    category: 'Accesorios', 
    rating: 4.9, 
    reviews: 145, 
    description: "Cinturón de cuero genuino para levantamiento de pesas" 
  },
  { 
    id: 6, 
    name: "Botella de Agua Premium (941 - Lah Jug 2.0)", 
    price: 18000.00, 
    images: 
    [
      "https://www.youngla.com/cdn/shop/files/941_navy-blue_001_11_21_floorV2.jpg?v=1699512838&width=1800",
      "https://www.youngla.com/cdn/shop/files/941_black_001_11_02_ecomm.jpg?v=1699555974&width=1800",
      "https://www.youngla.com/cdn/shop/files/941_black-white_006_11_21_floor.jpg?v=1699555841&width=1800",
      "https://www.youngla.com/cdn/shop/files/941_black-white_001_11_21_floor.jpg?v=1699555841&width=1800",
      "https://www.youngla.com/cdn/shop/files/941_navy-blue_0014_11_21_floor.jpg?v=1699555841&width=1800",
      "https://www.youngla.com/cdn/shop/files/941_navy-blue_008_11_21_floor.jpg?v=1699555841&width=1800",
      "https://www.youngla.com/cdn/shop/files/941_navy-blue_007_11_21_floor.jpg?v=1699555841&width=1800"
    ],
    category: 'Accesorios', 
    rating: 4.5, 
    reviews: 78, 
    description: "Sacia tu sed con esta jarra Lah, que incluye dos tipos de boquilla diferentes. Tanto si prefieres beber directamente de la jarra como con pajita, esta jarra tiene todo lo que necesitas. Además, gracias a su correa de transporte, es el accesorio ideal para quienes valoran la comodidad a la hora de mantenerse hidratados, estés donde estés." 
  },
  { 
    id: 7, 
    name: "Creatina monohidrato con sabor", 
    price: 13300.00, 
    images: 
    [
      "https://dragonpharmalabs.com/cdn/shop/files/Mockup_-_Creatine_Flavored_-_Cotton_Candy_-_01_426b44b2-4112-4e25-9c92-6f0f21bd3192_720x.png?v=1757342228",
      "https://dragonpharmalabs.com/cdn/shop/files/Mockup_-_Creatine_Flavored_-_Orange_-_01_8666de23-b6cd-468c-8cf0-a7d5856442c5_720x.png?v=1757342228",
      "https://dragonpharmalabs.com/cdn/shop/files/Mockup_-_Creatine_Flavored_-_Grape_-_01_720x.png?v=1757342228"
    ],
    category: 'Suplementos', 
    rating: 4.8, 
    reviews: 524, 
    description: "El estándar de oro en suplementos de creatina: el monohidrato de creatina. Simple y sumamente eficaz, la creatina es un elemento indispensable en el arsenal de innumerables atletas, y por una buena razón. Ya sea que prefieras la versión sin sabor, la clásica, o le añadas un toque de sabor con una de nuestras creatinas con sabor, la creatina de Dragon Pharma es la mejor opción: sin complicaciones y con una eficacia total." 
  },
  { 
    id: 8, 
    name: "Proteína WHEYPHORM® - 2Lb", 
    price: 27500.00, 
    images: 
    [
      "https://dragonpharmalabs.com/cdn/shop/files/Mockup-WheyPhorm-2Lb-BirthdayCake-Pose1_bcc559b4-706d-4800-8b69-20e434a42bcf_720x.png?v=1732523043",
      "https://dragonpharmalabs.com/cdn/shop/files/RENDERS-600X600-2023_0060_Mockup-Whey-Phorm-2lbs-Dragon-Pharma-Cappuccino-Pose1_720x.png?v=1691497079",
      "https://dragonpharmalabs.com/cdn/shop/files/RENDERS-600X600-2023_0061_Mockup-Whey-Phorm-2lbs-Dragon-Pharma-Double-Chocolate-Pose1_720x.png?v=1691497079",
      "https://dragonpharmalabs.com/cdn/shop/files/NFP_-_SFP_-_Wheyphorm_-_Double_Chocolate_Brownie_720x.png?v=1741114564",
      "https://dragonpharmalabs.com/cdn/shop/files/NFP_-_SFP_-_Wheyphorm_-_Birthday_Cake_720x.png?v=1741114564",
      "https://dragonpharmalabs.com/cdn/shop/files/NFP_-_SFP_-_Wheyphorm_Cappuccino_720x.png?v=1741114564"
    ],
    category: 'Suplementos', 
    rating: 4.7, 
    reviews: 298, 
    description: "WheyPhorm de Dragon Pharma contiene 25 g de proteína de la más alta calidad por porción, ideal para después del entrenamiento o para cubrir tus necesidades diarias de proteínas cuando estás fuera de casa. WheyPhorm está compuesto por dos tipos de proteína: aislado de suero de leche y concentrado de suero de leche. Esta combinación aporta un sabor y una textura excepcionales." 
  },
  { 
    id: 9,
    name: "Pre-Entreno VENOM INFERNO BRAZO DE 50 LIMÓN", 
    price: 27500.00, 
    images: 
    [
      "https://dragonpharmalabs.com/cdn/shop/files/600x600-venom-brazo-limon_-_New_720x.png?v=1745857750",
      "https://dragonpharmalabs.com/cdn/shop/files/600x600-venom-3_720x.png?v=1745857750",
      "https://dragonpharmalabs.com/cdn/shop/files/600x600-venom-4_720x.png?v=1745857750",
      "https://dragonpharmalabs.com/cdn/shop/files/NFP_-_SFP_-_Venom_Inferno_720x.png?v=1745857750"
    ],
    category: 'Suplementos', 
    rating: 4.6, 
    reviews: 167, 
    description: "Todos compartimos el deseo incesante de realizar una sesión de entrenamiento que nos impulse al límite. Una sesión que no solo estimule el cuerpo, sino que también encienda la mente, donde la concentración absoluta y una energía ilimitada se combinan para sacar lo mejor de ti. Te presentamos VENOM INFERNO®: el pre-entrenamiento más potente jamás creado." 
  }
];

function ProductCarousel({ images = [], alt, grid = false }) {
  const [current, setCurrent] = useState(0)

  const prevImage = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))

  const nextImage = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))

  if (!images || images.length === 0) return null

  if (grid) {
    // 🔹 Modo Grid: muestra todas las imágenes a la vez
    return (
      <div className="grid grid-cols-2 gap-2 p-2">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`${alt} ${idx + 1}`}
            className="w-full h-32 object-cover rounded-lg border"
          />
        ))}
      </div>
    )
  }

  // 🔹 Modo Carrusel con miniaturas
  return (
    <div className="relative w-full h-full">
      {/* Imagen principal */}
      <img
        src={images[current]}
        alt={`${alt} ${current + 1}`}
        className="w-full h-full object-cover transition-all duration-500 rounded-t-lg"
      />

      {/* Botón anterior */}
      {images.length > 1 && (
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-1 rounded-full"
        >
          ‹
        </button>
      )}

      {/* Botón siguiente */}
      {images.length > 1 && (
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-1 rounded-full"
        >
          ›
        </button>
      )}

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-2 p-2">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`${alt} ${idx + 1}`}
              onClick={() => setCurrent(idx)}
              className={`w-12 h-12 object-cover rounded-md border cursor-pointer transition-all duration-300 ${
                current === idx
                  ? "ring-2 ring-yellow-500 scale-110"
                  : "opacity-70 hover:opacity-100"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* =====================
   Componente Store (JSX)
   ===================== */
export default function Shop() {
  const [cart, setCart] = useState([]); // array de productId
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); // cambia esto para mostrar más/menos por página

  // No hay filtrado por categoría: mostramos todos los productos
  const totalItems = products.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Aseguramos que page esté en rango si pageSize cambia
  if (page > totalPages) setPage(totalPages);

  // Productos a mostrar en la página actual (memoizado)
  const currentProducts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return products.slice(start, start + pageSize);
  }, [page, pageSize]);

  const addToCart = (productId) => {
    setCart(prev => [...prev, productId]);
  };

  const formatPrice = (p) => p.toFixed(2);

  const goToPage = (n) => {
    const next = Math.max(1, Math.min(totalPages, n));
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // sube al top para mejor UX
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Tienda Gold's Gym</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Encuentra todo lo que necesitas para tu entrenamiento: ropa de alta calidad, accesorios y suplementos.
        </p>
      </div>

      {/* Info carrito y controles de paginación */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          {cart.length > 0 ? (
            <div className="inline-flex items-center space-x-3 bg-green-50 border border-green-200 p-3 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-green-600" />
              <span>Tienes {cart.length} producto{cart.length > 1 ? 's' : ''} en tu carrito</span>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Carrito vacío</div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Mostrando <strong>{(page - 1) * pageSize + 1}</strong> - <strong>{Math.min(page * pageSize, totalItems)}</strong> de <strong>{totalItems}</strong>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm">Por página:</label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="p-2 rounded border"
            >
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid de productos (página actual) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map(product => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <ProductCarousel images={product.images} alt={product.name} />
              </div>
            </CardHeader>

            <CardContent className="p-4">
              <div className="space-y-2">
                <Badge variant="secondary" className="text-xs">
                  {product.category}
                </Badge>

                <CardTitle className="text-lg">{product.name}</CardTitle>

                <CardDescription className="text-sm">
                  {product.description}
                </CardDescription>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-2xl font-bold text-yellow-600">₡{formatPrice(product.price)}</span>
                  </div>

                  <Button onClick={() => addToCart(product.id)} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Agregar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-center space-x-2 mt-6">
        <Button onClick={() => goToPage(page - 1)} disabled={page <= 1} variant="ghost">Anterior</Button>

        {/* Números de página: limitamos a un rango visual para UX */}
        <div className="inline-flex items-center space-x-1">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const num = idx + 1;
            // mostramos todos si totalPages es pequeño; si es grande, mostramos ventana
            const showAll = totalPages <= 7;
            const windowSize = 2; // páginas a los lados del current
            if (!showAll) {
              // regla para truncar con puntos suspensivos
              if (num === 1 || num === totalPages || Math.abs(num - page) <= windowSize) {
                return (
                  <button
                    key={num}
                    onClick={() => goToPage(num)}
                    className={`px-3 py-1 rounded ${num === page ? 'bg-yellow-600 text-black' : 'bg-transparent'}`}
                  >
                    {num}
                  </button>
                );
              } else {
                // insertar ... en las transiciones sólo una vez por segmento
                // para simplificar, no hacemos detección sofisticada: 
                // renderizamos puntos en índices específicos
                if (num === 2 && page > 4) return <span key={'dots-left'} className="px-2">...</span>;
                if (num === totalPages - 1 && page < totalPages - 3) return <span key={'dots-right'} className="px-2">...</span>;
                return null;
              }
            } else {
              return (
                <button
                  key={num}
                  onClick={() => goToPage(num)}
                  className={`px-3 py-1 rounded ${num === page ? 'bg-yellow-600 text-black' : 'bg-transparent'}`}
                >
                  {num}
                </button>
              );
            }
          })}
        </div>

        <Button onClick={() => goToPage(page + 1)} disabled={page >= totalPages} variant="ghost">Siguiente</Button>
      </div>

      {/* Sección destacada */}
      <section className="bg-muted/30 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">¿Por qué elegir productos Gold's Gym?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="font-semibold mb-2">Calidad Premium</h3>
            <p className="text-sm text-muted-foreground">Todos nuestros productos pasan por rigurosos controles de calidad.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="font-semibold mb-2">Envío Gratis</h3>
            <p className="text-sm text-muted-foreground">Envío gratuito en compras superiores a ₡50000.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="font-semibold mb-2">Garantía de Satisfacción</h3>
            <p className="text-sm text-muted-foreground">30 días de garantía en todos nuestros productos.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
