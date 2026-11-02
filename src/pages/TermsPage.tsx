import React from 'react';
import { FileText, Shield, Trash2, CheckCircle2, AlertTriangle, Scale, Mail } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SiteFooter from '../components/SiteFooter';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#09070f] text-white selection:bg-purple-500/30 font-sans flex flex-col">
      <title>Términos y Condiciones de Uso — Aerio</title>
      <meta
        name="description"
        content="Términos y condiciones de uso de la aplicación Aerio y del sitio web aerio.website. Condiciones de software gratuito, propiedad intelectual y garantías."
      />
      <link rel="canonical" href="https://aerio.website/terminos" />
      <meta property="og:title" content="Términos y Condiciones de Uso — Aerio" />
      <meta
        property="og:description"
        content="Términos y condiciones de uso de la aplicación Aerio y del sitio web aerio.website. Condiciones de software gratuito, propiedad intelectual y garantías."
      />
      <meta property="og:url" content="https://aerio.website/terminos" />
      <meta property="og:type" content="website" />

      <PageHeader showBack={true} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>Condiciones Legales</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-white/60 text-base sm:text-lg">
            Última actualización: <strong>1 de Marzo de 2026</strong>.
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-white/80 leading-relaxed space-y-10 text-base sm:text-lg">
          {/* Section 1 */}
          <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm">1</span>
              Aceptación de los Términos
            </h2>
            <p className="text-white/70 leading-relaxed">
              Al acceder y utilizar el sitio web <strong>aerio.website</strong> o al descargar, instalar y ejecutar la aplicación de software <strong>Aerio</strong> en tu ordenador Mac, aceptas quedar vinculado por estos Términos y Condiciones de Uso, así como por nuestra Política de Privacidad. Si no estás de acuerdo con alguno de estos términos, te solicitamos no utilizar el software ni este sitio web.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm">2</span>
              Naturaleza del Software y Filosofía de Eliminación Segura
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Aerio es una utilidad de mantenimiento diseñada específicamente para macOS (compatible con procesadores Apple Silicon e Intel) con un enfoque en la seguridad, la conservación de documentos personales y la transparencia visual.
            </p>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-white/80">
              <div className="font-semibold text-white flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-green-400" />
                <span>Acciones recuperables mediante la Papelera</span>
              </div>
              <p className="text-sm text-white/60">
                Aerio no realiza borrado forzado permanente ni sobreescritura destructiva de bajo nivel. Todas las aplicaciones desinstaladas y los archivos de caché seleccionados por el usuario se trasladan a la Papelera del sistema de tu Mac, permitiéndote revisar el contenido y restaurar cualquier elemento antes de vaciar la papelera de forma manual.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-sm">3</span>
              Exención de Garantías y Limitación de Responsabilidad
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              La aplicación Aerio y los contenidos de este sitio web se proporcionan <strong>&quot;tal cual&quot; (as-is) y según disponibilidad</strong>, sin garantías de ningún tipo, ya sean explícitas o implícitas.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>El usuario es el único responsable de seleccionar qué elementos limpiar y de verificar que sus copias de seguridad de Time Machine u otros respaldos se encuentren actualizados.</li>
              <li>En la máxima medida permitida por la legislación aplicable, ni Gerardo Rodríguez (Hackerdito) ni los colaboradores de Aerio serán responsables por daños directos, indirectos, incidentales, pérdida de datos o interrupciones de actividad derivadas del uso o imposibilidad de uso del software.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center text-sm">4</span>
              Propiedad Intelectual y Licencia de Uso
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Todos los derechos de autor, marcas, código fuente compilado, interfaz gráfica, logotipo de Aerio y artículos técnicos de este sitio web son propiedad exclusiva de <strong>Gerardo Rodríguez (Hackerdito)</strong>.
            </p>
            <p className="text-white/70 leading-relaxed">
              Se concede a los usuarios una licencia gratuita, no exclusiva, intransferible y personal para descargar, instalar y utilizar Aerio en sus propios ordenadores Mac para fines personales o profesionales. Queda estrictamente prohibida la redistribución comercial, la venta empaquetada o la modificación del binario sin autorización previa por escrito.
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center text-sm">5</span>
              Contacto y Consultas Legales
            </h2>
            <p className="text-white/70 leading-relaxed">
              Si tienes preguntas sobre estos Términos o deseas solicitar permisos especiales de distribución, puedes comunicarte con nosotros por correo electrónico a: <a href="mailto:gerito.diseno@gmail.com" className="text-blue-400 hover:underline">gerito.diseno@gmail.com</a>.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
