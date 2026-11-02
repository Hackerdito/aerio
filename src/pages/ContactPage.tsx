import React from 'react';
import { Mail, MessageSquare, Send, ExternalLink, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SiteFooter from '../components/SiteFooter';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#09070f] text-white selection:bg-purple-500/30 font-sans flex flex-col">
      <title>Contacto y Soporte — Aerio</title>
      <meta
        name="description"
        content="Ponte en contacto con Gerardo Rodríguez (Hackerdito), creador de Aerio. Soporte técnico, retroalimentación y sugerencias para la versión 5.0."
      />
      <link rel="canonical" href="https://aerio.website/contacto" />
      <meta property="og:title" content="Contacto y Soporte — Aerio" />
      <meta
        property="og:description"
        content="Ponte en contacto con Gerardo Rodríguez (Hackerdito), creador de Aerio. Soporte técnico, retroalimentación y sugerencias para la versión 5.0."
      />
      <meta property="og:url" content="https://aerio.website/contacto" />
      <meta property="og:type" content="website" />

      <PageHeader showBack={true} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-white/10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Atención Directa</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Contacto & Soporte
          </h1>
          <p className="text-lg sm:text-xl text-white/60 leading-relaxed font-normal max-w-2xl">
            ¿Tienes alguna consulta técnica, sugerencia de mejora o encontraste un comportamiento inusual en tu Mac? Estamos aquí para escucharte y resolver tus dudas.
          </p>
        </div>

        {/* Contact Options Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1: Feedback Form */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between hover:border-white/20 transition-all shadow-xl group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Formulario Web</h2>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                La forma más rápida de enviarnos comentarios sobre Aerio 5.0, sugerir nuevas funciones o reportar fallos con detalles de tu modelo de Mac y versión de macOS.
              </p>
            </div>
            <Link
              to="/feedback"
              className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all active:scale-95 text-sm"
            >
              <span>Abrir formulario de feedback</span>
              <Send className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Email Direct */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between hover:border-white/20 transition-all shadow-xl group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Correo Electrónico</h2>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                Para consultas directas, colaboraciones, propuestas o soporte personalizado, escribe directamente al creador del proyecto:
              </p>
            </div>
            <a
              href="mailto:gerito.diseno@gmail.com"
              className="w-full py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 text-sm truncate px-4"
            >
              <Mail className="w-4 h-4 text-white/70 shrink-0" />
              <span className="truncate">gerito.diseno@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Info Highlights */}
        <div className="bg-gradient-to-r from-white/[0.02] to-white/[0.05] border border-white/10 rounded-3xl p-8 backdrop-blur-xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center sm:items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">Tiempo de Respuesta</h3>
              <p className="text-xs text-white/50 leading-relaxed">Respondemos correos en un plazo habitual de 24 a 48 horas hábiles.</p>
            </div>
          </div>

          <div className="flex items-center sm:items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">Ubicación</h3>
              <p className="text-xs text-white/50 leading-relaxed">Ciudad de México (CDMX), México. Desarrollo independiente.</p>
            </div>
          </div>

          <div className="flex items-center sm:items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">Portafolio</h3>
              <a href="https://gerardodg.art" target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">
                gerardodg.art
              </a>
              <p className="text-xs text-white/40">Diseño & Programación</p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
