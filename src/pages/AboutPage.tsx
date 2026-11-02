import React from 'react';
import { Info, User, ExternalLink, ShieldCheck, Heart, Terminal, Sparkles, Apple, Cpu, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SiteFooter from '../components/SiteFooter';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#09070f] text-white selection:bg-purple-500/30 font-sans flex flex-col">
      <title>Acerca de Aerio y Hackerdito — Historia y Filosofía</title>
      <meta
        name="description"
        content="Conoce la historia detrás de Aerio, creada por Gerardo Rodríguez (Hackerdito) en CDMX: una alternativa transparente y segura a los limpiadores comerciales para Mac."
      />
      <link rel="canonical" href="https://aerio.website/acerca" />
      <meta property="og:title" content="Acerca de Aerio y Hackerdito — Historia y Filosofía" />
      <meta
        property="og:description"
        content="Conoce la historia detrás de Aerio, creada por Gerardo Rodríguez (Hackerdito) en CDMX: una alternativa transparente y segura a los limpiadores comerciales para Mac."
      />
      <meta property="og:url" content="https://aerio.website/acerca" />
      <meta property="og:type" content="website" />

      <PageHeader showBack={true} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Info className="w-3.5 h-3.5" />
            <span>Misión & Creador</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Acerca de Aerio
          </h1>
          <p className="text-lg sm:text-xl text-white/60 leading-relaxed font-normal">
            Una herramienta de mantenimiento nacida de una convicción: cuidar tu Mac debe ser un proceso transparente, estético, respetuoso con tu privacidad y sin trucos comerciales.
          </p>
        </div>

        {/* Creator Bio Card */}
        <div className="bg-gradient-to-br from-purple-900/25 via-blue-900/15 to-transparent border border-white/15 rounded-3xl p-8 sm:p-10 mb-12 backdrop-blur-2xl shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center font-bold text-3xl text-white shadow-xl shadow-purple-500/30 shrink-0 border border-white/20">
            H
          </div>
          <div className="text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-2">
              <h2 className="text-2xl font-bold text-white">Gerardo Rodríguez (Hackerdito)</h2>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold border border-white/15">
                Diseñador & Desarrollador
              </span>
            </div>
            <p className="text-white/60 text-sm mb-4 leading-relaxed">
              Profesional multidisciplinario con más de 10 años de experiencia en diseño de interacción, arquitectura de interfaces y desarrollo de software para el ecosistema Apple, con sede en la Ciudad de México (CDMX).
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <a
                href="https://gerardodg.art"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold transition-all backdrop-blur-md"
              >
                <span>Portafolio Oficial: gerardodg.art</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/60" />
              </a>
              <a
                href="mailto:gerito.diseno@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-medium transition-all"
              >
                <span>gerito.diseno@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Narrative / Why Aerio was created */}
        <div className="prose prose-invert max-w-none text-white/80 leading-relaxed space-y-8 text-base sm:text-lg">
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
              Por qué nació Aerio: La frustración con las herramientas comerciales
            </h2>
            <p className="text-white/70 leading-relaxed">
              Durante años, los usuarios de macOS hemos sido testigos de la degradación del software de mantenimiento. Lo que solían ser utilidades livianas y respetuosas se transformaron progresivamente en gigantescos paquetes corporativos repletos de modelos de suscripción mensuales abusivos, notificaciones alarmistas en la barra de menú que asustan al usuario haciéndole creer que su equipo está &quot;infectado&quot;, y procesos residentes que consumen más batería y memoria que los archivos que prometen limpiar.
            </p>
            <p className="text-white/70 leading-relaxed">
              Peor aún: muchas de estas aplicaciones comerciales aplican políticas de limpieza sumamente agresivas e imprudentes. Para inflar la cifra de &quot;gigabytes liberados&quot; en sus anuncios, borran indiscriminadamente carpetas enteras de <code>~/Library/Application Support</code>, corrompiendo perfiles de navegadores, destruyendo bases de datos locales de aplicaciones de productividad y desinstalando software mediante comandos destructivos con permisos de superusuario que no admiten vuelta atrás.
            </p>
            <p className="text-white/70 leading-relaxed">
              Aerio nació como una respuesta frontal a esta problemática: una herramienta nativa, transparente, hermosa, totalmente gratuita y construida bajo una estricta filosofía de respeto a los datos del usuario.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">
              Los Tres Pilares Fundamentales de Aerio
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">1. Conservador y Seguro por Diseño</h3>
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                    Aerio jamás toca documentos de usuario, escritorios, carpetas de fotos ni bases de datos de Application Support. Su análisis se enfoca exclusivamente en cachés transitorias huérfanas y contenedores sandbox desvinculados. Además, todo lo que se limpia o desinstala se traslada primero a la Papelera de tu Mac; jamás se borra de manera destructiva sin posibilidad de recuperación.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-1">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">2. Transparencia Visual Absoluta</h3>
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                    No creemos en las &quot;cajas negras&quot; mágicas. Aerio integra un visualizador de terminal en tiempo real que documenta con precisión quirúrgica cada comando ejecutado, la ruta de cada archivo analizado y el peso exacto liberado, otorgándote el control y la comprensión técnica de lo que ocurre en tu sistema operativo.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-1">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">3. Eficiencia Universal (Apple Silicon & Intel)</h3>
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                    Con la versión 5.0, Aerio es una aplicación Universal nativa compilada tanto para chips arm64 (M1, M2, M3, M4) como para x86_64 (Intel Core y Xeon). Funciona con un consumo ínfimo de recursos en macOS 13 Ventura, Sonoma y Sequoia, sin procesos en segundo plano cuando no está en uso y sin devorar tu batería.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
              Compromiso con la Comunidad Mac
            </h2>
            <p className="text-white/70 leading-relaxed">
              Aerio no persigue convertirte en suscriptor forzado ni vender tus patrones de uso a anunciantes externos. Es un proyecto de ingeniería independiente creado con pasión artesanal por el detalle tipográfico, la animación fluida y el respeto profundo a la arquitectura de macOS. Si Aerio te ha sido útil para mantener tu equipo limpio y rápido, el mejor apoyo es compartir la aplicación con amigos y colegas, o enviarnos tus sugerencias a través del formulario de retroalimentación.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
