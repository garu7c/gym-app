import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShoppingCart, Star, Filter } from 'lucide-react';

/* =====================
   Datos de productos
   ===================== */
const products = [
  { id: 1, name: "Camiseta Gold's Gym Classic", price: 29.99, image: "https://images.unsplash.com/photo-1643622782660-30dedcd8d75a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwY2xvdGhpbmclMjBhcHBhcmVsJTIwd29ya291dCUyMGdlYXJ8ZW58MXx8fHwxNzU4MTQ5MTYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", category: 'clothing', rating: 4.8, reviews: 156, description: "Camiseta de algodón premium con logo clásico de Gold's Gym" },
  { id: 2, name: "Leggings de Alto Rendimiento", price: 49.99, image: "https://images.unsplash.com/photo-1643622782660-30dedcd8d75a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwY2xvdGhpbmclMjBhcHBhcmVsJTIwd29ya291dCUyMGdlYXJ8ZW58MXx8fHwxNzU4MTQ5MTYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", category: 'clothing', rating: 4.9, reviews: 203, description: "Leggings con tecnología de compresión para máximo rendimiento" },
  { id: 3, name: "Sudadera con Capucha", price: 69.99, image: "https://images.unsplash.com/photo-1643622782660-30dedcd8d75a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwY2xvdGhpbmclMjBhcHBhcmVsJTIwd29ya291dCUyMGdlYXJ8ZW58MXx8fHwxNzU4MTQ5MTYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", category: 'clothing', rating: 4.7, reviews: 89, description: "Sudadera cómoda perfecta para entrenamientos y uso casual" },
  { id: 4, name: "Guantes de Entrenamiento Pro", price: 24.99, image: "https://images.unsplash.com/photo-1676312827534-21947df045ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBhY2Nlc3NvcmllcyUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTgxNDkxNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", category: 'accessories', rating: 4.6, reviews: 312, description: "Guantes con agarre superior y protección de palma" },
  { id: 5, name: "Cinturón de Levantamiento", price: 89.99, image: "https://images.unsplash.com/photo-1676312827534-21947df045ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBhY2Nlc3NvcmllcyUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTgxNDkxNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", category: 'accessories', rating: 4.9, reviews: 145, description: "Cinturón de cuero genuino para levantamiento de pesas" },
  { id: 6, name: "Botella de Agua Premium", price: 19.99, image: "https://images.unsplash.com/photo-1676312827534-21947df045ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBhY2Nlc3NvcmllcyUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTgxNDkxNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", category: 'accessories', rating: 4.5, reviews: 78, description: "Botella térmica de acero inoxidable con logo Gold's Gym" },
  { id: 7, name: "Proteína Whey Premium 2kg", price: 89.99, image: "https://images.unsplash.com/photo-1693996045838-980674653385?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwcG93ZGVyJTIwc3VwcGxlbWVudHMlMjBib3R0bGVzfGVufDF8fHx8MTc1ODA1ODg5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", category: 'supplements', rating: 4.8, reviews: 524, description: "Proteína de suero de alta calidad con 25g de proteína por porción" },
  { id: 8, name: "Creatina Monohidrato 500g", price: 34.99, image: "https://images.unsplash.com/photo-1693996045838-980674653385?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwcG93ZGVyJTIwc3VwcGxlbWVudHMlMjBib3R0bGVzfGVufDF8fHx8MTc1ODA1ODg5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", category: 'supplements', rating: 4.7, reviews: 298, description: "Creatina pura para aumentar fuerza y rendimiento" },
  { id: 9, name: "Pre-Entreno Explosivo", price: 44.99, image: "https://images.unsplash.com/photo-1693996045838-980674653385?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwcG93ZGVyJTIwc3VwcGxlbWVudHMlMjBib3R0bGVzfGVufDF8fHx8MTc1ODA1ODg5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", category: 'supplements', rating: 4.6, reviews: 167, description: "Fórmula avanzada para máxima energía y concentración" }
];

/* =====================
   Componente Store (JSX)
   ===================== */
export default function Store() {
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
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
                    <span className="text-2xl font-bold text-yellow-600">${formatPrice(product.price)}</span>
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
            <p className="text-sm text-muted-foreground">Envío gratuito en compras superiores a $75.</p>
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
