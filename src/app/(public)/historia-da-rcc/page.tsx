"use client";

import { Flame, History, BookOpen, Users, Globe, Play, Quote, Calendar, Award } from "lucide-react";
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
                    <h1 className="text-6xl font-bold mb-6 italic text-brand-gold font-serif">Nossa História</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto italic font-medium">
                        &quot;O amor de Deus foi derramado em nossos corações, pelo Espírito Santo que nos foi dado.&quot; - Romanos 5, 5
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
                            <h2 className="text-4xl font-bold text-brand-blue font-serif italic">Como surgiu a Renovação Carismática Católica</h2>
                            <div className="prose prose-lg text-gray-600 space-y-6">
                                <p>
                                    Para contemplar o início da Renovação Carismática Católica devemos voltar o olhar para 1º de janeiro de 1901, quando o Papa Leão XIII pronunciou o Veni Creator Spiritus e consagrou o Século XX ao Divino Espírito Santo.
                                </p>
                                <p>
                                    A ação é considerada uma resposta aos apelos da fundadora da Congregação das Oblatas do Espírito Santo, a Beata Elena Guerra, que por volta de 1886 começou a escrever cartas ao Pontífice, pedindo uma maior devoção à Terceira Pessoa da Santíssima Trindade.
                                </p>
                                <p>
                                    É no chamado Século do Espírito Santo que o Papa convocou o Concílio Vaticano II, que seria um aggiornamento (“atualização”). Em 1958 o Papa João XXIII reza: <span className="italic font-bold">“Renova em nossa época os prodígios, como em um novo Pentecostes!”</span>
                                </p>
                            </div>
                        </div>
                        <div className="relative rounded-[40px] overflow-hidden shadow-2xl h-[500px] border-8 border-white">
                            <img
                                src="https://rccbrasil.org.br/wp-content/uploads/2023/01/retiro-duquesne-rcc-2.jpg"
                                alt="Retiro de Duquesne"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative rounded-[40px] overflow-hidden shadow-2xl h-[400px] border-8 border-white">
                            <img
                                src="https://rccbrasil.org.br/wp-content/uploads/2023/01/patti_mansfield-e1674559190626.jpg"
                                alt="Patti Gallagher Mansfield"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="order-1 lg:order-2 space-y-6">
                            <h3 className="text-3xl font-bold text-brand-blue font-serif italic">O Final de Semana de Duquesne</h3>
                            <div className="prose prose-lg text-gray-600 space-y-4">
                                <p>
                                    Em 1967, após a leitura do Livro “A Cruz e o Punhal” de David Wilkerson, um grupo de jovens da Universidade Duquesne do Espírito Santo (EUA) realiza um fim de semana de estudos nos dias 17 a 19 de fevereiro.
                                </p>
                                <p>
                                    Patti Gallagher Mansfield, David Mangan, Ralph Martin e Steve Clark testemunharam o derramamento de uma graça sobrenatural.
                                </p>
                                <div className="bg-brand-gold/5 p-8 border-l-4 border-brand-gold rounded-r-3xl italic text-brand-blue">
                                    <Quote className="w-8 h-8 opacity-20 mb-2" />
                                    <p className="text-lg">
                                        “Não foi um simples fim de semana, mas uma experiência transformadora de vida que ainda está acontecendo e se expandindo. Os dons do Espírito são manifestados!”
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Milestones */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-bold text-brand-blue font-serif italic">Principais marcos da RCC no mundo</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">A rápida expansão global da Corrente de Graça através de congressos e organizações internacionais.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
                            <div className="w-12 h-12 bg-brand-blue/5 rounded-xl flex items-center justify-center text-brand-blue">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-bold text-brand-blue uppercase tracking-tighter">1968 - 1972</h4>
                            <h5 className="font-bold text-brand-gold italic">Primeiros Congressos</h5>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Nos EUA, o primeiro congresso nacional reuniu 100 participantes. Em 1972, este número já chegava a 12.000 pessoas.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
                            <div className="w-12 h-12 bg-brand-blue/5 rounded-xl flex items-center justify-center text-brand-blue">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-bold text-brand-blue uppercase tracking-tighter">1973 - 1974</h4>
                            <h5 className="font-bold text-brand-gold italic">Congresso South Bend</h5>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                O primeiro congresso internacional em Indiana (EUA) reuniu 25.000 pessoas. Em 1974, foram 30.000 de 35 países.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
                            <div className="w-12 h-12 bg-brand-blue/5 rounded-xl flex items-center justify-center text-brand-blue">
                                <Award className="w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-bold text-brand-blue uppercase tracking-tighter">1973 - 1975</h4>
                            <h5 className="font-bold text-brand-gold italic">Congressos Roma</h5>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Encontros em Roma prepararam o terreno para o CHARIS, culminando em 1975 com 10.000 participantes de 54 países.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brazil Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-bold text-brand-blue font-serif italic">A Renovação Carismática Católica no Brasil</h2>
                        <img
                            src="https://rccbrasil.org.br/wp-content/uploads/2023/04/historia-rcc-livros-1140x212.jpg"
                            alt="Documentos e Livros Históricos"
                            className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg my-8"
                        />
                    </div>

                    <div className="prose prose-lg max-w-4xl mx-auto text-gray-600 space-y-8">
                        <p>
                            Em agosto de 1969, a mesma experiência foi relatada por jovens no Brasil. O sacerdote jesuíta Haroldo Rahm propõe um retiro reunião cerca de 60 jovens na Vila Brandina, em Campinas.
                        </p>
                        <p>
                            É nesse fim de semana, de 15 a 17 de agosto de 1969, que o Brasil registra o início da Renovação Carismática Católica. Padre Haroldo impôs as mãos sobre os jovens, lembrando a promessa de Atos 2, 39.
                        </p>
                        <p>
                            As reuniões na casa de Tia Laura, em Lorena, eram frequentadas pelo Monsenhor Jonas Abib e Luzia Santiago. Ao mesmo tempo, o Jovem Padre Eduardo Dougherty iniciava um ministério missionário por todo o Brasil.
                        </p>
                    </div>

                    {/* Brazil Timeline */}
                    <div className="space-y-12 max-w-5xl mx-auto">
                        <h3 className="text-3xl font-bold text-center text-brand-blue font-serif italic">Linha do tempo no Brasil</h3>

                        <div className="space-y-8">
                            {[
                                { year: "1972", title: "Primeira Publicação", desc: "Lançamento do livro “Sereis batizados no Espírito”, de Pe. Haroldo Rahm." },
                                { year: "1973", title: "I Congresso Nacional", desc: "Campinas (SP) reuniu 50 líderes para discernir a obra do Espírito no país." },
                                { year: "1974", title: "II Congresso Nacional", desc: "Realizado em Belo Horizonte (MG) com líderes de diversos estados." },
                                { year: "80 e 90", title: "Consolidação", desc: "A RCC ocupa espaço na mídia e chega a 3,8 milhões de membros em 1994." },
                                { year: "Atualmente", title: "Frutos de Pentecostes", desc: "Mais de 15 mil Grupos de Oração em todos os estados do Brasil." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-6 group">
                                    <div className="shrink-0 flex flex-col items-center">
                                        <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold font-bold">
                                            {item.year}
                                        </div>
                                        {idx !== 4 && <div className="w-px flex-1 bg-brand-gold/20 my-2" />}
                                    </div>
                                    <div className="pb-8 space-y-2">
                                        <h4 className="text-xl font-bold text-brand-blue italic">{item.title}</h4>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Documentary Section */}
            <section className="py-24 bg-brand-blue text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 text-center space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold italic text-brand-gold font-serif">Jubileu de Ouro da RCC no Brasil</h2>
                        <p className="text-blue-100 max-w-2xl mx-auto">
                            Assista ao documentário oficial de 50 anos que conta os detalhes da presença da Corrente de Graça em nosso país.
                        </p>
                    </div>

                    <div className="relative aspect-video max-w-4xl mx-auto rounded-[40px] overflow-hidden shadow-2xl border-8 border-white/10 group bg-black/20">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/21kHxf7p-5k"
                            title="Documentário: RCC, 50 anos da Corrente de Graça no Brasil"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="relative z-10"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
}
