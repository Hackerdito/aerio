import React, { useEffect } from 'react';

const ADSENSE_SRC = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1493228709479332';

export default function AdSenseScript() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Check if script already exists to avoid duplication
    const existing = document.querySelector(`script[src="${ADSENSE_SRC}"]`);
    if (!existing) {
      const script = document.createElement('script');
      script.async = true;
      script.src = ADSENSE_SRC;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <script
      async
      src={ADSENSE_SRC}
      crossOrigin="anonymous"
    />
  );
}
