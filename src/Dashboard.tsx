import React, { useEffect, useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Download, Users, ArrowUpRight, Clock, Shield, LogOut } from 'lucide-react';
import { cn } from './lib/utils';
import { db, auth, logout } from './lib/firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const [totalDownloads, setTotalDownloads] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [recentVisits, setRecentVisits] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;

    // Listen to downloads
    const qDownloads = query(collection(db, 'downloads'));
    const unsubDownloads = onSnapshot(qDownloads, (snapshot) => {
      setTotalDownloads(snapshot.size);
    });

    // Listen to visits
    const qVisits = query(collection(db, 'visits'), orderBy('timestamp', 'desc'), limit(15));
    const unsubVisits = onSnapshot(qVisits, (snapshot) => {
      // Total visits in this snapshot is just the last 15, but we want all sizes if possible, 
      // however size of all can be expensive. For this prototype, we'll listen to all visits for the total count.
      // Doing two queries for visits.
    });

    const qVisitsAll = query(collection(db, 'visits'));
    const unsubVisitsAll = onSnapshot(qVisitsAll, (snapshot) => {
      setTotalVisits(snapshot.size);
    });

    const qVisitsRecent = query(collection(db, 'visits'), orderBy('timestamp', 'desc'), limit(15));
    const unsubVisitsRecent = onSnapshot(qVisitsRecent, (snapshot) => {
      const visitsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecentVisits(visitsData);
    });

    return () => {
      unsubDownloads();
      unsubVisitsAll();
      unsubVisitsRecent();
    };
  }, [user]);

  if (loading || !user) {
    return <div className="min-h-screen bg-[#0a0510] text-white flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0510] text-white p-6 selection:bg-[#ff007f]/30">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Panel de Estadísticas</h1>
            <p className="text-white/50">Rendimiento en tiempo real de tu aplicación Aerio.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#130b1c] border border-white/5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium">Sistema en línea</span>
            </div>
            <button 
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all text-sm font-medium border border-red-500/20"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard 
            title="Descargas Totales" 
            value={totalDownloads.toLocaleString()} 
            icon={<Download className="w-5 h-5 text-blue-400" />}
          />
          <StatCard 
            title="Visitas Totales" 
            value={totalVisits.toLocaleString()} 
            icon={<Users className="w-5 h-5 text-[#ff007f]" />}
          />
        </div>

        {/* Lower Section: Recent Activity */}
        <div className="grid grid-cols-1 gap-6">
          
          {/* Recent Activity */}
          <div className="bg-[#130b1c] border border-white/5 rounded-2xl p-6 h-[500px] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-6">Tráfico Reciente (Últimas 15 visitas)</h2>
            <div className="space-y-4">
              {recentVisits.map((visit) => (
                <div key={visit.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white/50" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white/90">IP: {visit.ip}</span>
                      <span className="text-xs text-white/40 truncate max-w-[200px] md:max-w-md" title={visit.userAgent}>{visit.userAgent}</span>
                    </div>
                  </div>
                  <span className="text-sm text-white/40 text-right whitespace-nowrap">
                    {visit.timestamp ? new Date(visit.timestamp.toDate()).toLocaleString() : 'Justo ahora'}
                  </span>
                </div>
              ))}
              {recentVisits.length === 0 && (
                <div className="text-center text-white/50 py-10">No hay visitas registradas aún.</div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-[#130b1c] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-white/50 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
    </div>
  );
}
