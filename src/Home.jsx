import React from "react";

const Home = ({ darkMode }) => {
  return (
    <div
      className={`font-sans transition-colors ${
        darkMode ? "bg-[#010a1c] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center bg-[url('/src/assets/homegym.jpg')] bg-cover bg-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            JAGUAR FITNESS
          </h1>
          <p
            className={`mt-4 text-lg md:text-2xl ${
              darkMode ? "text-gray-300" : "text-gray-200"
            }`}
          >
            Entrena con calidad
          </p>
          <button
            className={`mt-6 px-6 py-3 font-bold rounded-lg shadow-lg transition ${
              darkMode
                ? "bg-red-800 hover:bg-red-700 text-white"
                : "bg-yellow-500 hover:bg-yellow-600 text-black"
            }`}
          >
            ¡Encuentra tu sede!
          </button>
        </div>
      </section>


    <section
      className={`grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-4 py-12`}
    >
      {/* Columna izquierda - Historia */}
      <div>
        <h2 className="text-3xl font-bold mb-4">Nuestra Historia</h2>
        <p
          className={`leading-relaxed ${
            darkMode ? "text-gray-300" : "text-muted-foreground"
          }`}
        >
          Jaguar Fitness nació con la visión de convertirse en más que un gimnasio:
          un espacio donde la disciplina, la fuerza y la comunidad se unieran. Desde
          sus inicios, inspirados en la energía y la majestuosidad del jaguar, el
          centro ha buscado motivar a cada persona a superar sus límites y alcanzar
          sus metas de bienestar. Con un enfoque en la innovación y el acompañamiento
          personalizado, Jaguar Fitness ha crecido hasta consolidarse como un lugar
          de referencia para quienes buscan transformar su cuerpo y su mente, siempre
          en un ambiente de respeto, motivación y constancia.
        </p>
      </div>

      {/* Columna derecha - Card + Imagen */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        {/* Imagen de fondo */}
        <img
          src="/src/assets/patron1.png"
          alt="Patrón Jaguar Fitness"
          className="w-full h-64 object-cover"
        />

        {/* Card encima de la imagen */}
        <div
          className={`absolute top-0 left-0 right-0 mx-4 -translate-y-6 shadow-md rounded-2xl p-6 flex items-start gap-4 ${
            darkMode ? "bg-[#0a1229]" : "bg-white"
          }`}
        >
          <span
            className={`text-3xl ${
              darkMode ? "text-red-700" : "text-yellow-500"
            }`}
          >
            🏅
          </span>
          <div>
            <h3 className="font-bold text-lg">Calidad Comprobada</h3>
            <p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Equipos de última generación y <br /> instalaciones de clase mundial en
              todas nuestras sedes.
            </p>
          </div>
        </div>
      </div>
    </section>


      {/* Footer */}
      <footer
        className={`py-10 text-center ${
          darkMode ? "bg-[#0a1229] text-gray-400" : "bg-black text-gray-400"
        }`}
      >
        <p>&copy; 2025 Jaguar Fitness. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
