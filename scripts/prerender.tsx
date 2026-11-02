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
      const appHtml = renderToString(
        React.createElement(StaticRouter, { location: route }, React.createElement(AppRoutes))
      );

      let pageHtml = baseTemplate;

      // Extract title if present in rendered output
      const titleMatch = appHtml.match(/<title>(.*?)<\/title>/);
      if (titleMatch) {
        pageHtml = pageHtml.replace(/<title>.*?<\/title>/, `<title>${titleMatch[1]}</title>`);
      }

      // Extract description if present
      const descMatch = appHtml.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/);
      if (descMatch) {
        pageHtml = pageHtml.replace(
          /<meta[^>]*name=["']description["'][^>]*content=["'].*?["']\s*\/?>/,
          `<meta name="description" content="${descMatch[1]}" />`
        );
      }

      // Extract canonical URL or set it based on route
      const canonicalUrl = `https://aerio.website${route === '/' ? '' : route}`;
      if (pageHtml.includes('<link rel="canonical"')) {
        pageHtml = pageHtml.replace(
          /<link rel="canonical"[^>]*\/?>/,
          `<link rel="canonical" href="${canonicalUrl}" />`
        );
      } else {
        pageHtml = pageHtml.replace(
          '</head>',
          `  <link rel="canonical" href="${canonicalUrl}" />\n  </head>`
        );
      }

      // Inject app HTML into #root
      pageHtml = pageHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );

      // Save to appropriate file path
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
