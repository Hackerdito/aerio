import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from './lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ArrowLeft, CheckCircle2, AlertCircle, MessageSquare, Lightbulb, Bug, AlertTriangle, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEEDBACK_TYPES = [
  { id: 'like', label: 'Me gusta Aerio', icon: <MessageSquare className="w-4 h-4 text-pink-400" /> },
  { id: 'suggestion', label: 'Sugerencia', icon: <Lightbulb className="w-4 h-4 text-yellow-400" /> },
  { id: 'problem', label: 'Encontré un problema', icon: <AlertCircle className="w-4 h-4 text-orange-400" /> },
  { id: 'bug', label: 'Error', icon: <Bug className="w-4 h-4 text-red-400" /> },
  { id: 'feature', label: 'Nueva función', icon: <Sparkles className="w-4 h-4 text-blue-400" /> },
];

const VERSIONS = ['4.4', '4.3', 'Otra'];

export default function Feedback() {
  const [formData, setFormData] = useState({
    type: 'like',
    name: '',
    email: '',
    version: '4.4',
    macModel: '',
    macOS: '',
    message: '',
    rating: 0
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) {
      setError('Por favor, escribe un comentario antes de enviar.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, 'feedback'), {
        ...formData,
        status: 'new',
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setFormData({
        type: 'like',
        name: '',
        email: '',
        version: '4.4',
        macModel: '',
        macOS: '',
        message: '',
        rating: 0
      });
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError('No pudimos enviar tu comentario. Inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 font-sans pb-20 relative">
      <div 
        className="absolute top-0 left-0 w-full h-[600px] z-0 bg-cover bg-top bg-no-repeat opacity-60 pointer-events-none"
        style={{ backgroundImage: "url('https://aerio-three.vercel.app/bg.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/60 to-black" />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 pt-24 md:pt-32">
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group font-medium">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Volver a Aerio
        </Link>

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Ayúdanos a mejorar Aerio</h1>
          <p className="text-lg text-white/60 font-medium">
            ¿Aerio te ha servido o encontraste algún problema? Cuéntanos tu experiencia. Tus comentarios nos ayudan a mejorar cada versión.
          </p>
        </div>

        <div className="bg-[#130b1c]/80 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 md:p-10 shadow-2xl">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-16 h-16 bg-[#ff007f]/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-[#ff007f]" />
                </div>
                <h2 className="text-2xl font-bold mb-3">¡Gracias! ❤️</h2>
                <p className="text-white/60 mb-8 max-w-sm">
                  Tu comentario fue enviado correctamente. Nos ayuda muchísimo a seguir mejorando Aerio.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-medium transition-colors"
                >
                  Enviar otro comentario
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 md:space-y-8"
              >
                {/* Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-3">Tipo de comentario</label>
                  <div className="flex flex-wrap gap-3">
                    {FEEDBACK_TYPES.map(type => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, type: type.id }))}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all text-sm font-medium ${
                          formData.type === type.id
                            ? 'bg-white/10 border-white/30 text-white'
                            : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
                        }`}
                      >
                        {type.icon}
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Tu nombre <span className="text-white/30">(opcional)</span></label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ej. Ana García"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff007f]/50 focus:ring-1 focus:ring-[#ff007f]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Email <span className="text-white/30">(opcional)</span></label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff007f]/50 focus:ring-1 focus:ring-[#ff007f]/50 transition-all"
                    />
                    <p className="text-xs text-white/40 mt-2">Solo lo usaremos si necesitamos contactarte sobre el problema.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Versión de Aerio</label>
                    <select
                      name="version"
                      value={formData.version}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff007f]/50 focus:ring-1 focus:ring-[#ff007f]/50 transition-all appearance-none"
                    >
                      {VERSIONS.map(v => <option key={v} value={v} className="bg-[#130b1c] text-white">Aerio {v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Mac <span className="text-white/30">(opcional)</span></label>
                    <input
                      type="text"
                      name="macModel"
                      value={formData.macModel}
                      onChange={handleChange}
                      placeholder="Ej. MacBook Air M1"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff007f]/50 focus:ring-1 focus:ring-[#ff007f]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">macOS <span className="text-white/30">(opcional)</span></label>
                    <input
                      type="text"
                      name="macOS"
                      value={formData.macOS}
                      onChange={handleChange}
                      placeholder="Ej. Sequoia 15.1"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff007f]/50 focus:ring-1 focus:ring-[#ff007f]/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Comentario</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Cuéntanos qué pasó o qué te gustaría mejorar..."
                    rows={5}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff007f]/50 focus:ring-1 focus:ring-[#ff007f]/50 transition-all resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Calificación <span className="text-white/30">(opcional)</span></label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className="focus:outline-none hover:scale-110 transition-transform"
                      >
                        <Star 
                          className={`w-8 h-8 ${formData.rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-white/10'}`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-white text-black font-semibold hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
                  ) : (
                    'Enviar comentario'
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 text-center px-4">
          <p className="text-xs text-white/40 leading-relaxed max-w-xl mx-auto">
            <span className="font-semibold text-white/50">Privacidad</span><br />
            Los datos enviados mediante este formulario se utilizan únicamente para mejorar Aerio y responder a problemas relacionados con la aplicación.
          </p>
        </div>
      </div>
    </div>
  );
}
