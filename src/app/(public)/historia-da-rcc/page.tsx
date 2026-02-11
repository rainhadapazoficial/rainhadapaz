"use client";

import { Flame, History, BookOpen, Users, Globe, Play, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HistoriaRCCPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="bg-brand-blue py-24 text-white text-center relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-10 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000')` }}
                />
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h1 className="text-6xl font-bold mb-6 italic text-brand-gold">Nossa História</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto italic font-medium">
                        "O amor de Deus foi derramado em nossos corações, pelo Espírito Santo que nos foi dado." - Romanos 5, 5
                    </p>
                </div>
            </section>

            {/* Origins Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 space-y-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <div className="inline-block px-4 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-bold uppercase tracking-widest">
                                O Surgimento
                            </div>
                            <h2 className="text-4xl font-bold text-brand-blue font-serif italic">Como tudo começou</h2>
                            <div className="prose prose-lg text-gray-600 space-y-4">
                                <p>
                                    Para contemplar o início da Renovação Carismática Católica devemos voltar o olhar para 1º de janeiro de 1901, quando o Papa Leão XIII pronunciou o Veni Creator Spiritus e consagrou o Século XX ao Divino Espírito Santo.
                                </p>
                                <p>
                                    Em 1967, após a leitura do Livro "A Cruz e o Punhal" de David Wilkerson, um grupo de jovens da Universidade Duquesne do Espírito Santo, nos Estados Unidos, realizou um fim de semana de estudos sobre o Livro dos Atos dos Apóstolos.
                                </p>
                                <p>
                                    O conhecido "Final de Semana de Duquesne" foi o retiro em que pela primeira vez, leigos católicos relataram a experiência do Batismo no Espírito Santo, testemunhando o derramamento de uma graça sobrenatural.
                                </p>
                            </div>
                        </div>
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px]">
                            <img
                                src="https://images.unsplash.com/photo-1510915228340-29c85a43dbfe?q=80&w=1000"
                                alt="Duquesne Weekend"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Popes Quotes about RCC */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { pope: "Paulo VI", text: "Uma boa oportunidade para a Igreja e para o mundo." },
                            { pope: "João Paulo II", text: "Obra do Espírito Santo que enfrentará situações novas e difíceis." },
                            { pope: "Francisco", text: "A Renovação Carismática é uma corrente de graça para a Igreja." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-brand-blue/5 p-8 rounded-3xl border border-brand-blue/10 italic text-center">
                                <Quote className="w-8 h-8 text-brand-gold/30 mx-auto mb-4" />
                                <p className="text-brand-blue mb-4">"{item.text}"</p>
                                <span className="font-bold text-brand-gold uppercase text-[10px] tracking-widest">- Papa {item.pope}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* RCC in Brazil */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden shadow-2xl h-[400px]">
                        <img
                            src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=1000"
                            alt="RCC no Brasil"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="order-1 lg:order-2 space-y-6">
                        <div className="inline-block px-4 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-bold uppercase tracking-widest">
                            Em Terras Brasileiras
                        </div>
                        <h2 className="text-4xl font-bold text-brand-blue font-serif italic">A Chegada ao Brasil</h2>
                        <div className="prose prose-lg text-gray-600 space-y-4">
                            <p>
                                Em agosto de 1969, a experiência de Pentecostes foi relatada por jovens no Brasil. O sacerdote jesuíta Haroldo Rahm propôs um retiro na Vila Brandina, em Campinas.
                            </p>
                            <p>
                                Foi nesse fim de semana, de 15 a 17 de agosto de 1969, que o Brasil registrou o início da Renovação Carismática Católica. Padre Haroldo impôs as mãos sobre os jovens, lembrando a promessa de Atos 2, 39.
                            </p>
                            <p>
                                Nomes como Monsenhor Jonas Abib e Padre Eduardo Dougherty foram fundamentais na divulgação dos carismas e na fundação de centenas de Grupos de Oração por todo o país.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expansão e Atualmente */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold text-brand-blue font-serif italic">Expansão e Atualidade</h2>
                        <p className="text-lg text-gray-600">
                            Atualmente, a Renovação Carismática encontra-se presente em todos os estados do Brasil. São mais de 15 mil Grupos de Oração, estimando-se que mais de meio milhão de pessoas participem das reuniões.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "Grupos de Oração", value: "15.000+" },
                            { label: "Participantes", value: "500.000+" },
                            { label: "Anos no Brasil", value: "50+" },
                            { label: "Estados", value: "27" }
                        ].map((stat, idx) => (
                            <div key={idx} className="space-y-1">
                                <div className="text-3xl font-bold text-brand-gold">{stat.value}</div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Documentary Section */}
            <section className="py-24 bg-brand-blue text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 text-center space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold italic text-brand-gold">Jubileu de Ouro da RCC no Brasil</h2>
                        <p className="text-blue-100 max-w-2xl mx-auto">
                            Assista ao documentário que conta os detalhes da presença da Corrente de Graça em nosso país ao longo destas cinco décadas.
                        </p>
                    </div>

                    <div className="relative aspect-video max-w-4xl mx-auto rounded-[40px] overflow-hidden shadow-2xl border-8 border-white/10 group">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/videoseries?list=PLpREpX2O-oM0_71E51S7_1Kq_R-B_K_K_"
                            title="Documentário RCC Brasil"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="relative z-10"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
}
