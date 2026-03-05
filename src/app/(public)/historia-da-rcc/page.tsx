"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { History, Play, Users, Flame, Quote, Loader2, Globe, Calendar, Award } from "lucide-react";
import { getYouTubeEmbedUrl } from "@/lib/utils";

export default function HistoriaRCCPage() {
    const [content, setContent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchContent() {
            try {
                const { data } = await supabase
                    .from("site_settings")
                    .select("value")
                    .eq("key", "historia_rcc_content")
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
            title: "História da RCC",
            subtitle: "Conheça como o Espírito Santo soprou sobre o mundo e iniciou esta corrente de graça.",
            image_url: "https://rccbrasil.org.br/wp-content/uploads/2021/01/duquene-weekend.jpg"
        },
        origin: {
            title: "O Fim de Semana de Duquesne",
            p1: "A Renovação Carismática Católica (RCC) teve seu início oficial em um retiro realizado por estudantes e professores da Universidade de Duquesne, em Pittsburgh (EUA), em fevereiro de 1967.",
            p2: "Eles buscavam uma renovação espiritual profunda e, ao rezarem 'Vem, Espírito Santo', experimentaram um derramamento extraordinário de dons carismáticos, semelhante ao relato bíblico de Pentecostes.",
            p3: "Daquele pequeno grupo, a chama se espalhou rapidamente para outras universidades, paróquias e, em poucos anos, alcançou todos os continentes, tornando-se uma das maiores forças de renovação na Igreja Católica.",
            image_url: "https://rccbrasil.org.br/wp-content/uploads/2021/01/patty-mansfield.jpg"
        },
        documentary: {
            title: "Documentário Oficial",
            video_url: "https://www.youtube.com/embed/fA3p6z9fG94",
            description: "Assista ao documentário que conta detalhes sobre os primeiros anos e a expansão da RCC no Brasil e no mundo."
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center justify-center bg-brand-blue text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div className="absolute inset-0 z-0 bg-cover bg-fixed bg-center" style={{ backgroundImage: `url('${data.hero.image_url}')` }} />

                <div className="relative z-20 max-w-4xl px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-brand-gold/20 backdrop-blur-md px-4 py-2 rounded-full text-brand-gold font-bold uppercase tracking-widest text-xs mb-6 border border-brand-gold/30">
                        <History className="w-4 h-4" /> Uma Corrente de Graça
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold italic mb-6 animate-in fade-in slide-in-from-bottom duration-1000">
                        {data.hero.title}
                    </h1>
                    <div className="w-24 h-1 bg-brand-gold mx-auto mb-6 rounded-full" />
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-medium italic">
                        &quot;{data.hero.subtitle}&quot;
                    </p>
                </div>
            </section>

            {/* Origins Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold text-brand-blue italic">{data.origin.title}</h2>
                            <div className="w-20 h-1 bg-brand-gold rounded-full" />
                        </div>
                        <div className="prose prose-lg text-gray-600 leading-relaxed text-lg space-y-6">
                            <p>{data.origin.p1}</p>
                            <p>{data.origin.p2}</p>
                            <p>{data.origin.p3}</p>
                        </div>
                        <div className="bg-brand-blue/5 p-8 border-l-4 border-brand-gold rounded-r-3xl italic text-brand-blue flex gap-4 items-start">
                            <Quote className="w-10 h-10 text-brand-gold/40 shrink-0" />
                            <p className="text-lg">
                                &quot;A Renovação Carismática não é um movimento no sentido sociológico comum; ela não tem fundadores, mas é antes uma corrente de graça que é para toda a Igreja.&quot;
                                <span className="block mt-2 font-bold not-italic">— Cardeal Leo-Jozef Suenens</span>
                            </p>
                        </div>
                    </div>
                    <div className="relative group animate-in fade-in slide-in-from-right duration-1000">
                        <div className="absolute -inset-4 bg-brand-gold/10 rounded-[3rem] blur-3xl group-hover:bg-brand-gold/20 transition-all duration-700" />
                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-100 h-[600px]">
                            <img
                                src={data.origin.image_url}
                                alt="Duquesne Weekend"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 via-transparent to-transparent opacity-60" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Expansion Section (Visual) */}
            <section className="py-24 bg-brand-blue text-white relative">
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000')] bg-cover bg-center" />
                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-blue-100">
                        <div className="space-y-4 group">
                            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-gold group-hover:text-brand-blue transition-all duration-500">
                                <Users className="w-10 h-10" />
                            </div>
                            <h3 className="text-white text-4xl font-black italic">120 MILHÕES</h3>
                            <p className="font-bold uppercase tracking-widest text-sm text-brand-gold">De Carismáticos no mundo</p>
                        </div>
                        <div className="space-y-4 group">
                            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-gold group-hover:text-brand-blue transition-all duration-500">
                                <Flame className="w-10 h-10" />
                            </div>
                            <h3 className="text-white text-4xl font-black italic">PENTECOSTES</h3>
                            <p className="font-bold uppercase tracking-widest text-sm text-brand-gold">Um novo sopro de vida</p>
                        </div>
                        <div className="space-y-4 group">
                            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-gold group-hover:text-brand-blue transition-all duration-500">
                                <History className="w-10 h-10" />
                            </div>
                            <h3 className="text-white text-4xl font-black italic">FUNDAÇÃO</h3>
                            <p className="font-bold uppercase tracking-widest text-sm text-brand-gold">Pittsburgh, 1967</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4 text-center space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold text-brand-blue italic">{data.documentary.title}</h2>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                            {data.documentary.description}
                        </p>
                    </div>

                    <div className="group relative rounded-[3rem] overflow-hidden shadow-2xl bg-black aspect-video max-w-4xl mx-auto transition-all duration-500 hover:shadow-brand-blue/20">
                        <iframe
                            className="w-full h-full"
                            src={getYouTubeEmbedUrl(data.documentary.video_url)}
                            title="Documentário RCC"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </div>
            </section>

            {/* Final Quote */}
            <section className="py-24 bg-gray-50 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="relative">
                        <Quote className="w-24 h-24 text-gray-200 absolute -top-12 -left-12 -z-0" />
                        <p className="text-3xl font-medium italic text-gray-700 relative z-10 leading-snug mb-8">
                            &quot;O que aconteceu em Pittsburgh foi um Pentecostes. Não um Pentecostes de outrora, mas um Pentecostes de hoje.&quot;
                        </p>
                    </div>
                    <div className="w-16 h-1 bg-brand-gold mx-auto mb-4 rounded-full" />
                    <p className="font-bold text-brand-blue uppercase tracking-widest">Patty Mansfield</p>
                </div>
            </section>
        </div>
    );
}
