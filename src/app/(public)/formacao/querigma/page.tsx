"use client";

import { motion } from "framer-motion";
import { Download, BookOpen, ChevronLeft, GraduationCap, Flame, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const workbooks = [
    {
        id: "sves",
        title: "Seminário de Vida no Espírito Santo",
        subtitle: "Módulo Querigma",
        description: "O anúncio alegre e destemido do amor de Deus, que nos leva a um encontro pessoal com Jesus e ao Batismo no Espírito Santo.",
        image: "/formacao/querigma/seminario_espitiro_santo.jpg",
        color: "bg-brand-blue",
        icon: <Flame className="w-6 h-6" />
    },
    {
        id: "dons",
        title: "Introdução aos Dons",
        subtitle: "Módulo Querigma",
        description: "Uma introdução fundamental aos dons e carismas que o Espírito Santo deseja derramar sobre todos os fiéis.",
        image: "/formacao/querigma/introducao_dons.jpg",
        color: "bg-gray-400",
        icon: <Sparkles className="w-6 h-6" />
    },
    {
        id: "oracao",
        title: "Experiência de Oração",
        subtitle: "Módulo Querigma",
        description: "Aprofunde sua relação com Deus através de uma experiência prática e profunda de oração pessoal e comunitária.",
        image: "/formacao/querigma/experiencia_de_oracao.jpg",
        color: "bg-red-900",
        icon: <Heart className="w-6 h-6" />
    }
];

export default function QuerigmaPage() {
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
                            1ª Etapa • Querigma
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                            Querigma
                        </h1>
                        <p className="text-xl text-blue-100/80 max-w-2xl font-medium italic">
                            O primeiro anúncio que desperta o coração para um encontro pessoal com Jesus e a efusão do Espírito Santo.
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* Workbook Grid */}
            <section className="relative px-4 z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {workbooks.map((book, index) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] transition-all duration-700 flex flex-col border border-white"
                            >
                                {/* Decorative Gradient Overlay */}
                                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                {/* Cover Image Container */}
                                <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
                                    {/* Glassmorphism Badge */}
                                    <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl">
                                        <div className="text-[10px] font-black text-white/90 uppercase tracking-[0.2em]">{book.subtitle}</div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-brand-blue/40 backdrop-blur-[2px]">
                                        <div className="transform scale-90 group-hover:scale-100 transition-transform duration-500">
                                            <Button className="bg-white text-brand-blue hover:bg-brand-gold hover:text-white rounded-full h-16 w-16 shadow-2xl transition-all border-0 p-0 flex items-center justify-center">
                                                <Download className="w-6 h-6" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-60" />

                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).parentElement!.className += ` ${book.color}`;
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />

                                    <div className="absolute bottom-6 left-6 right-6 z-20">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 bg-brand-gold rounded-xl flex items-center justify-center text-brand-blue shadow-lg scale-90 group-hover:scale-100 transition-transform duration-500">
                                                {book.icon}
                                            </div>
                                            <div className="h-0.5 flex-1 bg-white/20 rounded-full overflow-hidden">
                                                <div className="h-full bg-brand-gold w-0 group-hover:w-full transition-all duration-1000" />
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-black text-white tracking-tighter leading-none group-hover:text-brand-gold transition-colors duration-500">
                                            {book.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="p-8 flex-1 flex flex-col bg-white">
                                    <p className="text-gray-500 text-sm leading-relaxed mb-8 italic flex-1 border-l-2 border-gray-100 pl-4 group-hover:border-brand-gold/30 transition-colors duration-500">
                                        &quot;{book.description}&quot;
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-black text-brand-blue shadow-sm">
                                                    {i}
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-brand-gold transition-all duration-500">
                                            Material Didático
                                        </span>
                                    </div>
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
                                <h2 className="text-3xl md:text-4xl font-black text-brand-blue mb-6 tracking-tighter">Encontro de Amor</h2>
                                <p className="text-gray-600 leading-relaxed italic text-lg mb-8">
                                    O Querigma não é apenas um ensino, mas uma experiência de vida. Comece sua jornada formativa permitindo que o amor de Deus transforme sua história.
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
                                        <div className="text-brand-gold font-black text-xs uppercase tracking-widest mb-2">Início da Jornada</div>
                                        <p className="font-medium italic leading-relaxed">
                                            As apostilas do Querigma são o primeiro passo para quem deseja conhecer mais a fundo a espiritualidade da Renovação Carismática.
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
