import React, { useEffect, useState, useMemo } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Download, Users, ArrowUpRight, Clock, Shield, LogOut, ChevronDown, ChevronUp, Globe2, Monitor, MessageSquare, Star, CheckCircle2, AlertCircle, Eye, EyeOff, Trash2 } from 'lucide-react';
import { cn } from './lib/utils';
import { db, auth, logout } from './lib/firebase';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const [totalDownloads, setTotalDownloads] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [allVisits, setAllVisits] = useState<any[]>([]);
  const [allDownloads, setAllDownloads] = useState<any[]>([]);
  const [allFeedback, setAllFeedback] = useState<any[]>([]);
  const [expandedIp, setExpandedIp] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;

    // Listen to all downloads
    const qDownloads = query(collection(db, 'downloads'), orderBy('timestamp', 'desc'));
    const unsubDownloads = onSnapshot(qDownloads, (snapshot) => {
      setTotalDownloads(snapshot.size);
      setAllDownloads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Listen to all visits
    const qVisitsAll = query(collection(db, 'visits'), orderBy('timestamp', 'desc'));
    const unsubVisitsAll = onSnapshot(qVisitsAll, (snapshot) => {
      setTotalVisits(snapshot.size);
      setAllVisits(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Listen to all feedback
    const qFeedback = query(collection(db, 'feedback'), orderBy('createdAt', 'desc'));
    const unsubFeedback = onSnapshot(qFeedback, (snapshot) => {
      setAllFeedback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubDownloads();
      unsubVisitsAll();
      unsubFeedback();
    };
  }, [user]);

  const groupedTraffic = useMemo(() => {
    const map = new Map<string, any>();
    
    allVisits.forEach(v => {
      if (!v.ip) return;
      if (!map.has(v.ip)) {
        map.set(v.ip, {
          ip: v.ip,
          country: v.country || 'Desconocido',
          city: v.city || 'Desconocido',
          userAgent: v.userAgent || 'Desconocido',
          visitDates: [],
          downloadDates: []
        });
      }
      if (v.timestamp) map.get(v.ip).visitDates.push(v.timestamp.toDate());
    });

    allDownloads.forEach(d => {
      if (!d.ip) return;
      if (!map.has(d.ip)) {
        map.set(d.ip, {
          ip: d.ip,
          country: d.country || 'Desconocido',
          city: d.city || 'Desconocido',
          userAgent: 'Desconocido',
          visitDates: [],
          downloadDates: []
        });
      }
      if (d.timestamp) map.get(d.ip).downloadDates.push(d.timestamp.toDate());
    });

    return Array.from(map.values()).sort((a, b) => {
      const getLatest = (dates: Date[]) => dates.length > 0 ? Math.max(...dates.map(d => d.getTime())) : 0;
      const latestA = Math.max(getLatest(a.visitDates), getLatest(a.downloadDates));
      const latestB = Math.max(getLatest(b.visitDates), getLatest(b.downloadDates));
      return latestB - latestA;
    });
  }, [allVisits, allDownloads]);

  if (loading || !user) {
    return <div className="min-h-screen bg-[#0a0510] text-white flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0510] text-white p-6 selection:bg-[#ff007f]/30">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Lower Section: Grouped Activity */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-[#130b1c] border border-white/5 rounded-2xl p-6 overflow-hidden flex flex-col max-h-[800px]">
            <h2 className="text-lg font-semibold mb-6 shrink-0">Tráfico Agrupado por IP ({groupedTraffic.length} visitantes únicos)</h2>
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              {groupedTraffic.map((visitor) => {
                const isExpanded = expandedIp === visitor.ip;
                return (
                  <div key={visitor.ip} className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden transition-all duration-300">
                    <div 
                      onClick={() => setExpandedIp(isExpanded ? null : visitor.ip)}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer hover:bg-white/[0.04]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                          <Users className="w-5 h-5 text-white/50" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-semibold text-white/90">{visitor.ip}</span>
                          <span className="text-xs text-white/50 flex items-center gap-1 mt-1">
                            <Globe2 className="w-3 h-3" /> {visitor.city}, {visitor.country}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-3 sm:mt-0">
                        <div className="flex gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-[#ff007f]/10 text-[#ff007f] text-xs font-medium border border-[#ff007f]/20" title="Total Visitas">
                            {visitor.visitDates.length} {visitor.visitDates.length === 1 ? 'visita' : 'visitas'}
                          </span>
                          {visitor.downloadDates.length > 0 && (
                            <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20" title="Total Descargas">
                              {visitor.downloadDates.length} {visitor.downloadDates.length === 1 ? 'descarga' : 'descargas'}
                            </span>
                          )}
                        </div>
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-white/40" /> : <ChevronDown className="w-5 h-5 text-white/40" />}
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="p-4 pt-0 border-t border-white/5 bg-black/20">
                        <div className="mt-4 mb-4 flex items-start gap-2 text-xs text-white/50 bg-black/40 p-3 rounded-lg border border-white/5">
                          <Monitor className="w-4 h-4 shrink-0 mt-0.5" />
                          <span className="break-all">{visitor.userAgent}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-medium text-white/70 mb-3 flex items-center gap-2">
                              <Clock className="w-4 h-4" /> Historial de Visitas
                            </h4>
                            <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
                              {visitor.visitDates.sort((a: any, b: any) => b.getTime() - a.getTime()).map((date: Date, idx: number) => (
                                <li key={idx} className="text-xs text-white/50 bg-white/5 px-3 py-2 rounded-md">
                                  {date.toLocaleString()}
                                </li>
                              ))}
                              {visitor.visitDates.length === 0 && <li className="text-xs text-white/30">Sin registros</li>}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-white/70 mb-3 flex items-center gap-2">
                              <Download className="w-4 h-4" /> Historial de Descargas
                            </h4>
                            <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
                              {visitor.downloadDates.sort((a: any, b: any) => b.getTime() - a.getTime()).map((date: Date, idx: number) => (
                                <li key={idx} className="text-xs text-blue-400/70 bg-blue-500/10 px-3 py-2 rounded-md">
                                  {date.toLocaleString()}
                                </li>
                              ))}
                              {visitor.downloadDates.length === 0 && <li className="text-xs text-white/30">Aún no ha descargado</li>}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {groupedTraffic.length === 0 && (
                <div className="text-center text-white/50 py-10">No hay tráfico registrado aún.</div>
              )}
            </div>
          </div>
          
          {/* Feedback Section */}
          <div className="bg-[#130b1c] border border-white/5 rounded-2xl p-6 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold shrink-0 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-white/50" />
                Comentarios ({allFeedback.length})
              </h2>
            </div>
            
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar max-h-[600px]">
              {allFeedback.map((feedback) => (
                <div key={feedback.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:bg-white/[0.04] transition-colors">
                  <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-medium border",
                          feedback.type === 'bug' ? "bg-red-500/10 text-red-400 border-red-500/20" :
                          feedback.type === 'problem' ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                          feedback.type === 'suggestion' ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                          feedback.type === 'feature' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                          "bg-pink-500/10 text-pink-400 border-pink-500/20"
                        )}>
                          {feedback.type === 'bug' ? 'Error' : 
                           feedback.type === 'problem' ? 'Problema' : 
                           feedback.type === 'suggestion' ? 'Sugerencia' : 
                           feedback.type === 'feature' ? 'Nueva función' : 'Me gusta'}
                        </span>
                        
                        <span className="text-sm font-medium text-white/90">
                          {feedback.name || 'Anónimo'}
                        </span>
                        
                        {feedback.email && (
                          <span className="text-xs text-white/40">({feedback.email})</span>
                        )}
                      </div>
                      
                      {feedback.rating > 0 && (
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={cn("w-3.5 h-3.5", i < feedback.rating ? "text-yellow-400 fill-yellow-400" : "text-white/10")} />
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-2">
                        <select 
                          value={feedback.status || 'new'}
                          onChange={(e) => updateDoc(doc(db, 'feedback', feedback.id), { status: e.target.value })}
                          className={cn(
                            "text-xs px-2 py-1 rounded-md border bg-black outline-none focus:ring-1",
                            feedback.status === 'new' ? "text-white/90 border-white/20" :
                            feedback.status === 'reviewing' ? "text-yellow-400 border-yellow-400/30" :
                            feedback.status === 'resolved' ? "text-green-400 border-green-400/30" :
                            "text-white/40 border-white/10"
                          )}
                        >
                          <option value="new">Nuevo</option>
                          <option value="reviewing">Revisando</option>
                          <option value="resolved">Resuelto</option>
                          <option value="ignored">Ignorado</option>
                        </select>
                        
                        <button
                          onClick={() => updateDoc(doc(db, 'feedback', feedback.id), { public: !feedback.public })}
                          title={feedback.public ? "Quitar de la web" : "Publicar en la web"}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium border transition-colors",
                            feedback.public 
                              ? "bg-[#ff007f]/10 text-[#ff007f] border-[#ff007f]/30 hover:bg-[#ff007f]/20" 
                              : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10 hover:text-white/80"
                          )}
                        >
                          {feedback.public ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          {feedback.public ? "Público" : "Privado"}
                        </button>

                        <button
                          onClick={async () => {
                            if(window.confirm('¿Eliminar este comentario permanentemente?')) {
                              try {
                                await deleteDoc(doc(db, 'feedback', feedback.id));
                              } catch (err: any) {
                                alert("Error al eliminar: " + err.message);
                              }
                            }
                          }}
                          title="Eliminar comentario"
                          className="flex items-center justify-center w-7 h-7 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <span className="text-[11px] text-white/30">
                        {feedback.createdAt ? new Date(feedback.createdAt.toDate()).toLocaleString() : 'Reciente'}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-white/80 bg-black/30 p-4 rounded-xl border border-white/5 whitespace-pre-wrap leading-relaxed">
                    {feedback.message}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mt-4 text-xs text-white/40">
                    {feedback.version && <span className="bg-white/5 px-2 py-1 rounded">Versión: {feedback.version}</span>}
                    {feedback.macModel && <span className="bg-white/5 px-2 py-1 rounded">Mac: {feedback.macModel}</span>}
                    {feedback.macOS && <span className="bg-white/5 px-2 py-1 rounded">OS: {feedback.macOS}</span>}
                  </div>
                </div>
              ))}
              
              {allFeedback.length === 0 && (
                <div className="text-center text-white/50 py-10">No hay comentarios registrados.</div>
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
