import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppRoutes } from '../src/App';
import { ARTICLES } from '../src/data/articles';

async function prerender() {
  console.log('🚀 Starting pre-rendering for Aerio...');

  const distDir = path.resolve(process.cwd(), 'dist');
  const templatePath = path.resolve(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('❌ dist/index.html not found! Run "vite build" first.');
    process.exit(1);
  }

  const baseTemplate = fs.readFileSync(templatePath, 'utf-8');

  // 1. Guardar copia sin pre-renderizar como dist/app.html antes de sobrescribir index.html
  const appHtmlPath = path.resolve(distDir, 'app.html');
  fs.writeFileSync(appHtmlPath, baseTemplate, 'utf-8');
  console.log(`💾 Saved un-prerendered template to dist/app.html`);

  // List of all public routes
  const routes = [
    '/',
    '/blog',
    ...ARTICLES.map(a => `/blog/${a.slug}`),
    '/privacidad',
    '/terminos',
    '/acerca',
    '/contacto'
  ];

  console.log(`📄 Pre-rendering ${routes.length} public routes...`);

  for (const route of routes) {
    try {
      const rawAppHtml = renderToString(
        React.createElement(StaticRouter, { location: route }, React.createElement(AppRoutes))
      );

      // Extract title and description from rendered output before stripping
      const titleMatch = rawAppHtml.match(/<title\b[^>]*>(.*?)<\/title>/i);
      const pageTitle = titleMatch ? titleMatch[1] : 'Aerio — Limpiador gratuito y seguro para Mac';

      const descMatch = rawAppHtml.match(/<meta\b[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i);
      const pageDesc = descMatch ? descMatch[1] : 'Aerio es un limpiador gratuito para Mac (Apple Silicon e Intel) que elimina cachés huérfanas y desinstala apps de forma segura, sin tocar tus documentos.';

      const canonicalUrl = `https://aerio.website${route === '/' ? '/' : route}`;

      // Eliminar de appHtml todas las etiquetas <title>, <meta> y <link rel="canonical">
      const cleanAppHtml = rawAppHtml
        .replace(/<title\b[^>]*>.*?<\/title>/gis, '')
        .replace(/<meta\b[^>]*\/?>/gis, '')
        .replace(/<link\b[^>]*rel=["']canonical["'][^>]*\/?>/gis, '');

      let pageHtml = baseTemplate;

      // 1. Reemplazar <title>
      pageHtml = pageHtml.replace(/<title\b[^>]*>.*?<\/title>/i, `<title>${pageTitle}</title>`);

      // 2. Reemplazar <meta name="description">
      if (/<meta\b[^>]*name=["']description["'][^>]*\/?>/i.test(pageHtml)) {
        pageHtml = pageHtml.replace(
          /<meta\b[^>]*name=["']description["'][^>]*\/?>/i,
          `<meta name="description" content="${pageDesc}" />`
        );
      } else {
        pageHtml = pageHtml.replace('</head>', `  <meta name="description" content="${pageDesc}" />\n  </head>`);
      }

      // 3. Reemplazar og:title
      if (/<meta\b[^>]*property=["']og:title["'][^>]*\/?>/i.test(pageHtml)) {
        pageHtml = pageHtml.replace(
          /<meta\b[^>]*property=["']og:title["'][^>]*\/?>/i,
          `<meta property="og:title" content="${pageTitle}" />`
        );
      } else {
        pageHtml = pageHtml.replace('</head>', `  <meta property="og:title" content="${pageTitle}" />\n  </head>`);
      }

      // 4. Reemplazar og:description
      if (/<meta\b[^>]*property=["']og:description["'][^>]*\/?>/i.test(pageHtml)) {
        pageHtml = pageHtml.replace(
          /<meta\b[^>]*property=["']og:description["'][^>]*\/?>/i,
          `<meta property="og:description" content="${pageDesc}" />`
        );
      } else {
        pageHtml = pageHtml.replace('</head>', `  <meta property="og:description" content="${pageDesc}" />\n  </head>`);
      }

      // 5. Reemplazar og:url
      if (/<meta\b[^>]*property=["']og:url["'][^>]*\/?>/i.test(pageHtml)) {
        pageHtml = pageHtml.replace(
          /<meta\b[^>]*property=["']og:url["'][^>]*\/?>/i,
          `<meta property="og:url" content="${canonicalUrl}" />`
        );
      } else {
        pageHtml = pageHtml.replace('</head>', `  <meta property="og:url" content="${canonicalUrl}" />\n  </head>`);
      }

      // 6. Reemplazar o insertar twitter:title
      if (/<meta\b[^>]*name=["']twitter:title["'][^>]*\/?>/i.test(pageHtml)) {
        pageHtml = pageHtml.replace(
          /<meta\b[^>]*name=["']twitter:title["'][^>]*\/?>/i,
          `<meta name="twitter:title" content="${pageTitle}" />`
        );
      } else {
        pageHtml = pageHtml.replace(
          /<meta\b[^>]*name=["']twitter:card["'][^>]*\/?>/i,
          `<meta name="twitter:card" content="summary_large_image" />\n    <meta name="twitter:title" content="${pageTitle}" />`
        );
      }

      // 7. Reemplazar o insertar <link rel="canonical">
      if (/<link\b[^>]*rel=["']canonical["'][^>]*\/?>/i.test(pageHtml)) {
        pageHtml = pageHtml.replace(
          /<link\b[^>]*rel=["']canonical["'][^>]*\/?>/i,
          `<link rel="canonical" href="${canonicalUrl}" />`
        );
      } else {
        pageHtml = pageHtml.replace(
          '</head>',
          `  <link rel="canonical" href="${canonicalUrl}" />\n  </head>`
        );
      }

      // Inyectar app HTML limpio dentro de #root (sin <title>, <meta> ni <link rel="canonical">)
      pageHtml = pageHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${cleanAppHtml}</div>`
      );

      // Guardar en la ruta correspondiente
      let outFilePath: string;
      if (route === '/') {
        outFilePath = path.resolve(distDir, 'index.html');
      } else {
        const routeDir = path.resolve(distDir, route.replace(/^\//, ''));
        fs.mkdirSync(routeDir, { recursive: true });
        outFilePath = path.resolve(routeDir, 'index.html');
      }

      fs.writeFileSync(outFilePath, pageHtml, 'utf-8');
      console.log(`  ✓ ${route} -> ${path.relative(process.cwd(), outFilePath)} (${(pageHtml.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`❌ Error rendering route ${route}:`, err);
    }
  }

  // Generate sitemap.xml
  const today = new Date().toISOString().split('T')[0];
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => {
  const url = route === '/' ? 'https://aerio.website/' : `https://aerio.website${route}`;
  let priority = '0.7';
  let changefreq = 'monthly';
  if (route === '/') {
    priority = '1.0';
    changefreq = 'weekly';
  } else if (route === '/blog') {
    priority = '0.9';
    changefreq = 'weekly';
  } else if (route.startsWith('/blog/')) {
    priority = '0.8';
    changefreq = 'monthly';
  } else if (route === '/privacidad' || route === '/terminos') {
    priority = '0.5';
    changefreq = 'yearly';
  }
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.resolve(process.cwd(), 'public/sitemap.xml'), sitemapXml, 'utf-8');
  console.log(`🗺️  sitemap.xml generated with ${routes.length} URLs!`);
  console.log('✅ Pre-rendering completed successfully!');
}

prerender();
