"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Users,
    Newspaper,
    Calendar,
    Mail,
    ArrowUpRight,
    Heart,
    Activity,
    Loader2,
    Clock,
    RefreshCw,
    CheckCircle2,
    XCircle
} from "lucide-react";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        posts: 0,
        events: 0,
        prayers: 0,
        groups: 0,
        recentPrayers: [] as any[],
        lastSync: null as any,
        monthlyPrayers: [] as any[]
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboardData() {
            setIsLoading(true);

            // Buscar pedidos de oração dos últimos 6 meses agrupados por mês
            const { data: prayerData } = await supabase
                .from("prayer_requests")
                .select("created_at")
                .gte("created_at", new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString());

            // Agrupar por mês
            const monthlyData: { [key: string]: number } = {};
            const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

            if (prayerData) {
                prayerData.forEach((prayer) => {
                    const date = new Date(prayer.created_at);
                    const monthKey = `${monthNames[date.getMonth()]}/${date.getFullYear().toString().slice(2)}`;
                    monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1;
                });
            }

            // Converter para array e pegar últimos 6 meses
            const monthlyPrayers = Object.entries(monthlyData)
                .map(([month, count]) => ({ month, count }))
                .slice(-6);

            const [
                { count: postsCount },
                { count: eventsCount },
                { count: prayersCount },
                { count: groupsCount },
                { data: recentPrayers },
                { data: lastSync }
            ] = await Promise.all([
                supabase.from("posts").select("*", { count: 'exact', head: true }),
                supabase.from("events").select("*", { count: 'exact', head: true }),
                supabase.from("prayer_requests").select("*", { count: 'exact', head: true }),
                supabase.from("groups").select("*", { count: 'exact', head: true }),
                supabase.from("prayer_requests").select("*").order("created_at", { ascending: false }).limit(5),
                supabase.from("sync_logs").select("*").order("created_at", { ascending: false }).limit(1).single()
            ]);

            setStats({
                posts: postsCount || 0,
                events: eventsCount || 0,
                prayers: prayersCount || 0,
                groups: groupsCount || 0,
                recentPrayers: recentPrayers || [],
                lastSync: lastSync || null,
                monthlyPrayers: monthlyPrayers.length > 0 ? monthlyPrayers : [{ month: "Sem dados", count: 0 }]
            });
            setIsLoading(false);
        }

        fetchDashboardData();
    }, []);

    const kpis = [
        { title: "Notícias", value: stats.posts, icon: Newspaper, color: "text-blue-600", bg: "bg-blue-50" },
        { title: "Eventos", value: stats.events, icon: Calendar, color: "text-brand-gold", bg: "bg-amber-50" },
        { title: "Pedidos de Oração", value: stats.prayers, icon: Mail, color: "text-emerald-600", bg: "bg-emerald-50" },
        { title: "Grupos de Oração", value: stats.groups, icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
    ];

    if (isLoading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center text-gray-400">
                <Loader2 className="w-12 h-12 animate-spin mb-4 text-brand-gold" />
                <p className="font-bold italic">Carregando métricas do reino...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-brand-blue italic">Bem-vindo, Administrador</h1>
                    <p className="text-gray-500">Aqui está o resumo da atividade da RCC Diocese de Sinop.</p>
                </div>
                {stats.lastSync && (
                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 animate-in slide-in-from-right duration-700">
                        <div className={`p-1.5 rounded-full ${stats.lastSync.status === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {stats.lastSync.status === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        </div>
                        <div className="text-xs">
                            <p className="font-bold text-slate-700">Sincronização RCC Brasil</p>
                            <p className="text-slate-500">
                                {stats.lastSync.status === 'success' ? 'Sucesso' : 'Falha'} • {new Date(stats.lastSync.created_at).toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit' })} • {stats.lastSync.entries_synced} novas
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* KPI Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {kpis.map((stat) => (
                    <Card key={stat.title} className="rounded-[2rem] border-none shadow-sm hover:shadow-xl transition-all group">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                            <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-brand-blue">{stat.value}</div>
                            <p className="text-[10px] text-gray-400 mt-2 font-medium flex items-center gap-1">
                                Atividade acumulada <Activity className="w-3 h-3" />
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Simple Chart */}
                <Card className="col-span-4 rounded-[3rem] border-none shadow-sm overflow-hidden p-8">
                    <CardHeader className="px-0 pt-0">
                        <CardTitle className="text-xl font-bold text-brand-blue italic">Pedidos por Mês</CardTitle>
                        <CardDescription>Resumo de intercessões solicitadas pelo site</CardDescription>
                    </CardHeader>
                    <div className="h-[300px] mt-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.monthlyPrayers}>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                                <Tooltip
                                    cursor={{ fill: '#f8f8f8' }}
                                    contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="count" fill="#004d2c" radius={[10, 10, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Recent Activity */}
                <Card className="col-span-3 rounded-[3rem] border-none shadow-sm p-8">
                    <CardHeader className="px-0 pt-0 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold text-brand-blue italic">Pedidos Recentes</CardTitle>
                            <CardDescription>Últimas intenções recebidas</CardDescription>
                        </div>
                        <Mail className="w-6 h-6 text-brand-gold opacity-30" />
                    </CardHeader>
                    <CardContent className="px-0 mt-6">
                        <div className="space-y-6">
                            {stats.recentPrayers.map((prayer) => (
                                <div key={prayer.id} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                                    <div className="h-10 w-10 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <Heart className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 space-y-1 overflow-hidden">
                                        <p className="text-sm font-bold text-brand-blue truncate">
                                            {prayer.name}
                                        </p>
                                        <p className="text-xs text-gray-500 line-clamp-1 italic">
                                            "{prayer.message}"
                                        </p>
                                        <div className="flex items-center gap-2 text-[10px] text-gray-400 pt-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(prayer.created_at).toLocaleDateString("pt-BR")}
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-bold text-brand-gold uppercase tracking-widest self-center">
                                        Novo
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
