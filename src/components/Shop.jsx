import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ShoppingCart, Star, Filter } from "lucide-react";

/* =====================
   Componente Carrusel
   ===================== */
function ProductCarousel({ images = [], alt, grid = false }) {
  const [current, setCurrent] = useState(0);

  const prevImage = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const nextImage = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  if (!images || images.length === 0) return null;

  if (grid) {
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
    );
  }

  return (
    <div className="relative w-full h-full">
      <img
        src={images[current]}
        alt={`${alt} ${current + 1}`}
        className="w-full h-full object-cover transition-all duration-500 rounded-t-lg"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-1 rounded-full"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-1 rounded-full"
          >
            ›
          </button>
        </>
      )}
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
  );
}

/* =====================
   Componente Store
   ===================== */
export default function Shop({ darkMode }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* 🔹 Cargar productos desde Azure API */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("https://cla-royale.azure-api.net/jf/store"); 
        if (!res.ok) throw new Error(texts.errCrg);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* 🔹 Paginación */
  const totalItems = products.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  if (page > totalPages) setPage(totalPages);

  const currentProducts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return products.slice(start, start + pageSize);
  }, [page, pageSize, products]);

  const addToCart = (productId) => setCart((prev) => [...prev, productId]);
  const formatPrice = (p) => p.toFixed(2);

  const goToPage = (n) => {
    const next = Math.max(1, Math.min(totalPages, n));
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">{texts.strTitle}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {texts.strText}
        </p>
      </div>

      {/* Estado de carga / error */}
      {loading && <p className="text-center">{texts.cargando}</p>}
      {error && (
        <p className="text-center text-red-600">
          {texts.errCrg}: {error}
        </p>
      )}

      {!loading && !error && (
        <>
          {/* Info carrito y paginación */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              {cart.length > 0 ? (
                <div className="inline-flex items-center space-x-3 bg-green-50 border border-green-200 p-3 rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-green-600" />
                  <span>
                    Tienes {cart.length} producto
                    {cart.length > 1 ? "s" : ""} en tu carrito
                  </span>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">{texts.emptyCart}</div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                {texts.showinng}{" "}
                <strong>{(page - 1) * pageSize + 1}</strong> -{" "}
                <strong>{Math.min(page * pageSize, totalItems)}</strong> {texts.of}{" "}
                <strong>{totalItems}</strong>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm">{texts.xpag}</label>
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

          {/* Grid de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-shadow"
              >
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
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className={`${darkMode ? "text-2xl font-bold text-red-900" : "text-2xl font-bold text-yellow-600"} `}>
                          ₡{formatPrice(product.price)}
                        </span>
                      </div>
                      <Button
                        onClick={() => addToCart(product.id)}
                        className={`${darkMode ? "bg-red-800 hover:bg-gray-700 text-white" : "bg-yellow-500 hover:bg-yellow-600 text-black"}`}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {texts.addCart}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Paginación */}
          <div className="flex items-center justify-center space-x-2 mt-6">
            <Button
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1}
              variant="ghost"
            >
              {texts.ant}
            </Button>
            <div className="inline-flex items-center space-x-1">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const num = idx + 1;
                return (
                  <button
                    key={num}
                    onClick={() => goToPage(num)}
                    className={`px-3 py-1 rounded ${
                      num === page
                        ? darkMode
                          ? "bg-red-800 text-white"
                          : "bg-yellow-500 text-black"
                        : "bg-transparent"
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
            <Button
              onClick={() => goToPage(page + 1)}
              disabled={page >= totalPages}
              variant="ghost"
            >
              {texts.sig}
            </Button>
          </div>
        </>
      )}
      {/* Sección destacada */}
      <section className="bg-muted/30 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">{texts.strCardsTitle}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4: w-16 h-16 bg-red-800/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-yellow-500: w-8 h-8 text-red-800" />
            </div>
            <h3 className="font-semibold mb-2">{strC1title}</h3>
            <p className="text-sm text-muted-foreground">{texts.strC1Text}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4: w-16 h-16 bg-red-800/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-yellow-500: w-8 h-8 text-red-800" />
            </div>
            <h3 className="font-semibold mb-2">{texts.strC2title}</h3>
            <p className="text-sm text-muted-foreground">{texts.strC2Text}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4: w-16 h-16 bg-red-800/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-yellow-500: w-8 h-8 text-red-800" />
            </div>
            <h3 className="font-semibold mb-2">{texts.strC3title}</h3>
            <p className="text-sm text-muted-foreground">{texts.strC3Text}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
