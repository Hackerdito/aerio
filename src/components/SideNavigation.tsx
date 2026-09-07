import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Home, 
  Layers, 
  Terminal, 
  BookOpen, 
  Info, 
  Mail, 
  Download, 
  ArrowRight, 
  Sparkles,
  Apple
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SideNavigationProps {
  onDownload: (e: React.MouseEvent) => void;
  downloading?: boolean;
}

export default function SideNavigation({ onDownload, downloading = false }: SideNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Check prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Lock body scroll and manage keyboard accessibility (Escape, Focus Trap)
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Focus close button initially
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
        }

        // Focus trap
        if (e.key === 'Tab' && drawerRef.current) {
          const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      // When closing, return focus to trigger
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  const navItems = [
    {
      label: 'Inicio',
      href: '#inicio',
      icon: Home,
      desc: 'Vista principal y presentación'
    },
    {
      label: 'Funciones',
      href: '#funciones',
      icon: Layers,
      desc: 'Cachés, disco, desinstalación y red'
    },
    {
      label: 'Cómo funciona',
      href: '#como-funciona',
      icon: Terminal,
      desc: 'Arquitectura y mantenimiento seguro'
    },
    {
      label: 'Blog',
      href: '#blog',
      icon: BookOpen,
      desc: 'Notas técnicas y optimización macOS'
    },
    {
      label: 'Acerca de Aerio',
      href: '#acerca-de',
      icon: Info,
      desc: 'Filosofía, créditos y desarrollo'
    },
    {
      label: 'Contacto',
      href: '#contacto',
      icon: Mail,
      desc: 'Soporte directo y retroalimentación'
    }
  ];

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      // update hash without jarring jump
      window.history.pushState(null, '', href);
    } else if (href === '#inicio') {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      window.history.pushState(null, '', '#');
    }
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    setIsOpen(false);
    onDownload(e);
  };

  return (
    <>
      {/* Botón flotante discreto en la esquina superior izquierda (NO forma parte de una barra horizontal tradicional) */}
      <div className="fixed top-5 left-5 md:top-6 md:left-8 z-50 flex items-center gap-3">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          aria-controls="aerio-side-navigation"
          className={cn(
            "group relative h-11 px-3.5 sm:px-4 rounded-2xl flex items-center gap-2.5 transition-all duration-300",
            "bg-black/40 hover:bg-white/10 active:scale-95",
            "backdrop-blur-xl border border-white/15 hover:border-white/30",
            "text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
            isOpen && "bg-white/20 border-white/40 shadow-purple-500/20"
          )}
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Menu className="w-5 h-5 text-white/90 group-hover:text-white" />
            </motion.div>
            <motion.div
              animate={{ rotate: isOpen ? 0 : -90, scale: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <X className="w-5 h-5 text-white" />
            </motion.div>
          </div>
          <span className="text-sm font-medium text-white/90 group-hover:text-white hidden sm:inline-block tracking-tight">
            {isOpen ? 'Cerrar' : 'Menú'}
          </span>
        </button>

        {/* Pequeño logo de Aerio sutil junto al botón para identidad visual elegante sin barra tradicional */}
        <a 
          href="#inicio"
          onClick={(e) => handleNavClick('#inicio', e)}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 backdrop-blur-md transition-all text-white/80 hover:text-white group"
          title="Aerio - Inicio"
        >
          <div className="w-6 h-6 rounded-[6px] overflow-hidden bg-white/5 flex items-center justify-center border border-white/10">
            <img src="https://aerio-three.vercel.app/aerio.png" alt="Aerio Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-white/90 group-hover:text-white">Aerio</span>
        </a>
      </div>

      {/* Menú lateral desplegable y Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex">
            {/* Capa oscura y ligeramente transparente sobre el contenido restante (Backdrop) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md z-[100]"
              aria-hidden="true"
            />

            {/* Panel lateral que sale únicamente desde el lado izquierdo */}
            <motion.aside
              ref={drawerRef}
              id="aerio-side-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Navegación principal de Aerio"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: 'spring', damping: 30, stiffness: 320 }
              }
              className={cn(
                "relative z-[101] h-full flex flex-col justify-between overflow-hidden",
                "w-[88vw] sm:w-[360px] md:w-[370px]",
                "bg-[#0d0914]/95 backdrop-blur-2xl border-r border-white/10",
                "shadow-[25px_0_70px_rgba(0,0,0,0.8)] selection:bg-purple-500/30"
              )}
            >
              {/* Resplandor decorativo sutil en la parte superior */}
              <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-purple-600/10 via-blue-600/5 to-transparent pointer-events-none" />

              {/* Cabecera del panel */}
              <div className="relative p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[12px] overflow-hidden bg-white/5 flex items-center justify-center border border-white/15 shadow-inner">
                    <img src="https://aerio-three.vercel.app/aerio.png" alt="Aerio Logo" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-white tracking-tight">Aerio</span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#ff007f]/15 text-[#ff007f] border border-[#ff007f]/30 rounded-full">
                        v5.0
                      </span>
                    </div>
                    <p className="text-xs text-white/50 font-medium">Mantenimiento para Mac</p>
                  </div>
                </div>

                {/* Botón visible para cerrar */}
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Cerrar menú"
                  className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lista de enlaces organizados verticalmente */}
              <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2 custom-scrollbar">
                <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                  Navegación
                </div>

                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(item.href, e)}
                      className={cn(
                        "group min-h-[48px] px-3.5 py-3 rounded-2xl flex items-center justify-between",
                        "transition-all duration-200",
                        "text-white/80 hover:text-white hover:bg-white/[0.07] active:bg-white/[0.12]",
                        "border border-transparent hover:border-white/10",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      )}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-white/[0.04] group-hover:bg-white/[0.1] border border-white/5 group-hover:border-white/15 flex items-center justify-center shrink-0 transition-colors">
                          <Icon className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-left truncate">
                          <div className="font-semibold text-[15px] leading-snug tracking-tight text-white/90 group-hover:text-white">
                            {item.label}
                          </div>
                          <div className="text-xs text-white/45 truncate">
                            {item.desc}
                          </div>
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                    </a>
                  );
                })}
              </nav>

              {/* Pie del panel con acción principal destacada: "Descargar Aerio" */}
              <div className="p-5 border-t border-white/10 bg-black/40 backdrop-blur-xl flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-white/50 px-1">
                  <span className="flex items-center gap-1.5">
                    <Apple className="w-3.5 h-3.5 text-white/70" />
                    macOS 13 Ventura+
                  </span>
                  <span className="text-[11px] font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                    Universal (M-Series & Intel)
                  </span>
                </div>

                {/* Botón principal "Descargar Aerio" */}
                <button
                  type="button"
                  onClick={handleDownloadClick}
                  className={cn(
                    "relative group w-full min-h-[52px] py-3.5 px-5 rounded-2xl font-bold text-white",
                    "flex items-center justify-center gap-3 overflow-hidden shadow-xl transition-all duration-300",
                    "bg-gradient-to-r from-[#075CFF] to-[#3B82F6] hover:from-[#0051e6] hover:to-[#2563eb]",
                    "shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.01] active:scale-[0.98]",
                    "border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  )}
                >
                  {/* Brillo dinámico en hover */}
                  <span className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-out rounded-2xl pointer-events-none" />

                  <Download className={cn("w-5 h-5 text-white shrink-0", downloading && "animate-bounce")} />
                  <span className="tracking-tight text-base font-semibold">
                    {downloading ? 'Descargando...' : 'Descargar Aerio'}
                  </span>
                </button>

                <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-white/40">
                  <span>Versión 5.0 Oficial</span>
                  <span>•</span>
                  <span>100% Gratuito</span>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
