"use client";

import { motion } from "framer-motion";
import { Download, ChevronLeft, GraduationCap, Flame, Star, Shield, Target, Crown, Sparkles, Users, Music, Mic2, Heart, Cross, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FormacaoEspecificaPage() {
    const ministerios = [
        {
            title: "Ministério de Música",
            icon: <Music className="w-6 h-6" />,
            color: "bg-blue-500",
            description: "Capacitação técnica e espiritual para músicos e cantores."
        },
        {
            title: "Ministério de Pregação",
            icon: <Mic2 className="w-6 h-6" />,
            color: "bg-red-500",
            description: "Formação para proclamadores da Palavra de Deus."
        },
        {
            title: "Ministério de Intercessão",
            icon: <Heart className="w-6 h-6" />,
            color: "bg-purple-500",
            description: "Aprofundamento na batalha espiritual e oração."
        },
        {
            title: "Ministério de Fé",
            icon: <Shield className="w-6 h-6" />,
            color: "bg-amber-500",
            description: "Base doutrinária e crescimento na fé católica."
        },
        {
            title: "M. de Formação",
            icon: <GraduationCap className="w-6 h-6" />,
            color: "bg-emerald-500",
            description: "Preparação para formadores e servos do grupo."
        },
        {
            title: "Ministério Jovem",
            icon: <Zap className="w-6 h-6" />,
            color: "bg-orange-500",
            description: "Evangelização e liderança para a juventude."
        },
        {
            title: "M. para Crianças",
            icon: <Star className="w-6 h-6" />,
            color: "bg-pink-500",
            description: "Metodologias de evangelização infantil."
        },
        {
            title: "Universitários",
            icon: <Users className="w-6 h-6" />,
            color: "bg-indigo-500",
            description: "Presença e missão no ambiente acadêmico."
        }
    ];

    return (
        <main className="min-h-screen bg-[#f8fafc] overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 bg-brand-blue overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/10 skew-x-[-20deg] translate-x-1/2 pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <Link href="/formacao">
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-white/60 hover:text-brand-gold font-bold text-xs uppercase tracking-widest mb-12 transition-colors group"
                        >
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Voltar para Formação
                        </motion.button>
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block px-4 py-1.5 bg-brand-gold/10 text-brand-gold text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6 border border-brand-gold/20">
                                3ª Etapa • Especialização
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 italic tracking-tighter leading-none">
                                Formação <br />
                                <span className="text-brand-gold">Específica</span>
                            </h1>
                            <p className="text-white/70 text-lg font-medium italic max-w-xl leading-relaxed">
                                &quot;Treinamento técnico e espiritual para que cada servo floresça em seu ministério conforme o chamado pessoal.&quot;
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="glass-card rounded-[3rem] p-12 relative z-10 overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Cross className="w-32 h-32 text-white" />
                                </div>
                                <h3 className="text-white text-2xl font-bold italic mb-8">Foco Ministerial:</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {ministerios.map((m, i) => (
                                        <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                            <div className="w-2 h-2 bg-brand-gold rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                                            <span className="text-white/90 font-bold italic text-sm">{m.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Ministries Grid */}
            <section className="py-32 px-4 relative">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-brand-blue italic tracking-tighter mb-4">Escolas de Formação</h2>
                        <p className="text-gray-500 font-medium italic">Nossos ministérios possuem encontros e materiais específicos.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {ministerios.map((m, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                            >
                                <div className={`w-14 h-14 ${m.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform`}>
                                    {m.icon}
                                </div>
                                <h3 className="text-xl font-bold text-brand-blue mb-3 italic">{m.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-8 italic">
                                    {m.description}
                                </p>
                                <Button variant="outline" className="w-full rounded-xl border-gray-100 text-brand-blue font-bold group-hover:bg-brand-blue group-hover:text-white transition-all">
                                    Ver Materiais
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
