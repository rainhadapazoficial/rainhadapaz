"use client";

import { motion } from "framer-motion";
import { Download, BookOpen, ChevronLeft, GraduationCap, Flame, Star, Shield, Target, Crown, Heart, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const workbooks = [
    {
        id: 1,
        title: "Identidade",
        subtitle: "Módulo I",
        description: "A descoberta da nossa identidade como filhos de Deus e membros da Renovaçao Carismática Católica.",
        image: "/formacao/modulo-basico/modulo1.jpg",
        color: "bg-teal-600",
        icon: <Star className="w-6 h-6" />
    },
    {
        id: 2,
        title: "Jesus Senhor e Mestre",
        subtitle: "Módulo II",
        description: "O senhorio de Jesus e a vivência da Vida no Espírito em nosso cotidiano.",
        image: "/formacao/modulo-basico/modulo2.jpg",
        color: "bg-blue-800",
        icon: <Crown className="w-6 h-6" />
    },
    {
        id: 3,
        title: "Grupo de Oração",
        subtitle: "Módulo III",
        description: "A importância e o funcionamento do Grupo de Oração como célula fundamental da RCC.",
        image: "/formacao/modulo-basico/modulo3.jpg",
        color: "bg-orange-600",
        icon: <Flame className="w-6 h-6" />
    },
    {
        id: 4,
        title: "Vida de Oração",
        subtitle: "Módulo IV",
        description: "O chamado à intimidade com Deus e o cultivo da vida espiritual diária.",
        image: "/formacao/modulo-basico/modulo4.jpg",
        color: "bg-purple-800",
        icon: <Heart className="w-6 h-6" />
    },
    {
        id: 5,
        title: "Carismas",
        subtitle: "Módulo V",
        description: "Dons do Espírito Santo: como identificá-los e colocá-los a serviço da Igreja.",
        image: "/formacao/modulo-basico/modulo5.jpg",
        color: "bg-amber-700",
        icon: <Shield className="w-6 h-6" />
    },
    {
        id: 6,
        title: "Igreja",
        subtitle: "Módulo VI",
        description: "Nossa missão e amor pela Santa Igreja Católica Apostólica Romana.",
        image: "/formacao/modulo-basico/modulo6.jpg",
        color: "bg-blue-900",
        icon: <Target className="w-6 h-6" />
    },
    {
        id: 7,
        title: "Formação Humana 1",
        subtitle: "Apostila 1",
        description: "A base da vida cristã e o desenvolvimento humano no caminho da fé.",
        image: "/formacao/modulo-basico/humana1.jpg",
        color: "bg-violet-600",
        icon: <Users className="w-6 h-6" />
    },
    {
        id: 8,
        title: "Formação Humana 2",
        subtitle: "Apostila 2",
        description: "Continuidade do crescimento humano e amadurecimento espiritual.",
        image: "/formacao/modulo-basico/humana2.jpg",
        color: "bg-emerald-600",
        icon: <CheckCircle2 className="w-6 h-6" />
    }
];

export default function ModuloBasicoPage() {
    return (
        <main className="min-h-screen bg-[#f8fafc] overflow-hidden relative pb-32">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-brand-blue overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -left-24 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
            </div>

            {/* Header & Navigation */}
            <header className="relative pt-12 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <Link href="/formacao" className="inline-flex items-center gap-2 text-white/70 hover:text-brand-gold transition-colors mb-12 font-bold uppercase tracking-widest text-xs">
                        <ChevronLeft className="w-4 h-4" /> Voltar para Formação
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center md:text-left"
                    >
                        <span className="inline-block px-4 py-1.5 bg-brand-gold/10 text-brand-gold text-xs font-black uppercase tracking-[0.3em] rounded-full mb-6 backdrop-blur-md border border-brand-gold/20">
                            2ª Etapa • Processo Formativo
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                            Módulo Básico
                        </h1>
                        <p className="text-xl text-blue-100/80 max-w-2xl font-medium italic">
                            O aprofundamento na vida cristã, através do ensino da sã doutrina da Igreja e da vivência dos carismas no Grupo de Oração.
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* Workbook Grid */}
            <section className="relative px-4 z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {workbooks.map((book, index) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
                            >
                                {/* Cover Placeholder/Image */}
                                <div className={`aspect-[3/4] relative overflow-hidden ${book.color} flex items-center justify-center`}>
                                    {/* In a real app, use <Image /> with the covers. For now, a stylized placeholder */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    <div className="relative text-white flex flex-col items-center gap-4 p-8 text-center">
                                        <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                                            {book.icon}
                                        </div>
                                        <div>
                                            <div className="font-black text-xs uppercase tracking-widest opacity-70 mb-1">{book.subtitle}</div>
                                            <div className="text-3xl font-black tracking-tighter">{book.title}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-xl font-black text-brand-blue mb-4 tracking-tight">{book.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 italic flex-1">
                                        {book.description}
                                    </p>
                                    <Button className="w-full bg-brand-blue hover:bg-brand-gold text-white rounded-2xl h-14 font-black transition-all gap-2 group-hover:shadow-lg">
                                        <Download className="w-5 h-5" /> APOSTILA PDF
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer Info Card */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-20 glass-card rounded-[2.5rem] p-10 md:p-16 border-white/40 overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-black text-brand-blue mb-6 tracking-tighter">Pronto para servir?</h2>
                                <p className="text-gray-600 leading-relaxed italic text-lg mb-8">
                                    O Módulo Básico é a base para o exercício dos carismas em nossos Ministérios. Estude, reze e deixe o Espírito Santo conduzir seu processo formativo.
                                </p>
                                <div className="flex items-center gap-4 text-brand-gold font-black uppercase text-xs tracking-widest">
                                    <div className="w-12 h-1 bg-brand-gold rounded-full" />
                                    RCC Diocese de Sinop
                                </div>
                            </div>
                            <div className="bg-brand-blue rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                                <BookOpen className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 transform -rotate-12" />
                                <div className="relative z-10 flex flex-col gap-6">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                        <GraduationCap className="text-brand-gold" />
                                    </div>
                                    <div>
                                        <div className="text-brand-gold font-black text-xs uppercase tracking-widest mb-2">Dica de Estudo</div>
                                        <p className="font-medium italic leading-relaxed">
                                            Acompanhe as aulas gravadas junto com as apostilas para um melhor aproveitamento da doutrina.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
