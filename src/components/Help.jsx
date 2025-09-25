import React, { useMemo, useState } from "react";
import { HelpCircle, Mail, X } from "lucide-react";


export default function Help({ onClose } = {}) {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = useMemo(
    () => [
      {
        q: "¿Cómo navego por la app?",
        a: "Usa la barra de navegación superior para moverte entre Home, Training, Shop y Find."
      },
      {
        q: "¿Cómo empiezo una rutina?",
        a: "Selecciona 'Rutinas' y crea una nueva rutina con los ejercicios que quieras. Guarda para usarla luego."
      },
      {
        q: "¿Puedo cambiar unidades (kg / lb)?",
        a: "Sí: en Ajustes (perfil) puedes seleccionar las unidades preferidas."
      },
      {
        q: "¿Cómo contacto soporte?",
        a: "Envía un email a soporte@gymapp.example o usa la sección de ayuda dentro de la app."
      }
    ],
    []
  );

  const filtered = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      f.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white dark:bg-slate-900 rounded-lg shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-sky-600" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Ayuda</h2>
        </div>
        <button
          aria-label="Cerrar ayuda"
          onClick={() => onClose && onClose()}
          className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
      </div>

      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar preguntas frecuentes..."
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 dark:bg-slate-800 dark:border-slate-700"
        />
      </div>

      <div className="space-y-3 mb-4">
        {filtered.length === 0 ? (
          <p className="text-sm text-slate-500">No se encontraron resultados para "{query}"</p>
        ) : (
          filtered.map((f, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border rounded overflow-hidden dark:border-slate-700">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left bg-white dark:bg-slate-900"
                >
                  <span className="font-medium text-slate-800 dark:text-slate-100">{f.q}</span>
                  <span className="text-slate-500">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="pt-4 border-t dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-sky-600" />
          <div>
            <div className="text-sm text-slate-800 dark:text-slate-100">¿Necesitas más ayuda?</div>
            <a href="mailto:rte@gymappsopo.example" className="text-sm text-sky-600 hover:underline">
              soporte@gymapp.example
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}