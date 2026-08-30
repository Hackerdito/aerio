import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Shield, Database, Apple, Cpu, Coffee, History, CheckCircle2, Trash2, Layers, Terminal, Zap, Globe, FileSearch, Info, Lock, ArrowRight } from 'lucide-react';
import { cn } from './lib/utils';

export default function LandingPage() {
  const [downloading, setDownloading] = useState(false);
  const [showAllVersions, setShowAllVersions] = useState(false);

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    setDownloading(true);
    const link = document.createElement('a');
    link.href = `https://aerio-three.vercel.app/Builds/Aerio-4.2.zip`;
    link.download = `Aerio-4.2.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 2000);
  };

  const versionHistory = [
    { version: "4.2 — Actual", features: ["DNS ahora aparece debajo de Probar velocidad, ocupando su propia fila.", "Al escanear aplicaciones aparece una lupa orbitando con indicador de progreso.", "Al buscar archivos grandes aparece su propia animación.", "Al buscar actualizaciones aparece un indicador animado dentro del círculo.", "Cada animación funciona únicamente durante su operación.", "Historial de Créditos actualizado.", "Icono oficial conservado."] },
    { version: "3.9", features: ["Sincronización automática del número de versión en toda la interfaz.", "Versión correcta en el menú lateral, Inicio, barra superior, terminal y Créditos.", "Preparación del sistema de actualizaciones para futuras versiones."] },
    { version: "3.8", features: ["Créditos simplificados para mostrar únicamente el número de versión.", "Espacio libre del disco visible en verde desde el panel principal.", "Conservación del icono oficial de Aerio."] },
    { version: "3.7", features: ["Dirección del canal de actualizaciones oculta en la terminal.", "Medición de Internet directamente desde Inicio.", "Animaciones independientes para velocidad de Internet y limpieza DNS.", "Modo administrador opcional para liberar memoria y reiniciar DNS.", "Nuevo sitio oficial agregado a Créditos."] },
    { version: "3.6", features: ["“Hackerdito” añadido a la animación de inicio.", "Nuevo centro de actualizaciones.", "Porcentaje real durante las descargas.", "Fases visuales de descarga, verificación e instalación.", "Opciones para descargar o instalar automáticamente.", "Respaldo de la versión anterior antes del reemplazo."] },
    { version: "3.5", features: ["Nueva animación al abrir Aerio.", "Guía para conceder Acceso total al disco.", "Medición de Internet iniciada directamente desde el panel.", "Análisis profundo de cachés de aplicaciones y Adobe.", "Sistema de actualizaciones integrado."] },
    { version: "3.4", features: ["Mejor alineación de las características del Mac, RAM y disco.", "Detección ampliada de la Papelera.", "Revisión de la Papelera del usuario y de volúmenes externos."] },
    { version: "3.3", features: ["Resultados de descarga y subida mostrados en Mbps.", "Números animados durante la prueba de velocidad.", "Cálculo autorizado del tamaño y cantidad de elementos en la Papelera.", "Primer canal remoto de actualizaciones."] },
    { version: "3.2", features: ["Consulta de la Papelera mediante Finder.", "Botón manual para actualizar su tamaño.", "Tarjetas del panel principal reorganizadas.", "Icono oficial de Aerio fijado permanentemente."] },
    { version: "3.1", features: ["Inicio reorganizado en un solo panel.", "Secciones integradas de RAM, Internet, disco y Papelera.", "Análisis animado del tamaño de las cachés.", "Historial de versiones dentro de la aplicación."] },
    { version: "3.0.1", features: ["Icono multirresolución corregido.", "Prueba de Internet reparada.", "Progreso visible y resultados reales de conexión."] },
    { version: "3.0", features: ["Cambio oficial de nombre a Aerio.", "Información del modelo, procesador, arquitectura, macOS, RAM y disco.", "Herramientas de DNS, velocidad de Internet y Papelera.", "Créditos para Hackerdito y gerardodg.art."] },
    { version: "2.0", features: ["Nueva interfaz profesional oscura.", "Terminal visual integrada.", "Registro detallado de las operaciones realizadas."] },
    { version: "1.0", features: ["Primera versión de Aerio.", "Limpieza segura de cachés del usuario.", "Desinstalación de aplicaciones mediante la Papelera.", "Revisión de archivos grandes y antiguos.", "Exclusiones para proteger documentos, preferencias y datos importantes."] }
  ];

  const features = [
    { icon: <Layers className="w-6 h-6 text-purple-400" />, title: "Limpieza profunda de cachés", desc: "Limpieza segura de cachés de usuario, con detección especial de cachés de aplicaciones, contenedores y Adobe." },
    { icon: <FileSearch className="w-6 h-6 text-blue-400" />, title: "Revisión de archivos", desc: "Análisis y revisión de archivos grandes y antiguos antes de moverlos o eliminarlos." },
    { icon: <Trash2 className="w-6 h-6 text-pink-400" />, title: "Desinstalación segura", desc: "Desinstalación de aplicaciones de forma recuperable mediante la Papelera de tu sistema." },
    { icon: <Database className="w-6 h-6 text-green-400" />, title: "Estado del sistema", desc: "Información detallada de la memoria RAM, disco y el espacio disponible en tiempo real." },
    { icon: <Globe className="w-6 h-6 text-cyan-400" />, title: "Diagnóstico de red", desc: "Medición de velocidad de descarga, subida, respuesta de Internet y reinicio opcional de DNS." },
    { icon: <Zap className="w-6 h-6 text-yellow-400" />, title: "Actualizaciones integradas", desc: "Sistema integrado con fases de descarga, progreso, verificación e instalación segura." }
  ];

  const screenshots = [
    "https://aerio-three.vercel.app/img/1.png",
    "https://aerio-three.vercel.app/img/2.png", 
    "https://aerio-three.vercel.app/img/3.png",
    "https://aerio-three.vercel.app/img/4.png", 
    "https://aerio-three.vercel.app/img/5.png", 
    "https://aerio-three.vercel.app/img/6.png"
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 font-sans pb-12 overflow-x-hidden relative">
      
      {/* Static Background Image */}
      <div 
        className="absolute top-0 left-0 w-full h-[95vh] md:h-[900px] z-0 bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: "url('https://aerio-three.vercel.app/bg.png')" }}
      >
        {/* Gradient fading to pure black at the bottom to blend with the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black pointer-events-none" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-between items-center bg-black/20 backdrop-blur-2xl border-b border-white/5 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-2 md:px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center border border-white/10">
               <img src="https://aerio-three.vercel.app/aerio.png" alt="Aerio Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-medium text-xl text-white">Aerio</span>
          </div>

          <a 
            href="https://ko-fi.com/hackerdito" 
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 transition-all backdrop-blur-md text-white text-sm font-medium"
          >
            <Coffee className="w-4 h-4 text-yellow-500" />
            <span className="hidden sm:inline">Invítame un café</span>
            <span className="sm:hidden">Apoyar</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-36 md:pt-48 pb-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Column - Text & Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            className="w-full lg:w-[60%] flex flex-col items-start text-left mt-8 lg:mt-0"
          >
            <h1 className="text-5xl md:text-[64px] lg:text-[72px] font-bold mb-6 tracking-tight text-white leading-[1.05]">
              Tu Mac,<br />
              más clara<br />
              y bajo control.
            </h1>
            <p className="text-lg md:text-xl text-white/60 mb-10 max-w-[420px] font-medium leading-relaxed">
              Mantenimiento seguro y visual para Mac con chips M1 y posteriores.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
              <motion.button 
                type="button"
                onClick={handleDownload}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 500, damping: 25, mass: 0.8 }}
                className={cn(
                  "relative group px-6 py-3 md:px-8 md:py-4 rounded-[30px] flex items-center justify-center overflow-hidden shadow-lg transition-colors duration-500",
                  downloading ? "bg-[#00ff88] text-black shadow-[#00ff88]/20 min-w-[200px]" : "bg-[#075CFF] hover:bg-blue-600 text-white shadow-blue-500/20"
                )}
                layout
              >
                {/* Subtle shine effect on hover */}
                {!downloading && <span className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-out rounded-[30px] pointer-events-none" />}
                
                <AnimatePresence mode="wait">
                  {downloading ? (
                    <motion.div
                      key="downloading"
                      initial={{ opacity: 0, y: 15, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 relative z-10"
                    >
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
                      <span className="font-bold text-base md:text-lg">¡Descargando!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, y: 15, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 relative z-10"
                    >
                      <span className="font-medium text-base md:text-lg">Descargar Aerio 4.2</span>
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-4 py-2.5 md:px-5 md:py-3 rounded-full border border-white/20 text-white/90 text-xs md:text-sm font-medium flex items-center gap-2 backdrop-blur-md bg-white/5">
                    <Apple className="w-3 h-3 md:w-4 md:h-4" /> macOS 13+
                  </span>
                  <span className="px-4 py-2.5 md:px-5 md:py-3 rounded-full border border-white/20 text-white/90 text-xs md:text-sm font-medium flex items-center gap-2 backdrop-blur-md bg-white/5">
                    <Cpu className="w-3 h-3 md:w-4 md:h-4" /> Apple Silicon
                  </span>
                  
                  {/* Intel Beta Badge */}
                  <div className="relative group">
                    <span className="px-4 py-2.5 md:px-5 md:py-3 rounded-full border border-[#f5a623]/30 text-[#f5a623] text-xs md:text-sm font-medium flex items-center gap-2 backdrop-blur-md bg-[#f5a623]/5 cursor-default transition-colors group-hover:bg-[#f5a623]/10">
                      <Cpu className="w-3 h-3 md:w-4 md:h-4" /> Intel (Beta)
                    </span>
                    {/* Tooltip */}
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1a1a1a] border border-white/10 text-xs text-white/80 rounded-lg p-3 pointer-events-none text-center shadow-xl z-50">
                      <div className="font-semibold text-white mb-1">En desarrollo</div>
                      Soporte beta funcional. ¡Próximamente 100% estable!
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </motion.div>
        </div>
      </section>

      {/* Real Features - Apple Style */}
      <section className="relative z-10 py-12 md:py-20 px-6 max-w-7xl mx-auto space-y-24 md:space-y-32">
        {/* Feature 1 */}
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="w-full md:w-[55%]">
            <MacWindow 
              variant="purple" 
              title="aerio-cleaner" 
              lines={[
                "Scanning user caches...",
                "Detecting application containers...",
                "Analyzing Adobe remnants..."
              ]}
            />
          </div>
          <div className="w-full md:w-[45%] flex flex-col items-start text-left">
            <div className="w-14 h-14 bg-transparent rounded-[20px] flex items-center justify-center mb-6 border border-[#b77cfc]/30 shadow-[0_0_15px_rgba(183,124,252,0.1)]">
              <Layers className="w-6 h-6 text-[#b77cfc]" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">Limpieza profunda de cachés</h3>
            <p className="text-lg text-[#a1a1aa] leading-relaxed font-medium">
              Limpieza segura de cachés de usuario, con detección especial de cachés de aplicaciones, contenedores y Adobe. Todo el control en una terminal visual.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-16 md:gap-24">
          <div className="w-full md:w-[55%]">
            <MacWindow 
              variant="blue" 
              title="file-scanner" 
              lines={[
                "Analyzing disk usage...",
                "Locating large files...",
                "Identifying old archives..."
              ]}
            />
          </div>
          <div className="w-full md:w-[45%] flex flex-col items-start text-left">
            <div className="w-14 h-14 bg-transparent rounded-[20px] flex items-center justify-center mb-6 border border-[#5e9fff]/30 shadow-[0_0_15px_rgba(94,159,255,0.1)]">
              <FileSearch className="w-6 h-6 text-[#5e9fff]" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">Revisión de archivos</h3>
            <p className="text-lg text-[#a1a1aa] leading-relaxed font-medium">
              Análisis y revisión de archivos grandes y antiguos antes de moverlos o eliminarlos. Mantén tu almacenamiento optimizado sin perder archivos importantes.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="w-full md:w-[55%]">
            <MacWindow 
              variant="green" 
              title="system-monitor" 
              lines={[
                "Analyzing RAM allocation...",
                "Checking disk health...",
                "Monitoring network status..."
              ]}
            />
          </div>
          <div className="w-full md:w-[45%] flex flex-col items-start text-left">
            <div className="w-14 h-14 bg-transparent rounded-[20px] flex items-center justify-center mb-6 border border-[#4ade80]/30 shadow-[0_0_15px_rgba(74,222,128,0.1)]">
              <Database className="w-6 h-6 text-[#4ade80]" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">Estado del sistema en vivo</h3>
            <p className="text-lg text-[#a1a1aa] leading-relaxed font-medium">
              Información detallada de la memoria RAM, estado del disco y el espacio disponible en tiempo real, presentado de forma impecable.
            </p>
          </div>
        </div>

        {/* Remaining features as Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 border-t border-white/5">
          <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2rem] backdrop-blur-2xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 shadow-2xl">
            <Trash2 className="w-8 h-8 text-pink-400 mb-6" />
            <h3 className="text-xl font-bold mb-3 text-white/90">Desinstalación segura</h3>
            <p className="text-white/50 leading-relaxed">Desinstalación de aplicaciones de forma recuperable mediante la Papelera de tu sistema.</p>
          </div>
          <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2rem] backdrop-blur-2xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 shadow-2xl">
            <Globe className="w-8 h-8 text-cyan-400 mb-6" />
            <h3 className="text-xl font-bold mb-3 text-white/90">Diagnóstico de red</h3>
            <p className="text-white/50 leading-relaxed">Medición de velocidad de descarga, subida, respuesta de Internet y reinicio opcional de DNS.</p>
          </div>
          <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2rem] backdrop-blur-2xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 shadow-2xl">
            <Zap className="w-8 h-8 text-yellow-400 mb-6" />
            <h3 className="text-xl font-bold mb-3 text-white/90">Actualizaciones</h3>
            <p className="text-white/50 leading-relaxed">Sistema integrado con fases de descarga, progreso, verificación e instalación segura.</p>
          </div>
        </div>
      </section>

      {/* Security & Protection */}
      <section className="relative z-10 py-24 px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] -z-10 rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto bg-white/[0.02] border border-white/10 p-10 md:p-16 rounded-[3rem] text-center shadow-2xl backdrop-blur-3xl hover:bg-white/[0.04] transition-all duration-500">
          <div className="w-20 h-20 bg-purple-500/10 border border-purple-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Lock className="w-10 h-10 text-purple-400" />
          </div>
          <h2 className="text-4xl font-bold mb-6 tracking-tight text-white/90">Mantenimiento seguro y transparente</h2>
          <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-2xl mx-auto">
            Aerio <strong>nunca</strong> elimina documentos, proyectos, preferencias, llaveros, Mail, Photos ni datos generales de Application Support. 
            Todas las operaciones te muestran claramente los resultados para que tú los revises <strong>antes</strong> de borrar cualquier archivo.
          </p>
        </div>
      </section>

      {/* Compatibility */}
      <section className="relative z-10 py-24 px-6 max-w-4xl mx-auto text-center border-t border-white/5">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center justify-center gap-4 tracking-tight">
          <Cpu className="w-10 h-10 text-white/80" />
          Compatibilidad Exclusiva
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="bg-white/[0.03] border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-2xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 shadow-2xl">
            <h3 className="font-bold text-2xl mb-6 text-white/90">Chips Apple Silicon</h3>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Apple M1, M1 Pro, M1 Max, M1 Ultra</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Apple M2 y variantes</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Apple M3 y variantes</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Apple M4 y posteriores</li>
            </ul>
          </div>
          <div className="bg-white/[0.03] border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-2xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-2xl mb-6 text-white/90">Sistema Operativo</h3>
              <ul className="space-y-4 text-white/60">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> macOS 13 Ventura o superior</li>
              </ul>
            </div>
            <div className="mt-8 p-4 bg-black/20 rounded-2xl border border-white/5 text-white/40 italic text-sm text-center">
              Nota: No existe soporte para procesadores Intel.
            </div>
          </div>
        </div>
      </section>

      {/* Capturas Reales */}
      <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Capturas auténticas de Aerio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {screenshots.map((shot, idx) => (
            <div key={idx} className="group relative aspect-[4/3] bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 shadow-xl">
              <img 
                src={shot} 
                alt={`Captura ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
            </div>
          ))}
        </div>
      </section>

      {/* Version History */}
      <section className="py-24 px-6 max-w-4xl mx-auto border-t border-white/5">
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <History className="w-8 h-8 text-purple-400" />
            Historial de Versiones
          </h2>
          <p className="text-white/50 text-lg">Descubre la evolución cronológica de Aerio.</p>
        </div>

        <div className="bg-white/[0.02] border border-white/10 p-10 md:p-14 rounded-[3rem] backdrop-blur-2xl shadow-2xl">
          <div className="space-y-12">
            {(showAllVersions ? versionHistory : versionHistory.slice(0, 3)).map((item, index) => {
              const isCurrent = index === 0;
              return (
                <div key={index} className={cn("relative pl-8 md:pl-12 border-l-2", isCurrent ? "border-purple-500" : "border-white/10")}>
                  <div className={cn("absolute w-4 h-4 rounded-full -left-[9px] top-1.5 ring-4 ring-[#09070f]/50", isCurrent ? "bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" : "bg-white/20")} />
                  <h4 className={cn("text-2xl font-bold mb-4", isCurrent ? "text-white" : "text-white/80")}>
                    Versión {item.version}
                  </h4>
                  <ul className="space-y-3">
                    {item.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-white/60">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {versionHistory.length > 3 && (
            <div className="mt-16 text-center border-t border-white/5 pt-8">
              <button 
                onClick={() => setShowAllVersions(!showAllVersions)}
                className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all backdrop-blur-md hover:scale-105 active:scale-95"
              >
                {showAllVersions ? "Ocultar versiones anteriores" : "Ver historial completo"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer / Credits */}
      <footer className="relative z-10 mt-20 pt-16 pb-12 px-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-[1.25rem] overflow-hidden shadow-2xl shadow-black/50 bg-black border border-white/5 mx-auto mb-8 relative">
           <div className="absolute inset-0 bg-white/5 flex items-center justify-center mix-blend-overlay" />
           <img src="https://aerio-three.vercel.app/aerio.png" alt="Aerio Logo" className="w-full h-full object-cover scale-[0.85]" />
        </div>
        <p className="text-white/90 text-lg md:text-xl font-bold tracking-tight mb-8">Aerio está creado por Hackerdito.</p>
        <div className="flex items-center justify-center gap-4 text-[15px] text-white/50 font-medium">
          <a href="https://gerardodg.art" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">gerardodg.art</a>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <a href="https://aerio-three.vercel.app" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">aerio-three.vercel.app</a>
        </div>
      </footer>
    </div>
  );
}

// Reusable Mac Window Mockup
function MacWindow({ variant = 'purple', title = 'Terminal', lines = [] }: { variant?: 'purple' | 'orange' | 'pink' | 'blue' | 'green', title?: string, lines?: string[] }) {
  const windowBg: Record<string, string> = {
    purple: "bg-[#181124] border-[#b77cfc]/20",
    blue: "bg-[#101b33] border-[#5e9fff]/20",
    green: "bg-[#0c1f15] border-[#4ade80]/20"
  };

  const colors: Record<string, string> = {
    purple: "from-[#b77cfc] to-[#9333ea]",
    blue: "from-[#5e9fff] to-[#2563eb]",
    green: "from-[#4ade80] to-[#16a34a]"
  };

  const textColors: Record<string, string> = {
    purple: "text-[#b77cfc]",
    blue: "text-[#5e9fff]",
    green: "text-[#4ade80]"
  };

  const headerColors: Record<string, string> = {
    purple: "bg-white/[0.03] border-b border-white/[0.05]",
    blue: "bg-white/[0.03] border-b border-white/[0.05]",
    green: "bg-white/[0.03] border-b border-white/[0.05]"
  };

  const displayLines = lines.length > 0 ? lines : [
    "Initializing secure environment...",
    "Scanning sectors..."
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "w-full rounded-[14px] border overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative", 
        windowBg[variant]
      )}
    >
      <div className={cn("h-11 flex items-center px-4 relative", headerColors[variant])}>
        <div className="flex gap-2 absolute left-4">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="w-full text-center text-[13px] font-mono text-white/40 tracking-wide">{title}</div>
      </div>
      <div className="p-6 md:p-8 font-mono text-sm md:text-base text-white/70 h-[300px] flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[#4ade80]">➜</span> 
          <span className="text-white/90">~/{title} --run</span>
        </div>
        
        {displayLines.map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 + (i * 0.4) }}
            className="text-white/50"
          >
            {line}
          </motion.div>
        ))}
        
        <div className="mt-4 space-y-3">
           <motion.div 
             initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.2 + (displayLines.length * 0.4) }}
             className="flex justify-between text-[13px]"
           >
             <span className="text-white/50">Progress</span>
             <span className={textColors[variant]}>80%</span>
           </motion.div>
           <div className="h-[6px] bg-white/10 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }} 
               whileInView={{ width: "80%" }} 
               viewport={{ once: true }}
               transition={{ delay: 1.2 + (displayLines.length * 0.4), duration: 1.5, ease: "easeOut" }}
               className={cn("h-full rounded-full bg-gradient-to-r", colors[variant])} 
             />
           </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.5 + (displayLines.length * 0.4) }}
          className="mt-auto flex items-center gap-3 font-medium"
        >
           <div className={cn("w-2 h-2 rounded-full", colors[variant].split(' ')[0].replace('from-', 'bg-'))} />
           <span className={textColors[variant]}>System Optimized</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
