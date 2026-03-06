"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Heart, Shield, Target, Crown, Sparkles, Flame, Loader2, BookOpen, Star, Users, CheckCircle2, Award, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function SeminarioVidaPage() {
    const [content, setContent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchContent() {
            try {
                const { data } = await supabase
                    .from("site_settings")
                    .select("value")
                    .eq("key", "seminario_vida_content")
                    .single();

                if (data?.value) {
                    setContent(data.value);
                }
            } catch (err) {
                console.error("Error fetching content:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchContent();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-12 h-12 animate-spin text-brand-gold" />
            </div>
        );
    }

    const data = content || {
        hero: {
            title: "Seminário de Vida no Espírito Santo",
            subtitle: "Experimente um novo Pentecostes em sua vida.",
            image_url: "https://rccbrasil.org.br/wp-content/uploads/2023/04/seminario-1024x349.jpg"
        },
        about: {
            title: "O que é e como funciona?",
            description: "O Seminário de Vida no Espírito Santo (SVES) tem, primordialmente, um caráter evangelizador. Ele se destina a anunciar o Querigma, a mensagem básica do Evangelho, e a proclamá-la de maneira nova de forma que todos aqueles que a ouçam possam se comprometer de modo renovado com o Senhor, abrindo-se, assim, a uma experiência mais completa com a obra do Espírito em suas vidas.",
            p1: "Através da pregação, oração e partilha, somos levados a um encontro pessoal com Jesus Cristo, renovando nossa fé e despertando para uma vida nova no Espírito.",
            p2: "O objetivo do Seminário de Vida é levar cada participante a descobrir Jesus Cristo como seu Senhor e Salvador pessoal, através de uma nova efusão do Espírito Santo."
        },
        themes: [
            { id: "1", title: "O Semeador", icon: "Star" },
            { id: "2", title: "O Amor de Deus", icon: "Heart" },
            { id: "3", title: "Pecado e Salvação", icon: "Shield" },
            { id: "4", title: "Fé e Conversão", icon: "Target" },
            { id: "5", title: "Senhorio de Jesus", icon: "Crown" },
            { id: "6", title: "Perdão e Cura Interior", icon: "Sparkles" },
            { id: "7", title: "Batismo no Espírito Santo", icon: "Flame" },
            { id: "8", title: "Vida Fraterna e Comunitária", icon: "Users" },
            { id: "9", title: "Testemunhando o Poder de Deus", icon: "CheckCircle2" }
        ],
        image_url: "https://rccbrasil.org.br/wp-content/uploads/2023/04/seminario-1024x349.jpg"
    };

    const workbooks = [
        {
            id: 1,
            title: "Seminário de Vida no Espírito Santo",
            subtitle: "Experiência de Pentecostes",
            description: "O anúncio fundamental do Evangelho para um encontro pessoal com Jesus.",
            icon: <Flame className="w-8 h-8 text-white" />,
            color: "bg-orange-500",
            image: "/formacao/querigma/seminario_espitiro_santo.jpg",
            link: "#"
        },
        {
            id: 2,
            title: "Introdução aos Dons",
            subtitle: "Carismas do Espírito",
            description: "Descubra e desenvolva os presentes que o Espírito Santo reservou para você.",
            icon: <Sparkles className="w-8 h-8 text-white" />,
            color: "bg-blue-500",
            image: "/formacao/querigma/introducao_aos_dons.jpg",
            link: "#"
        },
        {
            id: 3,
            title: "Experiência de Oração",
            subtitle: "Vida de Intimidade",
            description: "Aprofunde seu relacionamento com Deus através da oração pessoal e comunitária.",
            icon: <Target className="w-8 h-8 text-white" />,
            color: "bg-purple-500",
            image: "/formacao/querigma/experiencia_de_oracao.jpg",
            link: "#"
        }
    ];

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "Star": return <Star className="w-5 h-5 text-brand-gold" />;
            case "Heart": return <Heart className="w-5 h-5 text-brand-gold" />;
            case "Shield": return <Shield className="w-5 h-5 text-brand-gold" />;
            case "Target": return <Target className="w-5 h-5 text-brand-gold" />;
            case "Crown": return <Crown className="w-5 h-5 text-brand-gold" />;
            case "Sparkles": return <Sparkles className="w-5 h-5 text-brand-gold" />;
            case "Flame": return <Flame className="w-5 h-5 text-brand-gold" />;
            case "Users": return <Users className="w-5 h-5 text-brand-gold" />;
            case "CheckCircle2": return <CheckCircle2 className="w-5 h-5 text-brand-gold" />;
            default: return <Heart className="w-5 h-5 text-brand-gold" />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center bg-brand-blue text-white text-center">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url('${data.hero.image_url}')` }} />

                <div className="relative z-20 max-w-4xl px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold italic mb-6 animate-in fade-in slide-in-from-bottom duration-1000">
                        {data.hero.title}
                    </h1>
                    <div className="w-24 h-1 bg-brand-gold mx-auto mb-6 rounded-full" />

                    {data.registration_url && (
                        <a href={data.registration_url} target="_blank" rel="noopener noreferrer">
                            <button className="bg-brand-gold hover:bg-white hover:text-brand-blue text-brand-blue px-8 h-12 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 mx-auto">
                                <Award className="w-5 h-5" />
                                Inscreva-se Agora
                            </button>
                        </a>
                    )}
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-start">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-brand-blue italic mb-6">{data.about.title}</h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    {data.about.description}
                                </p>
                            </div>

                            <div className="bg-brand-blue/5 p-8 rounded-[2.5rem] border border-brand-blue/10">
                                <p className="text-brand-blue font-medium italic mb-0">
                                    &quot;{data.about.p2}&quot;
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 md:p-12 rounded-[3.5rem] shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold text-brand-blue italic mb-8 flex items-center gap-3">
                                <BookOpen className="w-6 h-6 text-brand-gold" />
                                Temas do Querigma
                            </h3>
                            <div className="space-y-4">
                                {data.themes.map((theme: any, index: number) => (
                                    <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                                        <div className="w-10 h-10 bg-brand-blue/5 rounded-xl flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
                                            {getIcon(theme.icon)}
                                        </div>
                                        <span className="font-bold text-gray-700">{theme.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Callout */}
            <section className="py-12 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="rounded-[3rem] overflow-hidden shadow-2xl relative group">
                        <img
                            src={data.image_url}
                            alt="Seminário de Vida no Espírito Santo"
                            className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 via-transparent to-transparent flex items-end p-12">
                            <p className="text-white text-xl font-medium italic max-w-2xl">
                                Venha ter uma experiência profunda com o amor de Deus que transforma vidas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Workbook Section */}
            <section className="py-24 bg-[#f8fafc] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -mr-48 -mt-48" />
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 bg-brand-gold/10 text-brand-gold text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-4 border border-brand-gold/20 backdrop-blur-md">
                            Recursos de Apoio
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-brand-blue italic tracking-tighter mb-4">
                            Apostilas do Querigma
                        </h2>
                        <p className="text-gray-500 font-medium max-w-2xl mx-auto italic">
                            Aprofunde os temas tratados no Seminário com nosso material didático exclusivo.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {workbooks.map((book, index) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
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
                                                {getIcon(book.title === "Introdução aos Dons" ? "Sparkles" : book.title === "Experiência de Oração" ? "Target" : "Flame")}
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
                </div>
            </section>

            {/* Final CTA */}
            {data.registration_url && (
                <section className="py-20 bg-gray-50 text-center">
                    <div className="max-w-3xl mx-auto px-4">
                        <Award className="w-16 h-16 text-brand-gold mx-auto mb-6" />
                        <h2 className="text-4xl font-bold text-brand-blue italic mb-6">Pronto para começar?</h2>
                        <p className="text-gray-600 text-lg mb-10 font-medium">
                            Não perca a oportunidade de viver este tempo de graça. As inscrições estão abertas!
                        </p>
                        <a href={data.registration_url} target="_blank" rel="noopener noreferrer">
                            <button className="bg-brand-blue text-white px-12 h-16 rounded-2xl text-xl font-bold shadow-xl shadow-brand-blue/20 hover:scale-105 transition-all flex items-center gap-3 mx-auto">
                                <Award className="w-6 h-6 text-brand-gold" />
                                Quero me Inscrever
                            </button>
                        </a>
                    </div>
                </section>
            )}
        </div>
    );
}
