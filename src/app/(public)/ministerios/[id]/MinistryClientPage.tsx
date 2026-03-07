"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Users, Flame, ArrowRight, History,
    Mic2, Heart, Baby, BookOpen, Music,
    Share2, Scale, HandHelping, GraduationCap,
    Clock, MapPin
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, any> = {
    "Mic2": Mic2,
    "Heart": Heart,
    "Baby": Baby,
    "Flame": Flame,
    "Users": Users,
    "BookOpen": BookOpen,
    "Music": Music,
    "Share2": Share2,
    "Scale": Scale,
    "HandHelping": HandHelping,
    "GraduationCap": GraduationCap
};

export default function MinistryClientPage({ ministry }: { ministry: any }) {
    const IconComp = iconMap[ministry.nome.split(' ').pop() || ""] ||
        iconMap[Object.keys(iconMap).find(k => ministry.nome.includes(k)) || ""] ||
        Flame;

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section / Header */}
            <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                {ministry.imagem_url ? (
                    <motion.img
                        src={ministry.imagem_url}
                        alt={ministry.nome}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                    />
                ) : (
                    <div className={`absolute inset-0 ${ministry.cor || 'bg-brand-blue'}`} />
                )}

                {/* Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-brand-blue/20 mix-blend-multiply" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-4 max-w-4xl"
                    >
                        <div className="flex items-center gap-2">
                            <Link href="/ministerios" className="text-white/60 hover:text-white transition-colors flex items-center gap-1 text-sm font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 mb-4">
                                ← Voltar para Ministérios
                            </Link>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-brand-gold bg-brand-gold/20 px-4 py-1.5 rounded-full uppercase tracking-[0.2em] backdrop-blur-xl border border-brand-gold/30">
                                {ministry.bienio ? `Gestão ${ministry.bienio}` : "Ministério Diocesano"}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
                            {ministry.nome}
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <section className="relative z-20 -mt-20 pb-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Main Info Column */}
                        <div className="lg:col-span-8 space-y-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-gray-200/50 border border-gray-100"
                            >
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3 text-brand-gold">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center">
                                            <Flame className="w-6 h-6 fill-current" />
                                        </div>
                                        <h2 className="text-xs font-black uppercase tracking-[0.3em]">
                                            Missão e Chamado
                                        </h2>
                                    </div>

                                    <p className="text-2xl md:text-4xl text-brand-blue font-bold italic leading-tight border-l-8 border-brand-gold/30 pl-8 py-4">
                                        &quot;{ministry.descricao || "Nenhuma descrição disponível."}&quot;
                                    </p>
                                </div>
                            </motion.div>

                            {/* History Section */}
                            {ministry.history && ministry.history.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-10"
                                >
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                                            <History className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">
                                            Histórico de Servos (Coordenadores)
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {ministry.history.map((h: any, i: number) => (
                                            <div key={i} className="flex flex-col p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 hover:border-brand-gold/30 hover:bg-white transition-all duration-300 group">
                                                <p className="font-bold text-brand-blue text-xl group-hover:text-brand-gold transition-colors">{h.nome}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/40" />
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{h.gestao}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Sidebar Column */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Coordinator Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-brand-blue p-10 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl shadow-brand-blue/20"
                            >
                                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-brand-gold/20 transition-colors" />

                                <div className="relative z-10 space-y-8">
                                    <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                                        <Users className="w-8 h-8 text-white" />
                                    </div>

                                    <div>
                                        <p className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em] mb-2">Coordenação Atual</p>
                                        <p className="font-black text-3xl tracking-tighter uppercase italic">{ministry.coordenador || "A definir"}</p>
                                        <p className="text-brand-gold font-bold italic mt-1">{ministry.bienio}</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* CTA Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-gray-50 p-10 rounded-[3rem] space-y-8 border border-gray-100"
                            >
                                <div className="space-y-4">
                                    <h4 className="text-xl font-bold text-brand-blue italic">Sente o chamado?</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Se Deus toca o seu coração para servir neste ministério, clique abaixo e fale conosco.
                                    </p>
                                </div>

                                <Link href="/contato" className="block">
                                    <Button size="lg" className="w-full h-16 rounded-2xl bg-brand-blue hover:bg-brand-blue/90 text-white font-black text-lg gap-3 shadow-xl transition-all hover:-translate-y-1">
                                        QUERO SERVIR
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Link>
                            </motion.div>

                            {/* Decorative Icon */}
                            <div className="hidden lg:flex justify-center opacity-5 pt-12">
                                <IconComp className="w-48 h-48 text-brand-blue" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Bottom Navigation */}
            <section className="py-24 border-t border-gray-50 bg-gray-50/50">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
                    <h3 className="text-3xl font-bold text-brand-blue italic">Conheça outros ministérios</h3>
                    <Link href="/ministerios">
                        <Button variant="outline" size="lg" className="rounded-full px-12 h-14 font-bold border-brand-blue/10 hover:bg-white transition-all text-brand-blue">
                            Ver todos os ministérios
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
