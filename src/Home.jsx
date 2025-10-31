import { Award, Clock, Clock1, Grab, GroupIcon, Rocket, Trophy } from "lucide-react";
import React from "react";

const Home = ({ darkMode, texts }) => {
  if (!texts || Object.keys(texts).length === 0) return <p>Cargando...</p>;
  return (
    <div
      className="font-sans transition-colors dark:bg-gray-950 dark:text-white bg-gray-100 text-black"
    >
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center bg-[url('/src/assets/homegym.jpg')] bg-cover bg-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            {texts.marca}
          </h1>
          <p
            className="mt-4 text-lg md:text-2xl dark:text-gray-300 text-gray-200"
          >
            {texts.phrase1}
          </p>
          <button
              className="mt-6 px-6 py-3 font-bold rounded-lg shadow-lg transition 
                        dark:bg-red-800 dark:hover:bg-red-700 dark:text-white 
                        bg-yellow-500 hover:bg-yellow-700 text-black"
              >
              {texts.phrase2}
          </button>
        </div>
      </section>


    <section
      className={`grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-4 py-12`}
    >
      {/* Columna izquierda - Historia */}
      <div>
        <h2 className="text-3xl font-bold mb-4">{texts.historiaTitulo}</h2>
        <p
          className="leading-relaxed dark:text-gray-300 text-muted-foreground"
        >
          {texts.historia}
        </p>
      </div>

      {/* Columna derecha - Card + Imagen */}
      <div
        className="shadow-md rounded-2xl p-6 flex items-start gap-4 justify-center text-center dark:bg-[#0a1229] bg-white"
      >
        <span
          className="text-3xl dark:text-red-700 text-yellow-500"
        >
          🏅
        </span>
        <div>
          <h3 className="font-bold text-lg">{texts.tarjeta1Titulo}</h3>
          <p className="mt-2 dark:text-gray-300 text-gray-600">
            {texts.tarjeta1Texto}
          </p>
        </div>
      </div>

    </section>

    <section className="grid md:grid-cols-3 gap-12 h-[50vh] items-center w-full px-6 py-4 bg-gray-100 dark:bg-gray-950 rounded-none">
      {/* Card 1 */}
      <div className="shadow-md rounded-2xl p-6 flex items-start gap-6 justify-center text-center dark:bg-slate-900 bg-black"
      >
        <span className="text-3xl dark:text-white text-yellow-500"><Trophy/></span>
        <div>
          <h3 className="font-bold text-lg text-yellow-500 dark:text-white"> {texts.tarjeta2Titulo}</h3>
          <p className="mt-2 text-gray-200">
            {texts.tarjeta2Texto}
          </p>
        </div>
      </div>
      {/* Card 2 */}
      <div className="shadow-md rounded-2xl p-6 flex items-start gap-6 justify-center text-center dark:bg-slate-900 bg-black"
      >
        <span className="text-3xl dark:text-white text-yellow-500"><GroupIcon/></span>
        <div>
          <h3 className="font-bold text-lg text-yellow-500 dark:text-white"> {texts.tarjeta3Titulo}</h3>
          <p className="mt-2 text-gray-200">
            {texts.tarjeta3Texto}
          </p>
        </div>
      </div>
      {/* Card 3 */}
      <div className="shadow-md rounded-2xl p-6 flex items-start gap-6 justify-center text-center dark:bg-slate-900 bg-black"
      >
        <span className="text-3xl dark:text-white text-yellow-500"><Clock/></span>
        <div>
          <h3 className="font-bold text-lg text-yellow-500 dark:text-white">{texts.tarjeta4Titulo}</h3>
          <p className="mt-2 text-gray-200">
            {texts.tarjeta4Texto}
          </p>
        </div>
      </div>
    </section>

      {/* Footer */}
      <footer
        className={`py-10 text-center ${
          darkMode ? "bg-[#0a1229] text-gray-400" : "bg-black text-gray-400"
        }`}
      >
        <p>&copy;{new Date().getFullYear()} {texts.footer}</p>
      </footer>
    </div>
  );
};

export default Home;
