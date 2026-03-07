"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
    Mic2, Heart, Baby, Flame, Users, ShieldCheck,
    BookOpen, Music, Share2, Scale, HandHelping,
    GraduationCap, ArrowRight, History, Loader2, MapPin, Clock
} from "lucide-react";
import Link from "next/link";

import { motion } from "framer-motion";

// Maple icons from Lucide for fallback/default
const iconMap: Record<string, any> = {
    "Mic2": Mic2,
    "Heart": Heart,
    "Baby": Baby,
    "Flame": Flame,
    "Users": Users,
    "ShieldCheck": ShieldCheck,
    "BookOpen": BookOpen,
    "Music": Music,
    "Share2": Share2,
    "Scale": Scale,
    "HandHelping": HandHelping,
    "GraduationCap": GraduationCap
};

export default function MinisteriosPublicPage() {
    const [ministerios, setMinisterios] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMinisterios();
    }, []);

    async function fetchMinisterios() {
        // 1. Fetch ministries
        const { data: minData, error: minError } = await supabase
            .from("ministerios")
            .select("*")
            .order("ordem", { ascending: true });

        if (minError) {
            console.error("Error fetching ministerios:", minError);
            setIsLoading(false);
            return;
        }

        const list = minData || [];
        if (list.length === 0) {
            setMinisterios([]);
            setIsLoading(false);
            return;
        }

        // 2. Fetch all members linked to ministries across ALL mandates
        const { data: allHistory } = await supabase
            .from("conselho_membros")
            .select(`
                nome, 
                ministerio_id,
                conselho_mandatos (
                    id,
                    titulo,
                    ano_inicio,
                    ativo
                )
            `)
            .not("ministerio_id", "is", null);

        const historyByMin: Record<number, any[]> = {};
        const currentCoordByMin: Record<number, { nome: string, gestao: string }> = {};

        (allHistory || []).forEach((row: any) => {
            const minId = row.ministerio_id;
            const mandato = row.conselho_mandatos;

            if (!minId || !mandato) return;

            if (!historyByMin[minId]) historyByMin[minId] = [];
            historyByMin[minId].push({
                nome: row.nome,
                gestao: mandato.titulo,
                ano: mandato.ano_inicio,
                ativo: mandato.ativo
            });

            if (mandato.ativo) {
                currentCoordByMin[minId] = {
                    nome: row.nome,
                    gestao: mandato.titulo
                };
            }
        });

        Object.keys(historyByMin).forEach((key: any) => {
            historyByMin[key].sort((a, b) => b.ano - a.ano);
        });

        setMinisterios(list.map(m => ({
            ...m,
            coordenador: currentCoordByMin[m.id]?.nome || m.coordenador,
            bienio: currentCoordByMin[m.id]?.gestao || m.bienio,
            history: historyByMin[m.id] || []
        })));
        setIsLoading(false);
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            {/* Header Section */}
            <section className="bg-brand-blue py-24 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.rccdesinop.com.br/wp-content/uploads/2025/06/Renocacao-Carismatica-cartolica-fundo.png')] bg-cover bg-center" />
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-6xl font-extrabold mb-6 italic text-brand-gold"
                    >
                        Nossos Ministérios
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-blue-100 leading-relaxed"
                    >
                        No Grupo Rainha da Paz, a evangelização se faz viva através de diversos ministérios
                        que servem à Igreja e à comunidade com seus dons.
                    </motion.p>
                </div>
            </section>

            {/* Grid de Ministérios */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-brand-blue mb-4">Onde o Espírito Santo te chama?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Conheça cada um deles, quem os coordena hoje e a história de quem já serviu com amor.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                            <Loader2 className="w-12 h-12 animate-spin mb-4 text-brand-gold" />
                            <p className="font-bold italic">Carregando ministérios...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {ministerios.map((min, idx) => {
                                const IconComp = iconMap[min.nome.split(' ').pop() || ""] || iconMap[Object.keys(iconMap).find(k => min.nome.includes(k)) || ""] || Flame;

                                return (
                                    <motion.div
                                        key={min.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100/50 hover:shadow-2xl transition-all duration-500 group flex flex-col"
                                    >
                                        <div className="flex items-start justify-between mb-8">
                                            <div className={`w-16 h-16 rounded-2xl ${min.cor || 'bg-brand-blue/5 text-brand-blue'} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                                                <IconComp className="w-8 h-8" />
                                            </div>
                                            {min.bienio && (
                                                <span className="text-[10px] font-bold text-brand-gold bg-brand-gold/5 px-3 py-1 rounded-full uppercase tracking-widest">
                                                    Gestão {min.bienio}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-bold text-brand-blue mb-4 italic transition-colors">
                                            {min.nome}
                                        </h3>

                                        <p className="text-gray-500 leading-relaxed mb-6 italic text-sm line-clamp-3">
                                            "{min.descricao}"
                                        </p>

                                        <div className="space-y-4 pt-4 mt-auto border-t border-gray-50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-brand-blue/5 flex items-center justify-center text-brand-blue">
                                                    <Users className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase font-bold text-gray-400">Coordenador atual</p>
                                                    <p className="font-bold text-brand-blue">{min.coordenador || "A definir"}</p>
                                                </div>
                                            </div>

                                            <Link href={`/ministerios/${min.id}`} className="block">
                                                <Button
                                                    className={`w-full h-12 rounded-xl font-bold transition-all transform hover:scale-[1.02] shadow-sm ${min.cor || 'bg-brand-blue text-white'}`}
                                                >
                                                    Ver Detalhes
                                                </Button>
                                            </Link>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-brand-blue text-white mt-auto">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-8 italic text-brand-gold">Quer Servir em um Ministério?</h2>
                    <p className="text-lg mb-10 text-blue-100">
                        Se você sente o chamado para servir a Deus e aos irmãos em algum de nossos ministérios,
                        entre em contato conosco e venha fazer parte desta grande família de servos!
                    </p>
                    <Link href="/contato">
                        <Button size="lg" className="bg-brand-gold hover:bg-yellow-600 text-brand-blue font-bold px-12 rounded-full transform hover:scale-105 transition-all h-14">
                            Quero me tornar um servo
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
