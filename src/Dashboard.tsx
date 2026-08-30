import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Users, ArrowUpRight, Clock, Shield } from 'lucide-react';
import { cn } from './lib/utils';

const data = [
  { time: '00:00', downloads: 120, active: 450 },
  { time: '04:00', downloads: 80, active: 300 },
  { time: '08:00', downloads: 350, active: 800 },
  { time: '12:00', downloads: 600, active: 1500 },
  { time: '16:00', downloads: 850, active: 2100 },
  { time: '20:00', downloads: 500, active: 1800 },
  { time: '24:00', downloads: 300, active: 900 },
];

const weeklyData = [
  { day: 'Lun', downloads: 1200 },
  { day: 'Mar', downloads: 1800 },
  { day: 'Mié', downloads: 2200 },
  { day: 'Jue', downloads: 1500 },
  { day: 'Vie', downloads: 2800 },
  { day: 'Sáb', downloads: 3400 },
  { day: 'Dom', downloads: 3100 },
];

export default function Dashboard({ totalDownloads }: { totalDownloads: number }) {
  return (
    <div className="min-h-screen bg-[#0a0510] text-white p-6 selection:bg-[#ff007f]/30">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Panel de Estadísticas</h1>
            <p className="text-white/50">Rendimiento en tiempo real de tu aplicación Aerio.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#130b1c] border border-white/5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium">Sistema en línea</span>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Descargas Totales" 
            value={totalDownloads.toLocaleString()} 
            icon={<Download className="w-5 h-5 text-blue-400" />}
            trend="+12.5%"
          />
          <StatCard 
            title="Usuarios Activos (Live)" 
            value="2,104" 
            icon={<Users className="w-5 h-5 text-[#ff007f]" />}
            trend="+5.2%"
          />
          <StatCard 
            title="Tasa de Retención" 
            value="84%" 
            icon={<Shield className="w-5 h-5 text-green-400" />}
            trend="+1.1%"
          />
        </div>

        {/* Chart Area */}
        <div className="bg-[#130b1c] border border-white/5 rounded-2xl p-6 h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Descargas vs Usuarios Activos</h2>
            <select className="bg-[#0a0510] border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#ff007f]">
              <option>Últimas 24 horas</option>
              <option>Últimos 7 días</option>
              <option>Último mes</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#007fff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#007fff" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff007f" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ff007f" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#130b1c', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="downloads" stroke="#007fff" strokeWidth={2} fillOpacity={1} fill="url(#colorDownloads)" />
              <Area type="monotone" dataKey="active" stroke="#ff007f" strokeWidth={2} fillOpacity={1} fill="url(#colorActive)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Lower Section: Weekly Downloads & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Weekly Bar Chart */}
          <div className="bg-[#130b1c] border border-white/5 rounded-2xl p-6 h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Descargas (Últimos 7 días)</h2>
            </div>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#130b1c', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="downloads" fill="#db2777" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#130b1c] border border-white/5 rounded-2xl p-6 h-[400px] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-6">Actividad Reciente</h2>
            <div className="space-y-4">
              <ActivityRow action="Nueva descarga (macOS 14.2)" time="Hace 2 minutos" />
              <ActivityRow action="Nueva descarga (macOS 13.5)" time="Hace 5 minutos" />
              <ActivityRow action="Usuario completó limpieza (2.4 GB liberados)" time="Hace 12 minutos" />
              <ActivityRow action="Nueva descarga (macOS 15.0 Beta)" time="Hace 18 minutos" />
              <ActivityRow action="Usuario liberó RAM (1.2 GB)" time="Hace 25 minutos" />
              <ActivityRow action="Nueva descarga (macOS 14.0)" time="Hace 32 minutos" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) {
  return (
    <div className="bg-[#130b1c] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex items-center gap-1 text-green-400 text-sm font-medium bg-green-400/10 px-2 py-1 rounded-md">
          <ArrowUpRight className="w-3 h-3" />
          {trend}
        </div>
      </div>
      <div>
        <p className="text-white/50 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
    </div>
  );
}

function ActivityRow({ action, time }: { action: string, time: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 last:pb-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
          <Clock className="w-4 h-4 text-white/50" />
        </div>
        <span className="text-sm">{action}</span>
      </div>
      <span className="text-sm text-white/40">{time}</span>
    </div>
  );
}
