import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Shield, Database, Apple, Cpu, Coffee, History, CheckCircle2, Trash2, Layers, Terminal, Zap, Globe, FileSearch, Info, Lock } from 'lucide-react';
import { cn } from './lib/utils';

export default function LandingPage() {
  const [downloading, setDownloading] = useState(false);
  const [showAllVersions, setShowAllVersions] = useState(false);

  const handleDownload = () => {
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
    "Panel principal", "Limpieza de cachés", "Archivos grandes", 
    "Internet y DNS", "Actualizaciones", "Terminal visual"
  ];

  return (
    <div className="min-h-screen bg-[#09070f] text-white selection:bg-purple-500/30 font-sans pb-12 overflow-x-hidden relative">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-purple-900/20 via-blue-900/10 to-transparent blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] bg-pink-900/10 blur-[100px] -z-10 pointer-events-none rounded-full" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 blur-[120px] -z-10 pointer-events-none rounded-full" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-[#09070f]/40 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg shadow-purple-500/20 bg-white/5 border border-white/10 p-0.5 backdrop-blur-md">
               <img src="https://aerio-three.vercel.app/aerio.png" alt="Aerio Logo" className="w-full h-full object-cover rounded-[14px]" />
            </div>
            <span className="font-bold text-xl tracking-wide text-white/90">Aerio</span>
          </div>
          <a 
            href="https://ko-fi.com/hackerdito" 
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-all hover:scale-105 active:scale-95 backdrop-blur-md shadow-xl"
          >
            <Coffee className="w-4 h-4 text-[#FFDD00]" />
            <span className="hidden sm:inline">Invítame un café</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-44 pb-20 flex flex-col items-center justify-center text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white/70 leading-[1.1]">
            Tu Mac, más clara <br className="hidden md:block"/>y bajo control.
          </h1>
          <p className="text-xl text-white/60 mb-10 max-w-2xl font-medium leading-relaxed">
            Mantenimiento seguro y visual para Mac con chips M1 y posteriores.
          </p>

          <button 
            onClick={handleDownload} 
            disabled={downloading} 
            className="relative group overflow-hidden rounded-full p-[1px] mb-8 transition-transform hover:scale-105 active:scale-95 shadow-2xl shadow-purple-500/20"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative px-8 py-4 bg-[#09070f]/80 backdrop-blur-md rounded-full flex items-center gap-3">
              {downloading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <Download className="w-5 h-5 text-white" />
              )}
              <span className="font-bold text-lg text-white">Descargar Aerio 4.2</span>
            </div>
          </button>

          <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold">
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 flex items-center gap-2"><Apple className="w-4 h-4"/> macOS 13+</span>
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 flex items-center gap-2"><Cpu className="w-4 h-4"/> Apple Silicon</span>
            <span className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">Descarga gratuita</span>
          </div>
        </motion.div>
      </section>

      {/* Main Concept */}
      <section className="py-12 px-6 max-w-4xl mx-auto text-center border-b border-white/5 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white/90">Aerio: conoce, limpia y organiza tu Mac desde un solo lugar.</h2>
        <p className="text-lg text-white/50 leading-relaxed font-medium">
          Aerio analiza cachés de usuario, permite revisar archivos grandes y antiguos, facilita la desinstalación de aplicaciones, 
          administra la Papelera y muestra información de RAM, almacenamiento y conexión a Internet. Antes de borrar, 
          enseña lo encontrado y mantiene protegidos los documentos, preferencias y datos importantes.
        </p>
      </section>

      {/* Real Features - Apple Style */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Diseñado para macOS.</h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">Funciones potentes con una interfaz nativa y elegante que se integra perfectamente en tu ecosistema Apple.</p>
        </div>

        {/* Feature 1 */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <MacWindow variant="purple" title="aerio-cleaner" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start text-left">
            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/30">
              <Layers className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-white/90">Limpieza profunda de cachés</h3>
            <p className="text-lg text-white/50 leading-relaxed">
              Limpieza segura de cachés de usuario, con detección especial de cachés de aplicaciones, contenedores y Adobe. Todo el control en una terminal visual.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="w-full md:w-1/2">
            <MacWindow variant="blue" title="file-scanner" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start text-left">
            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30">
              <FileSearch className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-white/90">Revisión de archivos</h3>
            <p className="text-lg text-white/50 leading-relaxed">
              Análisis y revisión de archivos grandes y antiguos antes de moverlos o eliminarlos. Mantén tu almacenamiento optimizado sin perder archivos importantes.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <MacWindow variant="green" title="system-monitor" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start text-left">
            <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6 border border-green-500/30">
              <Database className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-white/90">Estado del sistema en vivo</h3>
            <p className="text-lg text-white/50 leading-relaxed">
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
      <section className="py-24 px-6 relative">
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
      <section className="py-24 px-6 max-w-4xl mx-auto text-center border-t border-white/5">
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

      {/* Capturas Reales (Placeholders for user to replace) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Capturas auténticas de Aerio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {screenshots.map((shot, idx) => (
            <div key={idx} className="group relative aspect-[4/3] bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden flex flex-col items-center justify-center p-6 text-center hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 backdrop-blur-xl shadow-xl">
              {/* Note for developer: Replace this div with an actual <img src="/tu-captura.png" /> */}
              <div className="w-16 h-16 mb-4 rounded-2xl bg-black/20 flex items-center justify-center border border-white/5 shadow-inner">
                <Info className="w-8 h-8 text-white/30" />
              </div>
              <p className="font-semibold text-white/70">{shot}</p>
              <p className="text-xs text-white/30 mt-2">(Reemplazar con imagen real)</p>
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
      <footer className="mt-20 border-t border-white/5 py-12 px-6 text-center">
        <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg shadow-purple-500/20 bg-white/5 border border-white/10 p-0.5 mx-auto mb-6 opacity-80 hover:opacity-100 transition-opacity">
           <img src="https://aerio-three.vercel.app/aerio.png" alt="Aerio Logo" className="w-full h-full object-cover rounded-[14px]" />
        </div>
        <p className="text-white/70 mb-4 font-medium">Aerio está creado por Hackerdito.</p>
        <div className="flex items-center justify-center gap-6 text-sm text-white/40">
          <a href="https://gerardodg.art" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">gerardodg.art</a>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <a href="https://aerio-three.vercel.app" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">aerio-three.vercel.app</a>
        </div>
      </footer>
    </div>
  );
}

// Reusable Mac Window Mockup
function MacWindow({ variant = 'purple', title = 'Terminal' }: { variant?: 'purple' | 'orange' | 'pink' | 'blue' | 'green', title?: string }) {
  const colors: Record<string, string> = {
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
    orange: "from-orange-500/20 to-orange-500/5 border-orange-500/30",
    pink: "from-pink-500/20 to-pink-500/5 border-pink-500/30",
    blue: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
    green: "from-green-500/20 to-green-500/5 border-green-500/30"
  };

  const textColors: Record<string, string> = {
    purple: "text-purple-400",
    orange: "text-orange-400",
    pink: "text-pink-400",
    blue: "text-blue-400",
    green: "text-green-400"
  };

  const bgColors: Record<string, string> = {
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    pink: "bg-pink-500",
    blue: "bg-blue-500",
    green: "bg-green-500"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "w-full rounded-2xl border bg-gradient-to-b backdrop-blur-md overflow-hidden shadow-2xl relative", 
        colors[variant]
      )}
    >
      <div className="absolute inset-0 bg-white/[0.02]" />
      <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-black/40 relative z-10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="mx-auto text-xs font-semibold text-white/50 tracking-wider font-sans">{title}</div>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>
      <div className="p-6 font-mono text-sm text-white/70 h-[300px] flex flex-col gap-3 relative z-10">
        <div className="flex items-center gap-2"><span className="text-green-400">➜</span> <span>~/{title} --run</span></div>
        <div className="text-white/40">Initializing secure environment...</div>
        <div className="text-white/40">Scanning sectors...</div>
        
        <div className="mt-4 space-y-4">
          <div className="space-y-1">
             <div className="flex justify-between text-xs"><span className="text-white/50">Progress</span><span className={textColors[variant]}>80%</span></div>
             <motion.div 
               initial={{ width: 0 }} 
               whileInView={{ width: "100%" }} 
               viewport={{ once: true }}
               transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
               className="h-1.5 bg-white/10 rounded-full overflow-hidden"
             >
               <div className={cn("h-full", bgColors[variant])} style={{ width: '80%' }} />
             </motion.div>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2">
           <div className={cn("w-2 h-2 rounded-full animate-pulse", bgColors[variant])} />
           <span className={textColors[variant]}>System Optimized</span>
        </div>
      </div>
    </motion.div>
  );
}
