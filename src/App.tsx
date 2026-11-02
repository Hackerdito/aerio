/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import Login from './Login';
import Feedback from './Feedback';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/blog" element={<BlogListPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/privacidad" element={<PrivacyPage />} />
      <Route path="/terminos" element={<TermsPage />} />
      <Route path="/acerca" element={<AboutPage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
