import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, BookOpen, Sparkles, Filter } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import PageHeader from '../components/PageHeader';
import SiteFooter from '../components/SiteFooter';
import AdSenseScript from '../components/AdSenseScript';

export default function BlogListPage() {
  const [selectedTag, setSelectedTag] = useState<string>('Todos');

  const tags = ['Todos', ...Array.from(new Set(ARTICLES.map(a => a.tag)))];

  const filteredArticles = selectedTag === 'Todos'
    ? ARTICLES
    : ARTICLES.filter(a => a.tag === selectedTag);

  return (
    <div className="min-h-screen bg-[#09070f] text-white selection:bg-purple-500/30 font-sans flex flex-col">
      <title>Blog de Optimización y Rendimiento para Mac — Aerio</title>
      <meta
        name="description"
        content="Artículos técnicos, guías de arquitectura macOS, limpieza segura de cachés y optimización para procesadores Apple Silicon e Intel."
      />
      <link rel="canonical" href="https://aerio.website/blog" />
      <meta property="og:title" content="Blog de Optimización y Rendimiento para Mac — Aerio" />
      <meta
        property="og:description"
        content="Artículos técnicos, guías de arquitectura macOS, limpieza segura de cachés y optimización para procesadores Apple Silicon e Intel."
      />
      <meta property="og:url" content="https://aerio.website/blog" />
      <meta property="og:type" content="website" />

      {/* Google AdSense included on blog list */}
      <AdSenseScript />

      <PageHeader showBack={true} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ingeniería & Artículos de macOS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Blog de Aerio
          </h1>
          <p className="text-lg text-white/60 leading-relaxed font-normal">
            Guías técnicas, arquitectura de almacenamiento APFS, análisis de memoria unificada y buenas prácticas para mantener tu Mac rápida, limpia y 100% segura.
          </p>
        </div>

        {/* Filter tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 custom-scrollbar">
          <Filter className="w-4 h-4 text-white/40 shrink-0 mr-1" />
          {tags.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map(article => (
            <article
              key={article.slug}
              className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="text-xs font-semibold px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                    {article.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-white/40 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-blue-300 leading-snug mb-4 transition-colors">
                  <Link to={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">
                  {article.description}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto">
                <span className="text-xs text-white/40">{article.date}</span>
                <Link
                  to={`/blog/${article.slug}`}
                  className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors"
                >
                  <span>Leer completo</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
