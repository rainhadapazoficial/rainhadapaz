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
        image: "/formacao/querigma/introducao_aos_dons.jpg",
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {workbooks.map((book, index) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
                            >
                                {/* Cover Image */}
                                <div className={`aspect-[3/4] relative overflow-hidden flex items-center justify-center`}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            // Fallback if image missing
                                            (e.target as HTMLImageElement).parentElement!.className += ` ${book.color}`;
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                    <div className="relative z-20 text-white flex flex-col items-center gap-4 p-8 text-center transition-transform duration-500 group-hover:translate-y-[-10px]">
                                        <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
                                            {book.icon}
                                        </div>
                                        <div>
                                            <div className="font-black text-[10px] uppercase tracking-widest opacity-70 mb-1">{book.subtitle}</div>
                                            <div className="text-2xl font-black tracking-tighter leading-none">{book.title}</div>
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
