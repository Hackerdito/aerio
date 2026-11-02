import React from 'react';
import { Shield, Lock, Eye, FileText, CheckCircle2, Mail, ExternalLink } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SiteFooter from '../components/SiteFooter';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#09070f] text-white selection:bg-purple-500/30 font-sans flex flex-col">
      <title>Política de Privacidad — Aerio</title>
      <meta
        name="description"
        content="Política de privacidad de Aerio: transparencia sobre datos recopilados en la web, política 100% local de la app de Mac y divulgación de Google AdSense."
      />
      <link rel="canonical" href="https://aerio.website/privacidad" />
      <meta property="og:title" content="Política de Privacidad — Aerio" />
      <meta
        property="og:description"
        content="Política de privacidad de Aerio: transparencia sobre datos recopilados en la web, política 100% local de la app de Mac y divulgación de Google AdSense."
      />
      <meta property="og:url" content="https://aerio.website/privacidad" />
      <meta property="og:type" content="website" />

      <PageHeader showBack={true} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Transparencia y Seguridad</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Política de Privacidad
          </h1>
          <p className="text-white/60 text-base sm:text-lg">
            Última actualización: <strong>1 de Marzo de 2026</strong>.
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-white/80 leading-relaxed space-y-10 text-base sm:text-lg">
          {/* Section 1 */}
          <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm">1</span>
              Responsable del Tratamiento de Datos
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              El responsable del sitio web <strong>aerio.website</strong> y del proyecto Aerio es <strong>Gerardo Rodríguez (Hackerdito)</strong>, diseñador y desarrollador independiente radicado en la Ciudad de México (CDMX), México.
            </p>
            <p className="text-white/70 leading-relaxed">
              Para cualquier consulta, aclaración o solicitud relacionada con la privacidad de tus datos, puedes contactarnos directamente al correo electrónico oficial: <a href="mailto:gerito.diseno@gmail.com" className="text-blue-400 hover:underline">gerito.diseno@gmail.com</a>.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm">2</span>
              La Aplicación Aerio para Mac: 100% Local y Libre de Telemetría
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              La aplicación de escritorio <strong>Aerio (versión 5.0 Universal)</strong> para macOS opera con un principio de ingeniería estricto: <strong>ejecución 100% local en tu dispositivo</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>Aerio <strong>no envía</strong> a ningún servidor externo la lista de tus archivos personales, documentos, fotografías ni cachés inspeccionadas.</li>
              <li>Aerio <strong>no analiza ni recopila</strong> tu historial de navegación, contraseñas, correos electrónicos ni información bancaria.</li>
              <li>Aerio <strong>no incluye demonios silenciosos</strong> en segundo plano ni telemetría invasiva oculta en el código binario.</li>
              <li>Todas las acciones de limpieza y desinstalación se ejecutan de manera recuperable mediante la Papelera nativa de macOS y solo tras la confirmación explícita del usuario.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center text-sm">3</span>
              Datos Recopilados en el Sitio Web
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              En nuestro sitio web (aerio.website), se pueden recopilar dos tipos de datos exclusivamente para fines de mantenimiento y soporte:
            </p>
            <div className="space-y-4 text-white/70">
              <div>
                <h3 className="font-bold text-white text-lg mb-1">A. Formulario de Retroalimentación (/feedback)</h3>
                <p>
                  Si decides dejarnos un comentario voluntario, recopilamos los campos que proporcionas: nombre (opcional), correo electrónico (opcional), versión de Aerio utilizada, modelo de Mac, versión de macOS, mensaje y calificación. Estos datos se almacenan de forma segura en Firebase Firestore para dar seguimiento técnico. Por defecto, ningún comentario se hace público sin revisión previa y el correo nunca se expone en la web.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">B. Métricas básicas de visitas y descargas</h3>
                <p>
                  Con el fin de contabilizar el número total de descargas del archivo .zip y prevenir abusos en la infraestructura, se registra la dirección IP aproximada, país, ciudad y User-Agent en el momento de la descarga o visita inicial mediante Firebase.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 - Google AdSense Mandatory Disclosures */}
          <section className="bg-white/[0.02] border border-blue-500/20 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm">4</span>
              Divulgación sobre Publicidad y Cookies de Google AdSense
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Este sitio web utiliza <strong>Google AdSense</strong> para mostrar anuncios publicitarios en páginas seleccionadas (inicio y blog). De acuerdo con las políticas de privacidad y requisitos de Google, informamos lo siguiente:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-white/70">
              <li>
                <strong>Uso de cookies publicitarias:</strong> Terceros proveedores, incluido Google, utilizan cookies para publicar anuncios basados en las visitas anteriores del usuario a este sitio web o a otros sitios web de Internet.
              </li>
              <li>
                <strong>Cookies de publicidad personalizada:</strong> El uso de cookies publicitarias por parte de Google le permite a este y a sus socios comerciales mostrar anuncios basados en las visitas que los usuarios realizan a sus sitios o a otros sitios web en Internet.
              </li>
              <li>
                <strong>Inhabilitación de la publicidad personalizada:</strong> Los usuarios pueden inhabilitar la publicidad personalizada dirigiéndose a la configuración de anuncios de Google en: <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">Configuración de Anuncios de Google <ExternalLink className="w-3.5 h-3.5" /></a>.
              </li>
              <li>
                <strong>Inhabilitación de cookies de terceros:</strong> De manera alternativa, los usuarios pueden optar por rechazar el uso de cookies para publicidad personalizada de proveedores terceros visitando el portal independiente: <a href="https://www.aboutads.info" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">www.aboutads.info <ExternalLink className="w-3.5 h-3.5" /></a>.
              </li>
              <li>
                <strong>Cómo utiliza Google la información de sitios asociados:</strong> Para conocer en detalle cómo Google gestiona los datos de los usuarios cuando navegan en sitios web asociados, consulta: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">Cómo utiliza Google la información <ExternalLink className="w-3.5 h-3.5" /></a>.
              </li>
            </ul>
          </section>

          {/* Section 5 - ARCO rights */}
          <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center text-sm">5</span>
              Derechos del Usuario (ARCO)
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Tienes derecho en todo momento a ejercer tus derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (ARCO)</strong> respecto a cualquier información personal que hayas enviado a través del formulario de comentarios o contacto.
            </p>
            <p className="text-white/70 leading-relaxed">
              Para solicitar la eliminación definitiva de un comentario o de tu correo electrónico de nuestras bases de datos, simplemente envía un mensaje con tu solicitud a <a href="mailto:gerito.diseno@gmail.com" className="text-blue-400 hover:underline">gerito.diseno@gmail.com</a>. Atenderemos y procesaremos tu petición en un plazo máximo de 48 horas hábiles.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
