import React from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  showBack?: boolean;
}

export default function PageHeader({ showBack = true }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-black/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {showBack && (
            <Link
              to="/"
              className="p-2 -ml-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Volver a Inicio"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
          )}

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center border border-white/15 p-0.5">
              <img src="/aerio.png" alt="Aerio Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-base text-white tracking-tight">Aerio</span>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
              v5.0
            </span>
          </Link>
        </div>

        <nav aria-label="Navegación secundaria" className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70">
          <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
          <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link to="/acerca" className="hover:text-white transition-colors">Acerca de</Link>
          <Link to="/contacto" className="hover:text-white transition-colors">Contacto</Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://aerio.website/Builds/Aerio-5.0.zip"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Aerio 5.0</span>
          </a>
        </div>
      </div>
    </header>
  );
}
