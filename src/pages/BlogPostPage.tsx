import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, ArrowRight, Share2, Tag, ShieldCheck, User } from 'lucide-react';
import { ARTICLES, Article } from '../data/articles';
import PageHeader from '../components/PageHeader';
import SiteFooter from '../components/SiteFooter';
import AdSenseScript from '../components/AdSenseScript';

interface BlogPostPageProps {
  slugOverride?: string;
}

export default function BlogPostPage({ slugOverride }: BlogPostPageProps) {
  const params = useParams<{ slug: string }>();
  const slug = slugOverride || params.slug;

  const article = ARTICLES.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#09070f] text-white flex flex-col">
        <PageHeader showBack={true} />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Artículo no encontrado</h1>
          <p className="text-white/60 mb-6">El artículo que estás buscando no existe o fue reubicado.</p>
          <Link
            to="/blog"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
          >
            Volver al Blog
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  // Related articles (articles other than current)
  const relatedArticles = ARTICLES.filter(a => a.slug !== article.slug).slice(0, 2);

  // Helper to format content blocks (headings vs code vs paragraphs)
  const renderContentParagraph = (paragraph: string, index: number) => {
    // Check if it's a section heading (e.g., "1. ...", "2. ...", "Conclusión: ...")
    if (/^([0-9]+\.|\bConclusión\b|\bRegla de oro\b)/.test(paragraph.trim()) && !paragraph.includes('\n')) {
      return (
        <h2 key={index} className="text-2xl sm:text-3xl font-bold text-white mt-10 mb-4 tracking-tight leading-snug">
          {paragraph}
        </h2>
      );
    }

    // Check if it contains code commands (e.g. tmutil, du -sh, networkQuality, sudo)
    if (paragraph.includes('\n\n') || paragraph.includes('tmutil') || paragraph.includes('networkQuality') || paragraph.includes('sudo') || paragraph.includes('du -sh')) {
      const parts = paragraph.split('\n\n');
      return (
        <div key={index} className="space-y-4 my-6">
          {parts.map((part, pIdx) => {
            const isCode = part.startsWith('tmutil') || part.startsWith('du -sh') || part.startsWith('networkQuality') || part.startsWith('sudo') || part.startsWith('xcrun') || part.startsWith('uname');
            if (isCode) {
              return (
                <div key={pIdx} className="my-4 p-4 rounded-xl bg-black/60 border border-white/15 font-mono text-sm text-green-400 overflow-x-auto selection:bg-green-500/30">
                  <code>{part}</code>
                </div>
              );
            }
            return (
              <p key={pIdx} className="text-white/80 leading-relaxed text-base sm:text-lg whitespace-pre-line">
                {part}
              </p>
            );
          })}
        </div>
      );
    }

    return (
      <p key={index} className="text-white/80 leading-relaxed text-base sm:text-lg my-5 whitespace-pre-line font-normal">
        {paragraph}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-[#09070f] text-white selection:bg-purple-500/30 font-sans flex flex-col">
      <title>{`${article.title} — Blog de Aerio`}</title>
      <meta name="description" content={article.description} />
      <link rel="canonical" href={`https://aerio.website/blog/${article.slug}`} />
      <meta property="og:title" content={`${article.title} — Blog de Aerio`} />
      <meta property="og:description" content={article.description} />
      <meta property="og:url" content={`https://aerio.website/blog/${article.slug}`} />
      <meta property="og:type" content="article" />

      {/* Google AdSense included on article pages */}
      <AdSenseScript />

      <PageHeader showBack={true} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 md:py-16">
        <article className="w-full">
          {/* Breadcrumb / Back link */}
          <div className="flex items-center gap-2 text-xs text-white/50 mb-8 font-medium">
            <Link to="/blog" className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Blog</span>
            </Link>
            <span>/</span>
            <span className="text-white/70 truncate">{article.tag}</span>
          </div>

          {/* Article Header */}
          <header className="mb-10 pb-8 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-xs font-semibold px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                {article.tag}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-white/40 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5 text-xs text-white/40 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>{article.date}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              {article.title}
            </h1>

            <p className="text-lg sm:text-xl text-white/70 leading-relaxed font-normal">
              {article.description}
            </p>

            {/* Author info */}
            <div className="mt-8 flex items-center justify-between gap-4 pt-6 border-t border-white/5">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center font-bold text-white text-base shadow-lg shadow-purple-500/20">
                  H
                </div>
                <div>
                  <div className="font-semibold text-sm text-white flex items-center gap-2">
                    <span>Gerardo Rodríguez (Hackerdito)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">Autor</span>
                  </div>
                  <div className="text-xs text-white/40">Desarrollador y diseñador de Aerio • CDMX</div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs text-white/40 bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/10">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span>Verificado para macOS 13+</span>
              </div>
            </div>
          </header>

          {/* Article Body Content */}
          <div className="prose prose-invert max-w-none text-white/85 leading-relaxed font-normal">
            {article.content.map((paragraph, index) => renderContentParagraph(paragraph, index))}
          </div>

          {/* Call to action card */}
          <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent border border-white/15 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Prueba Aerio 5.0 en tu Mac</h3>
              <p className="text-sm text-white/60 max-w-md">
                Limpia cachés huérfanas, desinstala aplicaciones de forma recuperable y monitorea el disco y la red con una sola herramienta gratuita.
              </p>
            </div>
            <a
              href="https://aerio.website/Builds/Aerio-5.0.zip"
              className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-xl shadow-blue-500/25 transition-all whitespace-nowrap active:scale-95"
            >
              Descargar Aerio Gratis
            </a>
          </div>

          {/* Related Articles Section */}
          <section className="mt-16 pt-12 border-t border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Artículos recomendados</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map(rel => (
                <Link
                  key={rel.slug}
                  to={`/blog/${rel.slug}`}
                  className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 p-6 rounded-2xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider mb-2 block">
                      {rel.tag}
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-white/50 line-clamp-2">
                      {rel.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
                    <span>{rel.readTime}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
