"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Play, Download, GraduationCap, ChevronRight, Loader2, Quote, Flame, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getYouTubeEmbedUrl } from "@/lib/utils";

export default function FormacaoPage() {
    const [content, setContent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchContent() {
            try {
                const { data } = await supabase
                    .from("site_settings")
                    .select("value")
                    .eq("key", "formacao_content")
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
            title: "PROCESSO FORMATIVO",
            subtitle: "Um caminho seguro para a santidade e maturidade na vida cristã.",
            image_url: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2000&auto=format&fit=crop"
        },
        stages: [
            {
                id: "stage1",
                title: "1ª Etapa: Querigma",
                description: "O anúncio alegre e destemido do amor de Deus, que nos leva a um encontro pessoal com Jesus e ao Batismo no Espírito Santo.",
                video_url: "https://www.youtube.com/embed/W9xRLbgSmmI"
            },
            {
                id: "stage2",
                title: "2ª Etapa: Módulo Básico",
                description: "O aprofundamento na vida cristã, através do ensino da sã doutrina da Igreja e da vivência dos carismas no Grupo de Oração.",
                video_url: "https://www.youtube.com/embed/KggcNvUYOaU"
            },
            {
                id: "stage3",
                title: "3ª Etapa: Formações Específicas",
                description: "O aperfeiçoamento para o serviço em cada ministério, capacitando os servos para a missão na Igreja e no mundo.",
                video_url: "https://www.youtube.com/embed/7OQ8zMNKdhc"
            }
        ],
        download: {
            title: "Materiais de Apoio",
            text: "Faça o download da apresentação abaixo e a utilize no processo formativo da sua diocese, paróquia e Grupo de Oração.",
            button_text: "DOWNLOAD DO MATERIAL",
            url: "https://rccbrasil.org.br/wp-content/uploads/2025/02/09-Silde-Processo-Formativo.pdf"
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-brand-blue py-24 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url('${data.hero.image_url}')` }} />
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-brand-gold font-bold uppercase tracking-widest text-xs mb-6 border border-white/20">
                        <GraduationCap className="w-4 h-4" /> Formação RCC
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold italic mb-6 animate-in fade-in slide-in-from-bottom duration-1000">
                        {data.hero.title}
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        {data.hero.subtitle}
                    </p>
                </div>
            </section>

            {/* Introduction Section (Static Layout, but could be dynamic later if needed) */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed text-lg text-center">
                        <p>
                            O Movimento Eclesial da RCCBRASIL possui um processo formativo completo, que contempla Querigma e Catequese, ou seja, anúncio de Jesus Cristo, levando a experiência do Seu infinito amor, que desperta para uma formação sólida.
                        </p>
                        <p className="font-semibold text-brand-blue text-xl mt-4">
                            Processo formativo é a nossa grande estratégia de evangelização, um caminho seguro para trilharmos.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stages Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {data.stages.map((stage: any, index: number) => (
                            <div key={stage.id} className="group flex flex-col h-full bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                                <div className="p-8 space-y-6 flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="w-12 h-12 bg-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue font-bold text-xl group-hover:bg-brand-blue group-hover:text-white transition-colors duration-500">
                                            {index + 1}
                                        </div>
                                        {index === 0 ? <Flame className="w-6 h-6 text-brand-gold" /> : index === 1 ? <BookOpen className="w-6 h-6 text-brand-blue" /> : <GraduationCap className="w-6 h-6 text-brand-gold" />}
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-brand-blue group-hover:text-brand-gold transition-colors">{stage.title}</h3>
                                        <p className="text-gray-600 leading-relaxed italic">
                                            {stage.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50">
                                    <div className="aspect-video rounded-3xl overflow-hidden shadow-inner bg-black group-hover:shadow-lg transition-all duration-500">
                                        <iframe
                                            className="w-full h-full"
                                            src={getYouTubeEmbedUrl(stage.video_url)}
                                            title={stage.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Download Materials */}
            <section className="py-24 bg-brand-blue text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full -ml-32 -mb-32 blur-3xl" />

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl font-bold italic mb-8 text-brand-gold">{data.download.title}</h2>
                    <p className="text-xl text-blue-100 mb-12 italic">
                        {data.download.text}
                    </p>
                    <div className="group relative transition-all duration-500 hover:scale-105 inline-block">
                        <a
                            href={data.download.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button className="bg-brand-gold hover:bg-white hover:text-brand-blue text-white rounded-2xl px-12 h-16 font-bold text-xl gap-3 shadow-2xl">
                                <Download className="w-8 h-8" /> {data.download.button_text || "DOWNLOAD"}
                            </Button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
