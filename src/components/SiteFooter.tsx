import React from 'react';
import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="relative z-10 mt-24 pt-16 pb-14 px-6 border-t border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center border border-white/15 p-1 group-hover:scale-105 transition-transform">
              <img src="/aerio.png" alt="Aerio Logo" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <span className="font-bold text-lg text-white tracking-tight">Aerio</span>
              <span className="ml-2 px-2 py-0.5 text-[11px] font-semibold bg-white/10 text-white/80 border border-white/15 rounded-full">
                v5.0
              </span>
              <p className="text-xs text-white/40">Limpiador seguro para Mac (Apple Silicon & Intel)</p>
            </div>
          </Link>
          <p className="text-xs text-white/50 max-w-sm">
            Creado de forma independiente por <strong>Gerardo Rodríguez (Hackerdito)</strong> en Ciudad de México.
          </p>
        </div>

        <nav aria-label="Enlaces del pie de página" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-white/70">
          <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
          <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link to="/acerca" className="hover:text-white transition-colors">Acerca de</Link>
          <Link to="/contacto" className="hover:text-white transition-colors">Contacto</Link>
          <Link to="/privacidad" className="hover:text-white transition-colors">Privacidad</Link>
          <Link to="/terminos" className="hover:text-white transition-colors">Términos</Link>
          <a href="https://gerardodg.art" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">gerardodg.art</a>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
        <div>
          © {new Date().getFullYear()} Aerio. Todos los derechos reservados.
        </div>
        <div className="flex items-center gap-4">
          <span>macOS 13 Ventura o superior</span>
          <span>•</span>
          <a href="mailto:gerito.diseno@gmail.com" className="hover:text-white transition-colors">gerito.diseno@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}
