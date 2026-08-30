import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function TerminalVisualizer() {
  const [lines, setLines] = useState<string[]>([
    "$ storage --analyze --safe"
  ]);

  useEffect(() => {
    const sequence = [
      { text: "[MAPA] Cachés de usuario: 1.15 GB", delay: 800 },
      { text: "[MAPA] Registros de usuario: 363.9 MB", delay: 1200 },
      { text: "[MAPA] Descargas: 0 KB", delay: 1500 },
      { text: "[MAPA] Datos de desarrollo: 0 KB", delay: 1800 },
      { text: "[MAPA] Papelera: 0 KB", delay: 2100 },
      { text: "[OK] Análisis terminado. Sin cambios", delay: 2600, color: "text-green-400" },
      { text: "hackerdito@Aerio:~$ █", delay: 3000, color: "text-[#ff007f]" }
    ];

    let timeouts: ReturnType<typeof setTimeout>[] = [];

    sequence.forEach(({ text, delay, color }, index) => {
      const timeout = setTimeout(() => {
        setLines(prev => {
          if (index === sequence.length - 1) {
            // Replace the last line or just add it if we want it to stay
            return [...prev, text];
          }
          return [...prev, text];
        });
      }, delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="bg-[#0a0510] border border-[#ff007f]/30 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(255,0,127,0.1)]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#ff007f]/20 bg-[#130b1c]">
        <span className="text-xs font-mono text-[#ff007f] tracking-widest uppercase">Terminal // Live</span>
        <div className="flex gap-2 items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-xs text-[#ff007f] ml-2 font-mono">Limpiar</span>
        </div>
      </div>
      <div className="p-4 font-mono text-sm space-y-1 h-64 overflow-y-auto">
        {lines.map((line, i) => {
          let colorClass = "text-blue-300";
          if (line.startsWith("$")) colorClass = "text-white";
          if (line.includes("[OK]")) colorClass = "text-green-400";
          if (line.startsWith("hacker")) colorClass = "text-[#ff007f]";
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={colorClass}
            >
              {line}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
