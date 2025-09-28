import { Award, Clock, Clock1, Grab, GroupIcon, Rocket, Trophy } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ darkMode }) => {
  return (
    <div
      className="font-sans transition-colors dark:bg-gray-950 dark:text-white bg-gray-100 text-black"
    >
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center bg-[url('/src/assets/homegym.jpg')] bg-cover bg-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            JAGUAR FITNESS
          </h1>
          <p
            className="mt-4 text-lg md:text-2xl dark:text-gray-300 text-gray-200"
          >
            Entrena con calidad
          </p>
          <button
            onClick={() => user ? navigate("/find") : alert("Debes iniciar sesión")}
              className="mt-6 px-6 py-3 font-bold rounded-lg shadow-lg transition 
                        dark:bg-red-800 dark:hover:bg-red-700 dark:text-white 
                        bg-yellow-500 hover:bg-yellow-700 text-black"
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
          className="leading-relaxed dark:text-gray-300 text-muted-foreground"
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
      <div
        className="shadow-md rounded-2xl p-6 flex items-start gap-4 justify-center text-center dark:bg-[#0a1229] bg-white"
      >
        <span
          className="text-3xl dark:text-red-700 text-yellow-500"
        >
          🏅
        </span>
        <div>
          <h3 className="font-bold text-lg">Calidad Comprobada</h3>
          <p className="mt-2 dark:text-gray-300 text-gray-600">
            Equipos de última generación y <br /> instalaciones de clase mundial en
            todas nuestras sedes.
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
          <h3 className="font-bold text-lg text-yellow-500 dark:text-white"> Entrenamiento personal</h3>
          <p className="mt-2 text-gray-200">
            Contamos con los mejores entrenadores certificados para guiarte que te ayudarán a alcanzar tus objetivos con planes especificos.
          </p>
        </div>
      </div>
      {/* Card 2 */}
      <div className="shadow-md rounded-2xl p-6 flex items-start gap-6 justify-center text-center dark:bg-slate-900 bg-black"
      >
        <span className="text-3xl dark:text-white text-yellow-500"><GroupIcon/></span>
        <div>
          <h3 className="font-bold text-lg text-yellow-500 dark:text-white"> Clases grupales</h3>
          <p className="mt-2 text-gray-200">
            Amplia variedad de clases en conjunto para entrenar o complementar tus rutinas de entrenamiento.
          </p>
        </div>
      </div>
      {/* Card 3 */}
      <div className="shadow-md rounded-2xl p-6 flex items-start gap-6 justify-center text-center dark:bg-slate-900 bg-black"
      >
        <span className="text-3xl dark:text-white text-yellow-500"><Clock/></span>
        <div>
          <h3 className="font-bold text-lg text-yellow-500 dark:text-white"> Acceso 24/7</h3>
          <p className="mt-2 text-gray-200">
            Acceso a nuestras instalaciones en cualquier momento del día para que puedas entrenar cuando más te convenga.
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
        <p>&copy; 2025 Jaguar Fitness. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
